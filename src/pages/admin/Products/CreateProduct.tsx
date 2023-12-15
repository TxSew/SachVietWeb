import { Box, Button, FormControl, Grid, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { storage } from '../../../configs/fireBaseConfig';
import { uploadImageFirebase } from '../../../helpers/uploadImageFIrebase';
import { validateForm } from '../../../helpers/validateForm';
import { httpCategory, httpProducer, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Category } from '../../../submodules/models/ProductModel/Category';
import { Product } from '../../../submodules/models/ProductModel/Product';
import { Producer } from '../../../submodules/models/producerModel/producer';
import { TitleHelmet } from '../../../constants/Helmet';

const CreateProduct = () => {
    const [urls, setUrls] = useState<any[]>([]);
    const [img, setImg] = useState<string[]>([]);
    const [imgs, setImgs] = useState<any>({});
    const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
    const [image, setImage] = useState(null);
    const [Category, setCategory] = useState<Category[]>([] as Category[]);
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [imageFiles, setImageFiles] = useState<any[]>([]);
    const editorRef = useRef<any>(null);
    const redirect = useNavigate();

    useEffect(() => {
        fetchProducer();
        fetchCategory();
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

    const uploadImages = async () => {
        const storageRef = storage.ref();

        const uploadTasks = imageFiles.map((file) => {
            const uploadTask = storageRef.child(`imageUpload/${file.name}`).put(file);
            return uploadTask;
        });

        const uploadedUrls = await Promise.all(
            uploadTasks.map(async (task) => {
                try {
                    const snapshot = await task;
                    const downloadUrl = await snapshot.ref.getDownloadURL();
                    return downloadUrl;
                } catch (error) {
                    console.error('Error uploading file:', error);
                    return null;
                }
            })
        );

        return uploadedUrls.filter((url: any) => url !== null);
    };

    const handleAddProduct = async (data: any) => {
        const image = await uploadImageFirebase(img);
        const images = await uploadImages();
        data.image = image;
        const thumb = images.map((e) => {
            return {
                image: e,
            };
        });
        const { productImages, ...rest } = data;
        const ProductDto = {
            product: rest,
            productImages: thumb,
        };
        const storeProduct = await httpProduct.post(ProductDto);
        if (storeProduct) pushSuccess('Thêm sản phẩm thành công');
        reset({});
    };

    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors },
    } = useForm<Product>({
        defaultValues: {
            producerID: undefined,
            categoryId: undefined,
            sale: 0,
        },
    });
    return (
        <Box>
            {TitleHelmet('Thêm sản phẩm')}
            <form action="" onSubmit={handleSubmit(handleAddProduct)}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'} textTransform={'uppercase'}>
                        Thêm sản phẩm mới
                    </Typography>
                    <Button type="submit" variant="contained">
                        Lưu
                    </Button>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Grid xs={12} md={7.8} mb={3} fontSize={'20px'}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Tên sản phẩm <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="title"
                            defaultValue=""
                            rules={{
                                validate: validateForm,
                                required: 'Tên sản phẩm không được bỏ trống!',
                            }}
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
                        <Typography variant="caption" color={color.error}>
                            {errors.title && errors.title.message}
                        </Typography>
                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Loại sản phẩm <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                </Typography>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    rules={{
                                        required: 'Vui lòng nhập Danh mục sản phẩm!',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <Select
                                                {...field}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                sx={{
                                                    mt: 1,
                                                    '& > div': {
                                                        p: '7px',
                                                    },
                                                }}
                                            >
                                                {Category.map((e: any, i) => {
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
                                    {errors.categoryId && errors.categoryId.message}
                                </Typography>
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Nhà xuất bản <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                </Typography>
                                <Controller
                                    control={control}
                                    name="producerID"
                                    rules={{
                                        required: 'Vui lòng nhập Nhà cung cấp sản phẩm !',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <Select
                                                {...field}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                sx={{
                                                    mt: 1,
                                                    '& > div': {
                                                        p: '7px',
                                                    },
                                                }}
                                            >
                                                {Producer.map((e: Producer) => {
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
                                    {errors.producerID && errors.producerID.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tên Tác giả <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                </Typography>
                                <Controller
                                    control={control}
                                    name="author"
                                    rules={{
                                        required: 'Vui lòng nhập tên tác giả!',
                                    }}
                                    render={({ field }) => (
                                        <OutlinedInput
                                            type="text"
                                            {...field}
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
                                    Số trang <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                </Typography>
                                <Controller
                                    control={control}
                                    name="pageNumber"
                                    rules={{
                                        required: 'Vui lòng nhập số trang cho sản phẩm',
                                    }}
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
                                            placeholder="Vui lòng nhập số trang cho sản phẩm"
                                        />
                                    )}
                                />
                                <Typography variant="caption" color={color.error}>
                                    {errors.pageNumber && errors.pageNumber.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box>
                            <Controller
                                control={control}
                                name="desc"
                                render={({ field }) => (
                                    <>
                                        <Typography variant="h2" mt={3} fontSize={'18px'} fontWeight={'bold'}>
                                            Chi tiết sản phẩm
                                        </Typography>
                                        <Editor
                                            apiKey="y6r6bf309zyr8a2wfdmqtbg9k3ppxi62522uau0w63mssgiz"
                                            onInit={(evt, editor) => (editorRef.current = editor)}
                                            {...field}
                                            onEditorChange={(e) => field.onChange(e)}
                                            value={field.value}
                                            {...register('desc')}
                                            init={{
                                                height: 350,
                                                menubar: false,
                                                image_title: true,
                                                automatic_uploads: true,
                                                file_picker_types: 'image',
                                                file_picker_callback: function (callback, value, meta) {
                                                    if (meta.filetype == 'file') {
                                                        callback('mypage.html', { text: 'My text' });
                                                    }
                                                    if (meta.filetype == 'image') {
                                                        callback('myimage.jpg', { alt: 'My alt text' });
                                                    }
                                                    if (meta.filetype == 'media') {
                                                        callback('movie.mp4', {
                                                            source2: 'alt.ogg',
                                                            poster: 'image.jpg',
                                                        });
                                                    }
                                                },
                                                plugins: [
                                                    'advlist',
                                                    'autolink',
                                                    'link',
                                                    'image',
                                                    'lists',
                                                    'charmap',
                                                    'preview',
                                                    'anchor',
                                                    'pagebreak',
                                                    'searchreplace',
                                                    'wordcount',
                                                    'visualblocks',
                                                    'visualchars',
                                                    'code',
                                                    'fullscreen',
                                                    'insertdatetime',
                                                    'media',
                                                    'table',
                                                    'emoticons',
                                                    'template',
                                                    'help',
                                                ],
                                                toolbar:
                                                    ' undo redo | link image | code |undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                                                content_style:
                                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            }}
                                        />
                                    </>
                                )}
                            />
                            <Typography variant="caption" color={color.error}>
                                {errors.desc && errors.desc.message}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={3.8}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Kích thước <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập kích thước sản phẩm',
                            }}
                            name="size"
                            render={({ field }) => (
                                <OutlinedInput
                                    type="text"
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& > input': {
                                            p: '7px',
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Vui lòng nhập kích thước sản phẩm"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.size && errors.size.message}
                        </Typography>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'} mt={2}>
                            Giá gốc <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="price"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhâp giá gốc',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Nhập số tiền gốc phải bắt buộc 3 số trở lên',
                                },
                            }}
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
                                    placeholder="Giá không được để trống!"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.price && errors.price.message}
                        </Typography>

                        <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                            Khuyến mãi
                        </Typography>
                        <Controller
                            control={control}
                            name="sale"
                            rules={{
                                maxLength: {
                                    value: 2,
                                    message: 'Nhập số giảm giá không được nhập quá 99%',
                                },

                                minLength: {
                                    value: 1,
                                    message: 'Nhập số giảm giá trên 1%',
                                },
                            }}
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
                                    placeholder="Giá không được để trống!"
                                />
                            )}
                        />
                        <Typography variant="caption" color={color.error}>
                            {errors.sale && errors.sale.message}
                        </Typography>
                        <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                            Số lượng <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                        </Typography>
                        <Controller
                            control={control}
                            name="quantity"
                            rules={{
                                required: 'Vui lòng nhập số lượng sản phẩm!',
                            }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    type="number"
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
                            {errors.quantity && errors.quantity.message}
                        </Typography>

                        <FormControl>
                            <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                                Ảnh nổi bật <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                            </Typography>

                            <Controller
                                name="image"
                                rules={{
                                    required: { value: true, message: 'Vui lòng chọn ảnh nổi bật cho sản phẩm' },
                                }}
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <OutlinedInput
                                            {...field}
                                            onChange={(event: any) => {
                                                const file = event.target.files[0];
                                                setImg(event.target.files);
                                                if (file) {
                                                    const reader: any = new FileReader();
                                                    reader.onloadend = () => {
                                                        setImage(reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                                field.onChange(event);
                                            }}
                                            type="file"
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="Vui lòng nhập Ten của bạn!"
                                        />
                                    );
                                }}
                            />
                            <Typography variant="caption" color={color.error}>
                                {errors.image && errors.image.message}
                            </Typography>
                        </FormControl>

                        {image && (
                            <div>
                                <img src={image} alt="Uploaded preview" style={{ maxWidth: '100px' }} />
                            </div>
                        )}

                        <Controller
                            name="productImages"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <FormControl>
                                        <Typography variant="h2" mt={2} fontSize={'18px'} fontWeight={'bold'}>
                                            Ảnh chi tiết
                                        </Typography>
                                        <OutlinedInput
                                            {...field}
                                            type="file"
                                            onChange={(event: any) => {
                                                const files = event.target.files;
                                                const selectedFiles = event.target.files;
                                                setImageFiles([...imageFiles, ...selectedFiles]);
                                                setImgs(files);
                                                const fileArray = Array.from(files);
                                                field.onChange(event);
                                                Promise.all(
                                                    fileArray.map((file: any) => {
                                                        return new Promise((resolve, reject) => {
                                                            const reader = new FileReader();
                                                            reader.onload = (e: any) => {
                                                                resolve(e.target.result);
                                                            };
                                                            reader.onerror = (e) => {
                                                                reject(e);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        });
                                                    })
                                                ).then((results) => {
                                                    setSelectedFiles(results);
                                                });
                                            }}
                                            inputProps={{ multiple: true }}
                                            sx={{
                                                mt: 1,
                                                '& > input': {
                                                    p: '7px',
                                                },
                                            }}
                                            fullWidth
                                            placeholder="Vui lòng nhập Ten của bạn!"
                                        />
                                    </FormControl>
                                );
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '2px',
                            }}
                        >
                            {selectedFiles.map((dataUrl: any, index: number) => (
                                <img
                                    key={index}
                                    src={dataUrl}
                                    alt={`preview-${index}`}
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        margin: '5px',
                                        border: '2px solid #ccc',
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateProduct;
