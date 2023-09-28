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
import * as React from "react";
import { Link } from "react-router-dom";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import { Producer } from "../../../submodules/models/producerModel/producer";

const http = new HttpProducerController(BaseAPi);
export default function ProducerAdmin() {
  const [producer, setProducer] = React.useState<Producer[]>([] as Producer[]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const producerData = await http.getAll();
    console.log(producerData);
    setProducer(producerData);
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  async function handleRemove(id: number) {
    const destroy = await http.delete(Number(id));
    const filter = producer.filter((e) => e.id !== id);
    setProducer(filter);
  }
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
            Nhà cung cấp
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
          <Link to={"/admin/createProducer"}>
            <Button variant="contained">Thêm Nhà cung cấp</Button>
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
                <TableCell>Code</TableCell>
                <TableCell align="right">Tên nhà cung cấp</TableCell>
                <TableCell align="right">Keyword</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Thao tác </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {producer.map((e: Producer, i) => (
                <TableRow
                  key={e.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {e.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {e.code}
                  </TableCell>
                  <TableCell align="right">{e.name}</TableCell>
                  <TableCell align="right">{e.keyword}</TableCell>
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
                      <Box>
                        <DeleteForeverIcon
                          onClick={() => handleRemove(Number(e.id))}
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
