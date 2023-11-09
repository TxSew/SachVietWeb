import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import React from "react";
import { color } from "../../../../Theme/color";
import { Link, NavLink } from "react-router-dom";

const ChangePassword = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid bgcolor={"#eee"}>
      <Container
        maxWidth="xl"
        sx={{
          pt: 1,
          pb: 2
        }}
      >
        <Box bgcolor={"#fff"} pt={3} pb={3}>
          <Box maxWidth={"450px"} mx={"auto"}>
            <Box
              sx={{
                width: "100%"
              }}
            >
              <Box sx={{}}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    width: "100%"
                  }}
                >
                  <Tab
                    sx={{
                      margin: "0 auto"
                    }}
                    label="Quên mật khẩu"
                  />
                </Tabs>
              </Box>
            </Box>
            <Grid
              sx={{
                display: "flex",
                width: "100%",
                padding: "20px"
              }}
            >
              <form autoComplete="off">
                <FormControl
                  sx={{
                    mt: "10px"
                  }}
                  fullWidth
                >
                  <label>Email</label>
                  <Grid
                    position={"relative"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <OutlinedInput
                      key={1}
                      fullWidth
                      placeholder="Vui lòng nhập Email của bạn!"
                    />
                    <NavLink
                      to={""}
                      style={{
                        position: "absolute",
                        right: "0",
                        padding: "7px 14px",
                        fontSize: "10px",
                        color: "grey"
                      }}
                    >
                      <Typography>Gửi</Typography>
                    </NavLink>
                  </Grid>
                </FormControl>
                <Typography variant="caption" color={color.error}></Typography>
                <FormControl
                  sx={{
                    mt: "20px"
                  }}
                  fullWidth
                >
                  <label>Mã OPT</label>
                  <OutlinedInput
                    key={1}
                    fullWidth
                    placeholder="Vui lòng nhập mã OPT"
                  />
                </FormControl>
                <Typography variant="caption" color={color.error}></Typography>
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
                <Typography variant="caption" color={color.error}></Typography>
                <Box
                  mt={4}
                  sx={{
                    clear: "both",
                    display: "flex",
                    direction: "column",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    // type="submit"
                    variant="outlined"
                    style={{
                      width: "100%",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background: "#BDB5B5",
                      color: "#000",
                      border: "none",
                      padding: "8px 0"
                    }}
                  >
                    Gửi
                  </Button>
                </Box>
              </form>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default ChangePassword;
