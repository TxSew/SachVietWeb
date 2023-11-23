import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { color } from '../../../../../Theme/color';
import useLoading from '../../../../../hooks/useLoading/useLoading';
import useMedia from '../../../../../hooks/useMedia/useMedia';
import { httpCategory } from '../../../../../submodules/controllers/http/axiosController';
import { Category } from '../../../../../submodules/models/ProductModel/Category';

const CategoryNav = () => {
    const redirect = useNavigate();
    const { isMediumMD } = useMedia();
    const [category, SetCategory] = useState<Category[]>([]);
    const { isLoading, startLoading, stopLoading } = useLoading();
    useEffect(() => {
        fetchcategory();
    }, []);

    const RedirectProductPage = (props: any) => {
        redirect({
            pathname: '/category',
            search: createSearchParams({
                category: props,
            }).toString(),
        });
    };

    const fetchcategory = async () => {
        startLoading();
        try {
            const category = await httpCategory.getCategory({});
            const filteredData = category.filter((item: any) => item.parentId !== null);
            if (filteredData) {
                setTimeout(() => {
                    stopLoading();
                }, 300);
            }
            SetCategory(filteredData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container
            maxWidth={'xl'}
            sx={{
                mt: 3,
            }}
        >
            <Box mt={3} pb={2} borderRadius={3} bgcolor={'#fff'}>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    p={2}
                    spacing={2}
                    border={'1px solid #eee'}
                    borderRadius={3}
                >
                    <FormatListBulletedOutlinedIcon />
                    <Typography variant="h3" fontSize={'clamp(1rem, 0.95rem + 0.25vw, 1.25rem)'} fontWeight={'bold'}>
                        Danh mục sản phẩm
                    </Typography>
                </Stack>

                <Grid container px={2} mt={2}>
                    {isLoading
                        ? Array.from({ length: category.length }).map((e) => {
                              return (
                                  <Grid xs={4} md={2} flexWrap={'wrap'} lg={1} item>
                                      <Box p={'0 5px'} alignItems={'center'} textAlign={'center'}>
                                          <Skeleton
                                              variant="rectangular"
                                              height={isMediumMD ? '100px' : '120px'}
                                              sx={{
                                                  borderRadius: '5px',
                                              }}
                                          />
                                          <Skeleton
                                              animation="wave"
                                              sx={{
                                                  m: '0 auto',
                                              }}
                                              height={50}
                                              width="60%"
                                          />
                                      </Box>
                                  </Grid>
                              );
                          })
                        : category.map((e: Category) => {
                              return (
                                  <Grid
                                      item
                                      xs={4}
                                      md={2}
                                      flexWrap={'wrap'}
                                      lg={1}
                                      sx={{
                                          cursor: 'pointer',
                                      }}
                                      key={e.id}
                                      onClick={() => RedirectProductPage(e.slug)}
                                  >
                                      <Box px={isMediumMD ? 2 : 1}>
                                          <img
                                              style={{
                                                  flexShrink: 0,
                                                  border: '1px solid #eee',
                                              }}
                                              src={e.image}
                                              width={'100%'}
                                              height={isMediumMD ? '100px' : '120px'}
                                              alt=""
                                          />

                                          <Typography
                                              variant="body1"
                                              pt={1}
                                              color={color.text_color}
                                              textTransform={'capitalize'}
                                              sx={{
                                                  fontSize: '15px',
                                                  lineHeight: '1',
                                                  overflow: 'hidden',
                                                  display: '-webkit-box',
                                                  textAlign: 'center',
                                                  WebkitLineClamp: 2,
                                                  lineClamp: 2,
                                                  WebkitBoxOrient: 'vertical',
                                              }}
                                          >
                                              {e.name}
                                          </Typography>
                                      </Box>
                                  </Grid>
                              );
                          })}
                </Grid>
            </Box>
        </Container>
    );
};

export default CategoryNav;
