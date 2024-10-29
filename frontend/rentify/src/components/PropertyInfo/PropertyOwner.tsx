import { Person, Email, Phone } from "@mui/icons-material";
import { Link, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropertyFeatures from "./PropertyFeatures";
import { AuthContext } from "../../context";
import { Property } from "../../interfaces/Property";

interface Props {
  property: Property;
}

function PropertyOwner({ property }: Props) {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isUserLoggedIn ? (
        <Stack direction={"row"} gap={2} flexWrap={"wrap"} sx={{justifyContent: {xs: "center", lg: "start"}, width: {xs: "100%", lg: "auto"}}}>
          <PropertyFeatures
            FeatIcon={Person}
            label="Propietario"
            value={property.owner.name + " " + property.owner.lastname}
          />
          <PropertyFeatures
            FeatIcon={Phone}
            label="Teléfono"
            value={property.owner.phone}
          />
          <PropertyFeatures
            FeatIcon={Email}
            label="Correo Electrónico"
            value={property.owner.email}
          />
        </Stack>
      ) : (
        <Typography alignSelf={"center"} textAlign={"center"} variant="body2">
          <Link component={RouterLink} to={"/login"}>
            Inicia Sesión
          </Link>{" "}
          o{" "}
          <Link component={RouterLink} to={"/register"}>
            Regístrate
          </Link>{" "}
          para conocer los datos de contacto del propietario
        </Typography>
      )}
    </>
  );
}

export default PropertyOwner;
