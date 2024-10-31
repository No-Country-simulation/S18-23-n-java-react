import { Box, Skeleton, Stack } from "@mui/material";

function LoadingCard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: "10px",
        alignItems: "center",
        gap: 2,
        maxWidth: { xs: "260px", md: "-webkit-fill-available" },
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          height: { xs: "180px", lg: "240px" },
          width: { xs: "280px", lg: "580px" },
          borderRadius: "10px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "fit-content",
          paddingRight: { xs: 0, md: "10px" },
          paddingBottom: { xs: "10px", md: 0 },
          gap: { xs: 1, lg: 3 },
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <Stack
          justifyContent={"space-between"}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Skeleton
            variant="text"
            sx={{
              fontSize: "clamp(20px, 2vw, 24px)",
              lineHeight: "32px",
              width: {xs: "80vw", md: "40vw"},
              maxWidth: { xs: "100%", md: "120ch" },
            }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(26px, 2vw, 34px)", lineHeight: "42px", width: {xs: "140px", md: "10vw"} }}
          />
        </Stack>
        <Skeleton
          variant="text"
          sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "200px", md: "20vw"} }}
        />
        <Stack direction={"row"} gap={2} sx={{ flexWrap: "wrap" }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "100px", md: "6vw"} }}
          />{" "}
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "100px", md: "6vw"} }}
          />{" "}
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "100px", md: "6vw"} }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "100px", md: "6vw"} }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "26px", width: {xs: "100px", md: "6vw"} }}
          />
        </Stack>
        <Skeleton
          variant="text"
          sx={{ fontSize: "clamp(14px, 2vw, 16px)", lineHeight: "24px" }}
        />
      </Box>
    </Box>
  );
}

export default LoadingCard;
