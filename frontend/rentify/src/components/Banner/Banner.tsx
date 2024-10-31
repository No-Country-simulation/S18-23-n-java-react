import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1697462248006-662f35b913ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Bienvenido a Rentify
      </Typography>
      <Typography variant="h5" component="p" gutterBottom marginTop={5}>
        Encuentra la casa o apartamento perfecto para ti.
      </Typography>
      <Button variant="contained" color="primary" size="large" component={RouterLink} to={"/explore"}>
        Explorar Propiedades
      </Button>
    </Box>
  );
};

export default Banner;