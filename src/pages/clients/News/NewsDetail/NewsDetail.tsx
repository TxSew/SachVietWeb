import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { formatDates } from '../../../../helpers/FortmatDate';
import { httpNews } from '../../../../submodules/controllers/http/axiosController';
import { TitleHelmet } from '../../../../constants/Helmet';

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
            {TitleHelmet('Chi tiết tin tức')}
            <Container
                sx={{
                    background: '#eee',
                    py: 2,
                }}
            >
                <Grid container position={'relative'} justifyContent={'center'}>
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
                </Grid>
            </Container>
        </Box>
    );
}

export default NewsDetail;
