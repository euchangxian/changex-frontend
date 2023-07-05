import { useState } from "react";
import TransactionsList from "../components/TransactionsList";
import BudgetBar from "../components/BudgetBar";
import './styles.css'

export default function Home() {
  const [allTransactions, setAllTransactions] = useState([]);
  return (
    <>
      <div className="componentContainer">
        <BudgetBar allTransactions={allTransactions} />
      </div>
      <div className="componentContainer">
        <TransactionsList
          allTransactions={allTransactions}
          setAllTransactions={setAllTransactions}
        />
      </div>
    </>
  );
}
