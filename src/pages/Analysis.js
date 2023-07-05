import BudgetSpendingChart from "../components/BudgetSpendingChart";
import SpendingCategoryChart from "../components/SpendingCategoryChart";
import Insights from "../components/Insights";
import { Box, Container } from "@mui/material";
import './styles.css'

export default function Analysis() {
  return (
    <Container maxWidth="lg">
      <Box>
        <Box className="componentContainer">
          <BudgetSpendingChart />
        </Box>
        <Box display="flex">
          <Box sx={{ flex: "1 1 50%" }} className="componentContainer">
            <SpendingCategoryChart />
          </Box>
          <Box sx={{ flex: "1 1 50%" }} className="componentContainer">
            <Insights />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
