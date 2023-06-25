import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "../apis/axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

export default function BudgetBar({ allTransactions }) {
  const currentDate = dayjs();
  const datePct = new Date().getDate() / 30;

  const [budget, setBudget] = useState(0);
  const [spending, setSpending] = useState([]);
  const [onTrackPct, setOnTrackPct] = useState(0);
  const [budgetInput, setBudgetInput] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setBudgetInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBudget = parseInt(budgetInput);
    if (
      !/^\d+$/.test(budgetInput) ||
      newBudget < 1 ||
      parseInt(budget) === newBudget
    ) {
      // Handle the submission of invalid budget
      setBudgetInput("");
      return toast.error(
        "Invalid budget. Enter only positive numeric values -.-"
      );
      // When there is no budget, it is set to 0. So if budget is set to zero, then addBudget/
      // No allowed to add / update budget to 0.
    } else if (budget === 0) {
      addBudget(budgetInput);
    } else {
      updateBudget(budgetInput);
    }
  };

  const fetchSpendingByMonthYear = async () => {
    const date = currentDate;
    await axios
      .get(`/getspending/${date}`)
      .then((result) => {
        if (result.status === 200) {
          setSpending(-result.data);
        }
      })
      .catch((error) => {
        toast.error("Failed to get spending!");
      });
  };

  const getBudget = async () => {
    const date = currentDate;
    await axios
      .get(`/getbudget/${date}`)
      .then((result) => {
        if (result.status === 200) {
          setBudget(result.data);
        }
      })
      .catch((error) => {
        toast.error("Failed to get budget!");
      });
  };

  const addBudget = async (amount) => {
    const date = currentDate;
    await axios
      .post(`/addbudget`, {
        date: date,
        amount: amount,
      })
      .then((result) => {
        getBudget();
      });
  };

  const updateBudget = async (amount) => {
    const date = currentDate;
    await axios
      .post(`/updatebudget/${date}`, { newAmount: amount })
      .then((result) => {
        getBudget();
      });
    setBudgetInput("");
  };

  useEffect(() => {
    getBudget();
  }, []);

  useEffect(() => {
    fetchSpendingByMonthYear();
  }, [allTransactions]);

  useEffect(() => {
    setOnTrackPct((100 * (spending / budget)) / datePct);
  }, [spending, budget]);

  return (
    <Box sx={{ margin: "16px" }}>
      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            Your budget for {currentDate.format("MMMM")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="span">
            ${spending < 0 ? 0 : spending}
          </Typography>
          <Typography variant="body1" component="span" gutterBottom>
            /${budget} {spending < 0 ? "+" + -spending : null}
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <LinearProgress
          variant="determinate"
          value={(spending / budget) * 100}
          sx={{ height: 10 }}
          color={onTrackPct < 100 ? "primary" : "error"}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="10px"
      >
        <Typography variant="h6" color={onTrackPct < 100 ? "green" : "red"}>
          {budget === 0
            ? `Add budget for ${currentDate.format("MMMM")}! >>>`
            : onTrackPct < 100
            ? "You are on track to meet your budget. Good job :)"
            : "Oh no, you are projected to exceed your budget at this rate :("}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={budgetInput}
            onChange={handleInputChange}
            label={`Budget for ${currentDate.format("MMMM")}`}
            placeholder="8888.88"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "-13px", // Adjust this value to align the button
                  }}
                >
                  <IconButton type="submit">
                    <PublishIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
