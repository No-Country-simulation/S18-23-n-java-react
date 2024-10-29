import { useState, useEffect } from "react";
import { Typography, TextField, MenuItem, Button, useMediaQuery } from "@mui/material";
import { Property } from "../../interfaces/Property";
import FilteredPropertyCard from "../PropertyCards/FilteredPropertyCard";

interface PropertyListProps {
  properties: Property[]; 
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [visibleCount, setVisibleCount] = useState(4); 
  const [filters, setFilters] = useState({
    propertyType: "",
    province: "",
    city: ""
  });
  
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    let filtered = properties;

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
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
      <div style={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Cambia a columna en móvil
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '10px'  
      }}>
        <TextField
          select
          label="Tipo de Propiedad"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
          style={{ width: isMobile ? '100%' : '30%'}}
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
          style={{ width: isMobile ? '100%' : '30%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
          <MenuItem value="Córdoba">Córdoba</MenuItem>
          <MenuItem value="Santa Fe">Santa Fe</MenuItem>
          <MenuItem value="Salta">Salta</MenuItem>
          <MenuItem value="Río Negro">Río Negro</MenuItem>
          <MenuItem value="Mendoza">Mendoza</MenuItem>
          <MenuItem value="Jujuy">Jujuy</MenuItem>
        </TextField>

        <TextField
          select
          label="Ciudad"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          style={{ width: isMobile ? '100%' : '30%' }}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Buenos Aires">Ciudad de Buenos Aires</MenuItem>
          <MenuItem value="Rosario">Rosario</MenuItem>
          <MenuItem value="Córdoba">Córdoba</MenuItem>
          <MenuItem value="San Lorenzo">San Lorenzo</MenuItem>
          <MenuItem value="La Plata">La Plata</MenuItem>
          <MenuItem value="Mar del Plata">Mar del Plata</MenuItem>
          <MenuItem value="Bariloche">Bariloche</MenuItem>
          <MenuItem value="Villa Carlo Paz">Villa Carlo Paz</MenuItem>
          <MenuItem value="Maipu">Maipu</MenuItem>
          <MenuItem value="Jujuy">Jujuy</MenuItem>
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
              <FilteredPropertyCard key={property.id} property={property} />
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
  )};
          
export default PropertyList;
