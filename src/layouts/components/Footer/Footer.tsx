import { Box, Container, Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";
import Image from "../../../components/Image/Image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import StackCustom from "../../../components/CustomComponents/Stack/StackCustom";
import { color } from "../../../Theme/color";
function Footer() {
  const AlignStack = styled(Stack)`
    display: flex;
    flex-direction: "row";
    align-items: center;
  `;
  return (
    <Grid bgcolor={"#eee"}>
      <Container maxWidth={"xl"}>
        <Box pt={5} bgcolor={color.white}>
          <Grid container>
            <Grid item xs={4} px={3}>
              <Box
                sx={{
                  paddingRight: "20px",
                  borderRight: "1px solid #eee",
                }}
              >
                <Image
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
                <Box mt={2}>
                  <Typography variant="body1" fontSize={13} textAlign={"left"}>
                    Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM
                  </Typography>
                  <Typography fontSize={13} variant="caption" color="initial">
                    Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
                  </Typography>
                  <Typography variant="caption" fontSize={13} color="initial">
                    60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="subtitle1" color="initial" fontSize={13}>
                    Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.
                    KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng
                    cũng như tất cả Hệ Thống Fahasa trên toàn quốc
                  </Typography>
                </Box>
                {/* lis6 icon */}
                <Box
                  sx={{
                    maxWidth: "100px",
                    my: "10px",
                  }}
                >
                  <Image
                    src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png"
                    alt=""
                    width="100%"
                    height="30.40px"
                  />
                </Box>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  color={"gray"}
                >
                  <FacebookIcon />
                  <InstagramIcon />
                  <YouTubeIcon />
                  <TwitterIcon />
                  <YouTubeIcon />
                  <TwitterIcon />
                </Stack>
                <StackCustom mt={"10px"} gap={3}>
                  <Image
                    src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                    alt=""
                    width="100px"
                    height="30px"
                  />
                  <Image
                    src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                    alt=""
                    width="100px"
                    height="30px"
                  />
                </StackCustom>
              </Box>
            </Grid>

            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    variant="h2"
                  >
                    DỊCH VỤ
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                      mt: "10px",
                    }}
                  >
                    <Typography variant="caption">
                      Điều khoản sử dụng
                    </Typography>
                    <Typography variant="caption">
                      Chính sách bảo mật thông tin cá nhân
                    </Typography>
                    <Typography variant="caption">
                      Chính sách bảo mật thanh toán
                    </Typography>
                    <Typography variant="caption">
                      Hệ thống trung tâm nhà sách
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    HỖ TRỢ
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      mt: "10px",
                      rowGap: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="caption">
                      Chính sách đổi - trả - hoàn tiền
                    </Typography>
                    <Typography variant="caption">
                      Chính sách bảo hành - bồi hoàn
                    </Typography>
                    <Typography variant="caption">
                      Chính sách vận chuyển
                    </Typography>
                    <Typography variant="caption">
                      Chính sách khách sỉ
                    </Typography>
                    <Typography variant="caption">
                      Phương thức thanh toán và xuất hóa đơn
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    variant="h2"
                  >
                    TÀI KHOẢN CỦA TÔI
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                      mt: "10px",
                    }}
                  >
                    <Typography variant="caption">
                      Đăng nhập tạo tài khoản mới
                    </Typography>
                    <Typography variant="caption">
                      Thay đổi địa chỉ khách hàng
                    </Typography>
                    <Typography variant="caption">
                      Chi tiết khách hàng
                    </Typography>
                    <Typography variant="caption">Lịch sử mua hàng</Typography>
                  </Box>
                </Grid>
              </Box>
              <Grid container>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Liên hệ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}

export default Footer;
