import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { color } from "../../../../../Theme/color";
import { BaseAPi } from "../../../../../configs/BaseApi";
import useLoading from "../../../../../hooks/useLoading/useLoading";
import useMedia from "../../../../../hooks/useMedia/useMedia";
import HttpCategoryController from "../../../../../submodules/controllers/http/httpCategoryController";
import { Category } from "../../../../../submodules/models/ProductModel/Category";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const http = new HttpCategoryController(BaseAPi);
const CategoryNav = () => {
  const redirect = useNavigate();
  const [category, SetCategory] = useState<Category[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    fetchcategory();
  }, []);

  const RedirectProductPage = (props: any) => {
    redirect({
      pathname: "/category",
      search: createSearchParams({
        category: props,
      }).toString(),
    });
  };
  const fetchcategory = async () => {
    startLoading();
    try {
      const category = await http.getCategory({});
      const filteredData = category.filter(
        (item: any) => item.parentId !== null
      );
      if (filteredData) {
        setTimeout(() => {
          stopLoading();
        }, 1000);
      }
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
          alignItems={"start"}
          mt={2}
          sx={{
            flexWrap: "wrap",
          }}
        >
          {isLoading
            ? Array.from({ length: category.length }).map((e) => {
                return (
                  <Stack
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
                    <Skeleton
                      variant="rectangular"
                      width={"100px"}
                      height={"100px"}
                      sx={{
                        borderRadius: "5px",
                      }}
                    />
                    <Skeleton animation="wave" height={50} width="60%" />
                  </Stack>
                );
              })
            : category.map((e: Category) => {
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
                            cursor: "pointer",
                          }
                        : {
                            width: "10%",
                            cursor: "pointer",
                          }
                    }
                    onClick={() => RedirectProductPage(e.slug)}
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
