



//Code
start();

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
      
      successMsg.textContent = "Вас успішно зареєстровано!";
      successMsg.style.display = "block";
      this.querySelectorAll("input, select").forEach(el => el.classList.remove("success", "error"));
      this.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
      citySelect.disabled = true;
      citySelect.innerHTML = '<option value="">Спочатку оберіть країну</option>';
      setTimeout(function(){
        main();
      },2000);
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
      
      successMsg.textContent = "Ви успішно увійшли!";
      successMsg.style.display = "block";
      this.querySelectorAll("input").forEach(el => el.classList.remove("success", "error"));
      this.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
      setTimeout(function(){
        main();
      },2000);
    } else {
      successMsg.style.display = "none";
    }
  });

  
let users=[];
let container;
let activePages=1;
  //Main

  function start(){
    
    document.querySelector("body").innerHTML=`
    <div class="container">
      <ul class="tab-group">
        <li class="tab active"><a href="#login">Авторизація</a></li>
        <li class="tab"><a href="#signup">Реєстрація</a></li>
      </ul>
      <div class="tab-content">
        
        <form id="login" class="form active" novalidate>
          <div class="form-group">
            <label for="login-username">Username*</label>
            <input type="text" id="login-username" autocomplete="username" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="login-password">Password*</label>
            <div class="password-wrapper">
              <input type="password" id="login-password" minlength="6" autocomplete="current-password" required>
              <span class="toggle-password">&#128065;</span>
            </div>
            <span class="error-message"></span>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="remember-me">
            <label for="remember-me">Запам'ятати мене</label>
          </div>
          <button type="submit">Увійти</button>
          <div class="success-message"></div>
        </form>
        
        <form id="signup" class="form" novalidate>
          <div class="form-group">
            <label for="first-name">First Name*</label>
            <input type="text" id="first-name" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="last-name">Last Name*</label>
            <input type="text" id="last-name" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="email">Email*</label>
            <input type="email" id="email" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="password">Password*</label>
            <div class="password-wrapper">
              <input type="password" id="password" minlength="6" required>
              <span class="toggle-password">&#128065;</span>
            </div>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password*</label>
            <div class="password-wrapper">
              <input type="password" id="confirm-password" minlength="6" required>
              <span class="toggle-password">&#128065;</span>
            </div>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="phone">Phone (+380...)*</label>
            <input type="text" id="phone" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="birthdate">Date Birth*</label>
            <input type="date" id="birthdate" required>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="sex">Sex*</label>
            <select id="sex" required>
              <option value="">Оберіть стать</option>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
            </select>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="country">Country*</label>
            <select id="country" required>
              <option value="">Оберіть країну</option>
              <option value="ua">Україна</option>
              <option value="de">Німеччина</option>
              <option value="pl">Польща</option>
            </select>
            <span class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="city">City*</label>
            <select id="city" disabled required>
              <option value="">Спочатку оберіть країну</option>
            </select>
            <span class="error-message"></span>
          </div>
          <button type="submit">Зареєструватися</button>
          <div class="success-message"></div>
        </form>
      </div>
    </div>
    `
  }


  
  
  async function getUsers(){
    const responce=await fetch('https://randomuser.me/api/?results=30');
    let halfResults=await responce.json();
    
    // let results=JSON.parse(halfResults);
    halfResults.results.forEach((user)=>{
        users.push(user);
    })
  }

  function showUsers(usersToShow=users){
    document.getElementsByClassName("flex-container")[0].innerHTML="";
    usersToShow.forEach((user)=>{
        
        document.getElementsByClassName("flex-container")[0].innerHTML+=`
        <div class="user-card">
        <img src=${user.picture.large}>
        <p class="user-name">${user.name.title} ${user.name.first} ${user.name.last}</p>
        <p class="user-tel">${user.phone}</p>
        <button class="fav-btn">Add as favourite</button>
        </div>
        `;
    }
    );
  }

  function main(){
    let formData=new FormData(document.forms[0]);
    formData.forEach(element => {
        
        localStorage.setItem(element[0], element[1]);
        
    });
    console.log(localStorage);
    document.querySelector("body").innerHTML=`
    <header>
        <div id="filter-options">
            <div id="filter-shell">
                <select id="filter-sex">
                    <option value="M">
                        Male
                    </option>
                    <option value="F">
                        Female
                    </option>
                    <option value="A" selected>
                        All
                    </option>
                </select>
                <select id="filter-age">
                    <option value="0" selected>
                        All
                    </option>
                    <option value="1">
                        18-28
                    </option>
                    <option value="2">
                        29-42
                    </option>
                    <option value="3" >
                        42+
                    </option>
                </select>
            </div>
        </div>
        <div id="sort-options">
            <p>Sort by: </p>
            <button id="sort-by-Name">Name</button>
            <button id="sort-by-Age">Age</button>
            <button id="reverse-order">↑↓</button>
        </div>
        <div id="search-shell">
            <input type="text" id="search">
            <button id="search-btn">Search</button>
        </div>
        <button id="logout">Log out</button>
    </header>
    <div id="paginator"><p>Currently active pages are 1</p></div>
    <div class="flex-container">
        
        
    </div>`;
    document.querySelector("body").style.justifyContent="start";
    document.querySelector("body").style.background="none";

    getUsers().then((x)=>{
        addAllListeners();
        initializeFromURL();
    }
    );
    
    

  }
  function debounce(func, wait = 200) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
