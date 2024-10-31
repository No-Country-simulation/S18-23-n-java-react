import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
}

function FormTextArea({ name, label, control }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{required: {value: true, message: "Este campo es requerido"}}}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          value={value}
          error={!!error}
          onChange={onChange}
          helperText={error ? error.message : ""}
          multiline
          maxRows={5}
        />
      )}
    ></Controller>
  );
}

export default FormTextArea;
