import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, Typography } from "@mui/material";
import { UseFormWatch, FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  watch: UseFormWatch<FieldValues>,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
}

export function FormStepImages({ watch, register, errors }: Props) {
  const watchPhotos = watch("multimedia");
  return (
    <>
      <FormControl>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
          <Typography variant="body2" fontWeight={"bold"} marginY={1} textAlign={"center"}>
            Fotos de la Propiedad:
          </Typography>
          <Button
            component={"label"}
            variant="contained"
            sx={{ display: "flex", alignItems:"center", gap: 1, alignSelf:"center"}}
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
            Añadir Foto <PhotoCamera/>
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
    </>
  );
}

export default FormStepImages;
