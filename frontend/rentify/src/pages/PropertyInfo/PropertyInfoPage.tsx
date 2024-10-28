import { useLocation } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PropertyCarousel from "../../components/PropertyInfo/PropertyCarousel";
import { CalendarMonth, DoorFront, Room, Texture } from "@mui/icons-material";
import PropertyFeatures from "../../components/PropertyInfo/PropertyFeatures";
import { useEffect } from "react";
import { Property } from "../../interfaces/Property";
import PropertyDescription from "../../components/PropertyInfo/PropertyDescription";
import PropertyHeader from "../../components/PropertyInfo/PropertyHeader";
import PropertyOwner from "../../components/PropertyInfo/PropertyOwner";
import Map from "../../components/Map/Map";

function PropertyInfoPage() {
  const { state } = useLocation();
  const property = state.property as Property;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box
      sx={{
        minHeight: "92vh",
        paddingX: { xs: 2, sm: 4, md: 10 },
        backgroundColor: "background.default",
        paddingY: "32px",
      }}
    >
      <PropertyHeader property={property} />
      <PropertyCarousel images={property.multimedia} />
      <Stack
        direction={"row"}
        marginY={4}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={4}
      >
        <Stack direction={"row"} gap={2} flexWrap={"wrap"} sx={{justifyContent: {xs: "center", lg: "start"}, width: {xs: "100%", lg: "auto"}}}>
          <PropertyFeatures
            FeatIcon={DoorFront}
            label="Habitaciones"
            value={property.numberOfRooms}
          />
          <PropertyFeatures
            FeatIcon={Texture}
            label="Área Construida"
            value={property.totalArea + "m²"}
          />
          <PropertyFeatures
            FeatIcon={CalendarMonth}
            label="Antiguedad"
            value={property.yearsOfAntiquity + " años"}
          />
        </Stack>
        <PropertyOwner property={property} />
      </Stack>
      <Paper sx={{width: "fit-content", padding: 2, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 1, alignItems: "center"}}>
        <Room/>
        <Typography sx={{fontWeight: "bold"}}>Ubicación:</Typography>
        <Typography variant="body1" textAlign={"center"}>
           {property.streetName} {property.streetNumber}, {property.city},{" "}
          {property.province}, {property.country}
        </Typography>
      </Paper>

      <Box sx={{width: "5600 px", padding: 2, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 1, alignItems: "center", marginTop: 2}}>
        <Map
          isView={true}
          // La latitud y longitud de inicio
          latitude={-34.60351704153353}
          longitude={-58.394393920898445}
          // ChangePosition es opcional solo se podra usar si isView es false y podras marcar en el mapa un punto, y te dara las coordenadas
          changePosition={(la, lo) => {
            console.log(la, lo);
          }}
        />
      </Box>
      <PropertyDescription property={property} />
    </Box>
  );
}

export default PropertyInfoPage;
