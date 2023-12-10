import { Box } from '@mui/material';
import React from 'react';
import Header from '../components/Header/Header';

function LoginAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            px={2}
            overflow={'none'}
            sx={{
                overflowY: 'none',
            }}
            className="App"
            display={'flex'}
            height={'100vh'}
            justifyContent={'center'}
        >
            {children}
        </Box>
    );
}

export default LoginAdminLayout;
