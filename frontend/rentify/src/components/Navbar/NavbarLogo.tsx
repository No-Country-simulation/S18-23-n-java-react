import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RentifyLogo from "../../assets/images/rentify-logo.png";

function NavbarLogo() {
  return (
    <Box
      sx={{
        letterSpacing: "1.5px",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      component={RouterLink}
      to={"/"}
    >
      <img src={RentifyLogo} alt="" width={40} height={40} />
      <Typography
        component={"p"}
        sx={{
          display: "flex",
          paddingLeft: 1,
          color: "secondary.main",
          fontSize: 24,
          fontWeight: "bold",
          paddingTop: "2px",
          letterSpacing: "0.4px",
        }}
      >
        Rent
        <Typography
          component={"span"}
          sx={{
            fontSize: 24,
            paddingTop: "5px",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          i
        </Typography>
        fy
      </Typography>
    </Box>
  );
}

export default NavbarLogo;
