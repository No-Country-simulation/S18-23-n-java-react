import { Box, FormControl, Typography } from "@mui/material";
import CheckboxWithId from "../PropertyInputs/CheckboxWithId";

interface Props {
  selectedFeatures: number[]
  setSelectedFeatures: React.Dispatch<React.SetStateAction<number[]>>
}

const features = [
  { label: "Apto Profesional", id: 1 },
  { label: "Acceso para personas con discapacidad", id: 2 },
  { label: "Uso Comercial", id: 3 },
  { label: "Permite mascotas", id: 4 },
];

export function FormStepFeatures({selectedFeatures, setSelectedFeatures }: Props) {
  return (
    <>
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
          {features.map(({label, id}) => <CheckboxWithId selectedOptions={selectedFeatures} container={setSelectedFeatures} key={label} label={label} id={id}/>)}
        </Box>
      </FormControl>
    </>
  );
}

export default FormStepFeatures;
