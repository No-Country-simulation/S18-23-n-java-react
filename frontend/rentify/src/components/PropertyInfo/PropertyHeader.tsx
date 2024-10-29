import { Box, Typography } from "@mui/material";
import { Property } from "../../interfaces/Property";

interface Props {
  property: Property;
}

function PropertyHeader({ property }: Props) {
  return (
    <Box component={"header"} sx={{ mb: 2 }}>
      <Typography variant="h4">{property.title}</Typography>
      <Typography variant="subtitle1" fontSize={"24px"} color="primary">{property.price} USD</Typography>
    </Box>
  );
}

export default PropertyHeader;
