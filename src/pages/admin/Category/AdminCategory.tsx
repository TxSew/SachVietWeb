import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Pagination,
  Stack,
  TextField,
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
import { BaseAPi } from "../../../configs/BaseApi";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import {
  Product,
  TProductResponse,
} from "../../../submodules/models/ProductModel/Product";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { color } from "../../../Theme/color";

const http = new HttpProductController(BaseAPi);
export default function CategoryAdmin() {
  const [Products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const ProductData: TProductResponse = await http.getAll();
      const data: any = ProductData.products;
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  // remove item
  const handleDelete = async (element: any) => {
    console.log(element.id);
    const destroy = await http.delete(element.id);
    const product = Products.filter((e) => e.id !== element.id);
    console.log(product);

    setProducts(product);
  };

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
          <Typography variant="h2" fontSize={"26px"} mb={3} fontWeight={"bold"}>
          Danh mục sản phẩm 
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
          />

          <Button variant="contained">Thêm Danh mục</Button>
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
                <TableCell>Tên loại danh mục</TableCell>
                <TableCell align="right">Danh mục cha</TableCell>
                <TableCell align="right">Ngày tạo</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
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
                    {e.productImage && e.productImage[0] ? (
                      <img
                        src={e.productImage[0].image}
                        width={"100px"}
                        alt=""
                      />
                    ) : (
                      <div>No Image</div>
                    )}
                  </TableCell>
                  <TableCell align="right">{e.title}</TableCell>
                  <TableCell align="right">{e.number}</TableCell>
                  <TableCell align="right">{e.categoryId}</TableCell>
                  <TableCell align="right">{e.status}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      <EditIcon
                        sx={{
                          color: "green",
                        }}
                      />
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
          <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
      </Grid>
    </Grid>
  );
}
