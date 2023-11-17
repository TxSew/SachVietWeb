import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

export default function Bill() {
  return (
    <>
      <Box textAlign={"center"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          width={"700px"}
          height={"134px"}
          margin={"auto"}
          border={"1px solid #ccc"}
        >
          <img
            src=""
            alt="Logo Sách Việt"
            // width={"100%"}
          />
        </Box>
        <Box py={2} borderBottom={"1px dashed #000"}>
          <Typography
            fontSize={"32px"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            bgcolor={"gold"}
            textAlign={"center"}
            p={1}
            borderRadius={"8px"}
          >
            Hóa đơn
          </Typography>
          <Box display={"flex"} gap={1} justifyContent={"center"} pt={2}>
            <Typography fontSize={"12px"}>Địa chỉ:</Typography>
            <Typography fontSize={"12px"}>
              242 Hà Huy Tập - Tân Lơi - TP.BMT - Đắk Lắk
            </Typography>
          </Box>
          <Box display={"flex"} gap={1} justifyContent={"center"} pt={2}>
            <Typography fontSize={"12px"}>Hotline:</Typography>
            <Typography fontSize={"12px"}>0352883625</Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  Tên hàng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  Tên hàng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  Số lượng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  Đơn giá
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  Tổng tiền
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key=""
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display={"flex"} gap={1} justifyContent={"end"}>
          <Typography fontWeight={"bold"}>Tổng tiền hàng:</Typography>
          <Typography>100000k</Typography>
        </Box>

        <Box display={"flex"} gap={1} justifyContent={"end"}>
          <Typography fontWeight={"bold"}>Thuế (0%):</Typography>
          <Typography>20%</Typography>
        </Box>

        <Box display={"flex"} gap={1} justifyContent={"end"}>
          <Typography fontWeight={"bold"}>Tổng tiền thanh toán:</Typography>
          <Typography>500k</Typography>
        </Box>
        <Stack fontWeight={"bold"}>Cảm ơn quý khách đã chọn Sách Việt!</Stack>
      </Box>
    </>
  );
}