function onScroll(){
    
        container = document.getElementsByClassName("flex-container")[0];
        const rect = container.getBoundingClientRect();
        
        if (rect.bottom <= window.innerHeight + 100) {
          getUsers().then((x)=>{updateUsersList();
            activePages++;
            document.getElementById("paginator").innerText=`Current active pages are 1-${activePages}`;
          });
          

        }
      
}
  window.addEventListener('scroll', debounce(onScroll, 1000));



  //All the sorting and filtering stuff
  let filterSex ;
  let filterAge ;
  let sortByNameBtn ;
  let sortByAgeBtn ;
  let reverseOrderBtn ;
  let searchInput ;
let searchBtn ;


let currentSort = null;      
let sortOrderAsc = true;
let currentSearchTerm = '';


function filterBySex(users, sex) {
    if (sex === 'A') return users; 
    return users.filter(user => user.gender[0].toUpperCase() === sex);
  }

  
function filterByAge(users, ageRange) {
    switch (ageRange) {
      case '1': 
        return users.filter(user => user.dob.age >= 18 && user.dob.age <= 28);
      case '2': 
        return users.filter(user => user.dob.age >= 29 && user.dob.age <= 42);
      case '3': 
        return users.filter(user => user.dob.age > 42);
      default:  
        return users;
    }
  }
  function filterBySearch(users, term) {
    if (!term) return users;
    const lowerTerm = term.toLowerCase();
    return users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(lowerTerm) || user.email.toLowerCase().includes(lowerTerm);
    });
  }
  function sortByName(users, asc = true) {
    return users.sort((a, b) => {
      const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
      const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
      return asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }
  
  function sortByAge(users, asc = true) {
    return users.sort((a, b) => asc ? a.dob.age - b.dob.age : b.dob.age - a.dob.age);
  }
  function updateURLParams() {
    const params = new URLSearchParams();
  
    
    if (filterSex.value !== 'A') params.set('sex', filterSex.value);
    if (filterAge.value !== '0') params.set('age', filterAge.value);
    if (currentSort) params.set('sort', currentSort);
    params.set('order', sortOrderAsc ? 'asc' : 'desc');
    if (currentSearchTerm) params.set('search', currentSearchTerm);
  
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newUrl);
  }




function updateUsersList() {
    let filtered = filterBySex(users, filterSex.value);
    filtered = filterByAge(filtered, filterAge.value);
    filtered = filterBySearch(filtered, currentSearchTerm);
  
    if (currentSort === 'name') {
      filtered = sortByName(filtered, sortOrderAsc);
    } else if (currentSort === 'age') {
      filtered = sortByAge(filtered, sortOrderAsc);
    }
    updateURLParams();
    showUsers(filtered);
}  


function initializeFromURL() {
    const params = new URLSearchParams(window.location.search);
  
    const sex = params.get('sex');
    if (sex && ['M', 'F', 'A'].includes(sex)) {
      filterSex.value = sex;
    }
  
    const age = params.get('age');
    if (age && ['0', '1', '2', '3'].includes(age)) {
      filterAge.value = age;
    }
  
    const sort = params.get('sort');
    if (sort && ['name', 'age'].includes(sort)) {
      currentSort = sort;
    }
  
    const order = params.get('order');
    if (order === 'asc') {
      sortOrderAsc = true;
    } else if (order === 'desc') {
      sortOrderAsc = false;
    }
  
    updateUsersList();
  }
  

function addAllListeners(){
    console.log("bug");
    filterSex = document.getElementById('filter-sex');
    filterAge = document.getElementById('filter-age');
    sortByNameBtn = document.getElementById('sort-by-Name');
    sortByAgeBtn = document.getElementById('sort-by-Age');
    reverseOrderBtn = document.getElementById('reverse-order');
    searchInput = document.getElementById('search');
    searchBtn = document.getElementById('search-btn');


    filterSex.addEventListener('change', updateUsersList);
    filterAge.addEventListener('change', updateUsersList);

sortByNameBtn.addEventListener('click', () => {
  currentSort = 'name';
  updateUsersList();
});

sortByAgeBtn.addEventListener('click', () => {
  currentSort = 'age';
  updateUsersList();
});

reverseOrderBtn.addEventListener('click', () => {
  sortOrderAsc = !sortOrderAsc;
  updateUsersList();
});

searchBtn.addEventListener('click', () => {
  currentSearchTerm = searchInput.value.trim();
  updateUsersList();
});



const debouncedSearch = debounce(() => {
  currentSearchTerm = searchInput.value.trim();
  updateUsersList();
}, 300);


searchInput.addEventListener('input', debouncedSearch);

document.getElementById("logout").addEventListener('click',()=>{
    localStorage.clear();
    start();
})
}