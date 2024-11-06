import {
  Avatar,
  Box,
  Typography,
  Grid2,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const { isUserLoggedIn, user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(user?.photo);
  const navigate = useNavigate();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isUserLoggedIn || !user) return navigate("/");

  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", maxWidth: 800, margin: "auto" }}
      >
        {/* Banner con foto editable */}
        <Box
          sx={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        {/* Información del usuario */}
        <Grid2 container spacing={3} alignItems="center" mt={2}>
          <Grid2>
            <Avatar
              alt={user.name}
              src={avatar}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
          </Grid2>
          <Grid2>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span style={{ fontWeight: "bold" }}>Teléfono:</span> {user.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span style={{ fontWeight: "bold" }}>Correo electrónico:</span>{" "}
              {user.id}
            </Typography>
          </Grid2>
        </Grid2>

        {/* Botones */}
        <Box mt={3} display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary">
            Agregar Propiedad
          </Button>
          <Button variant="outlined" color="primary">
            Editar Perfil
          </Button>
          <Button variant="contained" color="secondary">
            Notificaciones
          </Button>
        </Box>

        {/* Mis Propiedades */}
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Mis Propiedades
          </Typography>
          {/* Aquí puedes agregar la lógica para mostrar las propiedades del usuario */}
        </Box>

        {/* Mis Favoritos */}
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Mis Favoritos
          </Typography>
          {/* Aquí puedes agregar la lógica para mostrar los favoritos del usuario */}
        </Box>
      </Paper>
    </>
  );
}

export default UserPage;
