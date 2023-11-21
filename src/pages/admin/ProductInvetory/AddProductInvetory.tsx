import { Box, Button, CircularProgress, FormControl, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { storage } from '../../../configs/fireBaseConfig';
import { validateForm } from '../../../helpers/validateForm';
import { httpCategory, httpProducer, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';
import { Product } from '../../../submodules/models/ProductModel/Product';
import { Producer } from '../../../submodules/models/producerModel/producer';

const AddProductInvetory = () => {
    const [urls, setUrls] = useState<string[]>([]);
    const [url, setUrl] = useState<string[]>([]);
    const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
    const [Category, setCategory] = useState<Category[]>([] as Category[]);
    const [isLoadings, setIsLoadings] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const editorRef = useRef<any>(null);
    const redirect = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchProducer();
        fetchCategory();
        fetchProduct();
    }, []);

    const fetchProducer = async () => {
        try {
            const producer: any = await httpProducer.getAll();
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
                price: product.price,
                sale: product.sale,
                desc: product.desc,
                quantity: product.quantity,
                title: product.title,
                author: product.author,
                pageNumber: product.pageNumber,
                soldQuantity: product.soldQuantity,
                size: product.size,
            });
    };

    const handleUpdateProduct = async (data: any) => {
        data.image = url[0];
        const images = urls.map((e) => {
            return {
                image: e,
            };
        });
        const ProductDto = {
            product: data,
            productImages: images,
        };

        const storeProduct = await httpProduct.put(Number(id), ProductDto);
        if (storeProduct) {
            pushSuccess('Cập nhật sản phẩm thành công');
            redirect('/admin/product');
        }
    };

    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors },
    } = useForm<Product>({});

    return (
        <Box>
            <form action="" onSubmit={handleSubmit(handleUpdateProduct)}>
                <Stack direction={'row'} justifyContent={'space-between'}>
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
                            name="title"
                            rules={{
                                validate: validateForm,
                                required: 'Tên sản phẩm không được bỏ trống!',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    disabled
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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
                                    name="categoryId"
                                    rules={{
                                        required: 'Vui lòng nhập Danh mục sản phẩm!',
                                    }}
                                    render={({ field }) => (
                                        <select
                                            disabled
                                            className=""
                                            onChange={field.onChange}
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
                                {/* Producer */}
                                <Controller
                                    control={control}
                                    disabled
                                    name="producerID"
                                    rules={{
                                        required: 'Vui lòng nhập Nhà cung cấp sản phẩm !',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <select
                                                className=""
                                                onChange={field.onChange}
                                                disabled
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
                                    Tên Tác giả
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="author"
                                    rules={{
                                        required: 'Vui lòng nhập tên tác giả!',
                                    }}
                                    render={({ field }) => (
                                        <OutlinedInput
                                            disabled
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="Vui lòng nhập tên tác giả!"
                                        />
                                    )}
                                />
                                <Typography variant="caption" color={color.error}>
                                    {errors.author && errors.author.message}
                                </Typography>
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Số trang
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="pageNumber"
                                    rules={{
                                        required: 'Vui lòng nhập số trang cho sản phẩm',
                                    }}
                                    render={({ field }) => (
                                        <OutlinedInput
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="Vui lòng nhập số trang cho sản phẩm"
                                            disabled
                                        />
                                    )}
                                />
                                <Typography variant="caption" color={color.error}>
                                    {errors.pageNumber && errors.pageNumber.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tổng số lượng đã nhập
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="author"
                                    rules={{
                                        required: 'Vui lòng nhập tên tác giả!',
                                    }}
                                    render={({ field }) => (
                                        <OutlinedInput
                                            disabled
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
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
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tổng số lượng đã bán
                                </Typography>
                                <Controller
                                    control={control}
                                    disabled
                                    name="soldQuantity"
                                    rules={{
                                        required: 'Vui lòng nhập số trang cho sản phẩm',
                                    }}
                                    render={({ field }) => (
                                        <OutlinedInput
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            disabled
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
                            name="quantity"
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    disabled
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
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

export default AddProductInvetory;
