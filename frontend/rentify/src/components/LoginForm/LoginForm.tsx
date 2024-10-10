import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const validateEmail = () => {
    const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailValidator.test(email)) {
      setErrorEmail(true);
      return false;
    }
    setErrorEmail(false);
    return true;
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setErrorPassword(true);
      return false;
    }
    setErrorPassword(false);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      try {
        // Ejemplo para probar una petición POST a una API
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            title: "",
            body: password,
            userId: 1,
          }
        );

        console.log(response.data);
        setShowMessage(true);
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    }
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
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControl>
            <TextField
              id="email"
              value={email}
              name="email"
              required
              label="Correo Electrónico"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value === "") {
                  setErrorEmail(true);
                } else {
                  setErrorEmail(false);
                }
              }}
              error={errorEmail}
              helperText={
                errorEmail
                  ? "Por favor, ingrese un correo electrónico válido"
                  : ""
              }
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              value={password}
              name="password"
              required
              label="Contraseña"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value === "") {
                  setErrorPassword(true);
                } else {
                  setErrorPassword(false);
                }
              }}
              error={errorPassword}
              helperText={
                errorPassword ? "Por favor, ingrese una contraseña" : ""
              }
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
          <Alert severity="success" variant="outlined" sx={{ width: "100%" }}>
            ¡Inicio de Sesión exitoso!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default LoginForm;
