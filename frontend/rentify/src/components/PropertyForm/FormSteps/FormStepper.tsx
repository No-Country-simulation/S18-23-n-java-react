import { ArrowBackIosNew, Check, ArrowForwardIos } from "@mui/icons-material";
import { MobileStepper, Button, Typography } from "@mui/material";
import { UseFormTrigger, FieldValues, UseFormHandleSubmit } from "react-hook-form";

interface Props {
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    stepsComponents: JSX.Element[]
    trigger: UseFormTrigger<FieldValues>
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    onSubmit: (data: FieldValues) => Promise<void>
}

export function FormStepper({activeStep, setActiveStep, stepsComponents, trigger, handleSubmit, onSubmit}: Props) {
  const nextStep = async () => {
    if (activeStep < stepsComponents.length) {
      const validate = await trigger();
      if (validate) setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
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
            onClick={handleSubmit(onSubmit)}
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
