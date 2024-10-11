import FeaturedProperties from "../../components/FeaturedProperty/FeaturedProperty";

const properties = [
    {
      id: 1,
      name: "Monoambiente - Av.Cabildo",
      description: "A beautiful apartment in the city center.",
      price: 1200,
      imageUrl: "https://example.com/images/property1.jpg"
    },
    {
      id: 2,
      name: "Departamento - Palermo",
      description: "A cozy cottage in the countryside.",
      price: 850,
      imageUrl: "https://example.com/images/property2.jpg"
    },
    {
      id: 3,
      name: "Casa - Lanus",
      description: "A cozy cottage in the countryside.",
      price: 850,
      imageUrl: "https://example.com/images/property2.jpg"
    }
    
];

function LandingPage() {
  return (
    <>
      <FeaturedProperties properties={properties}/>
    </>
  );
}

export default LandingPage;