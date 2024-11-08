import { Box } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

export function LoginPage() {
  return (
    <Box sx={{backgroundColor: "background.default"}}>
      <LoginForm />
    </Box>
  );
}

export default LoginPage;
