import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
  rules?: RegisterOptions
  type?: React.HTMLInputTypeAttribute
}

function FormInputText({ name, label, control, rules, type }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{required: {value: true, message: "Este campo es requerido"}, ...rules}}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type || "text"}
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
