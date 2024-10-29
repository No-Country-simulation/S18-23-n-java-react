import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Property } from "../../interfaces/Property";



interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {

  const handleViewProperty = (id: number) => {
    console.log(`Ver propiedad con ID: ${id}`);
    // redirigir a la pagina de la propiedad correspondiente
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Propiedades Destacadas
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {properties.map((property) => (
          <Card key={property.id} style={{ width: '300px', margin: '10px', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="140"
              // image={property.image}
              alt={property.title} 
            />
            <CardContent style={{flexGrow: 1}}>
              <Typography variant="h6">{property.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {property.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${property.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Tamaño: {property.size} m² */}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary">
                Habitaciones: {property.rooms}
              </Typography> */}
              <Typography variant="body2" color="textSecondary">
                {/* Baños: {property.bathrooms} */}
              </Typography>
            </CardContent>
            <Button 
              variant='contained'
              color='primary'
              style={{ margin: '10px', width: '90%', alignSelf: 'center'}} 
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
