import { Box, Grid, SpeedDial, SpeedDialIcon } from '@mui/material';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import CategoryNav from './components/Category/Category';
import ProductHots from './components/Products/ProductHot';
import ProductNew from './components/Products/ProductNew';
import Helmet from 'react-helmet';

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
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            ></SpeedDial>
        </Grid>
    );
}

export default HomePage;
