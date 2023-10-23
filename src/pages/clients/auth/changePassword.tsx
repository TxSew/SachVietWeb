import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { color } from "../../../Theme/color";
import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "@mui/material";

const ChangePassword = () => {
  return (
    <Box>
      <Container maxWidth={"xl"}>
        <Box maxWidth={"450px"} mx={"auto"}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={"20px"}
            sx={{
              textTransform: "uppercase"
            }}
          >
            Khôi phục mật khẩu
          </Typography>
          <form
            noValidate
            autoComplete="off"
            style={{
              padding: "24px 0"
            }}
          >
            <FormControl
              sx={{
                mt: "20px"
              }}
              fullWidth
            >
              <Typography
                sx={{
                  marginBottom: "4px"
                }}
              >
                Email
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <OutlinedInput
                  fullWidth
                  placeholder="Vui lòng nhập email của bạn"
                />
                <Link
                  to=""
                  style={{
                    position: "absolute",
                    right: 0,
                    color: "black",
                    background: "",
                    padding: "14px"
                  }}
                >
                  gửi
                </Link>{" "}
                <LoadingButton
                  loading
                  variant="outlined"
                  style={{
                    position: "absolute",
                    right: -48,
                    color: "black",
                    border: "none"
                    // display: "none"
                  }}
                ></LoadingButton>
              </Grid>
            </FormControl>

            <FormControl
              sx={{
                mt: "20px"
              }}
              fullWidth
            >
              <label>Mật khẩu</label>
              <OutlinedInput
                key={1}
                fullWidth
                placeholder="Vui lòng nhập mã OPT"
              />
            </FormControl>
            <FormControl
              sx={{
                mt: "20px"
              }}
              fullWidth
            >
              <label>Mật khẩu</label>
              <OutlinedInput
                key={1}
                fullWidth
                placeholder="Vui lòng nhập mật khẩu mới"
              />
            </FormControl>
            <Box mx={"auto"} textAlign={"center"}>
              <Button
                sx={{
                  mt: "20px"
                }}
                variant="outlined"
              >
                Gửi
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ChangePassword;
