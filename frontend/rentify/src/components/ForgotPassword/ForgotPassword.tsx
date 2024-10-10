import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
}

function ForgotPassword({ open, handleClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>Recuperar Contraseña</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DialogContentText>
          Escribe tu correo electrónico para que podamos enviarte un mensaje con
          los pasos a seguir para recuperar tu contraseña
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          id="email"
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          fullWidth
          sx={{ py: 0, borderRadius: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          variant="text"
          sx={{ py: 1, borderRadius: 2 }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button variant="contained" sx={{ py: 1, borderRadius: 2 }}>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;
