import { Box, Button, Container, FormControl, OutlinedInput, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { color } from '../../../Theme/color'

const ChangePassword = () => {
  return (
     <Box>
 <Container maxWidth={"xl"}>
    <Box maxWidth={"450px"} mx={"auto"}>
         <Typography variant='h2' textAlign={"center"} fontWeight={"bold"} fontSize={"20px"}>
              Khôi phục mật khẩu
         </Typography>
         <form noValidate autoComplete="off">
    <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <Typography>Email</Typography>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập email của bạn"
        />
      </FormControl>
        <Box mx={"auto"} textAlign={"center"}>
        <Button sx={{
             mt: "20px",
        }}  variant="outlined">Đăng kí</Button>
        </Box>
    </form>

        </Box>        

 </Container>
     </Box>
   
  )
}

export default ChangePassword