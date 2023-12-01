import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { color } from '../../../Theme/color';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ClearIcon from '@mui/icons-material/Clear';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(56 77 75) 0%,rgb(209 154 55) 50%,rgb(171 150 57) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(56 77 75) 0%,rgb(209 154 55) 50%,rgb(171 150 57) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {}),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <MenuBookIcon />,
        2: <ShoppingCartCheckoutIcon />,
        3: <TaskAltIcon />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
            color={color.sale}
            sx={{
                bgcolor: '#3f837d',
            }}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

function ColorlibStepIconError(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        3: <RemoveShoppingCartIcon />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
            color={color.sale}
            sx={{
                bgcolor: '#913b1b',
            }}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

export default function CustomizedSteppers(props: { status: number }) {
    return (
        <Stack spacing={6} width={'100%'} mt={2}>
            <Stepper
                alternativeLabel
                activeStep={
                    props.status == null ? 0 : props.status == 1 ? 1 : props.status == 2 ? 2 : props.status == 3 ? 3 : 0
                }
                connector={<ColorlibConnector />}
                sx={{
                    width: '100%',
                }}
            >
                <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>Đơn hàng mới</StepLabel>
                </Step>
                {props.status == 3 ? (
                    <Step>
                        <StepLabel StepIconComponent={ClearIcon}>Hủy đơn</StepLabel>
                    </Step>
                ) : (
                    <Step>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>Đang giao hàng</StepLabel>
                    </Step>
                )}
                {props.status == 3 ? (
                    <Step>
                        <StepLabel StepIconComponent={ColorlibStepIconError}>Đã hủy đơn</StepLabel>
                    </Step>
                ) : (
                    <Step>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>Đã giao hàng</StepLabel>
                    </Step>
                )}
            </Stepper>
        </Stack>
    );
}
