import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import * as React from "react";
import { toast } from "react-toastify";
import CategoryToIcon from "../apis/CategoryToIcon";
import axios from "../apis/axios";

const toastConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function TransactionModal({
  allTransactions,
  fetchTransactions,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteTransaction = async id => {
    await axios.delete(`/transactions/${id}`).then(res => {
      fetchTransactions();
    });
  };

  const handleSharePost = async transaction => {
    const username = (await axios.get("/user")).data;
    const action = transaction.amount < 0 ? "spent" : "saved";
    const amount = Math.abs(transaction.amount);

    const body =
      username +
      " " +
      action +
      " $" +
      amount +
      " on " +
      transaction.description +
      ". (" +
      transaction.category +
      ")";

    await axios
      .post("/addpost", {
        date: new Date(),
        transactionId: transaction._id,
        body: body,
      })
      .then(res => {
        toast.success("🦄 Successfully shared with friends!", toastConfig);
        console.log(res);
      });
  };

  const allTransactionsDisplay = allTransactions.map(transaction => (
    <div key={transaction._id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{CategoryToIcon(transaction.category)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.description}
          secondary={
            <>
              <span>{dayjs(transaction.date).format("ddd, DD MMM YYYY")}</span>
              <br />
              <span style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                {`${transaction.amount < 0 ? "-" : ""}$${Math.abs(
                  transaction.amount
                )}`}
              </span>
            </>
          }
        />
        <IconButton
          aria-label="share"
          onClick={() => handleSharePost(transaction)}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteTransaction(transaction._id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </div>
  ));

  return (
    <>
      <Button onClick={handleOpen}>See All Transactions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Transaction-Modal"
        aria-describedby="Shows-a-list-of-all-transactions-made-by-the-user"
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
            <h2 style={{ flexGrow: 1 }}>All Transactions</h2>
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
          <List
            sx={{
              width: "100%",
              minHeight: 480,
              maxWidth: 400,
              bgcolor: "background.paper",
              overflowY: "auto",
            }}
          >
            {/*This shows all Transactions in a scrollable list.*/}
            {allTransactionsDisplay}
          </List>
        </Box>
      </Modal>
    </>
  );
}
