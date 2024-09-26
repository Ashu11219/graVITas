

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
          <td>${expense.category}</td>
          <td>${expense.amount}</td>
      </tr>`;
  });
  table += `</table>`;
  return table;
}


function handleInvestment(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;

  fetch('http://localhost:3000/investments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
  })
  .then(response => response.json())
  .then(data => {
      displayInvestmentOptions(data);
      createReturnsChart(data);
  })
  .catch(error => console.error('Error:', error));
}

//charting
function displayInvestmentOptions(data) {
  const investmentDiv = document.getElementById('investmentOptions');
  investmentDiv.innerHTML = '';  // Clear previous data

  data.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.innerHTML = `
          <h3>${option.name} (Risk: ${option.risk})</h3>
          <p>Returns after 3 years: ${option.returns_3yrs.toFixed(2)}</p>
          <p>Returns after 5 years: ${option.returns_5yrs.toFixed(2)}</p>
          <p>Returns after 10 years: ${option.returns_10yrs.toFixed(2)}</p>
      `;
      investmentDiv.appendChild(optionDiv);
  });
}

function createReturnsChart(data) {
  const ctx = document.getElementById('returnsChart').getContext('2d');
  const labels = ['3 years', '5 years', '10 years'];
  const datasets = data.map(option => {
      return {
          label: option.name,
          data: [option.returns_3yrs, option.returns_5yrs, option.returns_10yrs],
          borderColor: getRandomColor(),
          fill: false
      };
  });

  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: datasets
      },
      options: {
          title: {
              display: true,
              text: 'Investment Returns Over Time'
          }
      }
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
