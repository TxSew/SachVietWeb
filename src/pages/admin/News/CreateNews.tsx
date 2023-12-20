import { Box, Button, FormControl, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { uploadImageFirebase } from '../../../helpers/uploadImageFIrebase';
import { validateForm } from '../../../helpers/validateForm';
import { httpNews } from '../../../submodules/controllers/http/axiosController';
import { New } from '../../../submodules/models/NewsModel/new';

const CreateNews = () => {
    const [img, setImg] = useState<string[]>([]);
    const [image, setImage] = useState(null);
    const editorRef = useRef<any>(null);
    const handleAddNew = async (data: any) => {
        const image = await uploadImageFirebase(img);
        data.image = image;
        const props = {
            ...data,
        };

        httpNews.createNew(props).then((news) => {
            pushSuccess('Thêm bài viết mới thành công');
        });
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setImg(event.target.files);
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm<New>({
        defaultValues: {},
    });
    return (
        <Box>
            <form action="" onSubmit={handleSubmit(handleAddNew)}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'}>
                        Thêm Tin tức
                    </Typography>
                </Stack>
                <Grid bgcolor={color.white} container mt={3} justifyContent={'space-between'}>
                    <Grid fontSize={'20px'}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Controller
                                    control={control}
                                    name="title"
                                    defaultValue=""
                                    rules={{
                                        validate: validateForm,
                                        required: 'Tên sản phẩm không được bỏ trống!',
                                    }}
                                    render={({ field }) => (
                                        <FormControl>
                                            <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                                Tên tiêu đề{' '}
                                                <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                            </Typography>
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
                                            <Typography variant="caption" color={color.error}>
                                                {errors.title && errors.title.message}
                                            </Typography>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid xs={5.8}>
                                <Controller
                                    control={control}
                                    name="author"
                                    rules={{
                                        required: 'Vui lòng nhập tên tác giả',
                                    }}
                                    render={({ field }) => (
                                        <FormControl>
                                            <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                                Tên tác giả
                                                <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                            </Typography>
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
                                                placeholder="Vui lòng nhập tác giả cho bài viết"
                                            />
                                            <Typography variant="caption" color={color.error} mt={1}>
                                                {errors.author && errors.author.message}
                                            </Typography>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container mt={2} justifyContent={'space-between'}>
                            <Grid xs={5.8}>
                                <Controller
                                    name="image"
                                    control={control}
                                    rules={{
                                        required: 'Hình ảnh tin tức không được để trống',
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <FormControl>
                                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                                    Ảnh nổi bật
                                                    <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                                </Typography>
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
                                                    placeholder="Vui lòng nhập tiêu đề bài viết!"
                                                />
                                                <Typography color={color.error} mt={1}>
                                                    {errors.image && errors.image.message}
                                                </Typography>
                                            </FormControl>
                                        );
                                    }}
                                />

                                {image && (
                                    <div>
                                        <img src={image} alt="Uploaded preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Mô tả
                                    <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
                                </Typography>
                                <Controller
                                    control={control}
                                    name="descShort"
                                    defaultValue=""
                                    rules={{
                                        required: 'Vui lòng nhập mô tả ngắn',
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
                                            placeholder="Vui lòng nhập mô tả ngắn!"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box>
                            <Controller
                                control={control}
                                name="desc"
                                render={({ field }) => (
                                    <>
                                        <Typography variant="h2" mt={3} fontSize={'18px'} fontWeight={'bold'}>
                                            Nội dung bài viết
                                            <span style={{ color: color.error, fontSize: '15px' }}>(*)</span>
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
                        <Stack direction={'row'} justifyContent={'end'} mt={1}>
                            <Button type="submit" variant="contained">
                                Thêm
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateNews;
