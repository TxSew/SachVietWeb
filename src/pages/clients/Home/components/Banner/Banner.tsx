import { Box, Container, Grid } from '@mui/material';
// Import the Swiper library's original types
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import useMedia from '../../../../../hooks/useMedia/useMedia';
import { image } from '../../../../../assets';

function Banner() {
    const { isMediumMD } = useMedia();
    return (
        <Container maxWidth={'xl'}>
            {isMediumMD ? (
                <Grid container spacing={2} sx={{ '&.MuiGrid-root': { marginTop: 0 } }}>
                    <Grid item xs={12}>
                        <Swiper
                            navigation
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner1}
                                        alt="Banner tùy chỉnh"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner2}
                                        alt="Banner tùy chỉnh"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner3}
                                        alt="Banner tùy chỉnh"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={2} sx={{ '&.MuiGrid-root': { marginTop: 0 } }}>
                    <Grid item xs={12}>
                        <Swiper
                            navigation
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner1}
                                        alt=""
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner2}
                                        alt=""
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img
                                        src={image.banner3}
                                        alt=""
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

export default Banner;
