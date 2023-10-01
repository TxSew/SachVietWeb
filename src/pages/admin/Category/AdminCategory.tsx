import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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
import CategoryIcon from "@mui/icons-material/Category";
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";

const http = new HttpCategoryController(BaseAPi);
export default function CategoryAdmin() {
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const CategoryData: any = await http.getAll();
      console.log(
        "🚀 ~ file: AdminCategory.tsx:37 ~ fetchData ~ CategoryData:",
        CategoryData
      );
      console.log(CategoryData);
      setCategory(CategoryData);
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
    const destroy = await http.delete(element.id);
    const filter = category.filter((e: any) => {
      return e.id !== element.id;
    });
    if (destroy) {
      toast.error("Delete item successfully", {
        position: "bottom-right",
      });
      setCategory(filter);
    }
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
            <CategoryIcon /> Danh mục sản phẩm
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
          <Link to={"/admin/createCategory"}>
            <Button variant="contained">Thêm Danh mục</Button>
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
                <TableCell>Tên loại danh mục</TableCell>
                <TableCell align="right">Danh mục cha</TableCell>
                <TableCell align="right">Ngày tạo</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((e: any, i) => (
                <TableRow
                  key={e.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {e.id}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <img src={e.image} alt="" width={"50px"} height={"70px"} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {e.name}
                  </TableCell>
                  <TableCell align="right">
                    {e.parentName == null ? "Danh mục gốc" : e.parentName}
                  </TableCell>
                  <TableCell align="right">
                    {moment(e.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {e.status == null ? (
                      <Typography
                        color={"#fff"}
                        bgcolor={"green"}
                        p={"2px 6px"}
                        variant="caption"
                      >
                        active
                      </Typography>
                    ) : (
                      "ubactive"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      <Link to={`${e.id}`}>
                        <EditIcon
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
          <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
      </Grid>
    </Grid>
  );
}
