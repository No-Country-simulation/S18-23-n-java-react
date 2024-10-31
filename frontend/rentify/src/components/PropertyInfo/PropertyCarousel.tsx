import { ArrowBackIosNew, ArrowForwardIos, HideImage } from "@mui/icons-material";
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
        {images.length > 0 ? (
          images.map(({ url }, id) => (
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
                alt="Agua"
              />
            </Fade>
          ))
        ) : (
          <Box
            sx={{
              height: "60vw",
              width: "100%",
              backgroundColor: "#f0f0f0",
              maxHeight: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1
            }}
          >
            <HideImage />
            <Typography> Sin imagen</Typography>
          </Box>
        )}
        {images.length > 0 && (
          <ArrowButton
            variant="text"
            action={handlePrevStep}
            sx={{ position: "absolute", left: 10 }}
          >
            <ArrowBackIosNew sx={{ width: 48, height: 48 }} />
          </ArrowButton>
        )}
        {images.length > 0 && (
          <ArrowButton
            variant="text"
            action={handleNextStep}
            sx={{ position: "absolute", right: 10 }}
          >
            <ArrowForwardIos sx={{ width: 48, height: 48 }} />
          </ArrowButton>
        )}
      </Box>
      <Typography textAlign={"center"}>
        {images.length > 0 ? activeStep + 1 : 0} / {images.length}
      </Typography>
    </Paper>
  );
}

export default PropertyCarousel;
