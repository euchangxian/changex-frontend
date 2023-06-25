import { useState } from "react";
import TransactionsList from "../components/TransactionsList";
import BudgetBar from "../components/BudgetBar";

export default function Home() {
  const [allTransactions, setAllTransactions] = useState([]);
  return (
    <>
      <BudgetBar allTransactions={allTransactions} />
      <TransactionsList
        allTransactions={allTransactions}
        setAllTransactions={setAllTransactions}
      />
    </>
  );
}
