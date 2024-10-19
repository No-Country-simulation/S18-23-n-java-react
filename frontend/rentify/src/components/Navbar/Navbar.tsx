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

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Logout,
  Person,
  Menu as MenuIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
} from "@mui/icons-material";
import NavLinkItem from "./NavLinkItem";

type NotificationType = "success" | "error";

interface NotificationInfo {
  show: boolean;
  type: NotificationType;
  message: string;
}

function Navbar() {
  const { isUserLoggedIn, userLogout, user } = useContext(AuthContext);
  const navigate = useNavigate();
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
      navigate("/login");
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
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h5"
            color="white"
            sx={{ letterSpacing: "1.5px", textDecoration: "none" }}
            component={RouterLink}
            to={"/"}
          >
            Rentify
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} gap={4}>
            {isUserLoggedIn ? (
              <>
                <Button
                  onClick={handleClick}
                  sx={{
                    ml: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-haspopup="true"
                >
                  {user?.username ? (
                    <>
                      <Typography>{user?.username}</Typography>
                    </>
                  ) : (
                    <Stack
                      direction={"row"}
                      gap={1}
                      color={"white"}
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      <Typography>{user?.name}</Typography>
                      <Typography>{user?.lastname}</Typography>
                    </Stack>
                  )}
                  {user?.photo ? (
                    <Avatar sx={{ width: 32, height: 32 }} src={user?.photo} />
                  ) : (
                    <Avatar
                      sx={{ width: 32, height: 32, backgroundColor: "white" }}
                    >
                      <Person color="primary" />
                    </Avatar>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    display: { xs: "none", sm: "flex" },
                  }}
                  component={RouterLink}
                  to="/login"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "white",
                    display: { xs: "none", sm: "flex" },
                  }}
                  component={RouterLink}
                  to="/register"
                >
                  Registrarse
                </Button>
                <IconButton
                  color="inherit"
                  sx={{ display: { xs: "flex", sm: "none" } }}
                  onClick={handleClick}
                >
                  <MenuIcon sx={{ width: 32, height: 32 }} />
                </IconButton>
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
        {isUserLoggedIn ? (
          <Stack gap={1}>
            <NavLinkItem
              to="/profile"
              onClick={handleClose}
              icon={<Person />}
              text="Mi Perfil"
            />
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Stack>
        ) : (
          <Stack gap={1}>
            <NavLinkItem
              to="/login"
              onClick={handleClose}
              icon={<LoginIcon />}
              text="Iniciar Sesión"
            />

            <Divider />
            <NavLinkItem
              to="/register"
              onClick={handleClose}
              icon={<RegisterIcon />}
              text="Registrarse"
            />
          </Stack>
        )}
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
