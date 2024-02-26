import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './Budget.css';

const Budget = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState({
    totalBudget: 5000,
    expenses: [
      { id: 1, category: 'Food', amount: 500 },
      { id: 2, category: 'Transportation', amount: 800 },
    ],
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      </div>
    </div>
  );
};

export default Budget;
