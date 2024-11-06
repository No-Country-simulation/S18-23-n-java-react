import { FormControl } from "@mui/material";
import FormInputText from "../FormInputs/InputText";
import { Control, FieldValues } from "react-hook-form";

interface Props {
    control: Control<FieldValues>
}

export function FormStepLocation({control}: Props) {
  return (
    <>
                <FormControl>
            <FormInputText name={"country"} control={control} label={"País"} />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"province"}
              control={control}
              label={"Provincia"}
            />
          </FormControl>

          <FormControl>
            <FormInputText name={"city"} control={control} label={"Ciudad"} />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"streetName"}
              control={control}
              label={"Nombre de la Calle"}
            />
          </FormControl>

          <FormControl>
            <FormInputText
              name={"streetNumber"}
              control={control}
              label={"Número de la Calle"}
            />
          </FormControl>
    </>
  );
}

export default FormStepLocation;
