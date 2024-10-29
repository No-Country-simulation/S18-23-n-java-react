import {
  BathtubOutlined,
  HotelOutlined,
  KitchenOutlined,
  RestaurantMenuOutlined,
  ChairOutlined,
  MenuBookOutlined,
  LocalLaundryServiceOutlined,
  CheckroomOutlined,
  WorkOutline,
  WindowOutlined,
  OutdoorGrillOutlined,
  TimeToLeaveOutlined,
  StairsOutlined,
  YardOutlined,
  FenceOutlined,
  CleaningServicesOutlined,
} from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";
import CheckCard from "./CheckCard";
import { Control, FieldValues } from "react-hook-form";

interface Props {
  control: Control<FieldValues>;
}

function PropertyRoomSection({ control }: Props) {
  return (
    <Stack direction={"column"} gap={1}>
      <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>Habitaciones</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CheckCard
          name="roomBaño"
          label="Baño"
          control={control}
          icon={<BathtubOutlined />}
        />
        <CheckCard
          name="roomCocina"
          label="Cocina"
          control={control}
          icon={<KitchenOutlined />}
        />
        <CheckCard
          name="roomComedor"
          label="Comedor"
          control={control}
          icon={<RestaurantMenuOutlined />}
        />
        <CheckCard
          name="roomEstudio"
          label="Estudio"
          control={control}
          icon={<MenuBookOutlined />}
        />
        <CheckCard
          name="roomLavadero"
          label="Lavadero"
          control={control}
          icon={<LocalLaundryServiceOutlined />}
        />
        <CheckCard
          name="roomVestidor"
          label="Vestidor"
          control={control}
          icon={<CheckroomOutlined />}
        />
        <CheckCard
          name="roomOficina"
          label="Oficina"
          control={control}
          icon={<WorkOutline />}
        />
        <CheckCard
          name="roomBalcón"
          label="Balcón"
          control={control}
          icon={<WindowOutlined />}
        />
        <CheckCard
          name="roomTerraza"
          label="Terraza"
          control={control}
          icon={<OutdoorGrillOutlined />}
        />
        <CheckCard
          name="roomGaraje"
          label="Garaje"
          control={control}
          icon={<TimeToLeaveOutlined />}
        />
        <CheckCard
          name="roomSótano"
          label="Sótano"
          control={control}
          icon={<StairsOutlined />}
        />
        <CheckCard
          name="roomÁtico"
          label="Ático"
          control={control}
          icon={<StairsOutlined />}
        />
        <CheckCard
          name="roomJardín"
          label="Jardín"
          control={control}
          icon={<YardOutlined />}
        />
        <CheckCard
          name="roomPatio"
          label="Patio"
          control={control}
          icon={<FenceOutlined />}
        />
          <CheckCard
            name="roomDormitorio"
            label="Dormitorio"
            control={control}
            icon={<HotelOutlined />}
          />
        <CheckCard
          name="roomCuarto de servicio"
          label="Cuarto de servicio"
          control={control}
          icon={<CleaningServicesOutlined />}
        />
        <CheckCard
          name="roomSala de estar"
          label="Sala de estar"
          control={control}
          icon={<ChairOutlined />}
        />
      </Box>
    </Stack>
  );
}

export default PropertyRoomSection;
