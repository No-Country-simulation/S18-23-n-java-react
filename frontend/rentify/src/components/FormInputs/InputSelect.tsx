import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Control, FieldValues, Controller, RegisterOptions } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
  options: { label: string; value: string | number }[];
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
}

function InputSelect({ name, label, control, options, rules }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={{padding: 0}}>
          <InputLabel size="small" id="name">{label}</InputLabel>
          <Select
            labelId="name"
            label={label}
            size="small"
            onChange={onChange}
            name={name}
            value={value}
          >
            {options.map(({ label, value }) => {
              return (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    ></Controller>
  );
}

export default InputSelect;
