import { useState, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import FormInputText from "./FormComponents/FormInputText";
import { AuthContext } from "../../context";
import { authLogin } from "../../service/auth/authService";

type NotificationType = "success" | "error";

interface NotificationInfo {
  show: boolean;
  type: NotificationType;
  message: string;
}

function LoginForm() {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState<NotificationInfo>({
    show: false,
    type: "error",
    message: "",
  });

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const response = await authLogin(email, password);

    if (response.isSuccess) {
      userLogin(response.data);
      addNewNotification("success", "Inicio de Sesión exitoso");
      navigate("/")
    } else {
      addNewNotification("error", response.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const addNewNotification = (type: NotificationType, message: string) => {
    setNotification({ show: true, type, message });
  };

  const handleCloseNotification = () => {
    setNotification((state) => ({ ...state, show: false }));
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          margin: "0 auto",
          padding: 4,
          borderRadius: 2,
          boxShadow: 10,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "clamp(1.8rem, 8vw, 2rem)",
            marginBottom: { xs: 3, sm: 4 },
          }}
        >
          Iniciar Sesión
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControl>
            <FormInputText
              name="email"
              type="email"
              label="Correo electrónico"
              control={control}
            />
          </FormControl>
          <FormControl>
            <FormInputText
              name="password"
              type="password"
              label="Contraseña"
              control={control}
            />
          </FormControl>
          <Typography
            sx={{
              alignSelf: "end",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
            }}
          >
            <Link component="button" type="button" onClick={handleDialogOpen}>
              ¿Olvidó su contraseña?
            </Link>
          </Typography>

          <Button variant="contained" type="submit">
            Iniciar Sesión
          </Button>
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
          >
            ¿No tienes una cuenta?{" "}
            <Link sx={{ cursor: "pointer" }} component={RouterLink} to={"/register"}>
              Regístrate
            </Link>
          </Typography>
        </Box>
        <ForgotPassword open={openDialog} handleClose={handleDialogClose} />
        <Snackbar
          open={notification.show}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={notification.type}
            variant="outlined"
            sx={{ width: "100%" }}
          >
            {notification.message || "Ha ocurrido un error al iniciar sesión"}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default LoginForm;
