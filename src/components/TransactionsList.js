import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import CategoryToIcon from "../apis/CategoryToIcon";
import axios from "../apis/axios";
import NewTransactionModal from "./NewTransactionModal";
import TransactionModal from "./TransactionModal";

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const firstFiveTransactions = allTransactions.slice(0, 5).map(transaction => (
    <div key={transaction._id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{CategoryToIcon(transaction.category)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.description}
          secondary={dayjs(transaction.date).format("ddd, DD MMM YYYY")}
        />
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
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ));

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      subheader={
        <ListSubheader
          component="div"
          id="list-header"
          sx={{ fontSize: "28px", color: "black" }}
        >
          Latest Transactions
        </ListSubheader>
      }
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
  );
}
