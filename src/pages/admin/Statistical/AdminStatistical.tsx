import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { image } from '../../../assets';
import { httpStatistical } from '../../../submodules/controllers/http/axiosController';
import { StatisticalDto } from '../../../submodules/models/Statistical/Statistical';
import StatisticalItem from './components/StatisticalItem';

function AdminStatistical() {
    const [StatisticalCount, setStatisticalCount] = useState<StatisticalDto>();
    useEffect(() => {
        fetchStatistical();
    }, []);
    const fetchStatistical = async () => {
        const statistical = await httpStatistical.getStatistical();
        setStatisticalCount(statistical);
    };
    return (
        <>
            <Typography variant="h3" fontSize={'30px'} fontWeight={'bold'} textTransform={'uppercase'}>
                Thống kê
            </Typography>
            <Box mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.category}
                            path=""
                            name="Danh mục"
                            quantity={Number(StatisticalCount?.Statistical.categoryCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.quantityProduct}
                            path=""
                            name="Sản phẩm"
                            quantity={Number(StatisticalCount?.Statistical.productCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.quantityOrder}
                            path=""
                            name="Đơn hàng"
                            quantity={Number(StatisticalCount?.Statistical.orderCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.producer}
                            path=""
                            name="Nhà cung cấp"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.sale}
                            path=""
                            name="Mã giảm giá"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticalItem
                            image={image.quantityCustomer}
                            path=""
                            name="Khách hàng"
                            quantity={Number(StatisticalCount?.Statistical.UserCount)}
                        />
                    </Grid>
                    <Box margin={'auto'} textAlign={'center'} py={3}>
                        <Typography
                            display={'flex'}
                            justifyContent={'center'}
                            py={2}
                            fontSize={'20px'}
                            textTransform={'uppercase'}
                            fontWeight={'bold'}
                        >
                            Thống kê doanh thu
                        </Typography>
                        <Box display={'flex'} textAlign={'center'} alignItems={'center'} gap={5}>
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Typography>Từ:</Typography>
                                <input
                                    type="date"
                                    style={{
                                        border: '1px solid #eee',
                                        padding: '4px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Typography>Đến:</Typography>
                                <input
                                    type="date"
                                    style={{
                                        border: '1px solid #eee',
                                        padding: '4px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    padding: '2px',
                                    textTransform: 'capitalize',
                                    background: '#47CA44',
                                }}
                            >
                                Lọc
                            </Button>
                        </Box>
                    </Box>
                    <Grid container display={'flex'} justifyContent={'center'} spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <StatisticalItem
                                image={image.price}
                                path=""
                                name="Sản phẩm đã bán"
                                quantity={Number(StatisticalCount?.Statistical.UserCount)}
                            />
                        </Grid>{' '}
                        <Grid item xs={12} md={6} lg={4}>
                            <StatisticalItem
                                image={image.quantityCustomer}
                                path=""
                                name="Sản phẩm "
                                quantity={Number(StatisticalCount?.Statistical.UserCount)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AdminStatistical;
