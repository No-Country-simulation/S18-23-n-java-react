import { InputLabel, Select, MenuItem, FormHelperText, FormControl } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
  options: { label: string; value: string | number }[];
}

function FormSelect({ name, label, control, options }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: { value: true, message: "Este campo es requerido" } }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <InputLabel id="propertyType">{label}</InputLabel>
          <Select
            labelId="propertyType"
            size="small"
            label={label}
            onChange={onChange}
            name="tipoDePropiedad"
            value={value}
          >
            {options.map(({ label, value }) => {
              return <MenuItem key={value} value={value}>{label}</MenuItem>;
            })}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    ></Controller>
  );
}

export default FormSelect;
