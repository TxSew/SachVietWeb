import { Box, Container, Grid } from "@mui/material";
// Import the Swiper library's original types
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import useMedia from "../../../../../hooks/useMedia/useMedia";

// import required modules
// import { Navigation } from "swiper/modules";
function Banner() {
  const { isMediumMD } = useMedia();
  return (
    <Container maxWidth={"xl"}>
      {isMediumMD ? (
        <Grid container spacing={2} sx={{ "&.MuiGrid-root": { marginTop: 0 } }}>
          <Grid item xs={12}>
            <Swiper
              navigation
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Box
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://theme.hstatic.net/1000363117/1000911694/14/col_hori_img.png?v=483"
                    alt="Banner tùy chỉnh"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://theme.hstatic.net/1000363117/1000911694/14/col_hori_img.png?v=483"
                    alt=""
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                </Box>
              </SwiperSlide>
            </Swiper>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ "&.MuiGrid-root": { marginTop: 0 } }}>
          <Grid item xs={12}>
            <Swiper
              navigation
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Box
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://theme.hstatic.net/1000363117/1000911694/14/col_hori_img.png?v=483"
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src="https://theme.hstatic.net/1000363117/1000911694/14/col_hori_img.png?v=483"
                    alt=""
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                </Box>
              </SwiperSlide>
            </Swiper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Banner;
