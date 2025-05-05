document.querySelectorAll('.tab a').forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.parentElement.classList.add('active');
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    document.querySelector(this.getAttribute('href')).classList.add('active');
    
    document.querySelectorAll('.success-message').forEach(msg => msg.style.display = 'none');
    document.querySelectorAll('.error-message').forEach(msg => {
      msg.textContent = '';
    });
    document.querySelectorAll('input, select').forEach(el => {
      el.classList.remove('error','success');
    });
  });
});


document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', function() {
    const input = this.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    this.classList.toggle('shown');
  });
});


const citiesByCountry = {
  ua: ["Київ", "Львів", "Одеса", "Харків"],
  de: ["Берлін", "Мюнхен", "Гамбург", "Франкфурт"],
  pl: ["Варшава", "Краків", "Гданськ", "Вроцлав"]
};


const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

countrySelect.addEventListener("change", function() {
  const selectedCountry = this.value;
  citySelect.innerHTML = '<option value="">Оберіть місто</option>';
  citySelect.disabled = !selectedCountry;
  citySelect.value = "";
  citySelect.classList.remove("error", "success");
  citySelect.nextElementSibling.textContent = "";
  if (selectedCountry) {
    citiesByCountry[selectedCountry].forEach(city => {
      const option = new Option(city, city);
      citySelect.appendChild(option);
    });
  }
});


function setError(input, message) {
  input.classList.remove("success");
  input.classList.add("error");
  const errorSpan = input.closest('.form-group').querySelector('.error-message');
  errorSpan.textContent = message;
}
function setSuccess(input) {
  input.classList.remove("error");
  input.classList.add("success");
  const errorSpan = input.closest('.form-group').querySelector('.error-message');
  errorSpan.textContent = "";
}


function validateEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function validatePhone(phone) {
  return /^\+380\d{9}$/.test(phone);
}

function validateBirthdate(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const birthDate = new Date(dateStr);
  if (birthDate > today) return false;
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  let realAge = age;
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    realAge = age - 1;
  }
  return realAge >= 12;
}


document.getElementById("signup").addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = true;

  
  const firstName = document.getElementById("first-name");
  if (firstName.value.trim().length < 3 || firstName.value.trim().length > 15) {
    setError(firstName, "Введіть від 3 до 15 символів.");
    valid = false;
  } else {
    setSuccess(firstName);
  }

  
  const lastName = document.getElementById("last-name");
  if (lastName.value.trim().length < 3 || lastName.value.trim().length > 15) {
    setError(lastName, "Введіть від 3 до 15 символів.");
    valid = false;
  } else {
    setSuccess(lastName);
  }

  
  const email = document.getElementById("email");
  if (!validateEmail(email.value.trim())) {
    setError(email, "Введіть коректний email.");
    valid = false;
  } else {
    setSuccess(email);
  }

  
  const password = document.getElementById("password");
  if (password.value.length < 6) {
    setError(password, "Пароль повинен містити мінімум 6 символів.");
    valid = false;
  } else {
    setSuccess(password);
  }

  
  const confirmPassword = document.getElementById("confirm-password");
  if (confirmPassword.value !== password.value || confirmPassword.value.length < 6) {
    setError(confirmPassword, "Паролі не співпадають.");
    valid = false;
  } else {
    setSuccess(confirmPassword);
  }

  
  const phone = document.getElementById("phone");
  if (!validatePhone(phone.value.trim())) {
    setError(phone, "Введіть телефон у форматі +380XXXXXXXXX.");
    valid = false;
  } else {
    setSuccess(phone);
  }

  
  const birthdate = document.getElementById("birthdate");
  if (!birthdate.value) {
    setError(birthdate, "Оберіть дату народження.");
    valid = false;
  } else if (!validateBirthdate(birthdate.value)) {
    setError(birthdate, "Вам має бути не менше 12 років і дата не в майбутньому.");
    valid = false;
  } else {
    setSuccess(birthdate);
  }

  
  const sex = document.getElementById("sex");
  if (!sex.value) {
    setError(sex, "Оберіть стать.");
    valid = false;
  } else {
    setSuccess(sex);
  }

  
  if (!countrySelect.value) {
    setError(countrySelect, "Оберіть країну.");
    valid = false;
  } else {
    setSuccess(countrySelect);
  }

  
  if (!citySelect.value || citySelect.disabled) {
    setError(citySelect, "Оберіть місто.");
    valid = false;
  } else {
    setSuccess(citySelect);
  }

  
  const successMsg = document.querySelector('#signup .success-message');
  if (valid) {
    this.reset();
    successMsg.textContent = "Вас успішно зареєстровано!";
    successMsg.style.display = "block";
    this.querySelectorAll("input, select").forEach(el => el.classList.remove("success", "error"));
    this.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Спочатку оберіть країну</option>';
  } else {
    successMsg.style.display = "none";
  }
});


document.getElementById("login").addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = true;

  
  const username = document.getElementById("login-username");
  if (!username.value.trim()) {
    setError(username, "Введіть username.");
    valid = false;
  } else {
    setSuccess(username);
  }

  
  const password = document.getElementById("login-password");
  if (password.value.length < 6) {
    setError(password, "Пароль повинен містити мінімум 6 символів.");
    valid = false;
  } else {
    setSuccess(password);
  }

  const successMsg = document.querySelector('#login .success-message');
  if (valid) {
    this.reset();
    successMsg.textContent = "Ви успішно увійшли!";
    successMsg.style.display = "block";
    this.querySelectorAll("input").forEach(el => el.classList.remove("success", "error"));
    this.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
  } else {
    successMsg.style.display = "none";
  }
});
