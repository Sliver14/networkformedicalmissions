import ProgramDetail from "@/components/ProgramDetail";

const WidowsCampaignPage = () => {
  return (
    <ProgramDetail
      title="Health For Widows Campaign"
      breadcrumbLabel="Widows Campaign"
      image="/assets/images/resources/causes-details-images-2.jpg"
      subtitle="Health For Widows Campaign"
      description="Widows often face immense vulnerability and lack of access to basic healthcare services. Our Health For Widows Campaign is specifically designed to provide free medical checkups, necessary medications, and continuous health support to widows in impoverished communities."
      additionalContent={{
        title: "Supporting the Vulnerable",
        text: "We believe in James 1:27, aiming to support the most vulnerable among us. By ensuring widows have access to quality healthcare, we aim to improve their quality of life, provide emotional and medical support, and share the love of Christ in a tangible way."
      }}
    />
  );
};

export default WidowsCampaignPage;
