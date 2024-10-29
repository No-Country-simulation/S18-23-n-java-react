import { SvgIconComponent } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";

interface Props {
  FeatIcon: SvgIconComponent;
  label: string;
  value: string | number;
}

function PropertyFeatures({ FeatIcon, label, value }: Props) {
  return (
    <Paper
      sx={{
        padding: "10px 20px",
        boxShadow: 2,
        width: {xs: "70%", sm: "auto"},
        maxWidth: "220px"
      }}
    >
      <Stack gap={1} alignItems={"center"}>
        <FeatIcon sx={{ width: 28, height: 28 }} />
        <Typography variant="body1">{label}</Typography>
        <Typography variant="body1" fontWeight={"bold"}>{value}</Typography>
      </Stack>
    </Paper>
  );
}

export default PropertyFeatures;
