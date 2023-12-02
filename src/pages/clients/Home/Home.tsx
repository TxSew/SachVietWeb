import { Grid } from '@mui/material';
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
        </Grid>
    );
}

export default HomePage;
