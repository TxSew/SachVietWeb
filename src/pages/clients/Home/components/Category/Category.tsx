import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "../../../../../components/Image/Image";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { useEffect, useState } from "react";
import { color } from "../../../../../Theme/color";
import { BaseAPi } from "../../../../../configs/BaseApi";
import useMedia from "../../../../../hooks/useMedia/useMedia";
import HttpCategoryController from "../../../../../submodules/controllers/http/httpCategoryController";
import { Category } from "../../../../../submodules/models/ProductModel/Category";
const http = new HttpCategoryController(BaseAPi);
const CategoryNav = () => {
  const [category, SetCategory] = useState<Category[]>([]);
  useEffect(() => {
    fetchcategory();
  }, []);

  const fetchcategory = async () => {
    try {
      const category = await http.getCategory();
      const filteredData = category.filter(
        (item: any) => item.parentId !== null
      );
      SetCategory(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  const { isMediumMD } = useMedia();
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
      <Box mt={3} pb={2} borderRadius={3} bgcolor={"#fff"}>
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
          {/* category */}
          {category.map((e: Category) => {
            return (
              <Stack
                key={e.id}
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
                    display: "flex",
                    maxWidth: "100px",
                    flexDirection: "column",
                  }}
                >
                  <img
                    style={{
                      flexShrink: 0,
                    }}
                    src={e.image}
                    width={"100px"}
                    height={"100px"}
                    alt=""
                  />

                  <Typography
                    variant="body1"
                    pt={1}
                    color={color.text_color}
                    textTransform={"capitalize"}
                    sx={{
                      fontSize: "15px",
                      lineHeight: "1",
                      overflow: "hidden",
                      display: "-webkit-box",
                      textAlign: "center",
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {e.name}
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

export default CategoryNav;
