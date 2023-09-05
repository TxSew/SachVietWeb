import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { color } from '../../../Theme/color'
import { Link } from 'react-router-dom'

export const Cart = () => {
  return (
    <Box bgcolor={"#eee"} pb={2}>
<Container maxWidth="xl">
 <Typography variant='h3' py={2} fontSize={"clamp(16px,0.2rem + 1vw,19px )"} >
     GIỎ HÀNG (0 sản phẩm)
 </Typography>
  <Box bgcolor={color.white} p={'40px'} borderRadius={2} boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.1)"}>
     <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box sx={{
             maxWidth: '160px',
        }}>
             <img width={"100%"} src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg" alt="" />
             </Box> 
              <Typography variant='body1' my={"20px"}>
              Chưa có sản phẩm trong giỏ hàng của bạn.
              </Typography>
               <Button variant='contained'>
                 <Link to={'/'} style={{
                     color: "white"
                 }}>
                 Mua sắm ngay
                 </Link>
               </Button>
     </Stack>
     <Grid container>
         <Grid item  xs={6}>
             
         </Grid>
        </Grid> 
  </Box>
</Container>
    </Box>
  )
}
