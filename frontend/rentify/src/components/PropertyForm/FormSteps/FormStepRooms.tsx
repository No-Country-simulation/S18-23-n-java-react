import { Box, FormControl, Typography } from "@mui/material";
import CheckboxWithInput from "../PropertyInputs/CheckboxWithInput";

interface Props {
  setSelectedRooms: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        quantity: string;
      }[]
    >
  >;
  selectedRooms: {
    id: number;
    quantity: string;
}[]
}

const rooms = [
  { label: "Dormitorio", name: 1 },
  { label: "Baño", name: 2 },
  { label: "Cocina", name: 3 },
  { label: "Comedor", name: 4 },
  { label: "Sala de Estar", name: 5 },
  { label: "Estudio", name: 6 },
  { label: "Lavadero", name: 7 },
  { label: "Vestidor", name: 8 },
  { label: "Oficina", name: 9 },
  { label: "Balcón", name: 10 },
  { label: "Terraza", name: 11 },
  { label: "Garaje", name: 12 },
  { label: "Sótano", name: 13 },
  { label: "Ático", name: 14 },
  { label: "Jardín", name: 15 },
  { label: "Cuarto de Servicio", name: 16 },
  { label: "Patio", name: 17 },
];

export function FormStepRooms({ setSelectedRooms, selectedRooms }: Props) {
  return (
    <>
      <FormControl>
        <Typography variant="body2" fontWeight={"bold"} marginBottom={2}>
          Indique las habitaciones de la propiedad y su cantidad
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: 4,
          }}
        >
          {rooms.map(({ name, label }) => (
            <CheckboxWithInput
            key={label}
              container={setSelectedRooms}
              label={label}
              name={name}
              selectedRooms={selectedRooms}
            />
          ))}
        </Box>
      </FormControl>
    </>
  );
}

export default FormStepRooms;
