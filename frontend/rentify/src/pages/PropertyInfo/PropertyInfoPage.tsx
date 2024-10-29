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
        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          sx={{
            justifyContent: { xs: "center", lg: "start" },
            width: { xs: "100%", lg: "auto" },
          }}
        >
          <PropertyFeatures
            FeatIcon={DoorFront}
            label="Habitaciones"
            value={property.numberOfRooms}
          />
          <PropertyFeatures
            FeatIcon={Texture}
            label="Área Total"
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
      <PropertyDescription property={property} />
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Room />
          <Typography sx={{ fontWeight: "bold" }}>Ubicación:</Typography>
          <Typography variant="body1">
            {property.streetName} {property.streetNumber}, {property.city},{" "}
            {property.province}, {property.country}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            marginTop: 2,
          }}
        >
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
      </Paper>
    </Box>
  );
}

export default PropertyInfoPage;