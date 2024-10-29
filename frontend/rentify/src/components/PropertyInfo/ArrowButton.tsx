import { Button, SxProps, Theme } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  action: () => void;
  children: ReactElement | ReactElement[];
  variant?: "text" | "contained" | "outlined"
  sx?: SxProps<Theme>
}

function ArrowButton({ children, variant, action, sx }: Props) {
  return (
    <Button
      variant={variant || "contained"}
      onClick={action}
      sx={{
        borderRadius: 100,
        padding: "2px",
        display: "flex",
        minWidth: "fit-content",
        ...sx
      }}
    >
      {children}
    </Button>
  );
}

export default ArrowButton;
