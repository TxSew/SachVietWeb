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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { TitleHelmet } from '../../../constants/Helmet';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import useMedia from '../../../hooks/useMedia/useMedia';
import { httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Product } from '../../../submodules/models/ProductModel/Product';
import Tabbar from './components/Tabbar';
export interface props {
    handleChanges: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function Category() {
    const { isMediumMD } = useMedia();
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryParams, setCategoryParams] = useSearchParams();
    const value: any = searchParams.get('q');
    const [sale, setSale] = React.useState('');
    const [page, setPage] = React.useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [products, setProducts] = React.useState<Product[]>([] as Product[]);
    const [sortBy, setSortBy] = React.useState('createdAt');
    const [sortWith, setSortWith] = React.useState('asc');
    const [producer, setProducer] = React.useState('');
    const [values, setValue] = useState<any[]>([1, 0] as any[]);
    const [sort, setSort] = React.useState('');

    const redirect = useNavigate();
    const handelSale = (event: any) => {
        setSale(event.target.value);
        redirect('/filter');
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const debouncedInputValue = useDebounce(values, 700);

    useEffect(() => {
        const value: any = searchParams.get('q');
        const searchValue = value;
        const categorySearch = searchParams.get('category');
        const filterSale = searchParams.get('sale');
        const props = {
            sortBy,
            sortWith,
            page,
            limit: 24,
            keyword: searchValue,
            categoryFilter: categorySearch,
            filter: filterSale ? 1 : sale,
            sortMinPrice: debouncedInputValue[0],
            sortMaxPrice: debouncedInputValue[1],
            producerFilter: producer,
        };

        fetchProducts(props);
    }, [page, sortBy, sortWith, searchParams, categoryParams, sale, debouncedInputValue, producer]);

    const fetchProducts = async (props: any) => {
        const products: any = await httpProduct.getAll(props);
        if (products) {
            setProducts(products.products);
            setCount(products.totalPage);
        }
    };

    const handelChangePrice = (event: any) => {
        if (event.target.value === 'max150') {
            setValue([1, 150000]);
        } else if (event.target.value === 'max300') {
            setValue([150000, 300000]);
        }
        if (event.target.value === 'max500') {
            setValue([300000, 500000]);
        } else if (event.target.value === 'max700') {
            setValue([500000, 700000]);
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

    const handleCHnage = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handelSortProducer = (event: any) => {
        setProducer(event.target.value);
    };

    return (
        <Box bgcolor={'#eee'} py={3}>
            {TitleHelmet('Danh mục sản phẩm')}

            <Container maxWidth={'xl'}>
                <Grid container bgcolor={color.white} py={3} px={3}>
                    <Grid item className="hiddenTab" xs={12} md={3}>
                        <Tabbar
                            handlePrice={handelChangePrice}
                            handleChange={handleCHnage}
                            valueSlider={values}
                            handleProducer={handelSortProducer}
                        />
                    </Grid>
                    <Grid item xs={isMediumMD ? 12 : 9}>
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
                            <Stack direction={'row'} justifyContent={isMediumMD ? 'space-between' : 'flex-start'}>
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
                                        <MenuItem value={'priceUp'}>Giá từ cao tới thấp</MenuItem>
                                        <MenuItem value={'priceDown'}>Giá từ thấp tới cao</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={sale}
                                        onChange={handelSale}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={''}>Mặc định</MenuItem>
                                        <MenuItem value={1}>Sản phẩm giảm giá</MenuItem>
                                        <MenuItem value={2}>Sản phẩm bán chạy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                        <Box mt={3}>
                            <Grid container>
                                {products.map((item: Product, index) => {
                                    return (
                                        <Grid key={item.id} item xs={6} md={4} lg={3} p={'10px'}>
                                            <ProductItem products={item} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
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
