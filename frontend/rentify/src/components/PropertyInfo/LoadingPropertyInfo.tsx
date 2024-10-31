import { Box, Skeleton, Stack } from "@mui/material";

function LoadingPropertyInfo() {
  return (
    <Box
      sx={{
        minHeight: "92vh",
        paddingX: { xs: 2, sm: 4, md: 10 },
        backgroundColor: "background.default",
        paddingY: "32px",
      }}
    >
      <Box component={"header"} sx={{ mb: 2 }}>
        <Skeleton
          variant="text" //h4
          sx={{
            fontSize: "clamp(26px, 2vw, 34px)",
            lineHeight: "42px",
            width: { xs: "100%", md: "40vw" },
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            fontSize: "clamp(20px, 2vw, 24px)",
            lineHeight: "32px",
            width: { xs: "140px", md: "10vw" },
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={"100%"}
            sx={{ height: "60vw", maxHeight: "620px" }}
          />
        </Box>
      </Box>
      <Stack
        direction={"row"}
        marginY={4}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={4}
      >
        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          sx={{
            justifyContent: { xs: "center", lg: "start" },
            width: { xs: "100%", lg: "auto" },
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              width: { xs: "70%", sm: "160px" },
              maxWidth: "220px",
              height: "100px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: { xs: "70%", sm: "160px" },
              maxWidth: "220px",
              height: "100px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              width: { xs: "70%", sm: "160px" },
              maxWidth: "220px",
              height: "100px",
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{ marginY: 4, height: "200px", width: "100%", display: "flex", padding: 0, boxSizing: "border-box" }}>
        <Skeleton sx={{width: "100%", height: "100%", transform: "none"}}  />
      </Box>
      <Box sx={{ marginY: 4, height: "400px", width: "100%", display: "flex", padding: 0, boxSizing: "border-box" }}>
        <Skeleton sx={{width: "100%", height: "100%", transform: "none"}}  />
      </Box>
    </Box>
  );
}

export default LoadingPropertyInfo;
