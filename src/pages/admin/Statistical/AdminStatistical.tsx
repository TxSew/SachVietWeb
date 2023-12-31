import { Box, Container, Grid, Typography } from '@mui/material';
import { PickersShortcutsItem } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/internals/models';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi'; // Import Vietnamese locale
import { useEffect, useState } from 'react';
import { image } from '../../../assets';
import { numberFormat } from '../../../helpers/formatPrice';
import { httpStatistical } from '../../../submodules/controllers/http/axiosController';
import { StatisticalDto } from '../../../submodules/models/Statistical/Statistical';
import { color } from '../../../Theme/color';
import { ChartMOney } from './chart/ChartMoney';
import StatisticalItem from './components/StatisticalItem';
import { NavLink } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
dayjs.locale('vi');
function AdminStatistical() {
    const [StatisticalCount, setStatisticalCount] = useState<StatisticalDto>();
    const [dateRange, setDateRange] = useState<any>([]);
    const [statistical, setStatistical] = useState<number[]>([]);
    const [orderCount, setOrderCount] = useState<number[]>([]);
    const [revenue, setRevenue] = useState<any>({});
    const [statisticalToday, setStatisticalToday] = useState<any>({});
    useEffect(() => {
        const props = {
            startDate: dateRange[0],
            endDate: dateRange[1],
        } as any;

        httpStatistical.getTwelveMonthsData(props).then((res) => {
            setRevenue(res);
            const revenueByMonth = new Array(12).fill(0);
            const orderCountByMonth = new Array(12).fill(0);

            res?.data.forEach(({ month, revenue }: any) => {
                revenueByMonth[month - 1] = Number(revenue);
            });

            res?.data.forEach(({ month, orderCount }: any) => {
                orderCountByMonth[month - 1] = Number(orderCount);
            });

            setStatistical(revenueByMonth);
            setOrderCount(orderCountByMonth);
        });
    }, [dateRange]);
    useEffect(() => {
        httpStatistical.getStatisticalByToday().then((res) => {
            setStatisticalToday(res);
        });
    }, []);
    const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
        {
            label: 'Tuần này',
            getValue: () => {
                const today = dayjs();
                return [today.startOf('week'), today.endOf('week')];
            },
        },
        {
            label: '7 ngày trước',
            getValue: () => {
                const today = dayjs();
                return [today.subtract(7, 'day'), today];
            },
        },
        {
            label: 'Tháng hiện tại',
            getValue: () => {
                const today = dayjs();
                return [today.startOf('month'), today.endOf('month')];
            },
        },
        {
            label: 'Tháng sau',
            getValue: () => {
                const today = dayjs();
                const startOfNextMonth = today.endOf('month').add(1, 'day');
                return [startOfNextMonth, startOfNextMonth.endOf('month')];
            },
        },
        { label: 'Cài lại', getValue: () => [null, null] },
    ];

    const handleChange = (newDateRange: any) => {
        const datesArray: any = newDateRange.map((date: any) => new Date(date));
        setDateRange(datesArray);
    };
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
                            path="/admin/category"
                            name="Danh mục"
                            quantity={Number(StatisticalCount?.Statistical.categoryCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.quantityProduct}
                            path="/admin/product"
                            name="Sản phẩm"
                            quantity={Number(StatisticalCount?.Statistical.productCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.quantityOrder}
                            path="/admin/orders"
                            name="Đơn hàng"
                            quantity={Number(StatisticalCount?.Statistical.orderCount)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.producer}
                            path="/admin/producer"
                            name="Nhà cung cấp"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.sale}
                            path="/admin/discount"
                            name="Mã giảm giá"
                            quantity={Number(StatisticalCount?.Statistical.producerCount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticalItem
                            image={image.quantityCustomer}
                            path="/admin/customer"
                            name="Khách hàng"
                            quantity={Number(StatisticalCount?.Statistical.UserCount)}
                        />
                    </Grid>
                    <Container maxWidth="xl">
                        <Box textAlign={'center'} py={3} width="100%" margin={'0 auto'}>
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

                            <Box
                                display={'flex'}
                                justifyContent="center"
                                textAlign={'center'}
                                alignItems={'center'}
                                gap={5}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['SingleInputDateRangeField']}>
                                        <DateRangePicker
                                            onChange={handleChange}
                                            slotProps={{
                                                shortcuts: {
                                                    items: shortcutsItems,
                                                },
                                            }}
                                            slots={{ field: SingleInputDateRangeField }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <ChartMOney orderCountData={orderCount} statistical={statistical} />
                        </Box>

                        <Grid container  justifyContent={'space-evenly'} pb={4}>
                            <Grid2 xs={12} md={3.6}>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        display: 'flex',
                                        gap: 2,
                                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                        p: 2,
                                        py: 4,
                                    }}
                                >
                                    <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                                        <img src={image.price} alt="err" width="95.16px" height="66.61px" />
                                    </Grid>
                                    <Grid xs={8}>
                                        <Typography variant="body1" color="initial">
                                            Tổng doanh thu
                                        </Typography>
                                        <Typography variant="body1" color={color.sale} fontWeight="bold">
                                            {numberFormat(revenue.totalRevenue)}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid2>
                            <Grid2 xs={12} md={3.6}>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        display: 'flex',
                                        gap: 2,
                                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                        p: 2,
                                        py: 4,
                                    }}
                                >
                                    <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                                        <img src={image.quantityProduct} alt="err" width="95.16px" height="66.61px" />
                                    </Grid>
                                    <Grid xs={8}>
                                        <Typography variant="body1" color="initial">
                                            Tổng đơn hàng đã bán
                                        </Typography>
                                        <Typography variant="body1" color={color.sale} fontWeight="bold">
                                            {`${revenue.totalOrders} `}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid2>
                            <Grid2 xs={12} md={3.6}>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        display: 'flex',
                                        gap: 2,
                                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                        p: 2,
                                        py: 4,
                                    }}
                                >
                                    <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                                        <img src={image.price} alt="err" width="95.16px" height="66.61px" />
                                    </Grid>
                                    <Grid xs={8}>
                                        <Typography variant="body1" color="initial">
                                            Doanh thu hôm nay
                                        </Typography>
                                        <Typography variant="body1" color={color.sale} fontWeight="bold">
                                            {numberFormat(statisticalToday.totalMoneyByCustomer)}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid2>
                        </Grid>
                    </Container>
                </Grid>
            </Box>
        </>
    );
}

export default AdminStatistical;
