import BudgetSpendingChart from "../components/BudgetSpendingChart";
import SpendingCategoryChart from "../components/SpendingCategoryChart";
import Insights from "../components/Insights";
import { Box, Container } from "@mui/material";

export default function Analysis() {
  return (
    <Container maxWidth="lg">
      <Box>
        <BudgetSpendingChart />
        <Box display="flex">
        <SpendingCategoryChart />
        <Insights />
        </Box>
      </Box>
    </Container>
  );
}
