import { Box, List, Modal, Slide } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function ModalUser() {
    const [openSearch, setOpenSearch] = React.useState(false);
    const handleOpenSearch = () => setOpenSearch(true);
    const handleCloseSearch = () => setOpenSearch(false);
    return (
        <Box>
            <MenuIcon onClick={handleOpenSearch} />
            <Modal
                open={openSearch}
                onClose={handleCloseSearch}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={'50%'}>
                    <div className="sidebar ps-0 pe-3 pb-3">
                        <div className="side-waper p-3 p-4">
                            <h1 className="side-hd pb-3">Tài khoản</h1>
                            <div className="side-item pt-3 pb-1">
                                <Link to="/user">
                                    <p className="side-item-text">Bảng điều kiển tài khoản</p>
                                </Link>
                            </div>
                            <div className="side-item pt-3 pb-1">
                                <Link to="/user/info">
                                    <p className="side-item-text">Thông tin tài khoản</p>
                                </Link>
                            </div>
                            <div className="side-item pt-3 pb-1">
                                <Link to="/user/adress">
                                    <p className="side-item-text">Sổ địa chỉ</p>
                                </Link>
                            </div>
                            <div className="side-item pt-3 pb-1">
                                <Link to="/user/myvoucher">
                                    <p className="side-item-text">Ví voucher</p>
                                </Link>
                            </div>
                            <div className="side-item pt-3 pb-1">
                                <Link to="/user/mycart">
                                    <p className="side-item-text">Đơn hàng của tôi</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </Box>
    );
}
export default ModalUser;
