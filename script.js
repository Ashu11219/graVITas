

// Login form handling
function handleSubmit(event) {
  {
    console.log("Sending data");
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: userId, password: password })
    })  
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          document.getElementById('expenseTable').innerHTML = generateTable(data.expenses);
        }
      })
      .catch(error => console.error('Error:', error));
  }
}

function generateTable(expenses) {
  let table = `<table><tr><th>Expense</th><th>Type</th><th>Category</th><th>Amount</th></tr>`;
  expenses.forEach(expense => {
    table += `<tr>
          <td>${expense.name_of_expense}</td>
          <td>${expense.type_of_expense}</td>
          <td>${expense.category_of_expense}</td>
          <td>${expense.amount}</td>
      </tr>`;
  });
  table += `</table>`;
  return table;
}
