import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseAPi } from '../../../configs/BaseApi';
import { formatDates } from '../../../helpers/FortmatDate';
import HttpVoucherController from '../../../submodules/controllers/http/httpVoucherController';
import './index.scss';
import NavUser from './layout/NavUser';
import './style.scss';
function UserMyVoucher() {
    const http = new HttpVoucherController(BaseAPi);
    const [vouchersUser, SetVoucherUser] = useState<any>([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!);

        http.getAllVoucherByUser()
            .then((response) => {
                SetVoucherUser(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <NavUser>
            <div className="main ps-0 pt-3 pb-3 pe-0">
                <div className="main-waper ">
                    <div className="main-waper-top pt-2 pb-2 ps-4">
                        <i className="fa fa-exclamation-triangle"></i>
                        <p>
                            Bạn vui lòng cập nhật thông tin tài khoản:
                            <Link to="">Cập nhật thông tin ngay</Link>
                        </p>
                    </div>
                    <div className="main-waper-end pt-4 pb-5 ps-4  pe-4">
                        <h1 className="info-acc-hd p-3">Ví của tôi</h1>
                        <div className="row">
                            <div className="p-3">
                                <Typography className="p-2" fontWeight={'bold'} borderBottom={'1px solid #eee'}>
                                    Voucher của tôi
                                </Typography>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            minWidth: 800,
                                        }}
                                        aria-label="simple tablek w"
                                    >
                                        <TableHead>
                                            <TableRow
                                                sx={{
                                                    '& > th': {
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                            >
                                                <TableCell>Mã giảm giá</TableCell>
                                                <TableCell align="center"> Chủ sở hữu </TableCell>
                                                <TableCell align="center"> Hạn sử dụng</TableCell>
                                                <TableCell align="center"> Trạng thái</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {vouchersUser?.map((e: any) => {
                                                return (
                                                    <TableRow
                                                        sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell align="left">{e?.discountVoucher?.code}</TableCell>
                                                        <TableCell align="center">{e?.userVoucher?.fullName}</TableCell>
                                                        <TableCell align="center">
                                                            {formatDates(e?.discountVoucher?.expiration_date)}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {e.status == null ? (
                                                                <Chip label="Hoạt động" color="success" />
                                                            ) : (
                                                                <Chip color="error" label="Ngưng hoạt động" />
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center"></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavUser>
    );
}

export default UserMyVoucher;
