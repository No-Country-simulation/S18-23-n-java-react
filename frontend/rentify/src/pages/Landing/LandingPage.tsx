import { Box } from "@mui/material";
import Banner from "../../components/Banner/Banner";
import FeaturedProperties from "../../components/FeaturedProperty/FeaturedProperty";
import Footer from "../../components/Footer/Footer";
import PropertyList from "../../components/PropertyList/PropertyList";
import Testimonials from "../../components/Testimonials/Testimonials";
import { properties } from "../../data/Properties";

function LandingPage() {
  const featuredProperties = properties.filter(property => property.featured); 

  return (
    <Box sx={{backgroundColor: "background.default"}}>
      <Banner />
      <FeaturedProperties properties={featuredProperties} />
      <PropertyList properties={properties} />
      <Testimonials />
      <Footer />
    </Box>
  );
}

export default LandingPage;
