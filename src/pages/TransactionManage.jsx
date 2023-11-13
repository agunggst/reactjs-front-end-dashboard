import { TextField, Pagination, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import CustomTable from "../components/CustomTable";
import { Link } from "react-router-dom"
import moment from "moment/moment";
import "./style/TransactionManage.css"


const TransactionManage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const tableHeads = [
    "Transaction Id",
    "Created Date",
    "Product",
    "Product Count",
    "Customer",
    "Payment Type",
    "Status",
  ];
  const [transactions, setTransactions] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const search = useDebounce(inputSearch);
  const [page, setPage] = useState(1)
  const perPage = 10

  const setNavbarData = () => {
    dispatch({
      type: "SET_PAGE_TITLE",
      payload: {
        pageTitle: "Manage Transaction",
      },
    });
    dispatch({
      type: "SET_BREADCRUMBS",
      payload: {
        breadcrumbs: [
          {
            text: "Admin",
            path: false,
          },
          {
            text: "Manage Transaction",
            path: "/admin/transaction-manage",
          },
        ],
      },
    });
  };
  const getAllTransactions = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const config = {
        url: `http://localhost:3000/transactions/all?id=${search || ""}`,
        method: "GET",
        headers: {
          access_token: accessToken,
        },
      };
      const { data } = await axios(config);
      const transactions = data.data.map((item) => {
        return {
          id: item.id,
          createdDate: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          product: item.product.name,
          productCount: item.productCount,
          user: item.user.fullname,
          payment: item.payment.name,
          status: item.status,
        };
      });
      setTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [accessToken]);
  useEffect(() => {
    setNavbarData();
  }, []);

  return (
    <div className="transaction-manage">
      <div className="utilities" style={{ marginBottom: "28px" }}>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ width: "300px" }}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Link to="/admin/transaction-manage/create-transaction">
          <Button variant="contained">Checkout</Button>
        </Link>
      </div>
      <div className="table">
        <CustomTable data={transactions.slice(0 + perPage * (page - 1), perPage + perPage * (page - 1))} heads={tableHeads} onClickRowPath="/admin/transaction-manage" />
        <div className="pagination">
          <Pagination count={Math.ceil(transactions.length/perPage)} onChange={((e, value) => setPage(value))} page={page} variant="outlined" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default TransactionManage;
