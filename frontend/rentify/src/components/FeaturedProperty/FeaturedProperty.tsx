import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  const handleRegisterRedirect = () => {
    navigate("/register"); // Cambia esto por la ruta a tu página de registro
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Propiedades Destacadas
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {properties.map((property) => (
          <Card key={property.id} style={{ width: '300px', margin: '10px' }}>
            <CardMedia
              component="img"
              height="140"
              image={property.image}
              alt={property.title}
            />
            <CardContent>
              <Typography variant="h6">{property.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {property.description}
              </Typography>
              <Typography variant="h5" color="primary">
                ${property.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegisterRedirect}
                style={{ marginTop: '10px' }}
              >
                Alquilar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
