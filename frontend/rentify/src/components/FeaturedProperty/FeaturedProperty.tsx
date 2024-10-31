import { Box, Typography } from "@mui/material";
import { Property } from "../../interfaces/Property";
import FeaturedPropertyCard from "../PropertyCards/FeaturedPropertyCard";

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
}) => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Propiedades Destacadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          rowGap: 4,
        }}
      >
        {properties.map((property) => (
          <FeaturedPropertyCard property={property} key={property.title} />
        ))}
      </Box>
    </div>
  );
};

export default FeaturedProperties;
