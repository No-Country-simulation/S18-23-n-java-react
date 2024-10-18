import Typography from "@mui/material/Typography";
import CardTestimony from "./components/CardTestimony";
import { Box } from "@mui/material";

const Testimonials = () => {
  return(
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Testimonios
      </Typography>
      <Box 
        marginTop={2}
        display="flex"
        justifyContent="space-between"
      >
        <CardTestimony
          url="https://thumbs.dreamstime.com/b/retrato-de-una-hembra-joven-contenido-en-la-ronda-glassed-mostrando-lengua-y-juguet%C3%B3namente-mirando-persona-feliz-satisfecha-204177709.jpg"
          fullName="Sarah Berd"
          occupation="Arrendatario"
          opinion="La plataforma de rentify me permitio conseguir inquilos con un mejor precio que otras plataformas existentes"
        />
        <Box>
          <Box padding={2}></Box>
          <CardTestimony
            url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_a9I-AkqF9EXOPbRQ5LLQT8jYvQClcycWQ&s"
            fullName="Johan Ramos"
            occupation="Residente"
            opinion="El proceso fue sencillo y rápido, lo cual hizo que la experiencia de encontrar un nuevo hogar fuera mucho más fácil"
          />
        </Box>
        <CardTestimony
          url="https://meragor.com/files/styles//220_220_bottom_wm/avatar-212000-002246.png"
          fullName="Martin Matienzo"
          occupation="Arrendatario"
          opinion="La plataforma de rentify me permitio conseguir inquilos con un mejor precio que otras plataformas existentes"
        />
      </Box>
    </div>
  );
}

export default Testimonials