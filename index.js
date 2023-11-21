document.addEventListener('DOMContentLoaded', function() {
    // Load stored entries on page load
    const storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    displayEntries(storedEntries);
  });

  // Set the min and max attributes for the date input based on age range
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 55); // Min date (55 years ago)
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(maxDate.getFullYear() - 18); // Max date (18 years ago)

  const dobInput = document.getElementById('dob');
  dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]); // Set max date
  dobInput.setAttribute('min', minDate.toISOString().split('T')[0]); // Set min date

  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dobInput = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;
    
    // Date validation for age between 18 and 55
    const currentDate = new Date();
    const inputDate = new Date(dobInput);
    const diff = currentDate - inputDate;
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    const dobError = document.getElementById('dobError');
    if (age < 18 || age > 55) {
      dobError.textContent = 'Age should be between 18 and 55.';
      return;
    } else {
      dobError.textContent = '';
    }

    // Email validation
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Add data to the table and local storage
    const user = { name, email, password, dobInput, acceptedTerms };
    let storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    storedEntries.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(storedEntries));
    
    // Display stored entries
    displayEntries(storedEntries);

    // Reset form
    document.getElementById('registrationForm').reset();
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function displayEntries(entries) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    entries.forEach(entry => {
      const row = tableBody.insertRow();
      const rowData = [entry.name, entry.email, entry.password, entry.dobInput, entry.acceptedTerms ? 'true' : 'false'];

      rowData.forEach((data, index) => {
        const cell = row.insertCell(index);
        cell.textContent = data;
      });
    });
  }