import { Box, Container, Grid, Stack, Typography } from "@mui/material";

function AdminStatistical() {
  return (
    <Box>
      <Typography variant="h3" fontSize={"30px"} fontWeight={"bold"}>
        Thống kê
      </Typography>
      <Box>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box
                              >
                <Typography variant="body1" color="initial">
                  1
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack>
                <Typography variant="body1" color="initial">
                  1
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack>
                <Typography variant="body1" color="initial">
                  1
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack>
                <Typography variant="body1" color="initial">
                  1
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminStatistical;
