import {
  FormControlLabel,
  Checkbox,
  FormControl,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

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
  selectedRooms?: {
    id: number;
    quantity: string;
  }[];
}

function CheckboxWithInput({ label, name, container, selectedRooms }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const room = selectedRooms?.find((room) => room.id === name);
    if (room) {
      setIsSelected(true);
      setQuantity(room.quantity);
    }
  }, [selectedRooms, name]);

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
    setQuantity(event.target.value)
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
        control={<Checkbox onChange={handleOnChange} checked={isSelected} />}
        label={label}
        slotProps={{
          typography: {
            fontSize: 14,
            lineHeight: "24px",
          },
        }}
        sx={{
          display: "flex",
          marginY: 0.5,
          alignItems: "center",
          marginRight: 0,
          paddingLeft: 1.8,
        }}
      />
      {isSelected && (
        <TextField
          sx={{ alignSelf: "center", maxWidth: "100px", justifySelf: "end" }}
          type="number"
          onChange={handleQuantity}
          size="small"
          name="quantity"
          label="Cantidad:"
          value={quantity}
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
