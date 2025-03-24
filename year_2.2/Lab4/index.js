function taskSeven(){
    let student={name:"Q", age:21, year:"Junior"};
    student.subjects=["Math", "English"];
    delete student.age;
    console.log(student);
}
function library_managment(){
    let library=
    [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        pages: 310,
        isAvailable: true
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        pages: 328,
        isAvailable: true
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        pages: 281,
        isAvailable: true
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        pages: 180,
        isAvailable: true
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        genre: "Adventure",
        pages: 635,
        isAvailable: true
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        pages: 432,
        isAvailable: true
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        pages: 277,
        isAvailable: true
      }
    ];
    addBook("Brave New World","Aldous Huxley","Dystopian",311, true);
    removeBook("Pride and Prejudice");
    console.log(findBookByAuthor("Herman Melville"));
    toggleBookAvailability("Brave New World");
    sortBooksByPages();
    console.log(library);
    function sortBooksByPages(){
        library.sort((a,b)=>a.pages-b.pages);
    }
    function toggleBookAvailability(name){
        library.forEach(element => {
            if(element.title==name){
                element.isAvailable=!element.isAvailable;
            }
        });
    }
    function addBook(title, author, genre, pages){
        library.push({title:title,author:author,genre:genre,pages:pages, isAvailable:true});
    }
    function removeBook(name){
        library.forEach(element => {
            if(element.title==name){
                library.splice(library.indexOf(element),1);
            }
        });
    }
    function findBookByAuthor(author){
        let books=[];
        library.forEach(element => {
            if(element.author==author){
                books.push(element);
            }
        });
        return books;
    }



}
function taskFive(){
    let numbers=[1,2,3,4];
    numbers=numbers.map((a)=>a*a);
    console.log(numbers.filter((a)=>!(a%2)));
    console.log(numbers.reduce((total,a)=>total+a,0));
    let addition=[0,0,0,0,0];
    numbers=numbers.concat(addition);
    numbers.splice(0,3);
    console.log(numbers);
}
function taskFour(){
    let students=[
        
        {name:"F", age:19, year: "freshman"}, 
        {name:"L", age:21, year: "junior"}, 
        {name:"K", age:20, year: "sophmore"},
        {name:"Олексій", age:23, year: "senior"}
    ]
    students.forEach(element => {
        if(element.name=="Олексій"){
            students.splice(students.indexOf(element),1);
        }
    });
    students.push({name:"WW", age:"53830", course:"guru"});
    students.sort((a, b)=>a.age-b.age);
    console.log(students);
    students.forEach(element => {
        if(element.year=="junior"){
            console.log(element.name);
        }
    });
}

function taskThree(){
    let workers=[
        {name:"F", age:31, position: "developer"}, 
        {name:"L", age:21, position: "developer"}, 
        {name:"K", age:41, position: "manager"}
    ];
    workers.sort((a,b)=>a.name-b.name);
    console.log(workers);
    workers.forEach(element => {
        if(element.position=="developer"){
            console.log(element.name);
        }
    });
    workers.forEach(element => {
        if(element.age=="31"){
            workers.splice(workers.indexOf(element),1);
        }
    });
    workers.push({name: "W", age:111, position:"Boss"});
    console.log(workers);
}

function taskTwo(){
    let colors=["blue", "yellow", "green", "темно синій"];
    colors.sort((a,b)=>a.length-b.length);
    console.log(colors.at(0), colors.at(-1));
    colors.forEach(element => {
        if(element.includes("синій")){
            colors.splice(colors.indexOf(element),1);
        }
    });
    console.log(colors.join(", "));
}

function taskOne(){
    let fruits=["банана", "яблуко", "персик"];
    fruits.pop();
    console.log(fruits);
    fruits.unshift("ananas")
    fruits.sort((a,b)=>a-b)
    console.log(fruits.reverse());
    console.log(fruits.indexOf("яблуко"));
}

// taskOne();
// taskTwo();
// taskThree();
// taskFour();
// taskFive();
// library_managment();
taskSeven();