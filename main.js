let text = document.querySelector(`[type="text"]`);
let add = document.querySelector(`[type="button"]`);
let list = document.querySelector(".tasks");


//JSON.stringify() >> بتحول البيانات ل سترينج 
// JSON.parse()  >> عكس الي فوق بتحول من سترينج لـ مصفوفه عاديه 


// create array 
let arrayOfTasks = [];

// Check if theres tasks in local storage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();


add.addEventListener("click",()=>{
    if ((text.value !== "" )&&(text.value.length > 3)){ // بتقولو لو التكست فاضي او اكبر من 3 كلمات نفذ 
        
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
        del.textContent = "Delete";
        // create container for delete date 
        let dateDelete = document.createElement("div")
        dateDelete.className = "dateDelete";
        // append delete btn & date  to container
        dateDelete.appendChild(date);
        dateDelete.appendChild(del);

        // append container to main div
        div.appendChild(dateDelete);

        // append main div to list (page)
        list.appendChild(div)
    })
    
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
        deleteFromLocal(e.target.parentElement.parentElement.getAttribute("data-id"));
        // Delete element from page 
        e.target.parentElement.parentElement.remove();
    }
    // acsses to main div (task) 
    if (e.target.classList.contains("task")){
        // toggle with complated
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // toggle with done 
        e.target.classList.toggle("done");
        e.target.children[0].classList.toggle("text-dec")
    }
    
})


function toggleStatusTaskWith(taskId) {
    for (let i =0; i< arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
            console.log(`${arrayOfTasks[i].id} ===  ${taskId}}`)
        }
    }
    addDataToLocalStorage(arrayOfTasks);
};



