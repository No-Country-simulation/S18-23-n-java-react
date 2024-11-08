import { Box, Container, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AlertContext, AuthContext } from "../../context";
import uploadImages from "../../service/images/cloudinaryService";
import {
  createProperty,
  updateProperty,
} from "../../service/property/propertyService";
import {
  Property,
  RoomTypes,
  UpdatePropertyKeys,
} from "../../interfaces/Property";
import { useNavigate } from "react-router-dom";
import {
  FormStepGeneral,
  FormStepLocation,
  FormStepDetails,
  FormStepFeatures,
  FormStepAmenities,
  FormStepRooms,
  FormStepImages,
  FormStepper,
} from "./FormSteps";

interface Props {
  modifyProperty?: Property;
  setIsLoadingForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PropertyForm = ({ modifyProperty, setIsLoadingForm }: Props) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
    setValue,
    setError,
    clearErrors,
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
      amenities: [],
      features: [],
      numberOfRooms: 0,
      rooms: [],
      ownerId: 0,
    },
  });

  useEffect(() => {
    const roomNamesById = {
      Dormitorio: 1,
      Baño: 2,
      Cocina: 3,
      Comedor: 4,
      "Sala de estar": 5,
      Estudio: 6,
      Lavadero: 7,
      Vestidor: 8,
      Oficina: 9,
      Balcón: 10,
      Terraza: 11,
      Garaje: 12,
      Sótano: 13,
      Ático: 14,
      Jardín: 15,
      "Cuarto de servicio": 16,
      Patio: 17,
    };
    if (modifyProperty) {
      Object.keys(modifyProperty).forEach(async (name) => {
        if (name === "amenities") {
          const amenities = modifyProperty["amenities"].map(
            (amenity) => amenity.id
          );
          setSelectedAmenities(amenities);
        } else if (name === "features") {
          const features = modifyProperty["features"].map(
            (feature) => feature.id
          );
          setSelectedFeatures(features);
        } else if (name === "rooms") {
          const rooms = modifyProperty["rooms"].map((room) => ({
            quantity: String(room.quantity),
            id: roomNamesById[room.roomName as RoomTypes],
          }));
          setSelectedRooms(rooms);
        } else {
          setValue(name, modifyProperty[name as UpdatePropertyKeys]);
        }
      });
    }
  }, [modifyProperty, setValue]);

  const { showAlert } = useContext(AlertContext);
  const [selectedRooms, setSelectedRooms] = useState<
    { id: number; quantity: string }[]
  >([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const onSubmit = async (data: FieldValues) => {
    setIsLoadingForm(true);
    try {
      data.rooms = selectedRooms;
      data.amenities = selectedAmenities;
      data.features = selectedFeatures;
      data.antiquity = "BRAND_NEW";
      data.ownerId = user?.id;
      data.numberOfRooms = 0;
      selectedRooms?.forEach(({ quantity }) => {
        data.numberOfRooms += Number(quantity);
      });
      const imageFiles: File[] = [];
      data.multimedia = data.multimedia.filter((image: { url?: string }) => {
        if (image.url) return { url: image.url, type: "IMAGE" };
        else {
          imageFiles.push(image as File);
        }
      });
      if (imageFiles.length > 0) {
        const imagesResponse = await uploadImages(imageFiles);
        const imagesUrl = imagesResponse.map((image) => {
          return { url: image, type: "IMAGE" };
        });
        data.multimedia = [...data.multimedia, ...imagesUrl];
      }

      if (!modifyProperty) {
        const response = await createProperty(data as Property);
        if (!response.errors) {
          showAlert("success", "Se ha guardado la propiedad");
          navigate("/profile");
        } else {
          response.errors.forEach((error: string) => {
            showAlert("error", error);
          });
        }
      } else {
        const response = await updateProperty(
          data as Property,
          modifyProperty.id
        );
        if (!response.errors) {
          showAlert(
            "success",
            "Se han actualizado correctamente los datos de la propiedad"
          );
          navigate("/profile");
        } else {
          response.errors.forEach((error: string) => {
            showAlert("error", error);
          });
          setIsLoadingForm(false);
        }
      }
    } catch (error) {
      if (error) setIsLoadingForm(false);
    }
  };

  const stepsComponents = [
    <FormStepGeneral key={"1"} control={control} />,
    <FormStepLocation key={"2"} control={control} />,
    <FormStepDetails key={"3"} control={control} />,
    <FormStepFeatures
      key={"4"}
      selectedFeatures={selectedFeatures}
      setSelectedFeatures={setSelectedFeatures}
    />,
    <FormStepAmenities
      key={"5"}
      selectedAmenities={selectedAmenities}
      setSelectedAmenities={setSelectedAmenities}
    />,
    <FormStepRooms
      key={"6"}
      selectedRooms={selectedRooms}
      setSelectedRooms={setSelectedRooms}
    />,
    <FormStepImages
      key={"7"}
      watch={watch}
      setValue={setValue}
      errors={errors}
      clearErrors={clearErrors}
    />,
  ];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Container
      sx={{
        minHeight: "84vh",
        display: "flex",
        marginY: { xs: 2, md: 4 },
      }}
    >
      <Paper
        sx={{
          margin: "0 auto",
          boxShadow: 10,
          paddingBottom: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          position: "relative",
        }}
      >
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{
            marginBottom: { xs: 1, sm: 2 },
            backgroundColor: "primary.main",
            paddingY: 1,
            borderRadius: 2,
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        >
          {modifyProperty ? "Modificar Propiedad" : "Registrar Propiedad"}
        </Typography>
        <Box component={"form"} sx={{ height: "100%" }}>
          {stepsComponents.map((step, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: activeStep === index ? "flex" : "none",
                  flexDirection: "column",
                  gap: 4,
                  height: "100%",
                  paddingX: { xs: 2, sm: 4 },
                  paddingY: 1,
                }}
              >
                {step}
              </Box>
            );
          })}
        </Box>
        <FormStepper
          activeStep={activeStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setActiveStep={setActiveStep}
          stepsComponents={stepsComponents}
          trigger={trigger}
          watch={watch}
          setError={setError}
        />
      </Paper>
    </Container>
  );
};

export default PropertyForm;
