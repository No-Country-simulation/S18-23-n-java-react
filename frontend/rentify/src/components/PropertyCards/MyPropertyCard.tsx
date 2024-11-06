import {
  Card,
  CardMedia,
  Typography,
  Box,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { PropertyCard } from "../../interfaces/Property";
import {
  BathtubOutlined,
  DoorFrontOutlined,
  HideImage,
  HomeOutlined,
  HotelOutlined,
  TextureOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
  property: PropertyCard;
  index: number;
  handleDeleteProperty: (id: number) => Promise<void>
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function MyPropertyCard({ property, index, handleDeleteProperty, openDialog, setOpenDialog }: Props) {
  const navigate = useNavigate();
  const handleViewProperty = (id: number) => {
    navigate(`/property/${id}`);
  };

  const bedroom =
    property.rooms.find((room) => room.roomName == "Dormitorio")?.quantity ?? 0;
  const bathroom =
    property.rooms.find((room) => room.roomName == "Baño")?.quantity ?? 0;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      key={property.id}
      title="Haz clic aquí para ver más información de la propiedad"
      sx={{
        display: {
          xs: index > 0 ? "none" : "flex",
          md: index > 1 ? "none" : "flex",
          lg: "flex",
        },
        flexDirection: { xs: "column" },
        paddingTop: 0,
        paddingX: "16px",
        paddingBottom: "20px",
        boxShadow: 4,
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        transition: "all",
        transitionDuration: "300ms",
        maxWidth: { xs: "260px" },
        margin: "0 auto",
        width: "100%",
        "&:hover": {
          scale: "1.02",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        },
      }}
    >
      {property.multimedia.length > 0 ? (
        <CardMedia
          component="img"
          onClick={() => handleViewProperty(property.id)}
          image={property.multimedia[0].url}
          alt={property.title}
          sx={{
            height: { xs: "180px" },
            width: { xs: "300px" },
            borderRadius: "10px",
          }}
        />
      ) : (
        <Box
          onClick={() => handleViewProperty(property.id)}
          sx={{
            height: { xs: "180px" },
            width: { xs: "300px" },
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <HideImage />
          <Typography> Sin imagen</Typography>
        </Box>
      )}

      <Box
        onClick={() => handleViewProperty(property.id)}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "fit-content",
          paddingRight: { xs: 0 },
          paddingBottom: { xs: "10px" },
          gap: { xs: 3 },
          justifyContent: "space-between",
        }}
      >
        <Stack
          justifyContent={"space-between"}
          sx={{ flexDirection: { xs: "column" } }}
        >
          <Typography
            variant="body1"
            fontWeight={"bold"}
            sx={{ maxWidth: { xs: "100%" } }}
          >
            {property.title}
          </Typography>
          <Typography color="primary" variant="body1">
            ${property.price}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {property.city}, {property.province}, {property.country}
        </Typography>
        <Stack direction={"row"} gap={2} sx={{ flexWrap: "wrap" }}>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <DoorFrontOutlined fontSize="medium" />
            <Typography variant="body2">
              {property.numberOfRooms} hab.
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <BathtubOutlined fontSize="medium" />
            <Typography variant="body2">
              {bathroom} {bathroom != 1 ? "baños" : "baño"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <HotelOutlined fontSize="medium" />
            <Typography variant="body2">{bedroom} dorm.</Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <HomeOutlined fontSize="medium" />
            <Typography variant="body2">{property.builtArea} m²</Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <TextureOutlined fontSize="medium" />
            <Typography variant="body2">{property.totalArea} m²</Typography>
          </Stack>
        </Stack>
        <Typography variant="body2" color="textSecondary">
          {property.description}
        </Typography>
      </Box>
      <Button variant="contained" color="info">
        Modificar Propiedad
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        color="error"
      >
        Eliminar Propiedad
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ border: "1px solid transparent", borderRadius: "20px" }}
      >
        <DialogTitle sx={{ backgroundColor: "error.main", color: "white" }}>
          Eliminar Propiedad
        </DialogTitle>
        <DialogContent
          sx={{
            paddingX: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <DialogContentText textAlign={"center"} sx={{ marginTop: 2 }}>
            ¿Estás seguro que deseas eliminar esta propiedad?
          </DialogContentText>
          <DialogContentText fontWeight={"bold"} textAlign={"center"}>
            {property.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingY: 2, paddingX: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteProperty(property.id)}
            variant="contained"
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default MyPropertyCard;
