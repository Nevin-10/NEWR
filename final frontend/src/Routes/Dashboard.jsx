import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Navbar from "../components/Navbar";

function Dashboard() {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeLabel, setIncomeLabel] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseLabel, setExpenseLabel] = useState('');
  const [expenses, setExpenses] = useState([]);
  console.log(expenses)
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);


 
  const fetchExpenses = () => {
    fetch('http://localhost:8080/api/v1/get-expenses')
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const fetchIncomes = () => {
    fetch('http://localhost:8080/api/v1/get-incomes')
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const addIncome = () => {
    // Call the addIncome API with the incomeAmount
    fetch('http://localhost:8080/api/v1/add-income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: incomeAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the added income
        setIncomeLabel(data.label); // Assuming the server returns a 'label' field
        setIncomeAmount(''); // Clear the input field
        fetchIncomes(); // Fetch updated incomes
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteIncome = (id) => {
    fetch(`http://localhost:8080/api/v1/delete-income/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchIncomes(); // Fetch updated incomes
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const addExpense = () => {
    // Call the addExpense API with the expenseAmount
    fetch('http://localhost:8080/api/v1/add-expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: expenseAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the added expense
        setExpenseLabel(data.label); // Assuming the server returns a 'label' field
        setExpenseAmount(''); // Clear the input field
        fetchExpenses(); // Fetch updated expenses
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteExpense = (id) => {
    fetch(`http://localhost:8080/api/v1/delete-expense/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchExpenses(); // Fetch updated expenses
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    
   
  return (
    <div className="container">
     <Navbar/>
     <br />
     <br />
      {/* Add Income section */}
      <div className="section">
        <h2 className="section-title">Add Income</h2>
        <div className="input-container">
          <input
            type="text"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            placeholder="Enter income amount"
          />
          <button className="add-button" onClick={addIncome}>Add</button>
        </div>
      </div>
  
{/* Display Income section */}
<div className="section">
  <h2 className="section-title">Income</h2>
  <label className="label">{incomeLabel}</label>
  <div className="list-container">
    {incomes.map((income) => (
      <div className="list-item" key={income.id}>
        <span>{income.amount}</span>
        <button className="delete-button" onClick={() => deleteIncome(income._id)}>Delete</button>
      </div>
    ))}
  </div>
</div>
  
      {/* Add Expense section */}
      <div className="section">
        <h2 className="section-title">Add Expense</h2>
        <div className="input-container">
          <input
            type="text"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Enter expense amount"
          />
          <button className="add-button" onClick={addExpense}>Add</button>
        </div>
      </div>
  
 {/* Display Expense section */}
<div className="section">
  <h2 className="section-title">Expense</h2>
  <label className="label">{expenseLabel}</label>
  <div className="list-container">
    {expenses.map((expense) => (
      <div className="list-item" key={expense.id}>
        <span>{expense.amount}</span>
        <button className="delete-button" onClick={() => deleteExpense(expense._id)}>Delete</button>
      </div>
    ))}
  </div>
</div>


    </div>
  );
  
}

export default Dashboard;

