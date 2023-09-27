import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import Image from "../../../../../components/Image/Image";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { color } from "../../../../../Theme/color";
import useMedia from "../../../../../hooks/useMedia/useMedia";
const Category = () => {
  const { isMediumMD, isMobileSM } = useMedia();
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        mt: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Image
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/KDKS_Mainbanner_Smallbanner_310x210.png"
            alt=""
            width="100%"
            height="200px"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Image
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/KDKS_Mainbanner_Smallbanner_310x210.png"
            alt=""
            width="100%"
            height="200px"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Image
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/KDKS_Mainbanner_Smallbanner_310x210.png"
            alt=""
            width="100%"
            height="200px"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Image
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2023/KDKS_Mainbanner_Smallbanner_310x210.png"
            alt=""
            width="100%"
            height="200px"
          />
        </Grid>
      </Grid>
      <Box mt={3} borderRadius={3} bgcolor={"#fff"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          p={2}
          spacing={2}
          border={"1px solid #eee"}
          borderRadius={3}
        >
          <FormatListBulletedOutlinedIcon />
          <Typography
            variant="h3"
            fontSize={"clamp(1rem, 0.95rem + 0.25vw, 1.25rem)"}
            fontWeight={"bold"}
          >
            Danh mục sản phẩm
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          mt={2}
          sx={{
            flexWrap: "wrap",
          }}
        >
          {[2, 3, 4, 5, 5, 5, 5, 3, 34, 3].map((e, i) => {
            return (
              <Stack
                key={i}
                justifyContent={"center"}
                alignContent={"center"}
                flexWrap={"wrap"}
                sx={
                  isMediumMD
                    ? {
                        width: "20%",
                      }
                    : {
                        width: "10%",
                      }
                }
              >
                <Box
                  sx={{
                    maxWidth: "100px",
                  }}
                >
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh.jpg"
                    width={"100%"}
                    alt=""
                  />

                  <Typography
                    variant="body1"
                    color={color.text_color}
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                    }}
                  >
                    Balo bóp viết
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default Category;
