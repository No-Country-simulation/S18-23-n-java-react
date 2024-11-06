import { Box, FormControl, Typography } from "@mui/material";
import CheckboxWithId from "../FormInputs/CheckboxWithId";

interface Props {
  selectedAmenities: number[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<number[]>>;
}

const amenities = [
  { label: "Aire Acondicionado", id: 1 },
  { label: "Gimnasio", id: 2 },
  { label: "Hidromasaje", id: 3 },
  { label: "Solarium", id: 4 },
  { label: "Pileta", id: 5 },
  { label: "Sala de Juegos", id: 6 },
  { label: "Parrilla", id: 7 },
  { label: "Sum", id: 8 },
  { label: "Cocina equipada", id: 9 },
  { label: "Ascensor", id: 10 },
  { label: "Quincho", id: 11 },
  { label: "Laundry", id: 12 },
  { label: "Internet", id: 13 },
  { label: "Wi-fi", id: 14 },
  { label: "Horno", id: 15 },
  { label: "Microondas", id: 16 },
  { label: "Calefacción", id: 17 },
  { label: "Sauna", id: 18 },
];

export function FormStepAmenities({ selectedAmenities, setSelectedAmenities }: Props) {
  return (
    <>
      <FormControl>
        <Typography variant="body2" fontWeight={"bold"} marginBottom={2}>
          Seleccione aquellas comodidades que posee su propiedad
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: 4,
          }}
        >
          {amenities.map(({ label, id }) => (
            <CheckboxWithId
              key={label}
              container={setSelectedAmenities}
              label={label}
              id={id}
              selectedOptions={selectedAmenities}
            />
          ))}
        </Box>
      </FormControl>
    </>
  );
}

export default FormStepAmenities;
