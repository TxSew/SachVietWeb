import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  FormLabel,
  OutlinedInput,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Login from "./components/Login";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      width={"100%"}
    >
      {value === index && (
        <Box>
          <>{children}</>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Auth() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid bgcolor={"#eee"}>
      <Container
        maxWidth="xl"
        sx={{
          pt: 1,
          pb: 2,
        }}
      >
        <Box bgcolor={"#fff"} pt={3} pb={3}>
          <Box maxWidth={"450px"} mx={"auto"}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{}}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    width: "100%",
                  }}
                >
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Đăng nhập"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Đăng kí"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                padding: "20px",
              }}
            >
              <CustomTabPanel value={value} index={0}>
                <Login />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <form noValidate autoComplete="off">
                  <FormControl
                    sx={{
                      mt: "10px",
                    }}
                    fullWidth
                  >
                    <Typography>Số điện thoại/Email</Typography>
                    <OutlinedInput
                      sx={{
                        py: 1,
                      }}
                      fullWidth
                      placeholder="Please enter text"
                    />
                  </FormControl>
                  <FormControl
                    sx={{
                      mt: "20px",
                    }}
                    fullWidth
                  >
                    <Typography>Mật khẩu</Typography>
                    <OutlinedInput
                      sx={{
                        py: 1,
                      }}
                      fullWidth
                      placeholder="Please enter Password"
                    />
                  </FormControl>
                </form>
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
