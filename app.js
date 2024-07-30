document.addEventListener("DOMContentLoaded", loadExpenses);

const expenseForm = document.getElementById("expenseForm");
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingIndex = -1;

expenseForm.addEventListener("submit", expenseTracker);

function expenseTracker(event) {
  event.preventDefault();

  // Get the values from the form
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const expense = {
    amount,
    description,
    category,
  };

  if (editingIndex === -1) {
    expenses.push(expense);
  } else {
    expenses[editingIndex] = expense;
    editingIndex = -1;
  }

  // Save to local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderTable();
  // Reset the form
  expenseForm.reset();
}

function loadExpenses() {
  renderTable();
}

function renderTable() {
  const expenseBody = document.getElementById("expense-table-body");

  expenseBody.innerHTML = "";

  expenses.forEach((expense, index) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
    <td>
        <button class="btn btn-danger btn-sm" onclick="editExpense(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
    </td>
    `;

    expenseBody.appendChild(newRow);
  });
}

function editExpense(index) {
  const expense = expenses[index];

  document.getElementById("amount").value = expense.amount;
  document.getElementById("description").value = expense.description;
  document.getElementById("category").value = expense.category;

  editingIndex = index;
}

function deleteExpense(index) {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderTable();
}
