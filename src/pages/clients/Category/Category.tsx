import {
    Box,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Product } from '../../../submodules/models/ProductModel/Product';
import Tabbar from './components/Tabbar';
function Category() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryParams, setCategoryParams] = useSearchParams();
    const value: any = searchParams.get('q');

    const [page, setPage] = React.useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [products, setProducts] = React.useState<Product[]>([] as Product[]);
    const [sortBy, setSortBy] = React.useState('createdAt');
    const [sortWith, setSortWith] = React.useState('asc');
    const [sort, setSort] = React.useState('');

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        const value: any = searchParams.get('q');
        const searchValue = value;
        const categorySearch = searchParams.get('category');
        const props = {
            sortBy,
            sortWith,
            page,
            limit: 12,
            keyword: searchValue,
            categoryFilter: categorySearch,
        };
        fetchProducts(props);
    }, [page, sortBy, sortWith, searchParams, categoryParams]);

    const fetchProducts = async (props: any) => {
        const products: any = await httpProduct.getAll(props);
        if (products) {
            setProducts(products.products);
            setCount(products.totalPage);
        }
    };

    const handleChanges = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleChangeSort = (event: SelectChangeEvent) => {
        if (event.target.value === 'priceDown') {
            setSortBy('price_sale');
            setSortWith('desc');
            setSort(event.target.value);
        } else if (event.target.value === 'priceUp') {
            setSortBy('price_sale');
            setSortWith('asc');
            setSort(event.target.value);
        }
        if (event.target.value === 'old') {
            setSortBy('createdAt');
            setSortWith('desc');
            setSort(event.target.value);
        } else if (event.target.value === 'new') {
            setSortBy('createdAt');
            setSortWith('asc');
            setSort(event.target.value);
        }
    };

    return (
        <Box bgcolor={'#eee'} py={3}>
            <Container maxWidth={'xl'}>
                <Grid container bgcolor={color.white} py={3} px={3}>
                    <Grid item xs={3}>
                        <Tabbar />
                    </Grid>
                    <Grid item xs={9}>
                        <Box>
                            <Box>
                                {value && (
                                    <Typography
                                        sx={{
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        KẾT QUẢ TÌM KIẾM VỚI: <Typography color={color.sale}>{value}</Typography>
                                        <Typography
                                            sx={{
                                                padding: '3px 10px',
                                                border: '1px solid #ccc',
                                                borderRadius: '20px',
                                                marginLeft: '5px',
                                            }}
                                            textTransform={'lowercase'}
                                        >{`${products.length} Kết quả`}</Typography>
                                    </Typography>
                                )}
                            </Box>
                            <Stack sx={{ minWidth: 300 }} direction={'row'}>
                                <Typography>Sắp xếp:</Typography>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={sort}
                                        onChange={handleChangeSort}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>Tất cả</em>
                                        </MenuItem>
                                        <MenuItem value={'old'}>Cũ nhất</MenuItem>
                                        <MenuItem value={'new'}>Mới nhất</MenuItem>
                                        <MenuItem value={'priceDown'}>Giá từ cao tới thấp</MenuItem>
                                        <MenuItem value={'priceUp'}>Giá từ thấp tới cao</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                        <Box mt={3}>
                            <Stack direction={'row'} flexWrap={'wrap'}>
                                {products.map((item: Product, index) => {
                                    return (
                                        <Grid key={item.id} item xs={3}>
                                            <ProductItem products={item} />
                                        </Grid>
                                    );
                                })}
                            </Stack>
                            <Stack mt={2} spacing={2}>
                                <Pagination count={count} page={page} onChange={handleChanges} />
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Category;
