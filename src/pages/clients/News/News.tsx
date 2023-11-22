import { Box, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

function News() {
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
                                // textDecoration: 'underline',
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
                    <Grid item xs={6} md={3} p={1}>
                        <NavLink
                            to={''}
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
                                            image="https://i1-giaitri.vnecdn.net/2023/11/13/z4838910500755-de1bffcc2069e23-9230-6096-1699869959.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=LBuARejNwxMa3l3lJtLccA"
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
                                        Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang
                                        dở Một cuộc đời dang dở
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
                                        Sách "Những điều sắp tới" của Sách "Những điều sắp tới" của Sách "Những điều sắp
                                        tới" của
                                    </Typography>
                                </Box>
                            </Grid>
                        </NavLink>
                    </Grid>{' '}
                    <Grid item xs={6} md={3} p={1}>
                        <NavLink
                            to={''}
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
                                            image="https://i1-giaitri.vnecdn.net/2023/11/13/z4838910500755-de1bffcc2069e23-9230-6096-1699869959.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=LBuARejNwxMa3l3lJtLccA"
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
                                        Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang
                                        dở Một cuộc đời dang dở
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
                                        Sách "Những điều sắp tới" của Sách "Những điều sắp tới" của Sách "Những điều sắp
                                        tới" của
                                    </Typography>
                                </Box>
                            </Grid>
                        </NavLink>
                    </Grid>{' '}
                    <Grid item xs={6} md={3} p={1}>
                        <NavLink
                            to={''}
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
                                            image="https://i1-giaitri.vnecdn.net/2023/11/13/z4838910500755-de1bffcc2069e23-9230-6096-1699869959.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=LBuARejNwxMa3l3lJtLccA"
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
                                        Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang
                                        dở Một cuộc đời dang dở
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
                                        Sách "Những điều sắp tới" của Sách "Những điều sắp tới" của Sách "Những điều sắp
                                        tới" của
                                    </Typography>
                                </Box>
                            </Grid>
                        </NavLink>
                    </Grid>{' '}
                    <Grid item xs={6} md={3} p={1}>
                        <NavLink
                            to={''}
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
                                            image="https://i1-giaitri.vnecdn.net/2023/11/13/z4838910500755-de1bffcc2069e23-9230-6096-1699869959.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=LBuARejNwxMa3l3lJtLccA"
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
                                        Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang
                                        dở Một cuộc đời dang dở
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
                                        Sách "Những điều sắp tới" của Sách "Những điều sắp tới" của Sách "Những điều sắp
                                        tới" của
                                    </Typography>
                                </Box>
                            </Grid>
                        </NavLink>
                    </Grid>{' '}
                </Grid>
            </Container>
        </Box>
    );
}

export default News;
