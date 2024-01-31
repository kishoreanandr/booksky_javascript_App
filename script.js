//it will automatically start when the page is reloading
document.addEventListener("DOMContentLoaded",function()
{
    loadBooks();
});




//this is for  displaying overlay and box while touching the add button only
var addpopupbutton = document.getElementById("add-pop-button");
var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");

if (!addpopupbutton || !popupoverlay || !popupbox) {
    console.error("One or more elements not found. Check your HTML or element IDs/classes.");
}

addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    popupbox.style.display = "block";
});




//selecting  cancel button for prevent  cancelling automatically
var cancelcontent=document.getElementById("cancel-content")
cancelcontent.addEventListener("click",function(event)
{
    event.preventDefault();
    popupbox.style.display = 'none';
    popupoverlay.style.display = 'none';
})



//adding the contents..
var container=document.querySelector(".container");
var addcontent=document.getElementById("add-content");
var Booktitleinput=document.getElementById("Book-title-input");
var Bookauthorinput=document.getElementById("Book-author-input");
var Bookdescriptioninput=document.getElementById("Book-description-input");
addcontent.addEventListener("click",function(event)
{
    event.preventDefault();
    var div=document.createElement("div") //this is for creating a div add adding inside the page
    div.setAttribute("class","book-container")
    div.innerHTML=` <h2>${Booktitleinput.value}</h2>
    <h3>${Bookauthorinput.value}</h3>
    <p>${Bookdescriptioninput.value}</p>
    <button id="delete-book">Delete</button>`
    container.append(div);     //it will create a new container and store the new book 
    saveBooks(); //it will call the fucntion
    popupoverlay.style.display="none";
    popupbox.style.display="none";
})



//deleting the book
container.addEventListener("click",function(event)
{
    if(event.target.id=="delete-book") // I add these because it add event listener will select only first id
    {
    event.target.parentElement.remove();
    saveBooks();
}
})



//savebooks in local storage of browser upto 5mb
function saveBooks()
{
    var books=[]
    var booksconatiners=document.querySelectorAll(".book-container");
    booksconatiners.forEach(function(bookcontainer)
    {
        var title=bookcontainer.querySelector("h2").textContent;
        var author=bookcontainer.querySelector("h3").textContent;
        var description=bookcontainer.querySelector("p").textContent;
        books.push({title:title,author:author,description:description})
    })
    localStorage.setItem("books",JSON.stringify(books));
}


//It wiil load the books from savedbooks
function loadBooks()
{
    var savedbooks=localStorage.getItem("books");
    if(savedbooks)
    {
        var books=JSON.parse(savedbooks)
        books.forEach(function(book)
        {
            var div=document.createElement("div");
            div.setAttribute("class","book-container");
            div.innerHTML= `<h2>${book.title}</h2>
            <h3>${book.author}</h3>
            <p>${book.description}</p>
            <button id="delete-book">Delete</button>`;
            container.append(div);
        })
    }
}

