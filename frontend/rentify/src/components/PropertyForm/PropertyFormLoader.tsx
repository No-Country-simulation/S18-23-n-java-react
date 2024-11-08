import { Box, Skeleton, Stack } from "@mui/material";

function FormLoader() {
  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        marginY: { xs: 1, md: 2 },
        paddingX: 2
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          paddingBottom: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          position: "relative",
        }}
      >
        <Skeleton
          variant="text"
          sx={{
            marginBottom: { xs: 1, sm: 2 },
            height: "100px",
            borderRadius: 2,
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            height: "100%",
            paddingX: { xs: 2, sm: 4 },
          }}
        >
          <Skeleton variant="rectangular" sx={{ height: {xs: "36px", sm:"40px"} }} />
          <Skeleton variant="rectangular" sx={{ height: {xs: "56px", sm:"60px"} }} />
          <Skeleton variant="rectangular" sx={{ height: {xs: "36px", sm:"40px"} }} />
          <Skeleton variant="rectangular" sx={{ height: {xs: "36px", sm:"40px"} }} />
        </Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Skeleton variant="rounded" sx={{ height: {xs: "32px", sm:"40px"}, width: {xs: "48px", sm:"80px"}, borderRadius: 10, marginX: {xs: 2, sm: 4}, paddingX: {xs: 1, sm: 3} }}  />
          <Skeleton variant="rounded" sx={{ height: {xs: "32px", sm:"40px"}, width: {xs: "48px", sm:"80px"}, borderRadius: 10, marginX: {xs: 2, sm: 4}, paddingX: {xs: 1, sm: 3} }}  />
        </Stack>
      </Box>
    </Box>
  );
}

export default FormLoader;
