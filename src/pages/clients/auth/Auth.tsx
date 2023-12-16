import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import Login from './components/Login';
import { Register } from './components/Register';
import { useSearchParams } from 'react-router-dom';

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
            width={'100%'}
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Auth() {
    const [value, setValue] = React.useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get('register');
    useEffect(() => {
        if (params) {
            setValue(1);
        }
    }, [params]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid bgcolor={'#eee'}>
            <Container
                maxWidth="xl"
                sx={{
                    pt: 1,
                    pb: 2,
                }}
            >
                <Box bgcolor={'#fff'} pt={3} pb={3}>
                    <Box maxWidth={'450px'} mx={'auto'}>
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Box sx={{}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Tab
                                        sx={{
                                            width: '50%',
                                        }}
                                        label="Đăng nhập"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        sx={{
                                            width: '50%',
                                        }}
                                        label="Đăng kí"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                        </Box>
                        <Grid
                            sx={{
                                display: 'flex',
                                width: '100%',
                                padding: '20px',
                            }}
                        >
                            <CustomTabPanel value={value} index={0}>
                                <Login />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Register />
                            </CustomTabPanel>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
}
