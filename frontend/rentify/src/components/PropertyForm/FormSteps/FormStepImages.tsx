import { Close, PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import {
  UseFormWatch,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";

interface Props {
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export function FormStepImages({
  watch,
  errors,
  setValue,
  clearErrors,
}: Props) {
  const watchPhotos = watch("multimedia");
  const handleInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
    const files = Array.from(event.target.files ?? []);
    const newWatchPhotos = [...files, ...watchPhotos];
    setValue("multimedia", newWatchPhotos);
  };
  const handleDeleteImage = (deletePhoto: File | {url: string}) => {
    const actualPhotos = watchPhotos.filter((img: File | {url: string} ) => img !== deletePhoto)
    setValue("multimedia", actualPhotos);
  }
  return (
    <>
      <FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={"bold"}
            marginY={1}
            textAlign={"center"}
          >
            Fotos de la Propiedad:
          </Typography>
          <Button
            component={"label"}
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              alignSelf: "center",
            }}
          >
            <input
              type="file"
              style={{ visibility: "hidden", width: "1px" }}
              multiple
              onChange={handleInputFile}
            />
            Añadir Foto <PhotoCamera />
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
                if (foto.name) {
                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "fit-content",
                        margin: "0 auto",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(foto as File)}
                        alt={`Imagen #${index + 1}`}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          maxWidth: "180px",
                          height: "120px",
                          margin: "0 auto",
                        }}
                      />
                      <Button
                      onClick={() => handleDeleteImage(foto)}
                        sx={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          padding: 0.5,
                          margin: 0,
                          backgroundColor: "red",
                          borderRadius: "50%",
                          minWidth: 0,
                          "&:hover": {
                            backgroundColor: "#c20404",
                          },
                        }}
                      >
                        <Close sx={{ width: 16, height: 16, color: "white" }} />
                      </Button>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "fit-content",
                        margin: "0 auto",
                      }}
                    >
                      <img
                        src={foto?.url ? foto.url : ""}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          maxWidth: "180px",
                          height: "120px",
                          margin: "0 auto",
                        }}
                      />
                      <Button
                      onClick={() => handleDeleteImage(foto)}
                        sx={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          padding: 0.5,
                          margin: 0,
                          backgroundColor: "red",
                          borderRadius: "50%",
                          minWidth: 0,
                          "&:hover": {
                            backgroundColor: "#c20404",
                          },
                        }}
                      >
                        <Close sx={{ width: 16, height: 16, color: "white" }} />
                      </Button>
                    </Box>
                  );
                }
              })
            }
          </Box>
        )}
      </FormControl>
    </>
  );
}

export default FormStepImages;
