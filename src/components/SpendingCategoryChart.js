import { useState, useEffect } from "react";
import axios from "../apis/axios";
import dayjs from "dayjs";
import {
  Box,
  LinearProgress,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${name} : $${value}`}</p>
      </div>
    );
  }

  return null;
};

export default function SpendingCategoryChart() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const yearRange = Array.from(
    { length: dayjs().year() - (dayjs().year() - 6) },
    (x, index) => dayjs().year() - 5 + index
  );

  const COLORS = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  const populateData = async selectedYear => {
    const spendingByCategory = await axios.get(
      `/getspendingbycategory/${selectedYear}`
    );
    return spendingByCategory.data.filter(entry => Number(entry.value) > 0);
  };

  useEffect(() => {
    populateData(selectedYear).then(result => {
      setData(result);
      setIsDataFetched(true);
    });
  }, [selectedYear]);

  return (
    <Box>
      <Box display="flex">
        <Typography variant="h4">Spending by Category</Typography>
        <Select value={selectedYear} onChange={handleYearChange}>
          {yearRange.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {isDataFetched ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              nameKey="name"
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={125}
              fill="#8884d8"
              labelLine={{ stroke: "black" }}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}
