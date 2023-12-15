import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductItem from '../../../../../components/ProductItem/ProductItem';
import useLoading from '../../../../../hooks/useLoading/useLoading';
import { httpProduct } from '../../../../../submodules/controllers/http/axiosController';
import { Product } from '../../../../../submodules/models/ProductModel/Product';
import { image } from '../../../../../assets';
import useMedia from '../../../../../hooks/useMedia/useMedia';
import { Link } from 'react-router-dom';

function Products() {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [Products, setProducts] = useState<Product[]>([]);
    const { isMediumMD } = useMedia();
    const fetchData = async (props: any) => {
        startLoading();
        try {
            const productData: any = await httpProduct.getAll(props);
            const { products } = productData;
            if (products) {
                stopLoading();
            }
            setProducts(products);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const props = {
            filter: 1,
        };
        fetchData(props);
    }, []);

    return (
        <Box>
            <Container maxWidth={'xl'}>
                <Box pb={2} borderRadius={3} bgcolor={'#fff'}>
                    <Box
                        mt={3}
                        sx={{
                            borderTopLeftRadius: 3,
                            borderBottom: ' 1px solid #eee',
                            borderTopRightRadius: 3,
                        }}
                    >
                        <Stack
                            sx={{
                                borderTopLeftRadius: 3,
                                borderTopRightRadius: 3,
                            }}
                            direction={'row'}
                            spacing={2}
                            py={2}
                            px={2}
                            borderBottom={'1px solid #eee'}
                        >
                            <img
                                width={'40px'}
                                height={'40px'}
                                style={{
                                    objectFit: 'cover',
                                }}
                                src={image.Fire}
                                alt=""
                            />
                            <h2
                                style={
                                    isMediumMD
                                        ? {
                                              fontSize: '13px',
                                              fontWeight: 'bold',
                                          }
                                        : {
                                              fontWeight: 'bold',
                                          }
                                }
                            >
                                XU HƯỚNG MUA SẮM
                            </h2>
                        </Stack>
                    </Box>
                    <Grid container p={'10px'}>
                        {!isLoading
                            ? Products.map((element: Product, i) => {
                                  return (
                                      <Grid key={element.id} item lg={3} md={4} xs={6} p={'10px'}>
                                          <ProductItem key={i} products={element} />
                                      </Grid>
                                  );
                              })
                            : Array.from({ length: 8 }).map((e, i) => {
                                  return (
                                      <Grid key={i} item lg={3} md={4} xs={6} paddingBottom={4}>
                                          <Skeleton variant="rectangular" width={'95%'} height={'170px'} />
                                          <Skeleton
                                              animation="wave"
                                              height={'50px'}
                                              width={'95%'}
                                              style={{ marginBottom: 6, marginTop: 6 }}
                                          />
                                          <Stack direction={'row'} justifyContent={'space-around'}>
                                              <Skeleton animation="wave" height={50} width="33%" />
                                              <Skeleton animation="wave" height={50} width="33%" />
                                          </Stack>
                                      </Grid>
                                  );
                              })}
                    </Grid>
                    <Stack>
                        <Link to="/filter?sale=true">
                            <Button variant="OutlinedRed">Xem thêm</Button>
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default Products;
