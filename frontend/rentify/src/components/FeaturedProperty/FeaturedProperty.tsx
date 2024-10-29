import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Property } from "../../interfaces/Property";
import { useNavigate } from "react-router-dom";
import { HideImage } from "@mui/icons-material";

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
}) => {
  const navigate = useNavigate();
  const handleViewProperty = (id: number) => {
    navigate(`/property/${id}`, {
      state: { property: properties.find((property) => property.id === id) },
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Propiedades Destacadas
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {properties.map((property) => (
          <Card
            key={property.id}
            style={{
              width: "300px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {property.multimedia.length > 0 ? (
              <CardMedia
                component="img"
                image={property.multimedia[0].url}
                alt={property.title}
                sx={{
                  height: { xs: "180px", lg: "240px" },
                  width: { xs: "300px", lg: "300px" },
                  borderRadius: "10px",
                }}
              />
              ) : (
                <Box
                  sx={{
                    height: { xs: "180px", lg: "240px" },
                    width: { xs: "300px", lg: "300px" },
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <HideImage />
                  <Typography> Sin imagen</Typography>
                </Box>
            )}
            <CardContent style={{ flexGrow: 1 }}>
              <Typography variant="h6">{property.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {property.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${property.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tamaño: {property.totalArea} m²
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Habitaciones: {property.numberOfRooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Antiguedad: {property.yearsOfAntiquity} años
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px", width: "90%", alignSelf: "center" }}
              onClick={() => handleViewProperty(property.id)}
            >
              Ver Propiedad
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
