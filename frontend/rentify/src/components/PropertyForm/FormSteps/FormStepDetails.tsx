import { FormControl } from "@mui/material";
import FormInputText from "../../FormInputs/InputText";
import { Control, FieldValues } from "react-hook-form";

interface Props {
  control: Control<FieldValues>;
}

export function FormStepDetails({ control }: Props) {
  return (
    <>
      <FormControl>
        <FormInputText
          type="number"
          name={"yearsOfAntiquity"}
          control={control}
          label={"Años de Antigüedad"}
        />
      </FormControl>

      <FormControl>
        <FormInputText
          name={"builtArea"}
          control={control}
          label={"Área construída de la propiedad"}
          additionalText="m²"
          type="number"
          rules={{min: {value: 1, message: "El área construída no puede ser cero"}}}
        />
      </FormControl>

      <FormControl>
        <FormInputText
          name={"totalArea"}
          control={control}
          label={"Área total de la propiedad"}
          additionalText="m²"
          type="number"
          rules={{min: {value: 1, message: "El área total no puede ser cero"}}}
        />
      </FormControl>
    </>
  );
}

export default FormStepDetails;
