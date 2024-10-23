import {
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
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { authLogout } from "../../service/auth/authService";
import { AlertContext, AuthContext } from "../../context";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Logout,
  Person,
  Menu as MenuIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
} from "@mui/icons-material";
import NavLinkItem from "./NavLinkItem";
import NavbarLogo from "./NavbarLogo";

function Navbar() {
  const { isUserLoggedIn, userLogout, user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await authLogout();
    console.log(response);
    if (response.isSuccess) {
      userLogout();
      showAlert("success", "Sesión cerrada exitosamente");
      navigate("/login");
    } else {
      showAlert("error", "Ha ocurrido un error al cerrar la sesión");
    }
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
            <NavbarLogo />
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
                      textTransform: "capitalize",
                    }}
                    aria-haspopup="true"
                  >
                    {user?.username ? (
                      <>
                        <Typography sx={{fontSize: 18}}>{user?.username}</Typography>
                      </>
                    ) : (
                      <Stack
                        direction={"row"}
                        gap={1}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        <Typography sx={{fontSize: 18}}>{user?.name}</Typography>
                        <Typography sx={{fontSize: 18}}>{user?.lastname}</Typography>
                      </Stack>
                    )}
                    {user?.photo ? (
                      <Avatar
                        sx={{ width: 36, height: 36 }}
                        src={user?.photo}
                      />
                    ) : (
                      <Avatar
                        sx={{ width: 36, height: 36, backgroundColor: "white", border: "1px solid", borderColor: "primary.main" }}
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
                    <MenuIcon sx={{ width: 32, height: 32, color: "black" }} />
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
      </AppBar>
  );
}

export default Navbar;
