import ProgramDetail from "@/components/ProgramDetail";

const FreeSurgeriesPage = () => {
  return (
    <ProgramDetail
      title="Free Surgeries"
      breadcrumbLabel="Free Surgeries"
      image="/assets/images/resources/causes-details-img.jpg"
      subtitle="Available Surgical Treatments"
      description="Through our network of volunteer medical professionals and partner hospitals, we offer life-changing surgical procedures to those who cannot afford them."
      points={[
        { title: "General Surgery", text: "Comprehensive procedures for common ailments." },
        { title: "Gynaecological Surgery", text: "Specialized care for women's reproductive health." },
        { title: "Pediatric Surgery", text: "Delicate surgical interventions tailored for children." },
        { title: "Urological Surgery", text: "Treatment for disorders of the urinary tract and male reproductive system." },
        { title: "Orthopedic Surgery", text: "Restoring mobility through musculoskeletal interventions." },
        { title: "Eye Surgery", text: "Restoring vision through cataract removals and other ocular procedures." }
      ]}
    />
  );
};

export default FreeSurgeriesPage;
