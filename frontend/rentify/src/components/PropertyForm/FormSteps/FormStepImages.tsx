import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, Typography } from "@mui/material";
import { UseFormWatch, FieldValues, FieldErrors, UseFormSetValue, UseFormClearErrors } from "react-hook-form";

interface Props {
  watch: UseFormWatch<FieldValues>,
  errors: FieldErrors<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  clearErrors: UseFormClearErrors<FieldValues>
}

export function FormStepImages({ watch, errors, setValue, clearErrors }: Props) {
  const watchPhotos = watch("multimedia");
  const handleInputFile = (event: React.ChangeEvent<HTMLInputElement> ) => {
    clearErrors()
    const files = Array.from(event.target.files ?? [])
    const newWatchPhotos = [...files, ...watchPhotos]
    setValue("multimedia", newWatchPhotos)
  }
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
              onChange={handleInputFile}
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
            {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.from(watchPhotos).map((foto: any, index) => {
              if (foto.name){
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
              } else {
                return <img
                key={index}
                src={foto?.url ? foto.url : ""}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxWidth: "200px",
                  height: "120px",
                  margin: "0 auto",
                }}
              />
              }
              
            })}
          </Box>
        )}
      </FormControl>
    </>
  );
}

export default FormStepImages;
