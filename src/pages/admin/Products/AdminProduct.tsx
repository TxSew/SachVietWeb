import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import {
  Product,
  TProductResponse,
} from "../../../submodules/models/ProductModel/Product";

const http = new HttpProductController(BaseAPi);
export default function AdminProduct() {
  const [Products, setProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState<any>({});
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const ProductData: TProductResponse = await http.getAll();
      const data: any = ProductData.products;
      console.log(data);
      console.log(ProductData);
      setPage(ProductData);

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value);
    const panigate: any = await http.getAll(value);
    const data: any = panigate.products;
     setPage(panigate)
    setProducts(data);
  };

  // remove item
  const handleDelete = async (element: any) => {
    const destroy = await http.delete(element.id);
    toast.error("Delete item successfully", {
      position: "bottom-right",
    });

    const product = Products.filter((e) => e.id !== element.id);

    setProducts(product);
  };
  const handleChangeValue = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  return (
    <Grid>
      <Grid mt={3} width={"100%"}>
        <Stack
          direction={"row"}
          mb={2}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h2"
            fontSize={"26px"}
            mb={3}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            Sản phẩm
          </Typography>
          <OutlinedInput
            sx={{
              maxWidth: "300px",
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
            placeholder="Tìm kiếm sản phẩm..."
            onChange={handleChangeValue}
          />
          <Link to={"/admin/createProduct"}>
            <Button variant="contained">Thêm sản phẩm</Button>
          </Link>
        </Stack>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 800,
            }}
            aria-label="simple tablek w"
          >
            <TableHead>
              <TableRow
                sx={{
                  "& > th": {
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell align="right">Tiêu đề</TableCell>
                <TableCell align="right">Số lượng sản phẩm</TableCell>
                <TableCell align="right">Danh mục</TableCell>
                <TableCell align="right">Nhà cung cấp</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((e, i) => (
                <TableRow
                  key={e.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {e.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={e?.image}
                      width={"70px"}
                      height={"100px"}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="right">{e.title}</TableCell>
                  <TableCell align="right">{e.quantity}</TableCell>
                  <TableCell align="right">{e.category?.name}</TableCell>
                  <TableCell align="right">{e.producer?.name}</TableCell>
                  <TableCell align="right">{e.status}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      <Link to={`/admin/product/${e.id}`}>
                        <EditCalendarIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      </Link>
                      <Box onClick={() => handleDelete(e)}>
                        <DeleteForeverIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Pagination
            count={page?.totalPage}
            page={page?.page}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
