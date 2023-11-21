document.addEventListener('DOMContentLoaded', function() {
    
    let storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    displayEntries(storedEntries);
  });

  let currentDate = new Date();
  let minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 55); // Min date (55 years ago)
  let maxDate = new Date(currentDate);
  maxDate.setFullYear(maxDate.getFullYear() - 18); // Max date (18 years ago)

  let dobInput = document.getElementById('dob');
  dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]); // Set max date
  dobInput.setAttribute('min', minDate.toISOString().split('T')[0]); // Set min date

  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
  
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dobInput = document.getElementById('dob').value;
    let acceptedTerms = document.getElementById('terms').checked;
    

    let currentDate = new Date();
    let inputDate = new Date(dobInput);
    let diff = currentDate - inputDate;
    let age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    let dobError = document.getElementById('dobError');
    if (age < 18 || age > 55) {
      dobError.textContent = 'Age should be between 18 and 55.';
      return;
    } else {
      dobError.textContent = '';
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    let user = { name, email, password, dobInput, acceptedTerms };
    let storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    storedEntries.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(storedEntries));
    
    displayEntries(storedEntries);


    document.getElementById('registrationForm').reset();
  });

  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function displayEntries(entries) {
    let tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    entries.forEach(entry => {
      let row = tableBody.insertRow();
      let rowData = [entry.name, entry.email, entry.password, entry.dobInput, entry.acceptedTerms ? 'true' : 'false'];

      rowData.forEach((data, index) => {
        let cell = row.insertCell(index);
        cell.textContent = data;
      });
    });
  }
