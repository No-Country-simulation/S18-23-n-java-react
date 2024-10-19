export type AlertType = "success" | "error";

export interface Alert {
  show: boolean;
  message: string;
  type: AlertType;
}
