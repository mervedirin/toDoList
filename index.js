// create a 'close' button


var todoList = getStorage();

if (todoList == null || todoList.length == 0) {
    var newList = new Array("3 Litre Su iç", "Ödevleri Yap", "En Az 3 Saat Kodlama Yap", "Yemek Yap", "50 Sayfa Kitap Oku");
    setStorage(newList);
    todoList = newList;
}

var ul = document.querySelector("#list");
var i;
for (i = 0; i < todoList.length; i++) {
    var li = createLiElementFromString(todoList[i]);
    ul.appendChild(li);
}

// create 'click-close'

// var closeList = document.getElementsByClassName("hideElement");
// for (let i = 0; i < closeList.length; i++) {
//     closeList[i].onclick = function () {
//         var toDoElement = this.parentElement;
//         toDoElement.style.display = "none";
//     };
// }
// for (let element of closeList){
//     element.onclick = function() {
//         var toDoElement = this.parentElement;
//         toDoElement.style.display = "none";
//     }
// }

// create checked element

var checkedlist = document.querySelector("ul");
checkedlist.addEventListener("click", function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
})

// create add li

function newElement() {
    var li = document.createElement("li")
    var newValue = document.getElementById("task").value;
    li.append(newValue);
    if (newValue === "") {
        $("#toastEmptyErr").toast('show');
    }
    else {
        var newSpan = createCloseSpan();
        li.appendChild(newSpan);
        document.getElementById("list").appendChild(li);
        addToStorage(newValue);
    }
}

function createCloseSpan() {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "hideElement";
    span.appendChild(txt);
    span.onclick = function () {
        var toDoElement = this.parentElement;
        var string =  toDoElement.innerHTML.replace('<span class="hideElement">×</span>','');
        removeFromStorage(string);
        toDoElement.style.display = "none";
    };

    return span;
}

function createLiElementFromString(string) {
    var li = document.createElement("li");
    li.append(string);
    li.appendChild(createCloseSpan());
    return li;
}

function getStorage() {
    return JSON.parse(localStorage.getItem("toDoList"));
}

function setStorage(object) {
    localStorage.setItem("toDoList", JSON.stringify(object));
}

function addToStorage(string) {
    var list = getStorage();
    list.push(string);
    setStorage(list);
}

function removeFromStorage(string) {
    var list = getStorage();
    list.splice(list.indexOf(string), 1);
    setStorage(list);
}