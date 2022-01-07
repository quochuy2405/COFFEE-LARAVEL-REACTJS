import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  getBillCount,
  getSalesYear,
  getTotalBill,
  getTotalDate,
  getTotalPro,
} from "../../app/ApiResult";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";

function Revenue(props) {
  const [saleMonth, setSaleMonth] = useState([]);
  const [saleMonthV, setSaleMonthV] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [totalDate, setTotalDate] = useState(0);
  const [totalPro, setTotalPro] = useState(0);
  const [Year, setYear] = useState(new Date());
  function HandelSaleYear(Data) {
    let List = {
      Month: [],
      Value: [],
    };
    let k = 0;
    for (let i = 1; i <= 12; i++) {
      List.Month.push(i);

      if (Data[k]?.Month === i) {
        List.Value.push(Data[k++]?.Revenue);
      } else {
        List.Value.push(0);
      }
    }
    setSaleMonth(List?.Month);
    setSaleMonthV(List?.Value);
  }
  const getRevenueYear = async () => {
    const res = await getSalesYear(Year.getFullYear());
    if (res) HandelSaleYear(res);
  };

  const TotalBill = async () => {
    const res = await getTotalBill(Year.getFullYear());
    if (res) setTotalBill(res[0]?.TotalSale / 1000000);
  };
  const TotalToDay = async () => {
    const date = new Date(Date.now());
    const strDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const res = await getTotalDate(strDate);
    const Total = res.reduce((total, item) => {
      return total + item?.TotalPrice;
    }, 0);
    if (res) setTotalDate(Total / 1000000);
  };
  const BillCount = async () => {
    const res = await getBillCount(Year.getFullYear());
    if (res) setBillCount(res[0]?.count);
  };
  const TotalPro = async () => {
    const res = await getTotalPro(Year.getFullYear());
    if (res) setTotalPro(res[0]?.count);
  };
  useEffect(() => {
    TotalToDay();
  }, []);
  useMemo(() => {
    TotalBill();
    BillCount();
    TotalPro();
    getRevenueYear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Year]);

  const dataYear = {
    labels: saleMonth,
    datasets: [
      {
        label: `Doanh Thu Tháng của năm ${Year.getFullYear()} (VND)`,
        data: saleMonthV,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Revenue">
      <div className="Revenues">
        <div className="revenueItem">
          <div className="icon icon1">
            <i className="fad fa-usd-circle"></i>
          </div>
          <div className="content">
            <p className="title">Tổng doanh thu</p>
            <div className="numberContent">
              <p>{totalBill} Triệu</p>
            </div>
          </div>
        </div>
        <div className="revenueItem">
          <div className="icon icon2">
            <i className="fad fa-user"></i>
          </div>
          <div className="content">
            <p className="title">Số đơn bán</p>
            <div className="numberContent">
              <p>{billCount} </p>
            </div>
          </div>
        </div>
        <div className="revenueItem">
          <div className="icon icon3">
            <i className="fad fa-coffee-togo"></i>
          </div>
          <div className="content">
            <p className="title">Sản phẩm bán ra</p>
            <div className="numberContent">
              <p>{totalPro}</p>
            </div>
          </div>
        </div>
        <div className="revenueItem">
          <div className="icon icon4">
            <i className="fad fa-file-invoice-dollar"></i>
          </div>
          <div className="content">
            <p className="title">Doanh thu hôm nay</p>
            <div className="numberContent">
              <p>{totalDate} Triệu</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dateChoice">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DatePicker
              views={["year"]}
              label="Chọn năm"
              value={Year}
              onChange={(newValue) => {
                setYear(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Stack>
        </LocalizationProvider>
      </div>

      <div className="Revenue__Year">
        <Bar
          data={dataYear}
          className="Charting"
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default Revenue;
