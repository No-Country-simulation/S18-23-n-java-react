import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AlertContext, AuthContext } from "../../context";
import { getUserAuth } from "../../service/auth/authService";
import { User } from "../../interfaces/User";
import { getPropertiesByUserId } from "../../service/property/propertyService";
import { Property, PropertyCard } from "../../interfaces/Property";
import ArrowButton from "../../components/PropertyInfo/ArrowButton";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Email,
  Phone,
} from "@mui/icons-material";
import MyPropertyCard from "../../components/PropertyCards/MyPropertyCard";

function ProfilePage() {
  const { isUserLoggedIn, user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [fullUser, setFullUser] = useState<User>();
  const [properties, setProperties] = useState<Property[]>();
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState<PropertyCard[]>();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (properties) {
        if (position < properties.length - 1) {
          setPosition(position + 1);
        } else {
          setPosition(0);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [position, properties]);

  useEffect(() => {
    if (properties) {
      let carouselElements;
      if (properties?.length >= 3) {
        carouselElements = 3;
      } else {
        carouselElements = properties.length;
      }
      setVisibleCards(
        [...properties, ...properties].slice(
          position,
          position + carouselElements
        )
      );
    }
  }, [position, properties]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userResponse = await getUserAuth();
        if (userResponse.isSuccess && user) {
          const propertyResponse = await getPropertiesByUserId(user.id);
          setFullUser(userResponse.data);
          setProperties(propertyResponse);
          setIsLoading(false)
        } else {
          navigate("/");
          showAlert("error", "Ha ocurrido un error con su sesión");
        }
      } catch (error) {
        if (error) showAlert("error", "Ha ocurrido un error");
      }
    };
    getUserInfo().then();
  }, [navigate, showAlert, user]);

  const prevPosition = () => {
    if (properties) {
      if (position > 0) {
        setPosition(position - 1);
      } else {
        setPosition(properties.length - 1);
      }
    }
  };

  const nextPosition = () => {
    if (properties) {
      if (position < properties.length - 1) {
        setPosition(position + 1);
      } else {
        setPosition(0);
      }
    }
  };

  if (isLoading || !visibleCards)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "92vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!isUserLoggedIn) {
    navigate("/");
    return <Box></Box>;
  }

  return (
    <Box sx={{ paddingY: 4 }}>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", maxWidth: 1000, margin: "auto" }}
      >
        {/* Información del usuario */}
        <Stack spacing={3} alignItems="center" mt={2}>
          <Stack>
            <Avatar
              alt={fullUser?.name}
              src={
                "https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg"
              }
              sx={{ width: 200, height: 200, margin: "auto" }}
            />
          </Stack>
          <Stack gap={2}>
            <Typography variant="h5" textAlign={"center"}>
              {fullUser?.username
                ? `${fullUser.username}`
                : `${fullUser?.name} ${fullUser?.lastname}`}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Phone /> {fullUser?.phone}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Email /> {fullUser?.email}
            </Typography>
          </Stack>
        </Stack>

        {/* Botones */}
        <Box
          mt={3}
          display="flex"
          justifyContent="space-around"
          sx={{ marginX: 4 }}
        >
          <Button variant="outlined" color="primary">
            Editar Perfil
          </Button>
        </Box>
        <Box sx={{ position: "relative", padding: { xs: 1, md: 4 } }}>
          <Stack justifyContent={"space-between"} alignItems={"center"} sx={{marginBottom: 2, flexDirection: {xs: "column", sm: "row"}}}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              marginBottom={2}
            >
              Mis Propiedades
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/register-property"
            >
              Agregar Propiedad
            </Button>
          </Stack>

          <ArrowButton
            variant="text"
            action={prevPosition}
            sx={{
              position: "absolute",
              left: { xs: -40, md: -30 },
              top: "50%",
              bottom: 0,
              height: "fit-content",
            }}
          >
            <ArrowBackIosNew sx={{ width: 48, height: 48 }} />
          </ArrowButton>

          <Box overflow={"hidden"} display={"flex"} gap={4} sx={{paddingX: {xs: 1, sm: 2, md: 4}, paddingY: 3}}>
            {visibleCards?.map((property, index) => (
              <MyPropertyCard property={property} key={property.title} index={index} />
            ))}
          </Box>

          <ArrowButton
            variant="text"
            action={nextPosition}
            sx={{
              position: "absolute",
              right: { xs: -40, md: -30 },
              top: "50%",
              bottom: 0,
              height: "fit-content",
            }}
          >
            <ArrowForwardIos sx={{ width: 48, height: 48 }} />
          </ArrowButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfilePage;
