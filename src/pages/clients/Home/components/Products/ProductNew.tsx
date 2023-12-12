import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductitemNew from '../../../../../components/ProductItem/ProductitemNew';
import useLoading from '../../../../../hooks/useLoading/useLoading';
import { httpProduct } from '../../../../../submodules/controllers/http/axiosController';
import { Product } from '../../../../../submodules/models/ProductModel/Product';
import { redirect, useNavigate } from 'react-router-dom';
import { image } from '../../../../../assets';
import useMedia from '../../../../../hooks/useMedia/useMedia';

function ProductNew() {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const redirect = useNavigate();
    const [Products, setProducts] = useState<Product[]>([]);
    const fetchData = async (props: any) => {
        props.limit = 10;
        try {
            const productData: any = await httpProduct.getAll(props);
            const { products } = productData;
            startLoading();
            if (products) {
                stopLoading();
            }
            setProducts(products);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const props = {};
        fetchData(props);
    }, []);
    const { isMediumMD } = useMedia();

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
                                src={image.new}
                                alt=""
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                            <h2
                                style={
                                    isMediumMD
                                        ? {
                                              fontSize: '13px',
                                              textTransform: 'uppercase',
                                              fontWeight: 'bold',
                                          }
                                        : {
                                              fontWeight: 'bold',
                                              textTransform: 'uppercase',
                                          }
                                }
                            >
                                Sách Mới Phát Hành
                            </h2>
                        </Stack>
                    </Box>
                    <Grid container p={'10px'}>
                        {!isLoading
                            ? Products.map((element: Product, i) => {
                                  return (
                                      <Grid key={element.id} item xl={2.4} lg={3} md={4} xs={6} p={'10px'}>
                                          <ProductitemNew key={i} products={element} />
                                      </Grid>
                                  );
                              })
                            : Array.from({ length: Products.length }).map((e, i) => {
                                  return (
                                      <Grid item lg={2.4} md={4} xs={6} sm={6} paddingBottom={4} key={i}>
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
                        <Button
                            onClick={() => {
                                redirect('/filter');
                            }}
                            variant="OutlinedRed"
                        >
                            Xem thêm
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default ProductNew;
