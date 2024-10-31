import { Check } from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  Badge,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  control: Control<FieldValues> | undefined;
  label: string;
  icon: JSX.Element | JSX.Element[];
}

function CheckCard({ name, control, label, icon }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: { value: false, message: "Este campo es requerido" } }}
      render={({ field: { onChange, value } }) => (
        <Badge
          color="primary"
          sx={{
            width: "fit-content",
            border: "1px solid",
            borderColor: "#4a4a4a",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            paddingX: "8px",
            paddingY: "4px",
            transition: "all",
            transitionDuration: "200ms",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          invisible={!value}
          overlap="rectangular"
          badgeContent={<Check sx={{ width: 14, height: 14, padding: 0 }} />}
          slotProps={{ badge: { style: { padding: 0 } } }}
          onClick={handleCheck}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{ display: "none", padding: 0 }}
                onChange={onChange}
                value={isChecked}
              />
            }
            sx={{ textAlign: "center", userSelect: "none", margin: 0 }}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#4a4a4a",
                }}
              >
                {icon}
                <Typography variant="body2" sx={{ minWidth: "74px" }}>
                  {label}
                </Typography>
              </Box>
            }
          />
        </Badge>
      )}
    ></Controller>
  );
}

export default CheckCard;
