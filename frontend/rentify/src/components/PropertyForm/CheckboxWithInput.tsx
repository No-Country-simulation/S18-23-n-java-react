import {
  FormControlLabel,
  Checkbox,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  label: string;
  name: number;
  container: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        quantity: string;
      }[]
    >
  >;
}

function CheckboxWithInput({ label, name, container }: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) setIsSelected(true);
    else {
      setIsSelected(false);
      container((value) => {
        const filteredRooms = value.filter((element) => element.id != name);
        return filteredRooms;
      });
    }
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    container((value) => {
      const filteredRooms = value.filter((element) => element.id != name);

      if (event.target.value === "") {
        return filteredRooms;
      } else {
        return [...filteredRooms, { id: name, quantity: event.target.value }];
      }
    });
  };
  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "space-between",
      }}
    >
      <FormControlLabel
        control={<Checkbox onChange={handleOnChange} />}
        label={label}
        slotProps={{
          typography: {
            fontSize: 14,
            lineHeight: "24px",
          },
        }}
        sx={{ display: "flex", marginY: 1, alignItems: "center" }}
      />
      {isSelected && (
        <TextField
          sx={{ alignSelf: "center", maxWidth: "100px", justifySelf: "end" }}
          type="number"
          onChange={handleQuantity}
          size="small"
          name="quantity"
          label="Cantidad:"
          slotProps={{
            inputLabel: { sx: { fontSize: 14 } },
            input: { sx: { fontSize: 14 } },
          }}
        />
      )}
    </FormControl>
  );
}

export default CheckboxWithInput;
