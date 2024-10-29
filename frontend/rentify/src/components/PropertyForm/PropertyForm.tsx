import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
  Alert,
  Link
} from "@mui/material";
import React, { useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormInputText from "./FormComponents/FormInputText";
import FormSelect from "./FormComponents/FormSelect";
import { useState } from "react";
import { AlertContext } from "../../context";


const PropertyForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    linkText = 'Ver propiedad',
    linkHref
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      apellido: "",
      tipoDePropiedad: "casa",
      pais: "",
      ciudad: "",
      direccion: "",
      dormitorios:"",
      baños: "",
      mts2:"",
      estacionamiento:"",
      fotos: [],
    },
  });

  const [guardado, setGuardado] = useState (false);
  const watchPhotos = watch("fotos");
  const {showAlert} = useContext(AlertContext)

  const onSubmit = (data: FieldValues) => {
    data.fotos = Array.from(data.fotos);
    console.log(data);
    showAlert("success","Se ha guardado la propiedad") 
    setGuardado(true);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor
  };

  
  const manejarSubmit=()=>{
    showAlert("success","Se ha guardado la propiedad") 
    setGuardado(true)
  };
  

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        marginY: { xs: 2, sm: 1, md: 0 },
      }}
    >
      <Paper
        sx={{
          margin: "0 auto",
          boxShadow: 10,
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          sx={{
            fontSize: "clamp(1.8rem, 8vw, 2rem)",
            marginBottom: { xs: 3, sm: 4 },
          }}
        >
          Datos de la Propiedad
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <FormControl>
            <FormInputText name={"nombre"} control={control} label={"Nombre"} />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"apellido"}
              control={control}
              label={"Apellido"}
            />
          </FormControl>

          <FormControl>
            <FormSelect
              name="tipoDePropiedad"
              label="Tipo de Propiedad"
              control={control}
              options={[
                { label: "Casa", value: "casa" },
                { label: "Departamento", value: "departamento" },
              ]}
            />
          </FormControl>

          <FormControl>
            <FormInputText name={"pais"} control={control} label={"País"} />
          </FormControl>

          <FormControl>
            <FormInputText name={"provincia"} control={control} label={"Provincia"} />
          </FormControl>

          <FormControl>
            <FormInputText name={"ciudad"} control={control} label={"Ciudad"} />
          </FormControl>

          <FormControl>
            <FormInputText  name={"calle"} control={control} label={"Calle"}  />
          </FormControl>

          <FormControl>
            <FormInputText name={"numero"} control={control} label={"Numero"} />
          </FormControl>

          <FormControl>
            <FormInputText name={"antiguedad"} control={control} label={"Antiguedad"} />
          </FormControl>

          <FormControl>
            <FormInputText name={"Area total"} control={control} label={"Mts2 Totales"} />                        
          </FormControl>

          <FormControl>
            <FormInputText name={"Area constrida"} control={control} label={"Mts2 construidos"} />            
          </FormControl>



          <FormControl> 
            <FormInputText
              name={"dormitorios"}
              control={control}
              label={"Dormitorios"}
            />
          </FormControl>
          <FormControl>
            <FormInputText
              name={"baños"}
              control={control}
              label={"Baños"}
            />
          </FormControl>
          <FormControl>
            <FormInputText
              name={"estacionamientos"}
              control={control}
              label={"Estacionamientos"}
            />
          </FormControl>

          <FormControl>
            <FormInputText name={"precio"} control={control} label={"Precio"} />                        
          </FormControl>

          <FormControl>
            <FormInputText name={"Titulo"} control={control} label={"Titulo"} />                      
          </FormControl>


          <FormControl>
            <TextField 
              name={"descripcion"}
              control={control}
              label={"Descripción"}
              maxLength={500}
              multiline
              rowsMax={5} 

            />
          </FormControl>
          
          <FormControl>
            <Box>
              <Typography variant="body2" marginBottom={1}>
                Fotos (máximo 12):
              </Typography>
              <Button
                component={"label"}
                variant="contained"
                sx={{ alignSelf: "start" }}
              >
                <input
                  type="file"
                  style={{ visibility: "hidden", width: "1px" }}
                  multiple
                  {...register("fotos", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
                Añadir Foto
              </Button>
              {errors.fotos && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.fotos.message as string}
                </FormHelperText>
              )}
            </Box>

            {watchPhotos?.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                  gap: 2,
                  paddingTop: 4,
                }}
              >
                {Array.from(watchPhotos).map((foto, index) => {
                  return (
                    <img
                      key={index}
                      src={URL.createObjectURL(foto as File)}
                      style={{
                        objectFit: "cover",
                        width: "120px",
                        height: "120px",
                        margin: "0 auto",
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </FormControl>

          <Button 
          variant="contained" onClick={handleSubmit(onSubmit)} type="submit">
            Guardar           
          </Button>
          {guardado && (<Alert severity="success" onClose={()=>setGuardado(false)} className="mt-5">PROPIEDAD GUARDADA CON EXITO!</Alert>)} <Link href={linkHref} target="_blank" rel="noopener">
            {linkText}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default PropertyForm;
