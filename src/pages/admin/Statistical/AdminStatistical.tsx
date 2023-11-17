import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { color } from "../../../Theme/color";
import { httpStatistical } from "../../../submodules/controllers/http/axiosController";
import { StatisticalDto } from "../../../submodules/models/Statistical/Statistical";
import { ChartMOney } from "./chart/ChartMoney";
import { NavLink } from "react-router-dom";

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
        px: 5
      }}
    >
      <Typography variant="h3" fontSize={"30px"} fontWeight={"bold"}>
        Thống kê
      </Typography>
      <Box mt={2}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Khách hàng
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.UserCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Danh mục
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.categoryCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Đơn hàng
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.orderCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Sản phẩm
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.productCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Sản phẩm
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.productCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  p: 2
                }}
              >
                <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                  <img
                    src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                    alt="err"
                  />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1" color="initial">
                    Sản phẩm
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    py={2}
                    borderBottom={"2px solid #eee"}
                  >
                    {StatisticalCount?.Statistical.productCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"end"}
                    p={2}
                  >
                    <NavLink
                      to={""}
                      style={{
                        color: "#FFA500",
                        textDecoration: "underline"
                      }}
                    >
                      Xem chi tiết
                    </NavLink>
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Box margin={"auto"} textAlign={"center"} py={3}>
              <Typography
                display={"flex"}
                justifyContent={"center"}
                py={2}
                fontSize={"20px"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                Thống kê doanh thu
              </Typography>
              <Box
                display={"flex"}
                textAlign={"center"}
                alignItems={"center"}
                gap={5}
              >
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <Typography>Từ:</Typography>
                  <input
                    type="date"
                    style={{
                      border: "1px solid #eee",
                      padding: "4px",
                      borderRadius: "8px"
                    }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <Typography>Đến:</Typography>
                  <input
                    type="date"
                    style={{
                      border: "1px solid #eee",
                      padding: "4px",
                      borderRadius: "8px"
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    padding: "2px",
                    textTransform: "capitalize",
                    background: "#47CA44"
                  }}
                >
                  Lọc
                </Button>
              </Box>
            </Box>
            <Grid container display={"flex"} justifyContent={"center"} gap={2}>
              <Grid xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    display: "flex",
                    gap: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                    p: 2,
                    alignItems: "center"
                  }}
                >
                  <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                    <img
                      src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                      alt="err"
                    />
                  </Grid>
                  <Grid xs={8} textAlign={"center"}>
                    <Typography variant="body1" color="initial">
                      Sản phẩm
                    </Typography>
                    <Typography variant="body1" color="initial">
                      Sản phẩm
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    display: "flex",
                    gap: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                    p: 2
                  }}
                >
                  <Grid xs={4} display={"flex"} alignItems={"center"} px={2}>
                    <img
                      src="https://bookbuy.vn/Res/Images/Product/gia-do-laptop-moft-stand_113990_5.PNG?w=250&h=350&mode=canvas&quality=90"
                      alt="err"
                    />
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant="body1" color="initial">
                      Sản phẩm
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <ChartMOney />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminStatistical;
