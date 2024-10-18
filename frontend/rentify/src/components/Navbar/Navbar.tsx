import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { authLogout } from "../../service/auth/authService";
import { AuthContext } from "../../context";

import { Link as RouterLink } from "react-router-dom";
import { Logout, Person } from "@mui/icons-material";

type NotificationType = "success" | "error";

interface NotificationInfo {
  show: boolean;
  type: NotificationType;
  message: string;
}

function Navbar() {
  const { isUserLoggedIn, userLogout } = useContext(AuthContext);
  const [notification, setNotification] = useState<NotificationInfo>({
    show: false,
    type: "error",
    message: "",
  });

  const handleLogout = async () => {
    const response = await authLogout();
    console.log(response);
    if (response.isSuccess) {
      userLogout();
      addNewNotification("success", "Sesión cerrada exitosamente");
    } else {
      addNewNotification("error", "Ha ocurrido un error al cerrar la sesión");
    }
  };

  const addNewNotification = (type: NotificationType, message: string) => {
    setNotification({ show: true, type, message });
  };

  const handleCloseNotification = () => {
    setNotification((state) => ({ ...state, show: false }));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h5"
            color="textPrimary"
            sx={{ letterSpacing: "1.5px" }}
          >
            Rentify
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} gap={4}>
            {isUserLoggedIn ? (
              <>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-haspopup="true"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="info"
                  component={RouterLink}
                  to="/login"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  component={RouterLink}
                  to="/register"
                >
                  Registrarse
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
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
          {notification.message || "Ha ocurrido un error"}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}

export default Navbar;
