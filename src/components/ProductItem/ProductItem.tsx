import { Box, CardMedia, Rating, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { color } from '../../Theme/color';
import { Product } from '../../submodules/models/ProductModel/Product';
import { numberFormat } from '../../helpers/formatPrice';
import useMedia from '../../hooks/useMedia/useMedia';
interface ProductItem {
    products: Product;
}
const ProductItem = (Props: ProductItem) => {
    const { isMediumMD } = useMedia();
    return (
        <Card
            variant="outlined"
            sx={{
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
            }}
        >
            {Props.products.sale ? (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        width: '40px',
                        height: '40px',
                        color: 'white',
                        borderRadius: '50%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        backgroundColor: color.sale,
                    }}
                >
                    <Typography variant="body1" fontWeight={'bold'}>{`${Props.products.sale}%`}</Typography>
                </Box>
            ) : (
                ''
            )}
            <Link
                to={`/products/${Props.products.slug}`}
                style={{
                    height: '170px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <CardMedia
                    component="img"
                    width={'100%'}
                    height={'170'}
                    sx={{
                        p: '20px',
                        objectFit: 'contain',
                    }}
                    title=""
                    image={Props.products.image}
                />
            </Link>
            <CardContent
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Link
                    to={`/products/${Props.products.slug}`}
                    style={{
                        flexShrink: 0,
                        color: '#333333',
                    }}
                >
                    <Typography
                        variant="body1"
                        color={'#3333333'}
                        fontSize={'14px'}
                        textTransform={'capitalize'}
                        sx={{
                            overflow: 'hidden',
                            textAlign: 'center',
                            display: '-webkit-box',
                            lineClamp: 2,
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            flexShrink: 0,
                        }}
                    >
                        {Props.products.title}
                    </Typography>
                </Link>

                <Stack
                    direction={isMediumMD ? 'column' : 'row'}
                    justifyContent={Props.products.sale ? 'space-between' : 'center'}
                    sx={{
                        marginTop: 'auto',
                        paddingTop: '10px',
                        lineHeight: 1,
                    }}
                >
                    <Typography
                        className="price"
                        color={color.btnRed}
                        fontSize={'16.5px'}
                        fontWeight={'bold'}
                        lineHeight={1}
                        marginTop={'auto'}
                        sx={
                            isMediumMD
                                ? {
                                      fontSize: '13px',
                                  }
                                : {}
                        }
                    >
                        {`${numberFormat(Number(Props.products.price_sale))} `}
                    </Typography>
                    <Typography
                        color={'#888888'}
                        lineHeight={1}
                        sx={
                            !isMediumMD
                                ? {
                                      textDecoration: 'line-through',
                                  }
                                : {
                                      textDecoration: 'line-through',
                                      marginTop: '10px',
                                      fontSize: '13px',
                                  }
                        }
                    >
                        {!!Props.products.sale && numberFormat(Number(Props.products.price))}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default memo(ProductItem);
