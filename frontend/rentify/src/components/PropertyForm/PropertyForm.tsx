import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormInputText from "./FormComponents/FormInputText";
import InputSelect from "./FormComponents/InputSelect";
import { AlertContext, AuthContext } from "../../context";
import FormTextArea from "./FormComponents/FormTextArea";
import uploadImages from "../../service/images/cloudinaryService";
import CheckboxWithInput from "./CheckboxWithInput";
import CheckboxWithId from "./CheckboxWithId";
import { createProperty } from "../../service/property/propertyService";
import { Property } from "../../interfaces/Property";
import { useNavigate } from "react-router-dom";

const PropertyForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      propertyType: "APARTMENT",
      totalArea: 0,
      builtArea: 0,
      streetName: "",
      streetNumber: "",
      country: "",
      yearsOfAntiquity: 0,
      city: "",
      province: "",
      price: 0,
      antiquity: "BRAND_NEW",
      maintenanceFees: 0,
      status: "AVAILABLE",
      multimedia: [],
    },
  });

  const watchPhotos = watch("multimedia");
  const { showAlert } = useContext(AlertContext);
  const [selectedRooms, setSelectedRooms] = useState<
    { id: number; quantity: string }[]
  >([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const navigate = useNavigate()

  const {user} = useContext(AuthContext)

  const onSubmit = async (data: FieldValues) => {
    const images = await uploadImages(data.multimedia);
    data.multimedia = images.map((image) => {
      return { url: image, type: "IMAGE" };
    });
    data.rooms = selectedRooms;
    data.amenities = selectedAmenities;
    data.features = selectedFeatures;
    data.antiquity = "BRAND_NEW"
    data.ownerId = user?.id
    data.numberOfRooms = selectedRooms.length
    try {
      await createProperty(data as Property);
      showAlert("success", "Se ha guardado la propiedad");
      navigate("/profile")
    } catch (error) {
      showAlert("error", "Ha ocurrido un error al guardar la propiedad")
      console.log(error)
    }


  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        marginY: { xs: 2, md: 4 },
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
            <FormInputText name={"title"} control={control} label={"Titulo"} />
          </FormControl>
          <FormControl>
            <FormTextArea
              name={"description"}
              control={control}
              label={"Descripción"}
            />
          </FormControl>
          <FormControl>
            <InputSelect
              name="propertyType"
              label="Tipo de Propiedad"
              control={control}
              rules={{}}
              options={[
                { label: "Apartamento", value: "APARTMENT" },
                { label: "Casa", value: "HOUSE" },
                { label: "Casa Vacacional", value: "VACATION_HOME" },
                { label: "Oficina Comercial", value: "COMMERCIAL_OFFICE" },
                { label: "Almacen", value: "WAREHOUSE" },
                { label: "Finca", value: "FARM" },
              ]}
            />
          </FormControl>

          <FormControl>
            <FormInputText name={"country"} control={control} label={"País"} />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"province"}
              control={control}
              label={"Provincia"}
            />
          </FormControl>

          <FormControl>
            <FormInputText name={"city"} control={control} label={"Ciudad"} />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"streetName"}
              control={control}
              label={"Nombre de la Calle"}
            />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"streetNumber"}
              control={control}
              label={"Número de la Calle"}
            />
          </FormControl>

          <FormControl>
            <FormInputText
              type="number"
              name={"yearsOfAntiquity"}
              control={control}
              label={"Años de Antigüedad"}
            />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"totalArea"}
              control={control}
              label={"Área total de la propiedad"}
              additionalText="m²"
              type="number"
            />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"builtArea"}
              control={control}
              label={"Área construída de la propiedad"}
              additionalText="m²"
              type="number"
            />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"price"}
              control={control}
              label={"Precio"}
              type="number"
            />
          </FormControl>
          <FormControl>
            <Typography variant="body2" fontWeight={"bold"} marginBottom={2}>
              Indique las habitaciones de la propiedad y su cantidad
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                rowGap: 1,
                columnGap: 4,
              }}
            >
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Dormitorio"
                name={1}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Baño"
                name={2}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Cocina"
                name={3}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Comedor"
                name={4}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Sala de Estar"
                name={5}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Estudio"
                name={6}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Lavadero"
                name={7}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Vestidor"
                name={8}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Oficina"
                name={9}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Balcón"
                name={10}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Terraza"
                name={11}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Garaje"
                name={12}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Sótano"
                name={13}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Ático"
                name={14}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Jardín"
                name={15}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Cuarto de Servicio"
                name={16}
              />
              <CheckboxWithInput
                container={setSelectedRooms}
                label="Patio"
                name={17}
              />
            </Box>
          </FormControl>

          <FormControl>
            <Typography variant="body2" fontWeight={"bold"} marginBottom={2}>
              Seleccione alguna de las características que coincidan para su
              propiedad
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                rowGap: 1,
                columnGap: 4,
              }}
            >
              <CheckboxWithId
                container={setSelectedFeatures}
                label="Apto Profesional"
                id={1}
              />
              <CheckboxWithId
                container={setSelectedFeatures}
                label="Acceso para personas con discapacidad"
                id={2}
              />
              <CheckboxWithId
                container={setSelectedFeatures}
                label="Uso Comercial"
                id={3}
              />
              <CheckboxWithId
                container={setSelectedFeatures}
                label="Permite mascotas"
                id={4}
              />
            </Box>
          </FormControl>

          <FormControl>
            <Typography variant="body2" fontWeight={"bold"} marginBottom={2}>
              Seleccione aquellas comodidades que posee su propiedad
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                rowGap: 1,
                columnGap: 4,
              }}
            >
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Aire Acondicionado"
                id={1}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Gimnasio"
                id={2}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Hidromasaje"
                id={3}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Solarium"
                id={4}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Pileta"
                id={5}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Sala de Juegos"
                id={6}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Parrilla"
                id={7}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Sum"
                id={8}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Cocina equipada"
                id={9}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Ascensor"
                id={10}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Quincho"
                id={11}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Laundry"
                id={12}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Internet"
                id={13}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Wi-fi"
                id={14}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Horno"
                id={15}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Microondas"
                id={16}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Calefacción"
                id={17}
              />
              <CheckboxWithId
                container={setSelectedAmenities}
                label="Sauna"
                id={18}
              />
            </Box>
          </FormControl>

          <FormControl>
            <Box>
              <Typography variant="body2" fontWeight={"bold"} marginBottom={1}>
                Fotos de la Propiedad:
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
                  {...register("multimedia", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
                Añadir Foto
              </Button>
              {errors.multimedia && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.multimedia.message as string}
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
                        width: "100%",
                        maxWidth: "200px",
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
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            Guardar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PropertyForm;
