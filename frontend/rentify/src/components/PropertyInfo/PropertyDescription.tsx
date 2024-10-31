import { Box, Paper, Stack, Typography } from "@mui/material";
import { FeaturesType, Property, RoomTypes } from "../../interfaces/Property";
import {
  BathtubOutlined as BathtubOutlinedIcon,
  KitchenOutlined as KitchenOutlinedIcon,
  YardOutlined as YardOutlinedIcon,
  StairsOutlined as StairsOutlinedIcon,
  LocalLaundryServiceOutlined as LocalLaundryServiceOutlinedIcon,
  FenceOutlined as FenceOutlinedIcon,
  TimeToLeaveOutlined as TimeToLeaveOutlinedIcon,
  WindowOutlined as WindowOutlinedIcon,
  ChairOutlined as ChairOutlinedIcon,
  HotelOutlined as HotelOutlinedIcon,
  CleaningServicesOutlined as CleaningServicesOutlinedIcon,
  CheckroomOutlined as CheckroomOutlinedIcon,
  RestaurantMenuOutlined as RestaurantMenuOutlinedIcon,
  WorkOutline as WorkOutlineIcon,
  MenuBookOutlined as MenuBookOutlinedIcon,
  OutdoorGrillOutlined as OutdoorGrillOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  StoreOutlined as StoreOutlinedIcon,
  AccessibleOutlined as AccesibleOutlinedIcon,
  BadgeOutlined as BadgeOutlinedIcon,
  PetsOutlined as PetsOutlinedIcon,
} from "@mui/icons-material";

interface Props {
  property: Property;
}

const roomTypeIcon = {
  Dormitorio: <HotelOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Baño: <BathtubOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Cocina: <KitchenOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Comedor: <RestaurantMenuOutlinedIcon sx={{ width: 30, height: 30 }} />,
  "Sala de estar": <ChairOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Estudio: <MenuBookOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Lavadero: <LocalLaundryServiceOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Vestidor: <CheckroomOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Oficina: <WorkOutlineIcon sx={{ width: 30, height: 30 }} />,
  Balcón: <WindowOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Terraza: <OutdoorGrillOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Garaje: <TimeToLeaveOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Sótano: <StairsOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Ático: <StairsOutlinedIcon sx={{ width: 30, height: 30 }} />,
  Jardín: <YardOutlinedIcon sx={{ width: 30, height: 30 }} />,
  "Cuarto de servicio": (
    <CleaningServicesOutlinedIcon sx={{ width: 30, height: 30 }} />
  ),
  Patio: <FenceOutlinedIcon sx={{ width: 30, height: 30 }} />,
};

const roomFeatureIcon = {
  "apto profesional": <BadgeOutlinedIcon sx={{ width: 30, height: 30 }} />,
  "acceso para personas con discapacidad": (
    <AccesibleOutlinedIcon sx={{ width: 30, height: 30 }} />
  ),
  "uso comercial": <StoreOutlinedIcon sx={{ width: 30, height: 30 }} />,
  "permite mascotas": <PetsOutlinedIcon sx={{ width: 30, height: 30 }} />,
};

function PropertyDescription({ property }: Props) {
  return (
    <Paper sx={{ padding: 2, boxShadow: 2, marginY: 4 }}>
      <Stack gap={2}>
        <Typography variant="body1">{property.description}</Typography>
        <Box>
          <Typography variant="body1">Tipos de Habitaciones:</Typography>
          <Stack gap={1} paddingY={1}>
            {property.rooms.map(({ roomName, quantity }) => {
              const plural = quantity > 1 ? "s" : "";
              return (
                <Stack key={roomName} direction={"row"} gap={1} alignItems={"center"}>
                  {roomTypeIcon[roomName as RoomTypes]}
                  <Typography key={roomName} variant="body1">
                    {`${quantity} ${
                      roomName !== "Cuarto de servicio"
                        ? roomName + plural
                        : `Cuarto${plural} de servicio`
                    }`}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
        {property.features.length > 0 && (
          <Box>
            <Typography variant="body1">Características:</Typography>
            <Stack gap={1} paddingY={1}>
              {property.features.map(({ name }) => {
                return (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    {roomFeatureIcon[name as FeaturesType]}
                    <Typography
                      key={name}
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {name}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        )}

        {property.amenities.length > 0 && (
          <Box>
            <Typography variant="body1">
              Adicionalmente, la propiedad cuenta con:
            </Typography>
            <Stack gap={1} paddingY={1}>
              {property.amenities.map(({ name }) => {
                return (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <CheckCircleOutlineIcon />
                    <Typography
                      key={name}
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {name}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

export default PropertyDescription;
