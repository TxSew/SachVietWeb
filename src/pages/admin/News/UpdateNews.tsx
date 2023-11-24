import { Box, Button, Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';
import { uploadImageFirebase } from '../../../helpers/uploadImageFIrebase';
import { validateForm } from '../../../helpers/validateForm';
import { httpNews } from '../../../submodules/controllers/http/axiosController';
import { New } from '../../../submodules/models/NewsModel/new';

const UpdateNews = () => {
    const [img, setImg] = useState<string[]>([]);
    const [image, setImage] = useState(null);
    const editorRef = useRef<any>(null);
    const { id } = useParams();
    useEffect(() => {
        httpNews.getOne(Number(id)).then((res) => {
            reset({
                author: res.author,
                title: res.title,
                image: res.image,
                desc: res.desc,
            });
        });
    }, []);

    const handleUpdateNew = async (data: any) => {
        let thumbnail;
        if (img) thumbnail = await uploadImageFirebase(img);
        data.image = thumbnail;
        const props = {
            id: Number(id),
            ...data,
        };
        if (props) {
            httpNews.updateNew(props).then((news) => {
                if (news) {
                    pushSuccess('cập nhật bài viết thành công');
                }
            });
        }
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
        reset,
        register,
        formState: { errors },
    } = useForm<New>({
        defaultValues: {},
    });
    return (
        <Box>
            <form action="" onSubmit={handleSubmit(handleUpdateNew)}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h2" fontSize={'24px'} fontWeight={'bold'}>
                        Cập nhật Tin tức
                    </Typography>
                </Stack>
                <Grid bgcolor={color.white} p={2} container mt={3} justifyContent={'space-between'}>
                    <Grid xs={12} md={7.8} mb={3} fontSize={'20px'}>
                        <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                            Tên tiêu đề
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
                                    Ảnh nổi bật
                                </Typography>

                                <OutlinedInput
                                    onChange={handleImageChange}
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

                                {image && (
                                    <div>
                                        <img src={image} alt="Uploaded preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}
                            </Grid>
                            <Grid xs={5.8}>
                                <Typography variant="h2" fontSize={'18px'} fontWeight={'bold'}>
                                    Tên tác giả
                                </Typography>
                                <Controller
                                    control={control}
                                    name="author"
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
                                            placeholder="Vui lòng nhập tác giả cho bài viết"
                                        />
                                    )}
                                />
                                <Typography variant="caption" color={color.error}>
                                    {errors.author && errors.author.message}
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
                                            Nội dung bài viết
                                        </Typography>
                                        <Editor
                                            apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
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
                                Cập nhật
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default UpdateNews;
