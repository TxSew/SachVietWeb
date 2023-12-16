import { Box, Grid, Link, SpeedDial, SpeedDialIcon } from '@mui/material';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import CategoryNav from './components/Category/Category';
import ProductHots from './components/Products/ProductHot';
import ProductNew from './components/Products/ProductNew';
import Helmet from 'react-helmet';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function HomePage() {
    return (
        <Grid pb={2} bgcolor={'#eee'}>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <Banner />
            <CategoryNav />
            <Products />
            <ProductHots />
            <ProductNew />
            <Link href="tel:0383476296">
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'fixed', bottom: 30, right: 16 }}
                    icon={<LocalPhoneIcon />}
                ></SpeedDial>
            </Link>
        </Grid>
    );
}

export default HomePage;
