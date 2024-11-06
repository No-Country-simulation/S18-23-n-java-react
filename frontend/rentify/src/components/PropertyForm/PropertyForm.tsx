import { Box, Container, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AlertContext, AuthContext } from "../../context";
import uploadImages from "../../service/images/cloudinaryService";
import { createProperty } from "../../service/property/propertyService";
import { Property } from "../../interfaces/Property";
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

const PropertyForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    trigger,
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

  const { showAlert } = useContext(AlertContext);
  const [selectedRooms, setSelectedRooms] = useState<
    { id: number; quantity: string }[]
  >([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const onSubmit = async (data: FieldValues) => {
    const images = await uploadImages(data.multimedia);
    data.multimedia = images.map((image) => {
      return { url: image, type: "IMAGE" };
    });
    data.rooms = selectedRooms;
    data.amenities = selectedAmenities;
    data.features = selectedFeatures;
    data.antiquity = "BRAND_NEW";
    data.ownerId = user?.id;
    data.numberOfRooms = 0;
    selectedRooms?.forEach(({ quantity }) => {
      data.numberOfRooms += quantity;
    });
    const response = await createProperty(data as Property);
    if (!response.errors) {
      showAlert("success", "Se ha guardado la propiedad");
      navigate("/profile");
    } else {
      response.errors.forEach((error: string) => {
        showAlert("error", error);
      });
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
      register={register}
      errors={errors}
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
          Registrar Propiedad
        </Typography>
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            height: "100%",
            paddingX: { xs: 2, sm: 4 },
            paddingY: 1,
          }}
        >
          {stepsComponents.map((step, index) => {
            if (activeStep === index) return step;
          })}
        </Box>
        <FormStepper
          activeStep={activeStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setActiveStep={setActiveStep}
          stepsComponents={stepsComponents}
          trigger={trigger}
        />
      </Paper>
    </Container>
  );
};

export default PropertyForm;
