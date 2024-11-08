import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: 6,
        marginTop: 5
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2" color="inherit">
              Rentify es tu mejor opción para encontrar la casa o apartamento perfecto.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" color="inherit">
              Avenida Corrientes 123, Buenos Aires, Argentina
            </Typography>
            <Typography variant="body2" color="inherit">
              Email: contacto@rentify.com
            </Typography>
            <Typography variant="body2" color="inherit">
              Teléfono: +123 456 7890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Síguenos
            </Typography>
            <IconButton color="inherit" href="https://www.facebook.com">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://www.twitter.com">
              <Twitter />
            </IconButton>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://rentify-desarrollo.onrender.com/">
              Rentify
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;