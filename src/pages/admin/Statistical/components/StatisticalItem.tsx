import { Box, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function StatisticalItem(props: { image: string; quantity: number; path: string; name: string }) {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                display: 'flex',
                gap: 2,
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                p: 2,
            }}
        >
            <Grid xs={4} display={'flex'} alignItems={'center'} px={2}>
                <img src={props.image} alt="err" />
            </Grid>
            <Grid xs={8}>
                <Typography variant="body1" color="initial">
                    {props.name}
                </Typography>
                <Typography variant="body1" color="initial" py={2} borderBottom={'2px solid #eee'}>
                    {props.quantity}
                </Typography>
                <Typography
                    variant="body1"
                    color="initial"
                    display={'flex'}
                    justifyContent={'end'}
                    alignItems={'end'}
                    p={2}
                >
                    <NavLink
                        to={props.path}
                        style={{
                            color: '#FFA500',
                            textDecoration: 'underline',
                        }}
                    >
                        Xem chi tiết
                    </NavLink>
                </Typography>
            </Grid>
        </Box>
    );
}

export default StatisticalItem;
