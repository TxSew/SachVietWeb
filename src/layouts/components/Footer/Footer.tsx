import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "../../../components/Image/Image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import StackCustom from "../../../components/CustomComponents/Stack/StackCustom";
import { color } from "../../../Theme/color";
import useMedia from "../../../hooks/useMedia/useMedia";
import { Link } from "react-router-dom";

function Footer() {
  const { isMediumMD } = useMedia();
  return (
    <Grid bgcolor={"#eee"}>
      <Container maxWidth={"xl"}>
        <Box bgcolor={color.white}>
          <Grid container>
            <Grid pt={5} item xs={12} md={4} px={3}>
              <Box
                sx={{
                  paddingRight: "20px",
                  borderRight: "1px solid #eee"
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
                    marginTop: "20px"
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
                    my: "10px"
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
                    gap: "10px"
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

            <Grid pt={5} item xs={12} md={8} sx={{}}>
              <Box
                sx={{
                  display: "flex"
                }}
              >
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold"
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
                      mt: "10px"
                    }}
                  >
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Điều khoản sử dụng
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách bảo mật thông tin cá nhân
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách bảo mật thanh toán
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Hệ thống trung tâm nhà sách
                    </Link>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    HỖ TRỢ
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      mt: "10px",
                      rowGap: "10px",
                      flexDirection: "column"
                    }}
                  >
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách đổi - trả - hoàn tiền
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách bảo hành - bồi hoàn
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách vận chuyển
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chính sách khách sỉ
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Phương thức thanh toán và xuất hóa đơn
                    </Link>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold"
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
                      mt: "10px"
                    }}
                  >
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Đăng nhập tạo tài khoản mới
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Thay đổi địa chỉ khách hàng
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Chi tiết khách hàng
                    </Link>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      Lịch sử mua hàng
                    </Link>
                  </Box>
                </Grid>
              </Box>
              <Grid container>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "uppercase"
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
