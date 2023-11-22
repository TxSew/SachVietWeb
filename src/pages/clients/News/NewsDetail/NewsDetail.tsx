import { Box, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { NavLink } from 'react-router-dom';

function NewsDetail() {
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
                                height={'60%'}
                                sx={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                title=""
                                image="https://xphone.vn/storage/images/posts/1700446263_thumb-1200x675.jpg"
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
                                    Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở Một cuộc đời dang dở
                                    Một cuộc đời dang dở
                                </Typography>
                                <Box display={'flex'} alignItems={'center'} gap={1} pt={2} color={'white'}>
                                    <AccessAlarmIcon
                                        sx={{
                                            fontSize: 'large',
                                        }}
                                    />
                                    <Typography variant="body1" fontSize={14}>
                                        Ngày đăng
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="subtitle2" textAlign={'justify'}>
                            Hưởng ứng phong trào phòng chống AIDS, Apple đã tham gia và quyên góp một phần số tiền thu
                            được từ các sản phẩm RED (PRODUCT) Apple của mình cho Quỹ toàn cầu phòng chống AIDS. Công ty
                            Apple đã làm điều này trong 15 năm qua. Cho đến cuối năm 2022, một nửa số tiền thu được từ
                            dòng sản phẩm RED(PRODUCT) sẽ được quyên góp cho "Quỹ COVID-19 toàn cầu nhằm giảm thiểu tác
                            động của COVID‑19 trong công cuộc chấm dứt bệnh AIDS". Để "đánh dấu" sự có mặt của mình
                            trong công cuộc quyên góp tiền để phòng chống AIDS và đại dịch COVID-19, Apple cung cấp sáu
                            giao diện mặt đồng hồ Apple Watch màu đỏ cho các sản phẩm thuộc Apple Watch Series 3 trở
                            lên. Mặt đồng hồ Apple Watch Hình ảnh sáu mặt đồng hồ PRODUCT(RED) đang cho phép tải về Để
                            tương thích, Apple Watch của bạn phải được cài đặt watchOS 7.4 trở lên và được ghép nối với
                            iPhone chạy iOS 14.5 trở lên. Có sáu mặt đồng hồ (PRODUCT) RED được cung cấp, bao gồm mặt
                            đồng hồ Giờ thế giới mới (World Time), Chữ số Mono (Numerals Mono), Gradient, Sọc (Stripes),
                            Màu sắc (Color) và Kiểu chữ (Typograph). Nói rõ hơn, người dùng Apple Watch Series 3 không
                            thể tải xuống vì dòng sản phẩm này chỉ tương thích với các mặt đồng hồ Đơn sắc (Color) và
                            Chữ số (Numerals). Những người có Apple Watch Series 4 trở lên có thể chọn tải xuống tất cả
                            sáu mặt. Hướng dẫn tải về Product RED Nhấn vào "Add Apple Watch Face" để tải xuống Mặt đồng
                            hồ bạn muốn Để tải về một trong những mặt đồng hồ này, bạn phải dùng iPhone của mình để truy
                            cập vào đường dẫn bằng cách nhấn vào đây. Sau đó, cuộn xuống phần Mặt đồng hồ Apple và tìm
                            đến mặt đồng hồ bạn thích. Bên dưới mỗi lựa chọn, bạn sẽ thấy một nút có nội dung "Thêm Mặt
                            đồng hồ Apple". Bạn có thể chọn nhiều mặt đồng hồ từ trang web (PRODUCT) RED. Chỉ cần làm
                            theo hướng dẫn để thêm tất cả các lựa chọn của bạn vào menu Mặt đồng hồ của tôi bên trong
                            ứng dụng Đồng hồ. Mặt đồng hồ Giờ thế giới là giao diện vừa được Apple thêm vào Apple Watch
                            năm nay. Giao diện này khá giống với những chiếc đồng hồ Casio để bàn cũ có chứa tên các
                            thành phố ở vòng ngoài và giờ trong ngày tương ứng ở vòng trong. Giao diện World Time với
                            phong cách độc đáo, mới lạ Giao diện World Time với phong cách độc đáo, mới lạ (Nguồn:
                            Cultofmac) Apple đã huy động được 270 triệu đô la để chống lại đại dịch toàn cầu bằng doanh
                            thu của các sản phẩm (PRODUCT) RED. Trang web (PRODUCT) RED của Apple cũng cung cấp đầy đủ
                            các dòng sản phẩm (PRODUCT) RED của công ty bao gồm iPhone 11, iPhone 12, iPhone 13 và
                            iPhone SE (2020). Ốp lưng silicon màu đỏ cho dòng iPhone 13 cũng đã được lên kệ và người
                            dùng cũng có thể mua bao da cho iPhone 12 và iPhone 12 mini. Bên cạnh đó, hãng cũng cung cấp
                            Vỏ nhôm và Dây đeo thể thao dành cho Apple Watch Series 7. Trang web của hãng với các sản
                            phẩm PRODUCT(RED) Trang web của hãng với các sản phẩm thuộc Product(RED) Các thiết bị khác
                            cũng được liệt kê trên trang web là iPod touch, Tai nghe không dây Beats Solo3 và Loa di
                            động Beats Pill+. Có thể bạn chưa biết, sản phẩm (PRODUCT) RED đầu tiên là iPod nano phiên
                            bản đặc biệt được chế tác bởi U2's Bono. Cho đến nay, Apple và (RED) đã thu về 270 triệu USD
                            (khoảng 6.21 nghìn tỷ đồng) để chống lại đại dịch toàn cầu.
                        </Typography>
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
