import { Box, Button, FormControl, Grid, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { color } from '../../../Theme/color';
import { pushSuccess, pushWarning } from '../../../components/Toast/Toast';
import { uploadImageFirebase } from '../../../helpers/uploadImageFIrebase';
import { validateForm } from '../../../helpers/validateForm';
import useImageUpload from '../../../hooks/useImageUpload/useImageUpload';
import { httpCategory } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const { image, handleImageChange, img } = useImageUpload();
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const category = await httpCategory.getCategory({});
        setCategory(category);
    };

    const handleAddCategory = async (data: Category) => {
        const image = await uploadImageFirebase(img);
        console.log('🚀 ~ file: Createcategory.tsx:26 ~ handleAddCategory ~ image:', image);
        // data.image = image;
        // const category: Category = data;
        // try {
        //     const categoryDto = await httpCategory.store(category);
        //     if (categoryDto) {
        //         pushSuccess('Thêm danh mục sản phẩm thành công');
        //     }
        // } catch (err) {
        //     pushWarning('tên danh mục đã tồn tại!');
        // }
    };

    const {
        handleSubmit,
        control,
        register,
        formState: { errors, isValid, isSubmitting },
    } = useForm<Category>({
        defaultValues: {
            status: '1',
            parentId: '1',
        },
    });

    return (
        <Box>
            <form action="" onSubmit={handleSubmit(handleAddCategory)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'}>
                        Thêm danh mục mới
                    </Typography>
                    {isValid && (
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Lưu'}
                        </Button>
                    )}
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={0} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                        Tên danh mục
                    </Typography>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue="" // Set an initial value here
                        rules={{
                            required: 'Tên danh mục không được bỏ trống!',
                            validate: validateForm,
                        }}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                {...register('name')}
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
                    <Typography variant="caption" color={color.error}>
                        {errors.name && errors.name?.message}
                    </Typography>

                    <Grid container mt={2} justifyContent={'space-between'}>
                        <Grid xs={5.8}>
                            <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                Danh mục cha
                            </Typography>
                            <Controller
                                control={control}
                                name="parentId"
                                rules={{
                                    required: 'Vui lòng nhập Danh mục sản phẩm!',
                                }}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <Select
                                            {...field}
                                            {...register('parentId')}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            sx={{
                                                mt: 1,
                                                '& > div': {
                                                    p: '7px',
                                                },
                                            }}
                                            defaultValue="2"
                                        >
                                            {category.map((e: any) => {
                                                return (
                                                    <MenuItem key={e.id} value={e.id}>
                                                        <em>{e.name}</em>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Typography variant="caption" color={color.error}>
                                {errors.parentId && errors.parentId.message}
                            </Typography>
                            <Grid xs={5.8}></Grid>
                        </Grid>
                    </Grid>
                    <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                        Hình ảnh danh mục
                    </Typography>
                    <OutlinedInput
                        type="file"
                        {...register('image')}
                        onChange={handleImageChange}
                        sx={{
                            mt: 1,
                            '& > input': {
                                p: '7px',
                            },
                        }}
                        fullWidth
                    />
                    {errors.image && <span>{errors.image.message}</span>}
                    {image && (
                        <div>
                            <img src={image} alt="Uploaded preview" style={{ maxWidth: '100px' }} />
                        </div>
                    )}
                    <Typography variant="caption" color={color.error}>
                        {errors.level && errors.level.message}
                    </Typography>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateCategory;
