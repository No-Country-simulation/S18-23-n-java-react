import { Card, CardContent, CardMedia, Typography } from "@mui/material";

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
              alt={property.name}
            />
            <CardContent>
              <Typography variant="h6">{property.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {property.description}
              </Typography>
              <Typography variant="h5" color="primary">
                ${property.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
