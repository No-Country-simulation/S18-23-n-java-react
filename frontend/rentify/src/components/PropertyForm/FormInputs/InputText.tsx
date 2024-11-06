import { InputAdornment, TextField } from "@mui/material";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
  additionalText?: string;
  type?: React.HTMLInputTypeAttribute;
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
}

function InputText({ name, label, control, additionalText, type, rules }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: { value: true, message: "Este campo es requerido" }, ...rules }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          label={label}
          size="small"
          value={value}
          error={!!error}
          onChange={onChange}
          helperText={error ? error.message : ""}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">{additionalText}</InputAdornment>
              ),
            },
          }}
        />
      )}
    ></Controller>
  );
}

export default InputText;
