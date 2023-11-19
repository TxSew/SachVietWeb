// import { Logout, PersonAdd, Settings } from '@mui/icons-material';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import MenuIcon from '@mui/icons-material/Menu';
// import Person3Icon from '@mui/icons-material/Person3';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import {
//     Avatar,
//     Badge,
//     Box,
//     Container,
//     Divider,
//     IconButton,
//     List,
//     ListItemIcon,
//     Menu,
//     MenuItem,
//     Modal,
//     Tooltip,
// } from '@mui/material';
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Image from '../../../../../components/Image/Image';
// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
// const styles = {
//     position: 'absolute',
//     top: '10%',
//     left: '50%',
//     transform: 'translate(-50%, 0%)',
//     width: '700px',
//     bgcolor: 'background.paper',
//     borderRight: '1px solid #000',
//     boxShadow: 24,
//     outline: 'none',
//     p: 4,
//     pt: 2,
//     borderRadius: '8px',
// };

// const boxmodal = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '240px',
//     height: '100%',
//     bgcolor: 'background.paper',
//     borderRight: '1px solid #000',
//     boxShadow: 24,
//     outline: 'none',
//     p: 4,
//     pt: 2,
// };

// const hditem = {
//     display: 'flex',
//     alignItems: 'center',
//     pt: 2,
//     pb: 2,
//     color: '#615c5c',
//     fonSize: '12px',
//     fontWeight: 400,
//     fontStyle: 'normal',
//     lineHieght: 'normal',
//     transition: 'all .3s ease-in-out',
//     '&:hover': {
//         color: '#008C89',
//     },
// };

// const hdicon = {
//     mr: 1,
//     fontSize: '24px',
// };
// const hdicon_mb = {
//     mr: 1,
//     fontSize: '24px',
//     lineHieght: 'normal',
// };

// const nicon = {
//     lineHeight: 'normal',
// };

// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
// };
// const handleClose = () => {
//     setAnchorEl(null);
// };

// function HeaderMobile() {
//     return (
//         <Box position={'sticky'} top={0} left={0} sx={{ background: '#e7e7e7', zIndex: '1' }}>
//             <Container maxWidth={'xl'}>
//                 <Box
//                     display={'flex'}
//                     alignItems={'center'}
//                     justifyContent={'space-between'}
//                     padding={' 8px 0'}
//                     color={'white'}
//                 >
//                     <Box display={'flex'} alignItems={'center'} gap={2}>
//                         <Box
//                             color={'#333'}
//                             sx={{
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             <Modal
//                                 open={openSearch}
//                                 onClose={handleCloseSearch}
//                                 aria-labelledby="modal-modal-title"
//                                 aria-describedby="modal-modal-description"
//                                 sx={{
//                                     transition: 'all 2s ease-in-out',
//                                 }}
//                             >
//                                 <Box sx={boxmodal}>
//                                     <List>T</List>
//                                     <List>T</List>
//                                 </Box>
//                             </Modal>
//                             <MenuIcon onClick={handleOpenSearch} />
//                         </Box>
//                         <NavLink
//                             to={'/'}
//                             style={{
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             <Image
//                                 src="https://bookbuy.vn/Images/frontend/base/mobile/logo-new.png"
//                                 alt="logo"
//                                 width="100px"
//                                 height="24px"
//                             />
//                         </NavLink>
//                     </Box>
//                     <Box display={'flex'} alignItems={'center'} lineHeight={'normal'} gap={1}>
//                         <NavLink
//                             to={'/cart'}
//                             style={{
//                                 cursor: 'pointer',
//                                 color: '#F7941E',
//                             }}
//                         >
//                             <Badge badgeContent={cart.length} color="primary">
//                                 <ShoppingCartIcon sx={hdicon_mb} />
//                             </Badge>
//                         </NavLink>

