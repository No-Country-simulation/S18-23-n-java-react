import FeaturedProperties from "../../components/FeaturedProperty/FeaturedProperty";
import PropertyList from "../../components/PropertyList/PropertyList";

const properties = [
  {
    id: 1,
    title: "Monoambiente - Av.Cabildo",
    description: "Un moderno monoambiente ubicado en el corazón de la ciudad, ideal para jóvenes profesionales.",
    price: 1200,
    size: 35,
    rooms: 1,
    bathrooms: 1,
    type: "Monoambiente",
    province: "Buenos Aires",
    city: "Cabildo",
    featured: true, 
    image: "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Departamento - Palermo",
    description: "Amplio departamento con una excelente vista al parque de la ciudad. Perfecto para familias.",
    price: 850,
    size: 75,
    rooms: 3,
    bathrooms: 2,
    type: "Departamento",
    province: "Buenos Aires",
    city: "Palermo",
    featured: false, 
    image: "https://plus.unsplash.com/premium_photo-1684175656154-ac52b3cc2c60?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Casa - Lanús",
    description: "Acogedora casa en un tranquilo barrio con un hermoso jardín.",
    price: 850,
    size: 120,
    rooms: 4,
    bathrooms: 2,
    type: "Casa",
    province: "Buenos Aires",
    city: "Lanús",
    featured: true, 
    image: "https://images.unsplash.com/photo-1697462248006-662f35b913ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Departamento - Recoleta",
    description: "Lujoso departamento en uno de los mejores barrios, con excelentes comodidades.",
    price: 2000,
    size: 90,
    rooms: 3,
    bathrooms: 2,
    type: "Departamento",
    province: "Buenos Aires",
    city: "Recoleta",
    featured: false, 
    image: "https://plus.unsplash.com/premium_photo-1684175656172-19a7ee56f0c8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    title: "Casa - Tigre",
    description: "Hermosa casa con piscina y amplio jardín en una zona tranquila.",
    price: 1800,
    size: 200,
    rooms: 5,
    bathrooms: 3,
    type: "Casa",
    province: "Buenos Aires",
    city: "Tigre",
    featured: true, 
    image: "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    title: "Departamento - Córdoba",
    description: "Moderno departamento en el centro de Córdoba, cerca de todos los servicios.",
    price: 1000,
    size: 60,
    rooms: 2,
    bathrooms: 1,
    type: "Departamento",
    province: "Córdoba",
    city: "Córdoba",
    featured: false, 
    image: "https://plus.unsplash.com/premium_photo-1673014201877-64e88f4b5542?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 7,
    title: "Monoambiente - Rosario",
    description: "Pequeño monoambiente ideal para estudiantes o solteros.",
    price: 700,
    size: 30,
    rooms: 1,
    bathrooms: 1,
    type: "Monoambiente",
    province: "Santa Fe",
    city: "Rosario",
    featured: false, 
    image: "https://images.unsplash.com/photo-1665249934445-1de680641f50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    title: "Casa - Córdoba",
    description: "Amplia casa con un gran jardín, ideal para familias que buscan comodidad.",
    price: 2500,
    size: 220,
    rooms: 6,
    bathrooms: 4,
    type: "Casa",
    province: "Córdoba",
    city: "Córdoba",
    featured: false, 
    image: "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

function LandingPage() {
  const featuredProperties = properties.filter(property => property.featured); 

  return (
    <>
      <FeaturedProperties properties={featuredProperties} />
      <PropertyList properties={properties} />
    </>
  );
}

export default LandingPage;
