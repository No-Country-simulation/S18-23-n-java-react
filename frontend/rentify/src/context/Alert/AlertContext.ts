import { createContext } from "react";
import { Alert, AlertType } from "../../interfaces/Alert";

interface AlertContextProps {
  alert: Alert;
  showAlert: (type: AlertType, message: string) => void;
  closeAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps>(
  {} as AlertContextProps
);
