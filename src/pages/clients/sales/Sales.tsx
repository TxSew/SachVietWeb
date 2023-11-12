import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import DiscountItem from "../../../components/discount/Discount";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpDiscountController from "../../../submodules/controllers/http/httpDiscountController";
import { Discount } from "../../../submodules/models/DiscountModel/Discount";

function Sales() {
  const [discount, setDiscount] = useState<Discount[]>([]);
  const http = new HttpDiscountController(BaseAPi);
  useEffect(() => {
    const props = {};
    discountFetch(props);
  }, []);
  const discountFetch = async (props: any) => {
    const discounts = await http.getAll(props);
    setDiscount(discounts);
  };

  return (
    <Grid bgcolor={"#241a32"}>
      <Box>
        <img
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/FahasaSaleThu3_W3_T1023_banner_Mainbanner_1920x700.jpg"
          alt=""
        />
      </Box>
      <Grid
        container
        maxWidth={"xl"}
        sx={{
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
          }}
        >
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/banner-halloween-t3-2.gif"
            alt=""
          />
        </Box>
      </Grid>
      <Grid container maxWidth={"xl"}>
        <Stack margin={"0 auto"} direction={"row"} spacing={3}>
          {discount.map((e: Discount) => {
            return (
              <DiscountItem
                code={e.code}
                expiration_date={e.expiration_date}
                desc={e.desc}
              />
            );
          })}
        </Stack>
      </Grid>
      <Box width={"10px"} height={"30px"}></Box>
    </Grid>
  );
}

export default Sales;
