import { Box, Typography } from "@mui/material";
import { Property } from "../../interfaces/Property";

interface Props {
  property: Property;
}

function PropertyHeader({ property }: Props) {
  return (
    <Box component={"header"} sx={{ mb: 2 }}>
      <Typography variant="h4">{property.title}</Typography>
      <Typography variant="subtitle1" color="primary">${property.price}</Typography>
    </Box>
  );
}

export default PropertyHeader;
