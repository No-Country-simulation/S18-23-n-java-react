import { ArrowBackIosNew, Check, ArrowForwardIos } from "@mui/icons-material";
import { MobileStepper, Button, Typography } from "@mui/material";
import {
  UseFormTrigger,
  FieldValues,
  UseFormHandleSubmit,
  UseFormWatch,
  UseFormSetError,
} from "react-hook-form";

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  stepsComponents: JSX.Element[];
  trigger: UseFormTrigger<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: (data: FieldValues) => Promise<void>;
  watch: UseFormWatch<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

const stepValidate = {
  0: ["title", "description", "propertyType", "price"],
  1: ["country", "province", "city", "streetNumber", "streetName"],
  2: ["antiquity", "builtArea", "totalArea"],
  3: ["title", "description", "propertyType", "price"],
  4: ["title", "description", "propertyType", "price"],
  5: ["title", "description", "propertyType", "price"],
  6: ["multimedia"],
};

export function FormStepper({
  activeStep,
  setActiveStep,
  stepsComponents,
  trigger,
  handleSubmit,
  onSubmit,
  watch,
  setError,
}: Props) {
  const nextStep = async () => {
    if (activeStep < stepsComponents.length) {
      const validate = await trigger(
        stepValidate[activeStep as 0 | 1 | 2 | 3 | 4 | 5 | 6]
      );
      if (validate) setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const validateForm = async (data: FieldValues) => {
    const images = watch("multimedia");
    if (images.length > 0) {
      onSubmit(data);
    } else {
      setError("multimedia", {
        type: "manual",
        message: "Por favor, agregue al menos una imagen de su propiedad",
      });
    }
  };
  return (
    <MobileStepper
      activeStep={activeStep}
      steps={stepsComponents.length}
      variant="dots"
      position="static"
      sx={{ backgroundColor: "transparent", paddingX: { xs: 2, sm: 4 } }}
      backButton={
        <>
          <Button
            variant="contained"
            onClick={prevStep}
            type="button"
            disabled={activeStep === 0}
          >
            <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
              Atrás
            </Typography>
            <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
              <ArrowBackIosNew sx={{ width: 18, height: 18 }} />
            </Typography>
          </Button>
        </>
      }
      nextButton={
        activeStep === stepsComponents.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit(validateForm)}
            type="submit"
          >
            <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
              Guardar
            </Typography>
            <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
              <Check sx={{ width: 20, height: 20 }} />
            </Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={nextStep}
            type="button"
            sx={{ minWidth: "auto" }}
          >
            <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
              Siguiente
            </Typography>
            <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
              <ArrowForwardIos sx={{ width: 18, height: 18 }} />
            </Typography>
          </Button>
        )
      }
    />
  );
}

export default FormStepper;
