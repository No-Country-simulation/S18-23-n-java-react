import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
}

function FormInputText({ name, label, control }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{required: {value: true, message: "Este campo es requerido"}}}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          size="small"
          value={value}
          error={!!error}
          onChange={onChange}
          helperText={error ? error.message : ""}
        />
      )}
    ></Controller>
  );
}

export default FormInputText;