import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem(
    props: { path: string; icon: React.ReactNode; name: string; link?: string },
    children?: React.ReactNode
) {
    const Router = (
        <NavLink
            to={props.path}
            style={{
                color: '#615c5c',
            }}
        >
            {children}
        </NavLink>
    );
    return (
        <NavLink
            to={props.path}
            style={{
                color: '#615c5c',
            }}
        >
            <Box color={'inherit'}>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    {props.icon}
                    <Typography fontSize={'12px'}>{props.name}</Typography>
                </Stack>
            </Box>
        </NavLink>
    );
}

export default NavItem;
