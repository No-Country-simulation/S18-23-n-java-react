import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  label: string;
  container: React.Dispatch<React.SetStateAction<number[]>>;
  selectedOptions: number[]
}

function CheckboxWithId({ label, id, container, selectedOptions }: Props) {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const includesOption = selectedOptions?.find((option) => option === id);
    if (includesOption) {
      setIsSelected(true);
    }
  }, [selectedOptions, id]);

  const handleChange = (_event: React.SyntheticEvent, checked: boolean) => {
    container((value) => {
      const filteredId = value.filter((element) => element != id);

      if (checked) {
        return [...filteredId, id];
      } else {
        return filteredId;
      }
    });
    setIsSelected(checked)
  };

  return (
    <FormControl
      sx={{
        display: "flex",
      }}
    >
      <FormControlLabel
        control={<Checkbox onChange={handleChange} checked={isSelected} />}
        onChange={handleChange}
        sx={{margin: 0.5}}
        label={label}
        slotProps={{
          typography: {
            fontSize: 14,
            lineHeight: "24px",
          },
        }}
      />
    </FormControl>
  );
}

export default CheckboxWithId;
