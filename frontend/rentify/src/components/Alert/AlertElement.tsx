import { useContext } from "react";
import { AlertContext } from "../../context/Alert/AlertContext";
import { Snackbar, Alert } from "@mui/material";

function AlertElement() {
  const { alert, closeAlert } = useContext(AlertContext);
  return (
    <Snackbar
      open={alert.show}
      autoHideDuration={6000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={alert.type} variant="outlined"sx={{ width: "100%", backgroundColor: "white" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertElement;
