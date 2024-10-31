import { FormControl, FormControlLabel, Checkbox } from "@mui/material";

interface Props {
  id: number;
  label: string;
  container: React.Dispatch<React.SetStateAction<number[]>>;
}

function CheckboxWithId({ label, id, container }: Props) {
  const handleChange = (_event: React.SyntheticEvent, checked: boolean) => {
    container((value) => {
      const filteredId = value.filter((element) => element != id);

      if (checked) {
        return [...filteredId, id];
      } else {
        return filteredId;
      }
    });
  };

  return (
    <FormControl
      sx={{
        display: "flex",
      }}
    >
      <FormControlLabel
        control={<Checkbox onChange={handleChange} />}
        onChange={handleChange}
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
