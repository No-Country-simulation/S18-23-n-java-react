import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, Fade, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ArrowButton from "./ArrowButton";
import { Multimedia } from "../../interfaces/Property";

interface Props {
  images: Multimedia[];
}

function PropertyCarousel({ images }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    if (activeStep < images.length - 1) {
      setActiveStep((step) => step + 1);
    } else {
      setActiveStep(0);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((step) => step - 1);
    } else {
      setActiveStep(images.length - 1);
    }
  };
  return (
    <Paper
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: 4,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          position: "relative",
        }}
      >
        {images.map(({id, url}) => (
          <Fade
            in={id === activeStep}
            style={{
              display: id === activeStep ? "flex" : "none",
              transitionDuration: "600ms",
            }}
            key={url}
          >
            <Box
              component={"img"}
              src={url}
              height={"60vw"}
              width={"100%"}
              style={{
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                maxHeight: "600px",
              }}
              alt=""
            />
          </Fade>
        ))}
        <ArrowButton
          variant="text"
          action={handlePrevStep}
          sx={{ position: "absolute", left: 10 }}
        >
          <ArrowBackIosNew sx={{ width: 48, height: 48 }} />
        </ArrowButton>
        <ArrowButton
          variant="text"
          action={handleNextStep}
          sx={{ position: "absolute", right: 10 }}
        >
          <ArrowForwardIos sx={{ width: 48, height: 48 }} />
        </ArrowButton>
      </Box>
      <Typography textAlign={"center"}>
        {activeStep + 1} / {images.length}
      </Typography>
    </Paper>
  );
}

export default PropertyCarousel;
