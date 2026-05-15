import { Timeline } from "../components/Timeline";
import { educationJourney, professionalExperiences } from "../constants";

const Experiences = () => {
  return (
    <div id="work" className="w-full">
      <section id="education-journey" aria-labelledby="education-journey-heading">
        <Timeline data={educationJourney} title="Education Journey" headingId="education-journey-heading" />
      </section>
      <section id="experiences" className="mt-8 md:mt-16" aria-labelledby="experiences-heading">
        <Timeline data={professionalExperiences} title="Experiences" headingId="experiences-heading" />
      </section>
    </div>
  );
};

export default Experiences;
