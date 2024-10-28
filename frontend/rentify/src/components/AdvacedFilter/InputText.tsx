import { InputAdornment, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues> | undefined;
  rules?: RegisterOptions;
  type?: React.HTMLInputTypeAttribute;
  additionalText?: string
}

function InputText({ name, label, control, rules, type, additionalText }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type || "text"}
          label={label}
          size="small"
          value={value}
          error={!!error}
          onChange={onChange}
          helperText={error ? error.message : ""}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">{additionalText}</InputAdornment>,
            },
          }}
        />
      )}
    ></Controller>
  );
}

export default InputText;
