import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, TextField, MenuItem, Button } from "@mui/material";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  province: string;
  city: string;
  image: string;
  size: number;
  rooms: number;
  bathrooms: number;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [visibleCount, setVisibleCount] = useState(4); 
  const [filters, setFilters] = useState({
    type: "",
    province: "",
    city: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    let filtered = properties;

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.province) {
      filtered = filtered.filter(property => property.province === filters.province);
    }

    if (filters.city) {
      filtered = filtered.filter(property => property.city === filters.city);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.maxPrice));
    }

    setFilteredProperties(filtered);
    setVisibleCount(4); 
  }, [filters, properties]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleViewProperty = (id: number) => {
    console.log(`Ver propiedad con ID: ${id}`);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tu inmueble ideal
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          select
          label="Tipo de Propiedad"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          style={{ width: '20%' }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Casa">Casa</MenuItem>
          <MenuItem value="Departamento">Departamento</MenuItem>
          <MenuItem value="Monoambiente">Monoambiente</MenuItem>
        </TextField>

        <TextField
          select
          label="Provincia"
          name="province"
          value={filters.province}
          onChange={handleFilterChange}
          style={{ width: '20%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
          <MenuItem value="Córdoba">Córdoba</MenuItem>
          <MenuItem value="Santa Fe">Santa Fe</MenuItem>
        </TextField>

        <TextField
          select
          label="Ciudad"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          style={{ width: '20%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Lanus">Lanús</MenuItem>
          <MenuItem value="Palermo">Palermo</MenuItem>
          <MenuItem value="Cabildo">Cabildo</MenuItem>
        </TextField>

        <TextField
          label="Precio Mínimo"
          name="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={handleFilterChange}
          style={{ width: '15%' }}
        />

        <TextField
          label="Precio Máximo"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          style={{ width: '15%' }}
        />
      </div>

      
      {filteredProperties.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No se encontraron propiedades que coincidan con los filtros seleccionados.
        </Typography>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {filteredProperties.slice(0, visibleCount).map((property) => (
              <Card key={property.id} style={{ display: 'flex', padding: '10px' }}>
                <CardMedia
                  component="img"
                  image={property.image}
                  alt={property.title}
                  style={{ height: "170px", width: "25em" }}  
                />
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                  <Typography variant="h6">{property.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {property.description}
                  </Typography>
                  <Typography variant="h5" color="primary">
                    ${property.price}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex', gap: '1em'}}>
                        <Typography variant="body2">Tamaño: {property.size} m²</Typography>
                        <Typography variant="body2">Habitaciones: {property.rooms}</Typography>
                        <Typography variant="body2">Baños: {property.bathrooms}</Typography>
                    </div>
                    <Button 
                        variant='contained'
                        color='primary'
                        style={{ margin: '10px', alignSelf: 'center'}} 
                        onClick={() => handleViewProperty(property.id)}
                    >
                        Ver Propiedad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleCount < filteredProperties.length && ( 
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Cargar más propiedades
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyList;