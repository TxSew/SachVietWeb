import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Button, Stack, Typography, Grid } from "@mui/material";

export default function News() {
  return (
    <Box py={4}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid xs={8} borderRight={"1px solid rgba(60, 64, 67, 0.15)"}>
            <Box borderBottom={"1px solid #e5e5e5"} pb={2}>
              <Grid
                container
                display={"flex"}
                alignItems={"center"}
                bgcolor={"#f7f7f7"}
                sx={{
                  cursor: "pointer"
                }}
              >
                <Grid xs={8}>
                  <img
                    src="https://i1-giaitri.vnecdn.net/2023/11/20/z4842083349307b9eb1aeb8e29ce48-2224-5698-1700413720.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=sYbvdc-LKpVxBLR7tS0E2A"
                    alt=""
                    width={"100%"}
                  />
                </Grid>
                <Grid
                  xs={4}
                  p={3}
                  display={"flex"}
                  justifyContent={"space-between"}
                  direction={"column"}
                  gap={"24px"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    sx={{
                      "&:hover": {
                        color: "#008C89"
                      }
                    }}
                  >
                    GS Nguyễn Lân Dũng: 'Viết sách để gợi khát khao vươn lên của
                    thế hệ trẻ'
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontSize={"14px"}
                    color={"#4f4f4f"}
                    sx={{
                      "&:hover": {
                        color: "#008C89"
                      }
                    }}
                  >
                    Ở tuổi 85, giáo sư Nguyễn Lân Dũng nói hạnh phúc vì vẫn làm
                    việc, viết sách về trải nghiệm của bản thân để chia sẻ với
                    thế hệ trẻ.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box borderBottom={"1px solid #e5e5e5"} py={2}>
              <Grid
                container
                sx={{
                  cursor: "pointer"
                }}
              >
                <Grid xs={4}>
                  <img
                    src=""
                    alt="ảnh lỗi
                  "
                    width={"100%"}
                  />
                </Grid>
                <Grid xs={8} px={3} pt={2}>
                  <Typography
                    variant="h2"
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    pb={2}
                    sx={{
                      "&:hover": {
                        color: "#008C89"
                      }
                    }}
                  >
                    Bảo Ninh: Cuốn 'Nỗi buồn chiến tranh' không thể chữa lành
                    cho tôi
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontSize={"14px"}
                    color={"#4f4f4f"}
                    sx={{
                      "&:hover": {
                        color: "#008C89"
                      }
                    }}
                  >
                    Nhà văn Bảo Ninh nói "nỗi buồn chiến tranh" là vết thương
                    khó chữa lành trong ông, tại buổi trò chuyện với thầy trò
                    khoa Văn ở TP HCM.{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={4} px={3}>
            Quảng cáo
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
