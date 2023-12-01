import { Box, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { httpNews } from '../../../../submodules/controllers/http/axiosController';
import { formatDates } from '../../../../helpers/FortmatDate';

function NewsDetail() {
    const { slug } = useParams();
    const [detailNew, setDetailNew] = useState<any>({});

    useEffect(() => {
        httpNews.getDetail(String(slug)).then((res) => {
            setDetailNew(res);
        });
    }, []);

    const htmlContent = detailNew ? detailNew.desc : ''; // Ha
    return (
        <Box bgcolor={'#eee'}>
            <Container
                sx={{
                    background: '#eee',
                    py: 2,
                }}
            >
                <Grid container position={'relative'}>
                    <Grid xs={12} md={8} bgcolor={'white'} p={2}>
                        <Typography
                            variant={'h1'}
                            pb={2}
                            fontSize={20}
                            fontWeight={'bold'}
                            borderBottom={'2px solid #eee'}
                        >
                            Bài viết
                        </Typography>
                        <Box py={2} position={'relative'}>
                            <CardMedia
                                component="img"
                                height={'390px'}
                                sx={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                title=""
                                image={detailNew.image}
                            />
                            <Box position={'absolute'} bottom={'16px'} bgcolor={'#0000004d'} width={'100%'} p={2}>
                                <Typography
                                    variant="h2"
                                    fontSize={20}
                                    color={'#fff'}
                                    sx={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {detailNew.title}
                                </Typography>
                                <Box display={'flex'} alignItems={'center'} gap={1} pt={2} color={'white'}>
                                    <AccessAlarmIcon
                                        sx={{
                                            fontSize: 'large',
                                        }}
                                    />
                                    <Typography variant="body1" fontSize={14}>
                                        {formatDates(detailNew.createdAt)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <div
                                className={``}
                                style={{
                                    textAlign: 'justify',
                                    fontSize: '14px',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent as unknown as TrustedHTML,
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        xs={12}
                        md={4}
                        pl={{ xs: 0, md: '24px' }}
                        pt={{ xs: 2, md: 0 }}
                        // position={'sticky'}
                        // top={0}
                        // height={'100%'}
                    >
                        <Box bgcolor={'white'} p={2} height={'100%'}>
                            <Typography
                                variant={'h1'}
                                pb={2}
                                fontSize={20}
                                fontWeight={'bold'}
                                borderBottom={'2px solid #eee'}
                            >
                                Bài viết liên quan
                            </Typography>
                            <NavLink to={''}>
                                <Grid container py={2} borderBottom={'2px solid #eee'}>
                                    <Grid xs={3.5}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                width: '100%',
                                                objectFit: 'cover',
                                            }}
                                            title=""
                                            image="https://xphone.vn/storage/images/posts/1700446263_thumb-1200x675.jpg"
                                        />
                                    </Grid>
                                    <Grid
                                        xs={8.5}
                                        pl={'10px'}
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        direction={'column'}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            textAlign={'justify'}
                                            display={'flex'}
                                            sx={{
                                                width: '100%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                WebkitLineClamp: 2,
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#008C89',
                                                },
                                            }}
                                        >
                                            Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời
                                            dang dở Một cuộc đời dang dở
                                        </Typography>
                                        <Box display={'flex'} alignItems={'center'} gap={1} color={'#ccc'}>
                                            <AccessAlarmIcon
                                                sx={{
                                                    fontSize: 'large',
                                                }}
                                            />
                                            <Typography variant="body1" fontSize={12}>
                                                Ngày đăng
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </NavLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default NewsDetail;
