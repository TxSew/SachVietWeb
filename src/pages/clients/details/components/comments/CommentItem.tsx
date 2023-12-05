import { Box, Rating, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { formatDates } from '../../../../../helpers/FortmatDate';

interface Props {
    avatar?: string;
    star: number;
    fullName: string;
    date: Date;
    content: string;
    images: string[];
}
const CommentItem = (props: Props) => {
    return (
        <Box pt={2} borderBottom={'1px solid #eee'} display={'flex'} justifyContent={'start'} gap={1}>
            <Box>
                <Avatar
                    alt="Remy Sharp"
                    src={
                        props.avatar || 'https://down-vn.img.susercontent.com/file/ffb79bec4ee0fddca9d0b0679ab9248d_tn'
                    }
                />
            </Box>
            <Box>
                <Box pb={2}>
                     
                    <Typography variant="subtitle1" fontSize={12} fontWeight={700}>
                        {props.fullName}
                    </Typography>
                    <Rating
                        name="custom-rating-filter-operator"
                        defaultChecked={true}
                        defaultValue={props.star}
                        sx={{
                            fontSize: '13px',
                        }}
                        precision={0.5}
                        readOnly
                    />
                    <Typography variant="subtitle1" fontSize={12} color={'#0000008a'}>
                        {formatDates(props.date)}
                    </Typography>
                </Box>
                <Typography
                    variant="subtitle1"
                    fontSize={12}
                    color={'#000000DE'}
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        wordBreak: 'break-word',
                        lineClamp: 2,
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        flexShrink: 0,
                        mb: 2,
                    }}
                >
                    {props.content}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} width={'100%'} flexWrap={'wrap'}>
                    {props.images?.map((e: any) => {
                        return (
                            <Box pr={'20px'} pb={'20px'}>
                                <img
                                    src={e.images}
                                    alt=""
                                    width={72}
                                    height={72}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );
};
export default CommentItem;
