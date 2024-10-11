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
import { useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import FormInputText from "./FormComponents/FormInputText";

interface AlertInfo {
  type: "success" | "error";
  message: string;
}

function LoginForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    type: "error",
    message: "",
  });

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data;

    // Ejemplo para probar una petición POST a una API
    axios
      .post("https://s18-23-n-java-react.onrender.com/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.data)
        setShowMessage(true);
        setAlertInfo({
          type: "success",
          message: "Inicio de sesión exitoso",
        });
      })
      .catch((error) => {
        setShowMessage(true);
        setAlertInfo({
          type: "error",
          message: error.response.data.message,
        });
      });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
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
            <Link sx={{ cursor: "pointer" }}>Regístrate</Link>
          </Typography>
        </Box>
        <ForgotPassword open={openDialog} handleClose={handleDialogClose} />
        <Snackbar
          open={showMessage}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={alertInfo.type}
            variant="outlined"
            sx={{ width: "100%" }}
          >
            {alertInfo.message || "Ha ocurrido un error al iniciar sesión"}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default LoginForm;
