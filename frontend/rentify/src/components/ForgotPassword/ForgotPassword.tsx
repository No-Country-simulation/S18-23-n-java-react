import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
} from "@mui/material";
import FormInputText from "../LoginForm/FormComponents/FormInputText";
import { FieldValues, useForm } from "react-hook-form";
import { authRecoveryPassword } from "../../service/auth/authService";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
}

function ForgotPassword({ open, handleClose }: Props) {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FieldValues) => {
    const { email } = data;
    const response = await authRecoveryPassword(email);
    if (response.isSuccess) {
      console.log(
        "Correo enviado. Por favor, siga los pasos para recuperar su contraseña"
      );
      handleClose();
      navigate(0);
    } else {
      console.log(response);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle
        color="white"
        sx={{ backgroundColor: "primary.main", marginBottom: 2 }}
      >
        Recuperar Contraseña
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <DialogContentText color="textPrimary">
          Escribe tu correo electrónico para que podamos enviarte un mensaje con
          los pasos a seguir para recuperar tu contraseña
        </DialogContentText>
        <FormControl>
          <FormInputText
            name="email"
            type="email"
            label="Correo electrónico"
            control={control}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          variant="text"
          sx={{ py: 1, borderRadius: 2 }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ py: 1, borderRadius: 2 }}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;
