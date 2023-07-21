import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import TransactionModal from "./TransactionModal";
import NewTransactionModal from "./NewTransactionModal";
import axios from "../apis/axios";
import dayjs from "dayjs";
import CategoryToIcon from "../apis/CategoryToIcon";
import { Typography } from "@mui/material";

export default function TransactionsList({
  allTransactions,
  setAllTransactions,
}) {
  const fetchTransactions = async () => {
    await axios
      .get(
        "/transactions" // Possibly have to add another argument passing in page number as request parameter.
      )
      .then(result => {
        setAllTransactions(result.data);
      });
  };

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const firstFiveTransactions = allTransactions.slice(0, 5).map(transaction => (
    <div key={transaction._id} style={{ width: "100%" }}>
      <ListItem style={{ display: "flex", alignItems: "center" }}>
        <ListItemAvatar>
          <Avatar>{CategoryToIcon(transaction.category)}</Avatar>
        </ListItemAvatar>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 3 }}>
            <ListItemText primary={transaction.description} />
          </div>
          <div style={{ flex: 1 }}>
            <ListItemText
              primary={dayjs(transaction.date).format("ddd, DD MMM YYYY")}
            />
          </div>
          <div style={{ flex: 1 }}>
            <ListItemText
              primaryTypographyProps={{
                style: {
                  textAlign: "right",
                  color: transaction.amount < 0 ? "red" : "green",
                },
              }}
              primary={`${transaction.amount < 0 ? "-" : ""}$${Math.abs(
                transaction.amount
              )}`}
            />
          </div>
        </div>
      </ListItem>

      <Divider variant="inset" component="li" />
    </div>
  ));

  return (
    <>
      <Typography variant="h4" color="black">
        Latest Transactions
      </Typography>
      <List
        sx={{
          width: "100%",
          backgroundColor: "paleblue",
        }}
      >
        <ListItem>
          <NewTransactionModal />
        </ListItem>
        {firstFiveTransactions}
        <ListItem sx={{ justifyContent: "center" }}>
          <TransactionModal
            allTransactions={allTransactions}
            fetchTransactions={fetchTransactions}
          />
        </ListItem>
      </List>
    </>
  );
}
