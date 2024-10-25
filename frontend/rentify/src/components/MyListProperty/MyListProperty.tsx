import { useEffect, useState } from 'react';
import {  Card, CardContent, Typography, CardMedia, Box, Stack } from '@mui/material';

import axios from 'axios';

interface Propiedad {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
}

const MyListProperty: React.FC = () => {
    const [propiedades, setPropiedades] = useState<Propiedad[]>([{id:0,titulo: "Las Condes",descripcion:"mmmmmmmmmm", imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_792050-MLC78020470920_082024-F.webp"}]);

    // useEffect(() => {
    //     // aqui deberia llamar a la API del backend para obtener las propiedades
    //     const fetchPropiedades = async () => {
    //         try {
    //             const response = await axios.get('/api/propiedades'); // en teoria aqui va URL del backend
    //             setPropiedades(response.data);
    //         } catch (error) {
    //             console.error('Error fetching propiedades:', error);
    //         }
    //     };

    //     fetchPropiedades();
    // }, []);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Mis Propiedades
            </Typography>
            <Stack>
                {propiedades.map((propiedad) => (
                    <Stack  key={propiedad.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={propiedad.imagen}
                                alt={propiedad.titulo}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {propiedad.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {propiedad.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default MyListProperty; 
