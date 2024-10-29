import { Box, Container, Drawer, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getAllProperties } from "../../service/property/propertyService";
import { Property } from "../../interfaces/Property";
import { FieldValues } from "react-hook-form";
import { AlertContext } from "../../context";
import FilterForm from "../../components/AdvacedFilter/FilterForm";
import FilteredPropertyCard from "../../components/PropertyCards/FilteredPropertyCard";
import { Tune } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import LoadingCard from "../../components/PropertyCards/LoadingCard";

function ExplorePage() {
  const { showAlert } = useContext(AlertContext);
  const [properties, setProperties] = useState([] as Property[]);
  const [waitForResponse, setWaitForResponse] = useState(<LoadingCard />);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getFilteredProperties(searchParams.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getFilteredProperties = async (queryParams: string) => {
    setWaitForResponse(
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          minWidth: "100%"
        }}
      >
        <Stack
          gap={4}
          flexGrow={1}
          sx={{
            alignItems: { xs: "center", md: "start" },
            paddingBottom: "20px",
            flexGrow: 1
          }}
        >
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </Stack>
      </Box>
    );
    setProperties([]);

    const response = await getAllProperties(queryParams);
    if (typeof response !== "string" && response.length > 0) {
      setProperties(response as Property[]);
    } else {
      if (response.length > 0) showAlert("error", response);
      setWaitForResponse(
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ flexGrow: 1, alignSelf: "center", justifySelf: "center" }}
        >
          No se ha encontrado ninguna propiedad
        </Typography>
      );
    }
  };

  const onSubmit = (data: FieldValues) => {
    let queryParams = "?";

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith("room") && value) {
        queryParams += `rooms=${key.slice(4)}&`;
        data[key] = undefined;
      } else if (value === "" || !value) {
        data[key] = undefined;
      } else {
        queryParams += `${key}=${value}&`;
      }
    }
    setSearchParams(queryParams);
  };

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsFilterOpen(false);
    };

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: 2,
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr",
          flexGrow: 1,
        }}
      >
        <Stack gap={3} sx={{ paddingX: { sm: 2, md: 4 }, paddingY: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">
              {properties.length > 0
                ? `${properties.length} propiedades encontradas`
                : ""}
            </Typography>
            <Box
              component={"button"}
              onClick={() => setIsFilterOpen(true)}
              sx={{
                width: "fit-content",
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                borderRadius: "20px",
                paddingY: "4px",
                paddingX: "16px",
                backgroundColor: "white",
                boxShadow: 3,
                cursor: "pointer",
                transition: "all",
                transitionDuration: "200ms",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <Tune color="secondary" />
              <Typography
                color="secondary"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Filtro
              </Typography>
            </Box>
          </Box>
          <Stack
            gap={4}
            flexGrow={1}
            sx={{
              alignItems: { xs: "center", md: "start" },
              paddingBottom: "20px",
            }}
          >
            {properties.length > 0
              ? properties.map((property) => (
                  <FilteredPropertyCard key={property.id} property={property} />
                ))
              : waitForResponse}
          </Stack>
        </Stack>
      </Box>
      <Drawer anchor={"right"} open={isFilterOpen} onClose={toggleDrawer()}>
        {<FilterForm onSubmit={onSubmit} closeFilter={toggleDrawer} />}
      </Drawer>
    </Container>
  );
}

export default ExplorePage;
