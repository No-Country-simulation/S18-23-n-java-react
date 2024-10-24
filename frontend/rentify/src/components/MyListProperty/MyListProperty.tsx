import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import axios from 'axios';

interface Propiedad {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
}

const MyListProperty: React.FC = () => {
    const [propiedades, setPropiedades] = useState<Propiedad[]>([]);

    useEffect(() => {
        // aqui deberia llamar a la API del backend para obtener las propiedades
        const fetchPropiedades = async () => {
            try {
                const response = await axios.get('/api/propiedades'); // en teoria aqui va URL del backend
                setPropiedades(response.data);
            } catch (error) {
                console.error('Error fetching propiedades:', error);
            }
        };

        fetchPropiedades();
    }, []);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Mis Propiedades
            </Typography>
            <Grid container spacing={4}>
                {propiedades.map((propiedad) => (
                    <Grid item xs={12} sm={6} md={4} key={propiedad.id}>
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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyListProperty; 
