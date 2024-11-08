import { Box, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedProperties from "../../components/FeaturedProperty/FeaturedProperty";
import Footer from "../../components/Footer/Footer";
import PropertyList from "../../components/PropertyList/PropertyList";
import Testimonials from "../../components/Testimonials/Testimonials";
import { Property } from "../../interfaces/Property";
import { getAllProperties } from "../../service/property/propertyService";
import { AlertContext } from "../../context";

export function LandingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        if (error) {
          showAlert("error", "Error al obtener las propiedades: ");
          setLoading(false);
        }
      }
    };

    fetchProperties();
  }, [showAlert]);

  const getRandomProperties = (properties: Property[]) => {
    if (properties.length === 0) return [];
    const shuffled = [...properties].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const featuredProperties = getRandomProperties(properties);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={"60px"} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Banner />
      <FeaturedProperties properties={featuredProperties} />
      <PropertyList properties={properties} />
      <Testimonials />
      <Footer />
    </Box>
  );
}

export default LandingPage;
