import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/CreateTransaction.css";
import { Button, TextField, FormControl, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import Toast from "../helpers/toast";

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [productCount, setProductCount] = useState(1);
  const accessToken = useSelector((state) => state.userReducer.accessToken);

  const setNavbarData = () => {
    dispatch({
      type: "SET_PAGE_TITLE",
      payload: {
        pageTitle: "Manage Transaction - Create",
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
          {
            text: `Create Transaction`,
            path: `/admin/transaction-manage/create-transaction`,
          },
        ],
      },
    });
  };
  const saveConfirmation = () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please input Product name",
      });
      return;
    }
    if (!selectedPayment) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please input Payment method",
      });
      return;
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        saveData();
      }
    });
  };
  const saveData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/transactions/checkout`,
        method: "POST",
        headers: {
          access_token: accessToken,
        },
        data: {
          productId: +selectedProduct,
          paymentId: +selectedPayment,
          productCount: +productCount
        },
      };
      await axios(config);
      Toast.fire({
        icon: "success",
        title: "Data saved successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setNavbarData();
  }, []);

  const getAllProducts = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const config = {
        url: `http://localhost:3000/products`,
        method: "GET",
        headers: {
          access_token: accessToken,
        },
      };
      const { data } = await axios(config);
      const products = data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [accessToken]);

  const getAllPayments = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const config = {
        url: `http://localhost:3000/payments`,
        method: "GET",
        headers: {
          access_token: accessToken,
        },
      };
      const { data } = await axios(config);
      const payments = data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setPayments(payments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, [accessToken]);

  return (
    <div className="create-transaction">
      <FormControl sx={{minWidth: 400}}>
        <TextField
          select
          id="select-product-input"
          className="edit-input"
          value={products.id}
          label="Product"
          onChange={(e) => setSelectedProduct(e.target.value)}>
          {products.map((product) => {
            return (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          type="number"
          label="Product Count"
          variant="outlined"
          min={1}
          value={productCount}
          onChange={(e) => setProductCount(e.target.value)}
          className="edit-input"
        />
        <TextField
          select
          className="edit-input"
          labelId="select-payment"
          value={payments.id}
          label="Payment"
          onChange={(e) => setSelectedPayment(e.target.value)}>
          {payments.map((payment) => {
            return (
              <MenuItem key={payment.id} value={payment.id}>
                {payment.name}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
      <div className="button-container">
        <Button variant="contained" onClick={saveConfirmation}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateTransaction;
