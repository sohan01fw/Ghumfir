// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// import './Budget.css';

// const Budget = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(true);
//   const [budgetInfo, setBudgetInfo] = useState({
//     totalBudget: 5000,
//     expenses: [
//       { id: 1, category: 'Food', amount: 500 },
//       { id: 2, category: 'Transportation', amount: 800 },
//     ],
//   });

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className={`budget ${isDropdownOpen ? 'open' : ''}`} id="budget">
//       <div className="dropdown-header" onClick={toggleDropdown}>
//         <h2>Budget</h2>
//         <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} />
//       </div>
//       <div className="dropdown-content">
//         <p>Total Budget: ${budgetInfo.totalBudget}</p>
//         <h3>Expenses</h3>
//         <ul>
//           {budgetInfo.expenses.map((expense) => (
//             <li key={expense.id}>
//               {expense.category}: ${expense.amount}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Budget;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Budget.css';

const Budget = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState(() => {
    // Check if budgetInfo exists in local storage
    const storedBudget = localStorage.getItem('budgetInfo');
    return storedBudget ? JSON.parse(storedBudget) : {
      totalBudget: 5000,
      expenses: [
        { id: 1, category: 'Food', amount: 500 },
        { id: 2, category: 'Transportation', amount: 800 },
      ],
    };
  });
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  useEffect(() => {
    // Save budgetInfo to local storage whenever it changes
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
  }, [budgetInfo]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddExpense = () => {
    if (newExpenseCategory && newExpenseAmount) {
      const newExpense = {
        id: Date.now(),
        category: newExpenseCategory,
        amount: parseFloat(newExpenseAmount),
      };
      setBudgetInfo(prevBudget => ({
        ...prevBudget,
        expenses: [...prevBudget.expenses, newExpense],
      }));
      // Clear input fields after adding expense
      setNewExpenseCategory('');
      setNewExpenseAmount('');
    }
  };

  return (
    <div className={`budget ${isDropdownOpen ? 'open' : ''}`} id="budget">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <h2>Budget</h2>
        <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} />
      </div>
      <div className="dropdown-content">
        <p>Total Budget: ${budgetInfo.totalBudget}</p>
        <h3>Expenses</h3>
        <ul>
          {budgetInfo.expenses.map((expense) => (
            <li key={expense.id}>
              {expense.category}: ${expense.amount}
            </li>
          ))}
        </ul>
        <div className="add-expense">
          <input
            type="text"
            placeholder="Expense Category"
            value={newExpenseCategory}
            onChange={(e) => setNewExpenseCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Expense Amount"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
          />
          <button onClick={handleAddExpense}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Budget;
