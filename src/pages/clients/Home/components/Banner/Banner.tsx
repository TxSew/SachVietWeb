import { Box, Container, Grid   } from "@mui/material";
// Import the Swiper library's original types
import  { Swiper, SwiperSlide,  } from "swiper/react";
import { Navigation, } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import useMedia from "../../../../../hooks/useMedia/useMedia";

// import required modules
// import { Navigation } from "swiper/modules";
function Banner() {
   const { isMediumMD} = useMedia()
  return (
    <Container maxWidth={"xl"}>
       {
         isMediumMD ? (

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
                  src="https://cdn0.fahasa.com/media/magentothem/banner7/AhamoveT8_840x320.png"
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "325px",
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
                  src="https://cdn0.fahasa.com/media/magentothem/banner7/MCbooks_PlatinumT723_Banner_Slide_840x320.jpg"
                  alt=""
                  style={{
                    borderRadius: "10px",

                    width: "100%",
                    height: "325px",
                  }}
                />
              </Box>
            </SwiperSlide>
          </Swiper>
        </Grid>
    
      </Grid>

         ) : (


          <Grid container spacing={2} sx={{ "&.MuiGrid-root": { marginTop: 0 } }}>
          <Grid item xs={8}>
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
                    src="https://cdn0.fahasa.com/media/magentothem/banner7/AhamoveT8_840x320.png"
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      height: "325px",
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
                    src="https://cdn0.fahasa.com/media/magentothem/banner7/MCbooks_PlatinumT723_Banner_Slide_840x320.jpg"
                    alt=""
                    style={{
                      borderRadius: "10px",
  
                      width: "100%",
                      height: "325px",
                    }}
                  />
                </Box>
              </SwiperSlide>
            </Swiper>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: "100%",
                height: "156px",
              }}
            >
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/VnpayT8_392156.png"
                alt=""
                width={"100%"}
                height={"100%"}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "156px",
                mt: "10px",
              }}
            >
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/PNJT8_392x156.png"
                alt=""
                width={"100%"}
                height={"100%"}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Grid>
        </Grid>

         )
       }
    </Container>
  );
}

export default Banner;
