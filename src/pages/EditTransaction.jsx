import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-color-palette/css";
import "./style/EditTransaction.css";
import { Button, TextField, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import Toast from "../helpers/toast";

const EditTransaction = () => {
  const dispatch = useDispatch();
  const { id: transactionId } = useParams();
  const [status, setStatus] = useState([
    {
      value: 'On Process',
      label: 'On Process',
    },
    {
      value: "On Delivery",
      label: "On Delivery",
    },
    {
      value: "Arrived at Destination",
      label: "Arrived at Destination",
    },
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Cancel",
      label: "Cancel",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  console.log(selectedStatus);

  const getTransaction = async () => {
    if (!accessToken) {
      return;
    }
    try {
      const config = {
        url: `http://localhost:3000/transactions/${transactionId}`,
        method: "GET",
        headers: {
          access_token: accessToken,
        },
      };
      const { data } = await axios(config);
      setNavbarData(data.data);
      setSelectedStatus(data.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  const setNavbarData = (transactionData) => {
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
          {
            text: `${transactionData.id}`,
            path: `/admin/transaction-manage/${transactionData.id}`,
          },
        ],
      },
    });
  };
  const saveConfirmation = () => {
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
      let statusUrl = "";
      if (selectedStatus === "On Delivery") {
        statusUrl = "delivery";
      } else if (selectedStatus === "Arrived at Destination") {
        statusUrl = "arrive";
      } else if (selectedStatus === "Cancel") {
        statusUrl = "cancel";
      } else if (selectedStatus === "Done") {
        statusUrl = "done";
      }
      const config = {
        url: `http://localhost:3000/transactions/${statusUrl}/${transactionId}`,
        method: "PUT",
        headers: {
          access_token: accessToken,
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
    getTransaction();
  }, [accessToken]);

  return (
    <div className="edit-transaction">
      <TextField
        select
        label="Transaction Status"
        variant="outlined"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="edit-input">
        {status.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </TextField>
      <div className="button-container">
        <Button variant="contained" onClick={saveConfirmation}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditTransaction;
