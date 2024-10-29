import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Property } from "../../interfaces/Property";

interface PropertyListProps {
  properties: Property[]; 
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const navigate = useNavigate()
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [visibleCount, setVisibleCount] = useState(4); 
  const [filters, setFilters] = useState({
    propertyType: "",
    province: "",
    city: ""
  });
  
  // const getImageUrl = (property: Property) => {
  //   const image = property.multimedia.find(media => media.type === "image");
  //   return image ? image.url : ""; 
  // };

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    let filtered = properties;

    // if (filters.type) {
    //   filtered = filtered.filter(property => property.propertyType === filters.type);
    // }
    if (filters.province) {
      filtered = filtered.filter(property => property.province === filters.province);
    }
    if (filters.city) {
      filtered = filtered.filter(property => property.city === filters.city);
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
    navigate(`/property/${id}`, {state: {property: properties.find(property => property.id === id)}})
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4); 
  };

  if (properties.length === 0) {
    return <Typography variant="h6" align="center">No hay propiedades disponibles.</Typography>;
  }

  

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tu inmueble ideal
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          select
          label="Tipo de Propiedad"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
          style={{ width: '30%' }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="HOUSE">Casa</MenuItem>
          <MenuItem value="BUILDING">Departamento</MenuItem>
          <MenuItem value="COMMERCIAL_OFFICE">Oficina</MenuItem>
          <MenuItem value="VACATION_HOME">Casa Vacacional</MenuItem>
          <MenuItem value="FARM">Finca</MenuItem>
        </TextField>

        <TextField
          select
          label="Provincia"
          name="province"
          value={filters.province}
          onChange={handleFilterChange}
          style={{ width: '30%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
          <MenuItem value="Córdoba">Córdoba</MenuItem>
          <MenuItem value="Santa Fe">Santa Fe</MenuItem>
          <MenuItem value="Salta">Salta</MenuItem>
        </TextField>

        <TextField
          select
          label="Ciudad"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          style={{ width: '30%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Buenos Aires">Ciudad de Buenos Aires</MenuItem>
          <MenuItem value="Rosario">Rosario</MenuItem>
          <MenuItem value="Córdoba">Córdoba</MenuItem>
          <MenuItem value="San Lorenzo">San Lorenzo</MenuItem>
          <MenuItem value="La Plata">La Plata</MenuItem>
          <MenuItem value="Mar del Plata">Mar del Plata</MenuItem>
        </TextField>
      </div>

      {filteredProperties.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No se encontraron propiedades que coincidan con los filtros seleccionados.
        </Typography>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}}>
            {filteredProperties.slice(0, visibleCount).map((property) => (
              <Card key={property.id} style={{ display: 'flex', padding: '10px' }}>
                <CardMedia
                  component="img"
                  image={property.multimedia[0].url}
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
                        <Typography variant="body2">Tamaño: {property.totalArea} m²</Typography>
                        <Typography variant="body2">Habitaciones: {property.numberOfRooms}</Typography>
                        <Typography variant="body2">Antiguedad: {property.yearsOfAntiquity} años</Typography>
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
                  <Button 
                      variant='contained'
                      color='primary'
                      style={{ margin: '10px', alignSelf: 'center'}} 
                      onClick={() => handleViewProperty(property.id)}
                  >
                      Ver Propiedad
                  </Button>
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
        </div>
      )}
    </div>
  );
};

export default PropertyList;
