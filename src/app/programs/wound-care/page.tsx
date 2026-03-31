import ProgramDetail from "@/components/ProgramDetail";

const WoundCarePage = () => {
  return (
    <ProgramDetail
      title="Wound Care Outreaches"
      breadcrumbLabel="Wound Care"
      image="/assets/images/resources/causes-details-images-1.jpg"
      subtitle="Our Approach to Wound Care"
      description="We focus on the provision of access to wound care sessions and health education on self-management techniques to people living with chronic wounds with the aim to improve health outcomes and reduce the risk of amputations."
      additionalContent={{
        title: "Training & Workshops",
        text: "Through this program, we provide comprehensive workshops and training sessions to community health workers on the management of chronic wounds, including the critical care of diabetic foot ulcers."
      }}
    />
  );
};

export default WoundCarePage;
