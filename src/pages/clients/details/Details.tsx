import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box,
    Button,
    Container,
    Grid,
    OutlinedInput,
    Pagination,
    Rating,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextareaAutosize,
    Typography,
    tableCellClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FormControl } from '@mui/material';
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
import { pushSuccess, pushWarning } from '../../../components/Toast/Toast';
import { storage } from '../../../configs/fireBaseConfig';
import { TitleHelmet } from '../../../constants/Helmet';
import { numberFormat } from '../../../helpers/formatPrice';
import useMedia from '../../../hooks/useMedia/useMedia';
import { addToCart } from '../../../redux/features/cart/CartProducer';
import { RootState } from '../../../redux/storeClient';
import { httpComment, httpProduct } from '../../../submodules/controllers/http/axiosController';
import { Comment } from '../../../submodules/models/CommentModel/Comment';
import { Product } from '../../../submodules/models/ProductModel/Product';
import { User } from '../../../submodules/models/UserModel/User';
import CommentItem from './components/comments/CommentItem';

import './style.scss';
export const Details = () => {
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [imageFiles, setImageFiles] = useState<any[]>([]);
    const [imgs, setImgs] = useState<any>({});
    const { isMediumMD } = useMedia();
    const [TextMore, setTextMore] = useState(false);
    const [RelatedProduct, setRelatedProduct] = useState<Product[]>([]);
    const redirect = useNavigate();
    const [Detail, setDetail] = useState<Product>({});
    const [image, setImage] = useState<string>('');
    const [comments, setComments] = useState<any>({});
    const [user, setUser] = useState<User>({} as User);
    const [quantity, setQuantity] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const { id } = useParams();
    const Id: any = id;

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUser();
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [id]);

    useEffect(() => {
        const props = {
            page: page,
        };
        FetchProductOne(props);
    }, [id, page]);

    const fetchUser = () => {
        const user = localStorage.getItem('user');
        const DataUser = JSON.parse(user!);
        setUser(DataUser);
    };

    const [idProduct, setProductId] = useState<any>({});
    const FetchProductOne = async (items: any) => {
        try {
            const detailValue = await httpProduct.getOne(Id);
            const props = { productId: detailValue.product.id, ...items };
            setProductId(detailValue.product.id);
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
                console.log('🚀 ~ file: Details.tsx:152 ~ .then ~ response:', response);
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
    const handelLogin = () => {
        redirect({
            pathname: '/auth',
            search: createSearchParams({
                q: 'comment',
            }).toString(),
        });
    };

    const htmlContent = Detail ? Detail.desc : '';
    const [value, setTab] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(Number(value));
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
    const handelComment = async (data: any) => {
        let { image, ...rest } = data as any;

        let props = {
            productId: idProduct,
            ...rest,
        } as any;
        const listImg = await uploadImages();
        const thumb = listImg.map((e) => {
            return {
                images: e,
            };
        });
        const comment = {
            content: props,
            images: thumb,
        };
        httpComment.addComment(comment).then((response) => {
            pushSuccess('Đánh giá sản phẩm thành công');
            reset({});
        });
        FetchProductOne(page);
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm<Comment>({});

    return (
        <Box bgcolor={'#eee'}>
            {TitleHelmet('Chi tiết sản phẩm')}
            <Container maxWidth="xl">
                <Stack
                    direction={'row'}
                    py={1}
                    alignItems={'center'}
                    textTransform={'uppercase'}
                    sx={
                        isMediumMD
                            ? {
                                  fontSize: '12px',
                              }
                            : {}
                    }
                >
                    <Typography variant="caption">{Detail?.category?.name}</Typography>
                    <ChevronRightOutlinedIcon />
                    <Typography
                        variant="caption"
                        sx={{
                            overflow: 'hidden',
                            textAlign: 'center',
                            display: '-webkit-box',
                            lineClamp: 2,
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {Detail?.title}
                    </Typography>
                </Stack>
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
                                    fontSize={'22.1px'}
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
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            sx={{
                                                width: '50%',
                                            }}
                                        >
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
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            sx={{
                                                width: '50%',
                                            }}
                                        >
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
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            sx={{
                                                width: '50%',
                                            }}
                                        >
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
                                <Box mt={1}>
                                    <Rating
                                        name="custom-rating-filter-operator"
                                        defaultChecked={true}
                                        defaultValue={2}
                                        size="small"
                                        precision={0.5}
                                        readOnly
                                    />
                                </Box>
                                <Box>
                                    <Stack direction={'row'} spacing={2} mt={2}>
                                        <Typography
                                            className="price"
                                            color={color.price}
                                            fontSize={25}
                                            fontWeight={'bold'}
                                        >
                                            {`${numberFormat(Number(Detail.price_sale))} `}
                                        </Typography>
                                        <Typography
                                            className="price"
                                            fontSize={15}
                                            sx={{
                                                textDecoration: 'line-through',
                                            }}
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
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <FacebookMessengerShareButton
                                                    url={String(window.location)}
                                                    appId="521270401588372"
                                                >
                                                    <FacebookMessengerIcon size={32} round />
                                                </FacebookMessengerShareButton>
                                                <PinterestShareButton
                                                    url={String(window.location)}
                                                    media={`${String(window.location)}`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <PinterestIcon size={32} round />
                                                </PinterestShareButton>
                                                <TwitterShareButton url={String(window.location)} title={'hello'}>
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton>
                                            </Stack>
                                        </Stack>
                                        <Stack width={'300px'} pr={4}>
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
                                                          fontSize: '12px',
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
                                                          padding: '16.9px 24px',
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
                            sx={{
                                p: '16px 0',
                            }}
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
                                        <Tab label="Giới thiệu sản phẩm" value="1" />
                                        <Tab label="Bình luận" value="2" />
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
                                        <Grid xs={12} md={4} pb={2}>
                                            {user ? (
                                                <FormControl>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            pb: 1,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <Typography component="legend">
                                                                Chọn đánh giá của bạn:
                                                            </Typography>
                                                            <Controller
                                                                name={'star'}
                                                                rules={{
                                                                    required: 'Vui lòng đánh giá sản phẩm',
                                                                }}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Rating
                                                                        {...field}
                                                                        defaultValue={3}
                                                                        size="small"
                                                                        name="simple-controlled"
                                                                        onChange={(event, newRating: any) => {
                                                                            setValue('star', newRating);
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            <Typography variant="caption" color={color.error}>
                                                                {errors.star && errors.star.message}
                                                            </Typography>
                                                        </FormControl>
                                                    </Box>
                                                    <FormControl>
                                                        <Controller
                                                            name="content"
                                                            control={control}
                                                            rules={{
                                                                required: 'Vui lòng nhập nội dung đánh giá',
                                                            }}
                                                            render={({ field }) => (
                                                                <TextareaAutosize
                                                                    {...field}
                                                                    style={{
                                                                        resize: 'none',
                                                                        padding: '12px',
                                                                        borderRadius: '4px',
                                                                        outline: 'none',
                                                                        border: '1px solid #ccc',
                                                                    }}
                                                                    minRows={4}
                                                                    name=""
                                                                    id=""
                                                                    placeholder="Nhập nhận xét về sản phẩm (Tối thiểu 100 kí tự)"
                                                                ></TextareaAutosize>
                                                            )}
                                                        />

                                                        <Typography variant="caption" color={color.error}>
                                                            {errors.content && errors.content.message}
                                                        </Typography>
                                                    </FormControl>
                                                    <Controller
                                                        name="image"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Box py={1}>
                                                                <Typography variant="body1" color="initial">
                                                                    Tải hình ảnh :
                                                                </Typography>
                                                                <OutlinedInput
                                                                    {...field}
                                                                    onChange={(event: any) => {
                                                                        const files = event.target.files;
                                                                        const selectedFiles = event.target.files;
                                                                        setImageFiles([
                                                                            ...imageFiles,
                                                                            ...selectedFiles,
                                                                        ]);
                                                                        setImgs(files);
                                                                        const fileArray = Array.from(files);
                                                                        field.onChange(event);
                                                                        Promise.all(
                                                                            fileArray.map((file: any) => {
                                                                                return new Promise(
                                                                                    (resolve, reject) => {
                                                                                        const reader = new FileReader();
                                                                                        reader.onload = (e: any) => {
                                                                                            resolve(e.target.result);
                                                                                        };
                                                                                        reader.onerror = (e) => {
                                                                                            reject(e);
                                                                                        };
                                                                                        reader.readAsDataURL(file);
                                                                                    }
                                                                                );
                                                                            })
                                                                        ).then((results) => {
                                                                            setSelectedFiles(results);
                                                                        });
                                                                    }}
                                                                    inputProps={{ multiple: true }}
                                                                    type="file"
                                                                />
                                                                <Stack>
                                                                    {selectedFiles.map(
                                                                        (dataUrl: any, index: number) => (
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
                                                                        )
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        )}
                                                    />

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ mt: 3, background: '#F39801' }}
                                                        onClick={handleSubmit(handelComment)}
                                                    >
                                                        Gửi nhận xét
                                                    </Button>
                                                </FormControl>
                                            ) : (
                                                <Stack>
                                                    <Typography>
                                                        Đăng nhập mới được bình luận
                                                        <Typography
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: color.sale,
                                                                textDecoration: 'underline',
                                                            }}
                                                            onClick={handelLogin}
                                                        >
                                                            Đăng nhập ngay
                                                        </Typography>
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Grid>
                                        <Grid xs={12} md={8} pb={2}>
                                            <Box width={'100%'} border={'1px solid #eee'} height={'100%'} p={2}>
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
                                                    <img
                                                        src={
                                                            'blob:https://chat.zalo.me/88e844fd-c7e0-4710-9e49-66672783f806'
                                                        }
                                                        alt=""
                                                    />
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
                                                    <Pagination
                                                        count={comments?.totalPage}
                                                        page={page}
                                                        onChange={handleChangePage}
                                                    />
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
