import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Pagination,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    tableCellClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { image as thumbnail } from '../../../assets/index';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';

import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { color } from '../../../Theme/color';
import ImageMagnifier from '../../../components/ImageMagnifier/ImageMagnifier';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { pushWarning } from '../../../components/Toast/Toast';
import { TitleHelmet } from '../../../constants/Helmet';
import { numberFormat } from '../../../helpers/formatPrice';
import useMedia from '../../../hooks/useMedia/useMedia';
import { addToCart } from '../../../redux/features/cart/CartProducer';
import { RootState } from '../../../redux/storeClient';
import { httpComment, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Product } from '../../../submodules/models/ProductModel/Product';
import CommentItem from './components/comments/CommentItem';

import { Link } from 'react-router-dom';
import './index.css';
export const Details = () => {
    const { isMediumMD } = useMedia();
    const [TextMore, setTextMore] = useState(false);
    const [RelatedProduct, setRelatedProduct] = useState<Product[]>([]);
    const redirect = useNavigate();
    const [Detail, setDetail] = useState<Product>({});
    const [image, setImage] = useState<string>('');
    const [comments, setComments] = useState<any>({});

    const [quantity, setQuantity] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const { id } = useParams();
    const Id: any = id;

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [id]);

    useEffect(() => {
        const props = {
            page: page,
        };
        FetchProductOne(props);
    }, [id, page]);

    const FetchProductOne = async (items: any) => {
        try {
            const detailValue = await httpProduct.getOne(Id);
            const props = { productId: detailValue.product.id, ...items };
            httpComment.getCommentByProduct(props).then((res) => {
                setComments(res);
            });
            setDetail(detailValue.product);
            setRelatedProduct(detailValue.relatedProducts);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToCart = (detail: any, quantity: number) => {
        const props = {
            productId: detail.id,
            quantity: Number(quantity),
        };

        httpProduct
            .checkQuantity(props)
            .then((response) => {
                if (response.message === 'quantity successfully')
                    dispatch(
                        addToCart({
                            products: detail,
                            quantity: Number(quantity),
                        })
                    );
                setQuantity(1);
            })
            .catch((error: any) => {
                if (error?.response?.data?.message == 'quantity exceeds quantity Inventory') {
                    pushWarning(`Số lượng yêu cầu cho ${quantity} không có sẵn`);
                }
            });
    };

    const handleOrder = (detail: any, quantity: number) => {
        const props = {
            productId: detail.id,
            quantity: Number(quantity),
        };
        httpProduct
            .checkQuantity(props)
            .then((response) => {
                if (response.message === 'quantity successfully')
                    dispatch(
                        addToCart({
                            products: detail,
                            quantity: Number(quantity),
                        })
                    );
                setQuantity(1);
                redirect('/cart');
            })
            .catch((error: any) => {
                if (error?.response?.data?.message == 'quantity exceeds quantity Inventory') {
                    pushWarning(`Số lượng yêu cầu cho ${quantity} không có sẵn`);
                }
            });
    };
    const handleChangeImage = (e: any) => {
        setImage(e.image);
    };

    const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#f5f5f5',
            color: '#fff',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            border: 'none',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
        '&:last-child td, &:last-child th': {
            border: 'none',
        },
    }));

    const htmlContent = Detail ? Detail.desc : '';
    const [value, setTab] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(Number(value));
    };

    return (
        <Box bgcolor={'#eee'}>
            {TitleHelmet('Chi tiết sản phẩm')}
            <Container maxWidth="xl">
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                        py: '10px',
                        color: color.text_color,
                    }}
                >
                    <Link
                        style={{ color: color.text_color }}
                        color={color.text_color}
                        to={`/filter?category=${Detail?.category?.slug}`}
                    >
                        <Typography
                            color={'#1d1c1cde !important'}
                            variant="caption"
                            fontSize={isMediumMD ? '13px' : '15px'}
                            fontWeight={'bold'}
                        >
                            {Detail?.category?.name}
                        </Typography>
                    </Link>
                    <Link to={''} color={color.text_color} style={{ color: color.text_color }}>
                        <Typography
                            variant="caption"
                            color={'#1d1c1cde !important'}
                            fontWeight={'bold'}
                            sx={
                                isMediumMD
                                    ? {
                                          overflow: 'hidden',
                                          display: '-webkit-box',
                                          lineClamp: 2,
                                          fontSize: '13px',
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: 'vertical',
                                      }
                                    : {
                                          overflow: 'hidden',
                                          display: '-webkit-box',
                                          lineClamp: 2,
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: 'vertical',
                                      }
                            }
                        >
                            {Detail?.title}
                        </Typography>
                    </Link>
                </Breadcrumbs>

                <Box pb={2}>
                    <Grid container bgcolor={'#fff'} p={2}>
                        <Grid item xs={12} md={5} pb={3}>
                            <Box mx={'auto'} display={'flex'}>
                                <Grid container display={'flex'} spacing={2}>
                                    {!isMediumMD ? (
                                        <Grid direction={'column'} xs={12} margin={'auto'} md={3} spacing={1} p={2}>
                                            <img
                                                src={Detail?.image}
                                                style={{
                                                    border: '2px solid #eee',
                                                    objectFit: 'contain',
                                                    marginBottom: '2px',
                                                }}
                                                onClick={() => handleChangeImage(Detail.image)}
                                                width={'70px'}
                                                height={'60px'}
                                                alt=""
                                            />
                                            <Box width={'70px'} mt={'4px'} height={'190px'}>
                                                <Swiper
                                                    direction={'vertical'}
                                                    watchSlidesProgress={true}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    slidesPerView={3}
                                                    spaceBetween={20}
                                                >
                                                    {Detail?.productImages?.map((e: any, i: number) => {
                                                        return (
                                                            <SwiperSlide>
                                                                <img
                                                                    key={i}
                                                                    src={e.image}
                                                                    style={{
                                                                        height: '60px',
                                                                        border: '2px solid #eee',
                                                                    }}
                                                                    alt=""
                                                                    onClick={() => handleChangeImage(e)}
                                                                />
                                                            </SwiperSlide>
                                                        );
                                                    })}
                                                </Swiper>
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}

                                    {!isMediumMD ? (
                                        <Grid justifyContent={'center'} xs={12} md={9} spacing={2} p={2}>
                                            <Box sx={{ padding: '0 64px 0 0' }}>
                                                <ImageMagnifier
                                                    width="100%"
                                                    height="300px"
                                                    src={String(image ? image : Detail.image)}
                                                />
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <Grid justifyContent={'center'} xs={12} md={9} spacing={2}>
                                            <Box sx={{ padding: '0 64px' }}>
                                                <ImageMagnifier width="100%" src={String(Detail.image)} />
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                            <Stack
                                direction={'row'}
                                spacing={2}
                                mx={'auto'}
                                textAlign={'center'}
                                justifyContent={'center'}
                                mt={3}
                            >
                                {isMediumMD ? (
                                    <></>
                                ) : (
                                    <>
                                        {Number(Detail.quantity) <= 0 ? (
                                            <Typography
                                                sx={{
                                                    padding: '5px 20px',
                                                    border: '1px solid gray',
                                                    color: 'gray',
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                Hết hàng
                                            </Typography>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: '#F7941E',
                                                        borderColor: '#F7941E',
                                                        fontWeight: 'bold',
                                                        '&:hover': {
                                                            borderColor: '#008C89',
                                                            backgroundColor: '#008C89',
                                                            color: 'white',
                                                        },
                                                    }}
                                                    onClick={() => handleAddToCart(Detail, quantity)}
                                                >
                                                    Thêm vào giỏ hàng
                                                </Button>
                                                <Button
                                                    onClick={() => handleOrder(Detail, quantity)}
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#008C89',
                                                        '&:hover': {
                                                            backgroundColor: '#F7941E',
                                                            color: 'white',
                                                        },
                                                    }}
                                                    variant="containedGreen"
                                                >
                                                    Mua ngay
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box p={2}>
                                <Typography
                                    variant="h1"
                                    fontSize={isMediumMD ? '17px' : '22.1px'}
                                    textTransform={'capitalize'}
                                    fontWeight={500}
                                    sx={{
                                        textTransform: 'capitalize',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        lineClamp: 3,
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {Detail?.title}
                                </Typography>
                                <Box mt={3}>
                                    <Stack
                                        rowGap={2}
                                        direction={'row'}
                                        justifyContent={'space-between'}
                                        flexWrap={'wrap'}
                                    >
                                        <Stack direction={'row'} spacing={1}>
                                            <Typography>Nhà xuất bản</Typography>
                                            <Typography fontWeight={'bold'} color={'primary'}>
                                                <NavLink
                                                    to=""
                                                    style={{
                                                        color: '#1976D2',
                                                    }}
                                                >
                                                    {Detail?.producer?.name}
                                                </NavLink>
                                            </Typography>
                                        </Stack>
                                        <Stack direction={'row'} spacing={1}>
                                            <Typography>Tác giả:</Typography>
                                            <Typography fontWeight={'bold'}>
                                                <NavLink
                                                    to=""
                                                    style={{
                                                        color: '#1976D2',
                                                    }}
                                                >
                                                    {Detail?.author}
                                                </NavLink>
                                            </Typography>
                                        </Stack>
                                        <Stack direction={'row'} spacing={1}>
                                            <Typography>Loại sản phẩm:</Typography>
                                            <Typography fontWeight={'bold'}>
                                                <NavLink
                                                    to=""
                                                    style={{
                                                        color: '#1976D2',
                                                    }}
                                                >
                                                    {Detail?.category?.name}
                                                </NavLink>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>

                                <Box>
                                    <Stack direction={'row'} spacing={2} mt={2}>
                                        <Typography
                                            className="price"
                                            color={color.price}
                                            fontSize={25}
                                            fontWeight={'bold'}
                                            sx={
                                                isMediumMD
                                                    ? {
                                                          fontSize: '17px',
                                                      }
                                                    : {}
                                            }
                                        >
                                            {`${numberFormat(Number(Detail.price_sale))} `}
                                        </Typography>
                                        <Typography
                                            className="price"
                                            fontSize={15}
                                            sx={
                                                isMediumMD
                                                    ? {
                                                          fontSize: '17px',
                                                          textDecoration: 'line-through',
                                                      }
                                                    : {
                                                          textDecoration: 'line-through',
                                                      }
                                            }
                                        >
                                            {Detail.sale ? `${numberFormat(Number(Detail.price))} ` : ''}
                                        </Typography>

                                        {Detail.sale ? (
                                            <Typography
                                                variant="caption"
                                                bgcolor={color.sale}
                                                color={color.white}
                                                p={'3px 10px'}
                                                borderRadius={'3px'}
                                            >
                                                {`-${Detail?.sale}%`}
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                    </Stack>
                                </Box>
                                <Box mt={2}>
                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                        <Stack direction={'row'} spacing={2}>
                                            <Typography>Chia sẻ:</Typography>
                                            <Stack mt={2} direction={'row'} spacing={1}>
                                                <FacebookShareButton url={String(window.location)}>
                                                    <FacebookIcon size={25} round />
                                                </FacebookShareButton>
                                                <FacebookMessengerShareButton
                                                    url={String(window.location)}
                                                    appId="521270401588372"
                                                >
                                                    <FacebookMessengerIcon size={25} round />
                                                </FacebookMessengerShareButton>
                                                <PinterestShareButton
                                                    url={String(window.location)}
                                                    media={`${String(window.location)}`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <PinterestIcon size={25} round />
                                                </PinterestShareButton>
                                                <TwitterShareButton url={String(window.location)} title={'hello'}>
                                                    <TwitterIcon size={25} round />
                                                </TwitterShareButton>
                                            </Stack>
                                        </Stack>
                                        <Stack pr={4}>
                                            <MoreHorizIcon sx={{ cursor: 'pointer' }} />
                                        </Stack>
                                    </Stack>
                                </Box>
                                {/* quantity */}
                                {!isMediumMD ? (
                                    <Box mt={3}>
                                        <Grid direction={'row'} display={'flex'} spacing={7}>
                                            <Grid xs={4}>
                                                <Typography variant="caption" fontWeight={'bold'} fontSize={'18px'}>
                                                    Số lượng
                                                </Typography>
                                            </Grid>
                                            <Grid xs={8}>
                                                <Stack direction={'row'} sx={{}}>
                                                    <Stack
                                                        direction={'row'}
                                                        spacing={3}
                                                        border={'1px solid #eee'}
                                                        alignItems={'center'}
                                                        p={'5px 12px'}
                                                        borderRadius={'5px'}
                                                    >
                                                        <RemoveIcon
                                                            onClick={() => {
                                                                if (quantity <= 1) {
                                                                    setQuantity(1);
                                                                } else {
                                                                    setQuantity((prevQuantity) => prevQuantity - 1);
                                                                }
                                                            }}
                                                            sx={{
                                                                fontSize: '17px',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                        <input
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                const inputValue: any = e.target.value;
                                                                const maxLength = 3;
                                                                if (
                                                                    (/^(?!0\d*$)\d+$/.test(inputValue) &&
                                                                        inputValue.length <= maxLength) ||
                                                                    inputValue == ''
                                                                )
                                                                    setQuantity(inputValue);
                                                            }}
                                                            value={quantity}
                                                            type="text"
                                                            style={{
                                                                maxWidth: '40px',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                                justifyContent: 'center',
                                                                alignContent: 'center',
                                                                outline: '1px solid #ddd',
                                                                borderRadius: '3px',
                                                            }}
                                                        />
                                                        <AddIcon
                                                            onClick={() =>
                                                                setQuantity((prevQuantity) => Number(prevQuantity) + 1)
                                                            }
                                                            sx={{
                                                                fontSize: '17px',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ) : (
                                    <Box
                                        position={'fixed'}
                                        bottom={0}
                                        left={0}
                                        width={'100%'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        sx={{
                                            background: '#008C89',
                                            zIndex: '1',
                                        }}
                                    >
                                        <Stack
                                            direction={'row'}
                                            spacing={3}
                                            p={'16px 8px'}
                                            borderRight={'1px solid white'}
                                        >
                                            <RemoveIcon
                                                onClick={() => {
                                                    if (quantity <= 1) {
                                                        setQuantity(1);
                                                    } else {
                                                        setQuantity((prevQuantity) => prevQuantity - 1);
                                                    }
                                                }}
                                                sx={{
                                                    fontSize: '20px',
                                                    color: 'whitesmoke',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            <input
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const inputValue: any = e.target.value;
                                                    const maxLength = 3;
                                                    if (
                                                        (/^(?!0\d*$)\d+$/.test(inputValue) &&
                                                            inputValue.length <= maxLength) ||
                                                        inputValue == ''
                                                    )
                                                        setQuantity(inputValue);
                                                }}
                                                value={quantity}
                                                type="text"
                                                style={{
                                                    maxWidth: '40px',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    outline: '1px solid #ddd',
                                                    borderRadius: '3px',
                                                }}
                                            />
                                            <AddIcon
                                                onClick={() => setQuantity((prevQuantity) => Number(prevQuantity) + 1)}
                                                sx={{
                                                    fontSize: '20px',
                                                    color: 'whitesmoke',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Stack>
                                        <Typography
                                            style={
                                                !isMediumMD
                                                    ? {
                                                          fontWeight: 'bold',
                                                          color: 'white',
                                                          textAlign: 'center',
                                                          padding: '16px 24px',
                                                          cursor: 'pointer',
                                                      }
                                                    : {
                                                          fontWeight: 'bold',
                                                          color: 'white',
                                                          fontSize: '11px',
                                                          padding: '8px 8px',
                                                          textAlign: 'center',
                                                          cursor: 'pointer',
                                                      }
                                            }
                                            onClick={() => handleAddToCart(Detail, quantity)}
                                        >
                                            Thêm vào giỏ hàng
                                        </Typography>
                                        <Button
                                            sx={
                                                !isMediumMD
                                                    ? {
                                                          padding: '16px 24px',
                                                          borderRadius: '0',
                                                          fontSize: '11px',
                                                          backgroundColor: '#F7941E',
                                                          boxShadow: 'none',
                                                          color: '#FFFFFF',
                                                          '&:hover': {
                                                              opacity: '0.9',
                                                              boxShadow: 'none',
                                                              backgroundColor: '#F7941E',
                                                          },
                                                      }
                                                    : {
                                                          padding: '16.9px 8px',
                                                          borderRadius: '0',
                                                          backgroundColor: '#F7941E',
                                                          color: '#FFFFFF',
                                                          fontSize: '12px',
                                                          boxShadow: 'none',
                                                          '&:hover': {
                                                              opacity: '0.9',
                                                              boxShadow: 'none',
                                                              backgroundColor: '#F7941E',
                                                          },
                                                      }
                                            }
                                            onClick={() => handleOrder(Detail, quantity)}
                                        >
                                            Mua ngay
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box pb={2}>
                    <Box
                        bgcolor={color.white}
                        sx={{
                            p: 2,
                            pt: 0,
                        }}
                    >
                        <Typography
                            variant="h2"
                            fontSize={'18px'}
                            textTransform={'uppercase'}
                            sx={
                                isMediumMD
                                    ? {
                                          p: '16px 0',
                                          fontSize: '15px',
                                      }
                                    : {
                                          p: '16px 0',
                                      }
                            }
                        >
                            Thông tin chi tiết
                        </Typography>
                        <Table sx={{ border: '1px solid #CCCCCC' }} aria-label="customized table">
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Tên sản phẩm:
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {Detail?.title}
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Nhà xuất bản:
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {Detail.producer?.name}
                                    </StyledTableCell>
                                </StyledTableRow>
                                {Detail.author && (
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Tác giả
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {Detail.author}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                                {Detail.size && (
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Kích thước:
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {Detail.size}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                                {!!Detail?.pageNumber ? (
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Số trang:
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {Detail.pageNumber}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ) : (
                                    ''
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box
                        bgcolor={color.white}
                        sx={{
                            pt: 0,
                        }}
                    >
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 0 }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab
                                            label="Giới thiệu sản phẩm"
                                            value="1"
                                            sx={{
                                                p: '16px 10px',
                                                fontSize: isMediumMD ? '13px' : '15px',
                                            }}
                                        />
                                        <Tab
                                            label="Đánh giá sản phẩm"
                                            value="2"
                                            sx={{
                                                p: '16px 10px',
                                                fontSize: isMediumMD ? '13px' : '15px',
                                            }}
                                        />
                                    </TabList>
                                </Box>
                                <TabPanel
                                    value="1"
                                    sx={{
                                        px: 2,
                                    }}
                                >
                                    {' '}
                                    <Box textAlign={'center'}>
                                        <Typography
                                            textAlign={'center'}
                                            fontSize={'16px'}
                                            color={'#F7941E'}
                                            textTransform={'capitalize'}
                                            fontWeight={'bold'}
                                            p={2}
                                            variant="h2"
                                        >
                                            {Detail?.title}
                                        </Typography>
                                        <div
                                            className={`small-text ${TextMore && 'long-text'} `}
                                            style={{
                                                textAlign: 'justify',
                                                fontSize: '14px',
                                                lineHeight: '24px',
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: htmlContent as unknown as TrustedHTML,
                                            }}
                                        />
                                        <Button
                                            variant="OutlinedRed"
                                            sx={{
                                                marginTop: '10px',
                                            }}
                                            onClick={() => setTextMore((pre) => !pre)}
                                        >
                                            <Typography
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {!TextMore ? 'Xem thêm' : 'Rút gọn'}
                                            </Typography>
                                        </Button>
                                    </Box>
                                </TabPanel>
                                <TabPanel
                                    sx={{
                                        px: 2,
                                    }}
                                    value="2"
                                >
                                    <Grid container>
                                        <Grid xs={12} md={8} pb={2}>
                                            <Box width={'100%'} height={'100%'} p={2}>
                                                {comments?.comments?.length > 0 ? (
                                                    comments?.comments?.map((e: any) => {
                                                        return (
                                                            <CommentItem
                                                                fullName={e.userComment.fullName}
                                                                star={e.star}
                                                                date={e.createdAt}
                                                                content={e.content}
                                                                images={e.comment}
                                                            />
                                                        );
                                                    })
                                                ) : (
                                                    <Stack>
                                                        <img
                                                            style={
                                                                isMediumMD
                                                                    ? { width: '100px', height: '100px' }
                                                                    : {
                                                                          margin: '0 auto',
                                                                          maxWidth: '200px',
                                                                          width: '100%',
                                                                          height: '200px',
                                                                      }
                                                            }
                                                            src={thumbnail.notfound}
                                                            alt=""
                                                        />
                                                        <Typography
                                                            mt={2}
                                                            variant="h2"
                                                            fontSize={isMediumMD ? '14px' : '16px'}
                                                        >
                                                            Chưa có đánh giá cho sản phẩm này.
                                                        </Typography>
                                                    </Stack>
                                                )}
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        marginX: 'auto',
                                                    }}
                                                >
                                                    {comments?.totalPage > 0 ? (
                                                        <Pagination
                                                            count={comments?.totalPage}
                                                            page={page}
                                                            onChange={handleChangePage}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Box>
                </Box>
                <Box pb={2}>
                    <Box bgcolor={color.white} p={2}>
                        <Typography variant="h2" fontWeight={'bold'} fontSize={'18.85px'}>
                            Sản phẩm liên quan
                        </Typography>
                        <Grid container mt={2}>
                            {RelatedProduct.map((e) => {
                                return (
                                    <Grid xs={6} md={3} lg={2} item>
                                        <ProductItem products={e} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
