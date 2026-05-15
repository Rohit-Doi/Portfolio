from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List
import os
import base64
from uuid import uuid4
from datetime import datetime, timedelta
from . import models, schemas, database

RETENTION = timedelta(days=1)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

drawings_dir = os.path.join(os.path.dirname(__file__), "drawings")
os.makedirs(drawings_dir, exist_ok=True)
app.mount("/guestbook_backend/drawings", StaticFiles(directory=drawings_dir), name="drawings")


def _purge_expired(db: Session) -> None:
    cutoff = datetime.utcnow() - RETENTION
    expired = db.query(models.GuestbookEntry).filter(models.GuestbookEntry.created_at < cutoff).all()
    for row in expired:
        if row.drawing_filename:
            path = os.path.join(drawings_dir, row.drawing_filename)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except OSError:
                    pass
        db.delete(row)
    if expired:
        db.commit()


@app.get("/guestbook", response_model=List[schemas.GuestbookEntryResponse])
def get_entries(db: Session = Depends(database.get_db)):
    _purge_expired(db)
    cutoff = datetime.utcnow() - RETENTION
    return (
        db.query(models.GuestbookEntry)
        .filter(models.GuestbookEntry.created_at >= cutoff)
        .order_by(models.GuestbookEntry.created_at.desc())
        .all()
    )


@app.post("/guestbook", response_model=schemas.GuestbookEntryResponse)
def create_entry(entry: schemas.GuestbookEntryCreate, db: Session = Depends(database.get_db)):
    _purge_expired(db)
    drawing_filename = None
    if entry.drawing:
        # Save drawing as PNG
        img_data = base64.b64decode(entry.drawing.split(",")[-1])
        drawing_filename = f"{uuid4().hex}.png"
        with open(os.path.join(drawings_dir, drawing_filename), "wb") as f:
            f.write(img_data)
    db_entry = models.GuestbookEntry(
        name=entry.name,
        message=entry.message,
        drawing_filename=drawing_filename,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry 