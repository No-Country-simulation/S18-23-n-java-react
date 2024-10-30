import { Person, Email, Phone } from "@mui/icons-material";
import { Link, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropertyFeatures from "./PropertyFeatures";
import { AuthContext } from "../../context";
import { Owner } from "../../interfaces/Property";

interface Props {
  owner: Owner;
}

function PropertyOwner({ owner }: Props) {
  const { isUserLoggedIn } = useContext(AuthContext);

  const visibleName = !owner.username ? owner.name + " " + owner.lastname : owner.username

  return (
    <>
      {isUserLoggedIn ? (
        <Stack direction={"row"} gap={2} flexWrap={"wrap"} sx={{justifyContent: {xs: "center", lg: "start"}, width: {xs: "100%", lg: "auto"}}}>
          <PropertyFeatures
            FeatIcon={Person}
            label="Propietario"
            value={visibleName}
          />
          <PropertyFeatures
            FeatIcon={Phone}
            label="Teléfono"
            value={owner.phone}
          />
          <PropertyFeatures
            FeatIcon={Email}
            label="Correo Electrónico"
            value={owner.email}
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
