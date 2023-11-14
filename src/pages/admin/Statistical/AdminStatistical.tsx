import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { color } from "../../../Theme/color";
import { httpStatistical } from "../../../submodules/controllers/http/axiosController";
import { StatisticalDto } from "../../../submodules/models/Statistical/Statistical";
import { ChartMOney } from "./chart/ChartMoney";

function AdminStatistical() {
  const [StatisticalCount, setStatisticalCount] = useState<StatisticalDto>();
  useEffect(() => {
    fetchStatistical();
  }, []);
  const fetchStatistical = async () => {
    const statistical = await httpStatistical.getStatistical();
    setStatisticalCount(statistical);
  };
  return (
    <Box
      sx={{
        mt: 5,
        px: 5,
      }}
    >
      <Typography variant="h3" fontSize={"30px"} fontWeight={"bold"}>
        Thống kê
      </Typography>
      <Box mt={2}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  height: "100px",
                  backgroundColor: color.navAdmin_color,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  textAlign={"center"}
                >
                  {StatisticalCount?.Statistical.UserCount} Khách hàng
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  height: "100px",
                  backgroundColor: color.navAdmin_color,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  textAlign={"center"}
                >
                  {StatisticalCount?.Statistical.categoryCount} Danh mục
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  height: "100px",
                  backgroundColor: color.navAdmin_color,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  textAlign={"center"}
                >
                  {StatisticalCount?.Statistical.orderCount} Đơn hàng
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  height: "100px",
                  backgroundColor: color.navAdmin_color,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  textAlign={"center"}
                >
                  {StatisticalCount?.Statistical.productCount} Sản phẩm
                </Typography>
              </Box>
            </Grid>
            <ChartMOney />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminStatistical;
