import { Box, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { httpNews } from '../../../submodules/controllers/http/axiosController';
import { useEffect, useState } from 'react';
import { New } from '../../../submodules/models/NewsModel/new';

function News() {
    const [news, setNews] = useState<any>({});
    useEffect(() => {
        httpNews.getList({}).then((response) => {
            setNews(response);
        });
    }, []);
    return (
        <Box bgcolor={'#eee'}>
            <Container
                sx={{
                    background: '#eee',
                    py: 1,
                }}
            >
                <Stack direction={'row'} py={1} alignItems={'center'} textTransform={'uppercase'}>
                    <NavLink to={'/'}>
                        <Typography
                            variant="caption"
                            color="black"
                            sx={{
                                transition: 'color .3s ease-in-out',
                                '&:hover': {
                                    color: '#008C89',
                                },
                            }}
                        >
                            Home
                        </Typography>
                    </NavLink>
                    <ChevronRightOutlinedIcon />
                    <Typography variant="caption">Tin Tức</Typography>
                </Stack>
                <Grid container bgcolor={'white'} p={1}>
                    {news?.data?.map((e: New) => {
                        return (
                            <Grid item xs={6} md={3} p={1}>
                                <NavLink
                                    to={`/news/detail/${e.slug}`}
                                    style={{
                                        color: 'black',
                                        height: '100%',
                                    }}
                                >
                                    <Grid p={2} bgcolor={'#f7f7f7'} height={'100%'}>
                                        <Box pb={3} margin={'auto'}>
                                            <NavLink to={''}>
                                                <CardMedia
                                                    component="img"
                                                    height={'170'}
                                                    sx={{
                                                        width: '100%',
                                                        objectFit: 'contain',
                                                    }}
                                                    title=""
                                                    image={e.image}
                                                />
                                            </NavLink>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant={'h2'}
                                                fontSize={'18px'}
                                                fontWeight={'bold'}
                                                height={'44px'}
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
                                                {e.title}
                                            </Typography>
                                            <Typography
                                                pt={2}
                                                variant={'body1'}
                                                fontSize={'14px'}
                                                color={'#454545'}
                                                sx={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    WebkitLineClamp: 3,
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: '#008C89',
                                                    },
                                                }}
                                            >
                                                {e.descShort}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </NavLink>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}

export default News;
