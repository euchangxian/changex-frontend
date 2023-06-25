import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  LinearProgress,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

export default function BudgetSpendingChart() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const yearRange = Array.from(
    { length: dayjs().year() - (dayjs().year() - 6) },
    (x, index) => dayjs().year() - 5 + index
  );

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  const populateData = async selectedYear => {
    const dataTmp = [];

    for (let i = 0; i < 12; i++) {
      const currMonth = dayjs(new Date(selectedYear, 0)).add(i, "month");
      const responseSpending = await axios.get(`/getspending/${currMonth}`);
      const responseBudget = await axios.get(`/getbudget/${currMonth}`);
      const dataEntry = {
        month: currMonth.format("MMM"),
        spending: -responseSpending.data,
        budget: responseBudget.data,
      };
      dataTmp.push(dataEntry);
    }
    return dataTmp;
  };


  useEffect(() => {
    populateData(selectedYear).then(result => {
      setData(result);
      setIsDataFetched(true);
    });
  }, [selectedYear]);

  const chart = (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spending" fill="#8884d8" />
        <Bar dataKey="budget" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Box>
      <Box display="flex">
        <Typography variant="h4">Spending/ Expenditure</Typography>
        <Select value={selectedYear} onChange={handleYearChange}>
          {yearRange.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box marginTop="10px">{isDataFetched ? chart : <LinearProgress />}</Box>
    </Box>
  );
}
