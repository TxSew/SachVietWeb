import { Box, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import DiscountItem from '../../../components/discount/Discount';
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
        <Grid bgcolor={'#241a32'}>
            <Box>
                <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/FahasaSaleThu3_W3_T1023_banner_Mainbanner_1920x700.jpg"
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
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/banner-halloween-t3-2.gif" alt="" />
                </Box>
            </Grid>
            <Grid container maxWidth={'xl'}>
                <Stack margin={'0 auto'} direction={'row'} spacing={3}>
                    {discount?.data?.map((e: Discount) => {
                        return (
                            <DiscountItem
                                id={e.id}
                                code={e.code}
                                expiration_date={e.expiration_date}
                                desc={e.desc}
                                number_used={e.number_used}
                                limit_number={e.limit_number}
                            />
                        );
                    })}
                </Stack>
            </Grid>
            <Box width={'10px'} height={'30px'}></Box>
        </Grid>
    );
}

export default Sales;
