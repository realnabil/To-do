let text = document.querySelector(".text-add");
let add = document.querySelector(".btn-add");
let list = document.querySelector(".tasks");
let pushDone = [];

//JSON.stringify() >> بتحول البيانات ل سترينج 
// JSON.parse()  >> عكس الي فوق بتحول من سترينج لـ مصفوفه عاديه 


    // drag and drop 
    const dragArea = document.querySelector(".tasks");
    new Sortable(dragArea, {
        animation:500
    });

// create array 
let arrayOfTasks = [];

// Counters
let conutTasks = document.querySelector(".countTasks");
let countDone = document.querySelector(".doneTasks");
let clearAll = document.querySelector(".clearBtn");

// Check if there tasks in local storage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

// Start Popup
let model = document.querySelector(".model");
let delPop = document.querySelector(".del");
let popText = document.querySelector(".pop-text");
let popButton = document.querySelector(".pop-btn");
let welcomeText = document.querySelector(".welcome");
let popTextStyle = document.querySelector(".toAppend");

function modelShow() {
    model.style.opacity = "1";
    popText.focus();
}
delPop.onclick = function() {
    model.style.display = "none";
    // model.style.opacity = "0";
}
popButton.onclick = function() {
    if (popText.value != "") {
        console.log(popText.value)
        welcomeMessage(popText.value);
        model.style.display = "none";
    }
    else {
        model.style.display = "none";
    }
}
function welcomeMessage(popText){
    popTextStyle.textContent = popText;
    setPopToLocal(popText);
}
function setPopToLocal(popText){
    window.localStorage.setItem("pop",popText);
}
if (window.localStorage.getItem("pop")){
    popTextStyle.textContent = window.localStorage.getItem("pop");
    model.style.display = "none";
}
setTimeout(modelShow,2000);

// setTimeout(function() {
//     del.onclick = function(){
//     model.style.display = "none";
//     }
// },2100);
// End Popup

add.addEventListener("click",()=>{
    if (text.value !== "" ){ // بتقولو لو التكست فاضي نفذ 
        
        // To add date 
        let now = new Date();
        let geting = {
            year : now.getFullYear(),
            month : now.getMonth()+1,
            date : now.getDate(),
            hours : now.getHours(),
            minutes : now.getMinutes(),
        }
        textDate = `${geting.year}/${geting.month}/${geting.date} - ${geting.hours}:${geting.minutes}`;
        // add text and date to function >> addTaskToArray
        addTaskToArray(text.value,textDate); 
        text.value = ""; // to empty input filed
        text.focus();
    }
})


function addTaskToArray(taskText,textDate) {
    const task = {
        id: Date.now(), // to get random numbers
        title : taskText,
        completed : false,
        date : textDate,
    }
    // Push task to array 
    arrayOfTasks.push(task);

    // add task to page 
    addElementsToPageFrom(arrayOfTasks);
    // add tasks to local storage
    addDataToLocalStorage(arrayOfTasks);

}



function addElementsToPageFrom(arrayOfTasks) {
    // embty tasks div 
    list.innerHTML = ""; // بنستخدمها لو العنصر هيتكرر اكتر من مره  
    // Looping on array of tasks  
    arrayOfTasks.forEach((ele)=>{

        // Create main div
        let div = document.createElement("div");
        let mainText = document.createElement("span");
        mainText.className = "mainText";
        div.className = "task";
        if (ele.completed) {
            div.className = "task done";
            mainText.className = "mainText text-dec";
        }
        div.setAttribute("data-id",ele.id);
        mainText.appendChild(document.createTextNode(ele.title));
        div.appendChild(mainText);


        // crate date 
        let date = document.createElement("span");
        date.className = "date";
        date.appendChild(document.createTextNode(ele.date));

        // create delete btn 
        let del = document.createElement("span");
        del.className = "newBtn";
        del.innerHTML = "Delete";

         // create checkbox
        let checkBox = document.createElement("span");
        checkBox.type = "button";
        checkBox.innerHTML = "Done";
        checkBox.className = "checkList";

        let containerForAll = document.createElement("div");
        containerForAll.className = "forAll";

        // create container for delete and check 
        let dateDelete = document.createElement("div")
        dateDelete.className = "dateDelete";

        // append delete btn & checkbox 
        dateDelete.appendChild(checkBox);
        dateDelete.appendChild(del);
        

        //append all componants
        containerForAll.appendChild(dateDelete)
        containerForAll.append(date)

        // append container to main div
        div.appendChild(containerForAll);
        // append main div to list (page)
        list.appendChild(div);        
        
    })
    conutTasks.textContent = arrayOfTasks.length;
    
}

// Set data to localStorage
function addDataToLocalStorage(arrayOfTasks) {
    localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}


// get data from localStorage and add data from localStorage to page 
function getDataFromLocalStorage() {
    let data = localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);        
    }
}

function deleteFromLocal(data) {
    // for (let i = 0 ; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${data}`)
    // }
    arrayOfTasks = arrayOfTasks.filter((ele) => ele.id != data);
    addDataToLocalStorage(arrayOfTasks);
}

// delete tasks 
list.addEventListener("click",(e)=>{

    if(e.target.classList.contains("newBtn")){
        // delete element form localStorge 
        deleteFromLocal(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"));
        // Delete element from page 
        e.target.parentElement.parentElement.parentElement.remove();
    }

    
    // acsses checkbox
    if (e.target.classList.contains("checkList")){
            // toggle with complated
        toggleStatusTaskWith(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"));
            // toggle with done 
        e.target.parentElement.parentElement.parentElement.classList.toggle("done");
            // toggle with text-dec 
        e.target.parentElement.parentElement.parentElement.children[0].classList.toggle("text-dec");
    }
    conutTasks.textContent = arrayOfTasks.length;
})

// delete All
clearAll.onclick = function(){
    list.innerHTML = "";
    arrayOfTasks = [];
    localStorage.removeItem("tasks");
    conutTasks.textContent = arrayOfTasks.length;
    countDone.textContent = "0";

}
function toggleStatusTaskWith(taskId) {
    for (let i =0; i< arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);

            console.log(`${arrayOfTasks[i].id} ===  ${taskId}}`);
        }
    }       
    addDataToLocalStorage(arrayOfTasks);
};





