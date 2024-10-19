import { useState } from "react";
import { Alert, AlertType } from "../../interfaces/Alert";
import { AlertContext } from "./AlertContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE = {
  show: false,
  type: "error",
  message: "",
};

export const AlertProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert>(INITIAL_STATE as Alert);

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, show: true, message });
  };

  const closeAlert =  () => {
    setAlert((state) => ({ ...state, show: false }));
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
