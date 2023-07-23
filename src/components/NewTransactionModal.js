import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "../apis/axios";

export default function NewTransactionModal({ fetchTransactions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setDescription("");
    setAmount();
  };

  const [transactionType, setTransactionType] = React.useState("spendings");
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleTransactionType = (event, newTransactionType) => {
    if (newTransactionType != null) {
      setTransactionType(newTransactionType);
    }
  };

  const handleDate = newDate => {
    setDate(newDate);
  };

  const handleDecimalsOnValue = value => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  };

  const handleSubmit = async e => {
    // removed e.preventDefault() to autoclose modal on form submission and trigger re-rendering of transactionListlog(date);
    console.log(category);
    console.log(description);
    e.preventDefault();
    await axios
      .post("/addtransaction", {
        type: transactionType,
        date: date,
        category: category,
        description: description,
        amount: transactionType === "spendings" ? -amount : parseInt(amount),
      })
      .then(res => {
        console.log(res);
        fetchTransactions();
        handleClose();
      });
  };

  const categories = [
    { category: "Meals" },
    { category: "Groceries" },
    { category: "Transport" },
    { category: "Course Materials" },
    { category: "Entertainment" },
    { category: "Personal Care" },
    { category: "Clothes" },
    { category: "Gifts / Charity" },
    { category: "Others" },
  ];

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Transaction" />
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add-Transaction-Modal"
        aria-describedby="Allows-user-to-add-new-transactions-into-the-database"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 600,
            width: 450,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginTop: -20 }}
          >
            <h2 style={{ flexGrow: 1 }}>Add New Transaction</h2>
            <IconButton
              aria-label="delete"
              onClick={handleClose}
              sx={{
                marginLeft: "auto",
                marginTop: "-16px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit}>
            {/* div to select whether transaction is a payment or not */}
            <div style={{ display: "flex", margin: "auto" }}>
              <ToggleButtonGroup
                value={transactionType}
                exclusive
                onChange={handleTransactionType}
                aria-label="savings or spendings selection"
              >
                <ToggleButton value="savings" aria-label="savings">
                  <SavingsIcon />
                </ToggleButton>
                <ToggleButton value="spendings" aria-label="spendings">
                  <ShoppingCartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div style={{ display: "flex", margin: "auto" }}>
              <DatePicker
                label="Date"
                value={date}
                defaultValue={dayjs(new Date())}
                slotProps={{
                  textField: {
                    helperText: "DD/MM/YYYY",
                  },
                }}
                onChange={handleDate}
              />
            </div>
            {/* div to select transaction category */}
            <div style={{ alignItems: "center" }}>
              <Typography sx={{ marginRight: "20px" }}>
                Transaction Category:
              </Typography>
              <TextField
                id="category"
                value={category}
                required
                select
                sx={{ flexGrow: 1, width: "80%" }}
                onChange={event => {
                  setCategory(event.target.value);
                }}
              >
                {categories.map(option => (
                  <MenuItem key={option.category} value={option.category}>
                    {option.category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {/* div to input transaction description */}
            <div style={{ alignItems: "center" }}>
              <Typography sx={{ marginRight: "5px" }}>
                Transaction Description:
              </Typography>
              <TextField
                id="description"
                variant="outlined"
                value={description}
                required
                sx={{ flexGrow: 1, width: "80%" }}
                onChange={event => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            {/* div to input amount. can only input up to 2 decimal points */}
            <div style={{ alignItems: "center" }}>
              <Typography sx={{ marginRight: "120px" }}>Amount:</Typography>
              <TextField
                id="amount"
                variant="outlined"
                value={amount}
                required
                sx={{ flexGrow: 1, width: "80%" }}
                onChange={event => {
                  setAmount(handleDecimalsOnValue(event.target.value));
                }}
              />
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Add Transaction
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
