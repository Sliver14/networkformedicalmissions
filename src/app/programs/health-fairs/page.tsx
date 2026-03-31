import ProgramDetail from "@/components/ProgramDetail";

const HealthFairsPage = () => {
  return (
    <ProgramDetail
      title="Community Health Fairs"
      breadcrumbLabel="Community Health Fairs"
      image="/assets/images/resources/causes-details-img.jpg"
      subtitle="Comprehensive Community Care"
      description="We host Free Medical Fairs with the aim to provide primary care for minor illnesses, eye and ear clinics, a dedicated NMM prescription assistance program, pharmacy services, and a comprehensive referral system."
      additionalContent={{
        title: "Dental Services",
        text: "Our health fairs also include essential dental services, recognizing the profound impact of oral health on overall wellbeing."
      }}
      points={[
        { text: "Routine dental exams and assessments" },
        { text: "Cavity fillings and preventative care" },
        { text: "Professional teeth cleanings" },
        { text: "Safe tooth extractions" }
      ]}
    />
  );
};

export default HealthFairsPage;
