import { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext, AlertContext } from "../../context";
import { authLogin } from "../../service/auth/authService";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import FormInputText from "./FormComponents/FormInputText";

function LoginForm() {
  const { userLogin } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const response = await authLogin(email, password);

    if (response.isSuccess) {
      userLogin(response.data);
      showAlert("success", "Inicio de sesión exitoso");
      navigate("/");
    } else {
      showAlert("error", response.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  return (
    <Container
      sx={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        paddingBottom: "8vh",
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
          variant="h4"
          sx={{
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
            }}
          >
            <Link onClick={handleDialogOpen} sx={{ cursor: "pointer" }}>
              ¿Olvidó su contraseña?
            </Link>
          </Typography>

          <Button variant="contained" type="submit">
            Iniciar Sesión
          </Button>
          <Typography
            textAlign={"center"}
            variant="body2"
          >
            ¿No tienes una cuenta?{" "}
            <Link
              sx={{ cursor: "pointer" }}
              component={RouterLink}
              to={"/register"}
            >
              Regístrate
            </Link>
          </Typography>
        </Box>
        <ForgotPassword open={openDialog} handleClose={handleDialogClose} />
      </Paper>
    </Container>
  );
}

export default LoginForm;
