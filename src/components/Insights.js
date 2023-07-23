import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CategoryToIcon from "../apis/CategoryToIcon";

export default function Insights() {
  const [data, setData] = useState([]);
  const currMonth = dayjs();

  const getInsights = () => {
    axios.get(`/comparespending/${currMonth}`).then((result) => {
      setData(result.data);
    });
  };

  useEffect(() => {
    getInsights();
  }, []);

  const insightsList = data.map((insight) => {
    if (insight.delta > 10) {
      return (
        <ListItem key={insight.name}>
          <ListItemAvatar>
            <Avatar>{CategoryToIcon(insight.name)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              "Warning: Your spending on " +
              insight.name +
              " has increased by " +
              Math.round(insight.delta) +
              "% from last month."
            }
          />
        </ListItem>
      );
    }
    if (insight.delta < -10) {
      return (
        <ListItem key={insight.name}>
          <ListItemAvatar>
            <Avatar>{CategoryToIcon(insight.name)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              "Keep it up: Your spending on " +
              insight.name +
              " has decreased by " +
              Math.round(-insight.delta) +
              "% from last month."
            }
          />
        </ListItem>
      );
    }
    // Return null or undefined for insights that don't meet the condition
    return null;
  });

  return (
    <Box>
      <Typography variant="h4">Insights</Typography>
      <List>
        {insightsList.length ? (
          insightsList
        ) : (
          <ListItem>
            <ListItemText primary="No insights currently" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
