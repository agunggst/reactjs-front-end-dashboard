import { TextField, Pagination, } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import moment from "moment/moment";
import CustomTable from "../components/CustomTable";

const InvoiceManage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const tableHeads = ["Invoice Id", "Created Date", "Product", "Product Count", "Customer", "Payment Type", "Status"];
  const [invoices, setInvoices] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const search = useDebounce(inputSearch);
  const [page, setPage] = useState(1)
  const perPage = 10

  const setNavbarData = () => {
    dispatch({
      type: "SET_PAGE_TITLE",
      payload: {
        pageTitle: "Manage Invoice",
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
            text: "Manage Invoice",
            path: "/admin/invoice-manage",
          },
        ],
      },
    });
  };
  const getAllInvoices = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const config = {
        url: `http://localhost:3000/invoices/all`,
        method: "GET",
        headers: {
          access_token: accessToken,
        },
      };
      const { data } = await axios(config);
      const invoices = data.data.map(item => {
        return {
          id: item.id,
          createdDate: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          product: item.transaction.product.name,
          productCount: item.transaction.productCount,
          user: item.transaction.user.fullname,
          payment: item.transaction.payment.name,
          status: item.transaction.status,
        }
      })
      setInvoices(invoices)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInvoices();
  }, [accessToken]);
  useEffect(() => {
    setNavbarData();
  }, []);

  return (
    <div className="invoice-manage">
      <div className="utilities" style={{ marginBottom: "28px" }}>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ width: "300px" }}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
      <div className="table">
        <CustomTable data={invoices.slice(0 + perPage * (page - 1), perPage + perPage * (page - 1))} heads={tableHeads} onClickRowPath="/admin/invoice-manage" />
        <div className="pagination">
          <Pagination count={Math.ceil(invoices.length/perPage)} onChange={((e, value) => setPage(value))} page={page} variant="outlined" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceManage;
