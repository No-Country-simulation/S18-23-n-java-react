import { FormControl } from "@mui/material";
import InputSelect from "../../AdvacedFilter/InputSelect";
import FormInputText from "../FormInputs/InputText";
import FormTextArea from "../FormInputs/InputTextArea";
import { Control, FieldValues } from "react-hook-form";

interface Props {
  control: Control<FieldValues>;
}

export function FormStepGeneral({ control }: Props) {
  return (
    <>
      <FormControl>
        <FormInputText name={"title"} control={control} label={"Titulo"} />
      </FormControl>
      <FormControl>
        <FormTextArea
          name={"description"}
          control={control}
          label={"Descripción"}
        />
      </FormControl>
      <FormControl>
        <InputSelect
          name="propertyType"
          label="Tipo de Propiedad"
          control={control}
          options={[
            { label: "Apartamento", value: "APARTMENT" },
            { label: "Casa", value: "HOUSE" },
            { label: "Casa Vacacional", value: "VACATION_HOME" },
            { label: "Oficina Comercial", value: "COMMERCIAL_OFFICE" },
            { label: "Almacen", value: "WAREHOUSE" },
            { label: "Finca", value: "FARM" },
          ]}
        />
      </FormControl>
      <FormControl>
        <FormInputText
          name={"price"}
          control={control}
          label={"Precio"}
          type="number"
          additionalText="$"
          rules={{min: {value: 1, message: "El precio no puede ser cero"}}}
          
        />
      </FormControl>
    </>
  );
}

export default FormStepGeneral;