//                         <Box>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     textAlign: 'center',
//                                 }}
//                             >
//                                 <Tooltip title="Account settings">
//                                     <IconButton
//                                         onClick={handleClick}
//                                         aria-controls={open ? 'account-menu' : undefined}
//                                         aria-haspopup="true"
//                                         aria-expanded={open ? 'true' : undefined}
//                                     >
//                                         <Avatar
//                                             sx={{
//                                                 width: 24,
//                                                 height: 24,
//                                                 background: '#F7941E',
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 textAlign: 'center',
//                                             }}
//                                         >
//                                             <Person3Icon
//                                                 sx={hdicon_mb}
//                                                 style={{
//                                                     margin: '0 auto',
//                                                 }}
//                                             />
//                                         </Avatar>
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>
//                             {user.id ? (
//                                 <Menu
//                                     anchorEl={anchorEl}
//                                     id="account-menu"
//                                     open={open}
//                                     onClose={handleClose}
//                                     onClick={handleClose}
//                                     PaperProps={{
//                                         elevation: 0,
//                                         sx: {
//                                             overflow: 'visible',
//                                             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                             mt: 1.5,
//                                             '& .MuiAvatar-root': {
//                                                 width: 32,
//                                                 height: 32,
//                                                 ml: -0.5,
//                                                 mr: 1,
//                                             },
//                                             '&:before': {
//                                                 content: '""',
//                                                 display: 'block',
//                                                 position: 'absolute',
//                                                 top: 0,
//                                                 right: 14,
//                                                 width: 10,
//                                                 height: 10,
//                                                 bgcolor: 'background.paper',
//                                                 transform: 'translateY(-50%) rotate(45deg)',
//                                                 zIndex: 0,
//                                             },
//                                         },
//                                     }}
//                                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                                 >
//                                     <NavLink to={'/auth'}>
//                                         <MenuItem
//                                             onClick={handleClose}
//                                             sx={{
//                                                 color: 'gray',
//                                             }}
//                                         >
//                                             <LockOpenIcon
//                                                 sx={{
//                                                     marginRight: '8px',
//                                                 }}
//                                             />{' '}
//                                             Login
//                                         </MenuItem>
//                                     </NavLink>
//                                     <NavLink to={'/auth'}>
//                                         <MenuItem
//                                             onClick={handleClose}
//                                             sx={{
//                                                 color: 'gray',
//                                             }}
//                                         >
//                                             <HowToRegIcon
//                                                 sx={{
//                                                     marginRight: '8px',
//                                                 }}
//                                             />{' '}
//                                             Register
//                                         </MenuItem>
//                                     </NavLink>
//                                     <Divider />
//                                     <MenuItem onClick={handleClose}>
//                                         <ListItemIcon>
//                                             <PersonAdd fontSize="small" />
//                                         </ListItemIcon>
//                                         Add another account
//                                     </MenuItem>
//                                 </Menu>
//                             ) : (
//                                 <Menu
//                                     anchorEl={anchorEl}
//                                     id="account-menu"
//                                     open={open}
//                                     onClose={handleClose}
//                                     onClick={handleClose}
//                                     PaperProps={{
//                                         elevation: 0,
//                                         sx: {
//                                             overflow: 'visible',
//                                             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                             mt: 1.5,
//                                             '& .MuiAvatar-root': {
//                                                 width: 32,
//                                                 height: 32,
//                                                 ml: -0.5,
//                                                 mr: 1,
//                                             },
//                                             '&:before': {
//                                                 content: '""',
//                                                 display: 'block',
//                                                 position: 'absolute',
//                                                 top: 0,
//                                                 right: 14,
//                                                 width: 10,
//                                                 height: 10,
//                                                 bgcolor: 'background.paper',
//                                                 transform: 'translateY(-50%) rotate(45deg)',
//                                                 zIndex: 0,
//                                             },
//                                         },
//                                     }}
//                                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                                 >
//                                     <NavLink to={'/auth'}>
//                                         <MenuItem
//                                             onClick={handleClose}
//                                             sx={{
//                                                 color: 'gray',
//                                             }}
//                                         >
//                                             <LockOpenIcon
//                                                 sx={{
//                                                     marginRight: '8px',
//                                                 }}
//                                             />{' '}
//                                             Login
//                                         </MenuItem>
//                                     </NavLink>
//                                     <NavLink to={'/auth'}>
//                                         <MenuItem
//                                             onClick={handleClose}
//                                             sx={{
//                                                 color: 'gray',
//                                             }}
//                                         >
//                                             <HowToRegIcon
//                                                 sx={{
//                                                     marginRight: '8px',
//                                                 }}
//                                             />{' '}
//                                             Register
//                                         </MenuItem>
//                                     </NavLink>
//                                     <Divider />
//                                     <MenuItem onClick={handleClose}>
//                                         <ListItemIcon>
//                                             <PersonAdd fontSize="small" />
//                                         </ListItemIcon>
//                                         Add another account
//                                     </MenuItem>
//                                     <MenuItem onClick={handleClose}>
//                                         <ListItemIcon>
//                                             <Settings fontSize="small" />
//                                         </ListItemIcon>
//                                         Settings
//                                     </MenuItem>
//                                     <MenuItem onClick={handleClose}>
//                                         <ListItemIcon>
//                                             <Logout fontSize="small" />
//                                         </ListItemIcon>
//                                         Logout
//                                     </MenuItem>
//                                 </Menu>
//                             )}
//                         </Box>
//                     </Box>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }

// export default HeaderMobile;
