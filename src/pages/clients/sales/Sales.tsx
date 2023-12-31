import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import DiscountItem from '../../../components/discount/Discount';
import { TitleHelmet } from '../../../constants/Helmet';
import { httpDiscount } from '../../../submodules/controllers/http/axiosController';
import { Discount } from '../../../submodules/models/DiscountModel/Discount';

function Sales() {
    const [discount, setDiscount] = useState<any>({});
    useEffect(() => {
        const props = {};
        discountFetch(props);
    }, []);
    const discountFetch = async (props: any) => {
        const discounts = await httpDiscount.getAll(props);
        setDiscount(discounts);
    };

    return (
        <Grid bgcolor={'#e95271'}>
            {TitleHelmet('Khuyến mãi')}
            <Box>
                <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/YearEndSaleT1223_MainBanner_1920x700.png"
                    alt=""
                />
            </Box>
            <Grid
                container
                maxWidth={'xl'}
                sx={{
                    margin: '0 auto',
                }}
            >
                <Box
                    sx={{
                        margin: '0 auto',
                    }}
                >
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/NoelCMST1123_LDP_Tagname4.jpg" alt="" />
                </Box>
            </Grid>
            <Container>
                <Grid container maxWidth={'xl'} mt={2}>
                    {discount?.data?.map((e: Discount) => {
                        return (
                            <Grid item xs={12} md={4} mb={2} ml={'-8px'}>
                                <DiscountItem
                                    id={e.id}
                                    code={e.code}
                                    expiration_date={e.expiration_date}
                                    desc={e.desc}
                                    number_used={e.number_used}
                                    limit_number={e.limit_number}
                                    payment_limit={e.payment_limit}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
            <Box width={'10px'} height={'30px'}></Box>
        </Grid>
    );
}

export default Sales;
