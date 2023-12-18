import { Box, Button, Stack, Typography } from '@mui/material';
import { color } from '../../Theme/color';
import { formatDates } from '../../helpers/FortmatDate';
import useMedia from '../../hooks/useMedia/useMedia';
import { httpVoucher } from '../../submodules/controllers/http/axiosController';
import { Discount } from '../../submodules/models/DiscountModel/Discount';
import { pushSuccess, pushWarning } from '../Toast/Toast';
const selectedDate = (value: any) => new Date(value);
const currentDate = new Date();

function DiscountItem(props: Discount) {
    const { isMediumMD } = useMedia();
    const handleSave = (props: any) => {
        httpVoucher
            .addVoucherUser(props)
            .then((response) => {
                if (response) {
                    pushSuccess('Mã giảm giá đã được thêm vào ví voucher thành công');
                }
            })
            .catch((error) => {
                if (error.response.data.message === 'authorization') {
                    pushWarning('Vui lòng đăng nhập để nhận mã giảm giá!');
                }
                if (error.response.data.message === 'voucher already exists') {
                    pushWarning('Mã giảm giá đã tồn tại!, Vui lòng kiểm tra Ví voucher của bạn');
                }
                if (error.response.data.message === 'payment limit exceeded') {
                    pushWarning('Mã giảm giá đã hết hạn sử dụng!, Không thể thêm vào ví voucher của bạn');
                }
                if (error.response.data.message === 'Unauthorized') {
                    pushWarning('Vui lòng đăng nhập để nhận mã giảm giá!');
                }
            });
    };
    return (
        <Box bgcolor={color.white} borderRadius={3} p={isMediumMD ? 1 : 2} ml={2} height={'150px'}>
            <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} height={'100%'}>
                <Box
                    padding={isMediumMD ? '5px' : '10px'}
                    width={'60%'}
                    height={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                        backgroundColor: 'white',
                        borderRight: '4px solid orange',
                    }}
                >
                    <Typography variant="h2" fontWeight={'bold'}>
                        {props.desc}
                    </Typography>
                    <Typography variant="caption">ĐH từ 100K</Typography>

                    <Typography variant="body1">NHẬP MÃ NGAY</Typography>
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            marginTop: 'auto',
                            justifyContent: 'flex-end',
                            width: '100%',
                            height: '7px',
                            borderRadius: '5px',
                            backgroundColor: '#e6e6e6',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '0px',
                                width: `${(Number(props.number_used) / Number(props.limit_number)) * 100}%`,
                                backgroundColor: '#28B928',
                                height: '7px',
                                borderRadius: '5px',
                            }}
                        ></Box>
                    </Box>
                </Box>
                <Box textAlign={'center'} width={'40%'} height={'100%'} padding={'10px'}>
                    <Typography variant="caption" fontSize={'12px'}>
                        {formatDates(props.expiration_date)}
                    </Typography>
                    <Typography
                        variant="h2"
                        fontWeight={'bold'}
                        p={'8px'}
                        color={color.borderColor}
                        textTransform={'uppercase'}
                        fontSize={!isMediumMD ? '15px' : '12px'}
                    >
                        {props.code}
                    </Typography>
                    {Number(props.number_used) >= Number(props.limit_number) ? (
                        <Button
                            variant="contained"
                            disabled
                            sx={{
                                background: 'gray',
                                padding: '4px 10px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            Hết lượt
                        </Button>
                    ) : selectedDate(props.expiration_date) < currentDate ? (
                        <Button
                            variant="contained"
                            disabled
                            sx={{
                                background: 'gray',
                                padding: '4px 10px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                cursor:'not-allowed'
                            }}
                        >
                            Hết hạn
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                background: '#C92127',
                                padding: '4px 10px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                            onClick={() =>
                                handleSave({
                                    discountId: props.id,
                                    code: 45345,
                                })
                            }
                        >Lưu</Button>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

export default DiscountItem;
