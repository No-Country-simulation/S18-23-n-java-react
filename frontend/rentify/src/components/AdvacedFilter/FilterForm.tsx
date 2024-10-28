import { Box, Typography, Stack, Button } from "@mui/material";
import PropertyRoomSection from "./PropertyRoomSection";
import { useForm, FieldValues } from "react-hook-form";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import { Close} from "@mui/icons-material";

interface Props {
  onSubmit: (data: FieldValues) => void;
  closeFilter: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function FilterForm({ onSubmit, closeFilter }: Props) {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      minBuiltArea: "",
      maxBuiltArea: "",
      minTotalArea: "",
      maxTotalArea: "",
      antiquity: "",
      minYearsOfAntiquity: "",
      maxYearsOfAntiquity: "",
      propertyType: "",
      city: "",
      province: "",
    },
  });
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: { xs: "100%", sm: "432px" },
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
        padding: 2,
        gap: 4,
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Button
        color="secondary"
        onClick={closeFilter()}
        sx={{
          position: "absolute",
          top: 12,
          right: 4,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <Close fontSize="large" />
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingX: "10px",
          paddingBottom: "20px",
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          Filtrar por
        </Typography>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Precio
          </Typography>
          <Stack direction={"row"} gap={4}>
            <InputText
              name="minPrice"
              label="Desde"
              control={control}
              rules={{ required: false }}
              additionalText="$"
            />
            <InputText
              name="maxPrice"
              label="Hasta"
              control={control}
              rules={{ required: false }}
              additionalText="$"
            />
          </Stack>
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Área de Construcción
          </Typography>
          <Stack direction={"row"} gap={4}>
            <InputText
              name="minBuiltArea"
              label="Desde"
              control={control}
              rules={{ required: false }}
              additionalText="m²"
            />
            <InputText
              name="maxBuiltArea"
              label="Hasta"
              control={control}
              rules={{ required: false }}
              additionalText="m²"
            />
          </Stack>
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Área Total
          </Typography>
          <Stack direction={"row"} gap={4}>
            <InputText
              name="minTotalArea"
              label="Desde"
              control={control}
              rules={{ required: false }}
              additionalText="m²"
            />
            <InputText
              name="maxTotalArea"
              label="Hasta"
              control={control}
              rules={{ required: false }}
              additionalText="m²"
            />
          </Stack>
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Provincia
          </Typography>
          <InputText name="province" label="Provincia" control={control} />
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Ciudad
          </Typography>
          <InputText name="city" label="Ciudad" control={control} />
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Antigüedad
          </Typography>
          <InputSelect
            label="Seleccione"
            name="maxYearsOfAntiquity"
            control={control}
            options={[
              { label: "Seleccione", value: "" },
              { label: "A estrenar", value: "0" },
              { label: "Hasta 5 años", value: "5" },
              { label: "Hasta 10 años", value: "10" },
              { label: "Hasta 15 años", value: "15" },
              { label: "Hasta 20 años", value: "20" },
              { label: "Más de 20 años", value: "100" },
            ]}
          />
        </Stack>

        <Stack gap={1}>
          <Typography variant="body1" textAlign={"center"} fontWeight={"bold"}>
            Tipo de Propiedad
          </Typography>
          <InputSelect
            label="Seleccione"
            name="propertyType"
            control={control}
            options={[
              { label: "Seleccione", value: "" },
              { label: "Apartamento", value: "APARMENT" },
              { label: "Casa", value: "HOUSE" },
              { label: "Casa Vacacional", value: "VACATION_HOME" },
              { label: "Oficina Comercial", value: "COMMERCIAL_OFFICE" },
              { label: "Almacen", value: "WAREHOUSE" },
              { label: "Granja", value: "FARM" },
            ]}
          />
        </Stack>

        <PropertyRoomSection control={control} />
      </Box>

      <Button type="submit" variant="contained" onClick={closeFilter()}>
        Enviar
      </Button>
    </Box>
  );
}

export default FilterForm;
