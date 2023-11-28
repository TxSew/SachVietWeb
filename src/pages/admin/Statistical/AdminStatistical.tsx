import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { httpStatistical } from '../../../submodules/controllers/http/axiosController';
import { StatisticalDto } from '../../../submodules/models/Statistical/Statistical';
import { ChartMOney } from './chart/ChartMoney';
import { image } from '../../../assets';
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
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.category}
                            path=""
                            name="Danh mục"
                            quantity={Number(StatisticalCount?.Statistical.categoryCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.quantityProduct}
                            path=""
                            name="Sản phẩm"
                            quantity={Number(StatisticalCount?.Statistical.productCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.quantityOrder}
                            path=""
                            name="Đơn hàng"
                            quantity={Number(StatisticalCount?.Statistical.orderCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.producer}
                            path=""
                            name="Nhà cung cấp"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.sale}
                            path=""
                            name="Mã giảm giá"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    <Grid container display={'flex'} justifyContent={'center'} gap={2}>
                        <Grid xs={4}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    display: 'flex',
                                    gap: 2,
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                    p: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                                    <img
                                        src={image.price}
                                        style={{
                                            width: '100px',
                                            height: '65px',
                                        }}
                                        alt="err"
                                    />
                                </Grid>
                                <Grid xs={8} textAlign={'center'}>
                                    <Typography variant="body1" color="initial">
                                        Tổng tiền sản phẩm bán ra
                                    </Typography>

                                    <Typography variant="body1" color="initial">
                                        5
                                    </Typography>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    display: 'flex',
                                    gap: 2,
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                    p: 2,
                                }}
                            >
                                <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                                    <img
                                        src={image.quantityProduct}
                                        alt="err"
                                        style={{
                                            width: '100px',
                                            height: '65px',
                                        }}
                                    />
                                </Grid>
                                <Grid xs={8}>
                                    <Typography variant="body1" color="initial">
                                        Sản phẩm
                                    </Typography>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AdminStatistical;
