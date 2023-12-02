import { Box, Button, FormControl, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { httpCategory, httpProducer, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';
import { Product } from '../../../submodules/models/ProductModel/Product';
import { Producer } from '../../../submodules/models/producerModel/producer';
import { TitleHelmet } from '../../../constants/Helmet';

const AddProductInventory = () => {
    const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
    const [Category, setCategory] = useState<Category[]>([] as Category[]);
    const redirect = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchProducer();
        fetchCategory();
        fetchProduct();
    }, []);

    const fetchProducer = async () => {
        try {
            const producer: any = await httpProducer.getAll({});
            setProducer(producer.producers);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCategory = async () => {
        try {
            const category: any = await httpCategory.getCategory({});
            setCategory(category);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchProduct = async () => {
        const product: Product = await httpProduct.getOneUpdate(Number(id));
        if (product)
            reset({
                producerID: product.producerID,
                categoryId: product.categoryId,
                quantity: product.quantity,
                title: product.title,
                author: product.author,
                soldQuantity: product.soldQuantity,
                soldInventory: product.soldInventory,
            });
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Product>({});

    const handleUpdateProductInventory = async (data: any) => {
        console.log(data);
        const props = {
            id: id,
            ...data,
        };
        httpProduct.updateProductInventory(props).then((response) => {
            if (response.message) {
                pushSuccess('Nhập hàng thành công');
                redirect('/admin/productInventory');
            }
        });
    };
    return (
        <Box>
            {TitleHelmet('Cập nhật Hàng')}
            <form action="" onSubmit={handleSubmit(handleUpdateProductInventory)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Nhập hàng
                    </Typography>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Grid xs={12} md={7.8} mb={3} fontSize={'20px'}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Tên sản phẩm
                        </Typography>
                        <Controller
                            control={control}
                            disabled
                            name="title"
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập Ten của bạn!"
                                />
                            )}
                        />

                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Loại sản phẩm
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="categoryId"
                                    render={({ field }) => (
                                        <select
                                            className=""
                                            value={field.value}
                                            style={{
                                                marginTop: '10px',
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                padding: '8px 20px',
                                                borderRadius: '3px',
                                                fontSize: '14px',
                                                color: 'gray',
                                            }}
                                        >
                                            <option value="">-- Chọn Danh Mục --</option>
                                            {Category.map((e) => {
                                                return <option value={e.id}>{e.name}</option>;
                                            })}
                                        </select>
                                    )}
                                />
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Nhà cung cấp
                                </Typography>
                                <Controller
                                    control={control}
                                    name="producerID"
                                    disabled
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <select
                                                className=""
                                                value={field.value}
                                                style={{
                                                    marginTop: '10px',
                                                    width: '100%',
                                                    border: '1px solid #ccc',
                                                    padding: '8px 20px',
                                                    borderRadius: '3px',
                                                    fontSize: '14px',
                                                    color: 'gray',
                                                }}
                                            >
                                                <option value="">-- Chọn Nhà cung cấp --</option>
                                                {Producer.map((e) => {
                                                    return <option value={e.id}>{e.name}</option>;
                                                })}
                                            </select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tổng số lượng đã bán
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="soldQuantity"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            type="number"
                                            {...field}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="0"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tổng số lượng đã nhập
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="soldInventory"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            type="number"
                                            {...field}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="0"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Số lượng còn của trong kho
                        </Typography>
                        <Controller
                            control={control}
                            disabled
                            name="quantity"
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                />
                            )}
                        />
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Nhập số lượng nhập thêm
                        </Typography>
                        <Controller
                            control={control}
                            name="newQuantity"
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                />
                            )}
                        />
                        <Grid
                            sx={{
                                mt: 3,
                                display: 'flex',
                                justifyContent: 'right',
                            }}
                        >
                            <Button type="submit" variant="contained">
                                Nhập
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProductInventory;
