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
import { deleteProperty, getPropertiesByUserId } from "../../service/property/propertyService";
import { Property, PropertyCard } from "../../interfaces/Property";
import ArrowButton from "../../components/PropertyInfo/ArrowButton";
import {
  Add,
  ArrowBackIosNew,
  ArrowForwardIos,
  Email,
  Person,
  Phone,
} from "@mui/icons-material";
import MyPropertyCard from "../../components/PropertyCards/MyPropertyCard";

export function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [fullUser, setFullUser] = useState<User>();
  const [properties, setProperties] = useState<Property[]>();
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState<PropertyCard[]>();
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
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

  const handleDeleteProperty = async (id: number) => {
    const response = await deleteProperty(id);
    if (response.status === 204) {
      setIsLoading(true)
      setProperties([])
      setProperties(properties => properties?.filter(property => property.id === id))
      showAlert("success", "La propiedad ha sido eliminada exitosamente")
      setIsLoading(false)
    } else{
      showAlert("error", "Ha ocurrido un error al eliminar la propiedad")
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

  return (
    <Box sx={{ paddingY: {xs: 0, sm: 4} }}>
      <Paper
        elevation={3}
        sx={{ padding: {xs: 2, sm: 3, md: 4}, maxWidth: 1000, margin: "auto" }}
      >
        {/* Información del usuario */}
        <Stack spacing={3} alignItems="center" mt={2}>
          <Stack>
            {fullUser?.photo ? <Avatar
              alt={fullUser?.name}
              src={
                fullUser?.photo
              }
              sx={{width: 190, height: 190, margin: "auto", padding: 2 }}
            /> : 
            <Avatar
              alt={fullUser?.name}
              sx={{ width: 190, height: 190, margin: "auto", padding: 2 }}
              
          >
            <Person sx={{ width: 200, height: 200, margin: "auto" }}/>
            </Avatar>}
            
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
          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
            sx={{ alignItems: "center", marginTop: 2}}
          >
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
            >
              Mis Propiedades
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/register-property"
              sx={{width: "fit-content", padding: {xs: "4px 8px", sm: "8px 16px"}, minWidth: 0}}
            >
              <Typography sx={{display: {xs: "flex", sm: "none"}}}><Add/></Typography>
              <Typography sx={{display: {xs: "none", sm: "flex"}}}>Agregar Propiedad</Typography>
            </Button>
          </Stack>
          {properties && properties.length > 0 ? (
            <>
              <ArrowButton
                variant="text"
                action={prevPosition}
                sx={{
                  position: "absolute",
                  left: { xs: -16, md: -30 },
                  top: "50%",
                  bottom: 0,
                  height: "fit-content",
                }}
              >
                <ArrowBackIosNew sx={{ width: {xs:24, md:48}, height: {xs:24, md:48} }} />
              </ArrowButton>

              <Box
                overflow={"hidden"}
                display={"flex"}
                gap={4}
                sx={{ paddingX: { xs: 1, sm: 2, md: 4 }, paddingY: 3 }}
              >
                {visibleCards?.map((property, index) => (
                  <MyPropertyCard
                    property={property}
                    key={property.id}
                    index={index}
                    handleDeleteProperty={handleDeleteProperty}
                  />
                ))}
              </Box>

              <ArrowButton
                variant="text"
                action={nextPosition}
                sx={{
                  position: "absolute",
                  right: { xs: -16, md: -30 },
                  top: "50%",
                  bottom: 0,
                  height: "fit-content",
                }}
              >
                <ArrowForwardIos sx={{ width: {xs:24, md:48}, height: {xs:24, md:48} }} />
              </ArrowButton>
            </>
          ) : 
          <Typography textAlign={"center"}>No tienes ninguna propiedad</Typography>}
        </Box>
      </Paper>
      
    </Box>
  );
}

export default ProfilePage;
