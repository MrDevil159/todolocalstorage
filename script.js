let todoList = [];
let todoListDone = [];

function deleteAll() {
  todoList = [];
  todoListDone = [];
  localStorage.setItem("pending", JSON.stringify(todoList));
  localStorage.setItem("done", JSON.stringify(todoListDone));
  const pending = document.getElementById("rowsofentrypending");
  pending.innerHTML = "";
  const done = document.getElementById("rowsofentrydone");
  done.innerHTML = "";
   

}
window.onload = (event) => {
  let arraypend = JSON.parse(localStorage.getItem("pending")) || [];
  iterateAdd(arraypend);
  todoList = arraypend;

  let arraydone = JSON.parse(localStorage.getItem("done")) || [];
  iterateAddDone(arraydone);
  todoListDone = arraydone;
};
function submitAction() {
  const title = document.getElementById("titlemod").value;
  const desc = document.getElementById("desc").value;
  console.log(title + " " + desc);
  document.getElementById("titlemod").value = "";
  document.getElementById("desc").value = "";
  enterToArray(title, desc);
   
}

function enterToArray(title, desc) {
  
  const newTodo = { title: title, description: desc };
  todoList.push(newTodo);
  addRow(title, desc);
  localStorage.setItem("pending", JSON.stringify(todoList));
  console.log(todoList);
   
}

function addRow(title, desc) {
  const pending = document.getElementById("rowsofentrypending");

  pending.innerHTML += `
    <div id="${todoList.length - 1}-rowp" class="d-flex bd p-2">
                  <div class="p-2 bd w-35">${title}</div>
                  <div class="p-2 bd flex-grow-1 w-65">${desc}</div>
                  <div class="p-2 bd w-35 text-center"><button class="btn btn-success" onclick="doneAdd(${
                    todoList.length - 1
                  })">✓</button><button class="btn btn-danger" onclick="delPending(${
    todoList.length - 1
  })">X</button><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editRow(${
    todoList.length - 1
  })">✎</button></div>
    </div>
    `;
     
}

function iterateAdd(arraypend) {
  
  const pending = document.getElementById("rowsofentrypending");
  pending.innerHTML = "";
  for (var i = 0; i < arraypend.length; i++) {
    pending.innerHTML += `
        <div id="${i}-rowp" class="d-flex bd p-2">
                      <div class="p-2 bd w-35">${arraypend[i].title}</div>
                      <div class="p-2 bd flex-grow-1 w-65">${arraypend[i].description}</div>
                      <div class="p-2 bd w-35 text-center"><button class="btn btn-success" onclick="doneAdd(${i})">✓</button><button class="btn btn-danger" onclick="delPending(${i})">X</button><button class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editRow(${i})">✎</button></div>
        </div>
        `;
  }
   
}
function delPending(i) {
  todoList.splice(i, 1);
  var rownum = i + "-rowp";
  const pending = document.getElementById(rownum);
  pending.remove();
  localStorage.setItem("pending", JSON.stringify(todoList));
  iterateAdd(todoList);
   
}

function editRow(i) {
  document.getElementById("edittitlemod").value = todoList[i].title;
  document.getElementById("editdesc").value = todoList[i].description;
  document.getElementById("idedit").value = i;
   
}

function editAction() {
  const titleedit = document.getElementById("edittitlemod").value;
  const descedit = document.getElementById("editdesc").value;
  const idedit = document.getElementById("idedit").value;

  todoList[idedit].title = titleedit;
  todoList[idedit].description = descedit;

  localStorage.setItem("pending", JSON.stringify(todoList));

  console.log("Edited: " + titleedit + " " + descedit);
  document.getElementById("edittitlemod").value = "";
  document.getElementById("editdesc").value = "";
  var rownum = idedit + "-rowp";
  document.getElementById(rownum).innerHTML = `
    <div class="p-2 bd update w-35">${todoList[idedit].title}</div>
    <div class="p-2 bd flex-grow-1 update w-65">${todoList[idedit].description}</div>
    <div class="p-2 bd update w-35 text-center"><button class="btn btn-success" onclick="doneAdd(${idedit})">✓</button><button class="btn btn-danger" onclick="delPending(${idedit})">X</button><button class="btn btn-secondary" type="button" class="" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editRow(${idedit})">✎</button></div>
    `;
     
}

//Second Part of Done

function doneAdd(i) {
  enterToArrayDone(todoList[i].title, todoList[i].description);
  todoList.splice(i, 1);
  var rownum = i + "-rowp";
  const pending = document.getElementById(rownum);
  pending.remove();
  localStorage.setItem("pending", JSON.stringify(todoList));
  let arraypend = JSON.parse(localStorage.getItem("pending")) || [];
  iterateAdd(arraypend);
   

}

function enterToArrayDone(title, desc) {
  const newTodoDone = { title: title, description: desc };
  todoListDone.push(newTodoDone);
  addRowDone(title, desc);
  localStorage.setItem("done", JSON.stringify(todoListDone));
  console.log(todoListDone);
   
}

function addRowDone(title, desc) {
  const done = document.getElementById("rowsofentrydone");

  done.innerHTML += `
    <div class="d-flex bd p-2" id="${todoListDone.length - 1}-rowd">
    <div class="p-2 bdone update w-35">${title}</div>
    <div class="p-2 bdone flex-grow-1 update w-65">${desc}</div>
    <div class="p-2 bdone update w-35 text-center"><button class="btn btn-danger" onclick="delDone(${todoListDone.length - 1})">X</button></div>
    </div>
    `;
     

}

function iterateAddDone(arraydone) {
  const done = document.getElementById("rowsofentrydone");
  done.innerHTML = "";
  for (var i = 0; i < arraydone.length; i++) {
    done.innerHTML += `
        <div id="${i}-rowd" class="d-flex bd p-2">
                      <div class="p-2 bdone w-35">${arraydone[i].title}</div>
                      <div class="p-2 bdone flex-grow-1 w-65">${arraydone[i].description}</div>
                      <div class="p-2 bdone w-35 text-center"><button class="btn btn-danger" onclick="delDone(${i})">X</button></div>
        </div>
        `;
  }
   
}

function delDone(i) {
  todoListDone.splice(i, 1);
  var rownum = i + "-rowd";
  const done = document.getElementById(rownum);
  done.remove();
  localStorage.setItem("done", JSON.stringify(todoListDone));

  iterateAddDone(todoListDone);
   
}


function updateTitle() {

    if(todoList.lenth==0) {
      document.getElementById("pendi").innerText="No Tasks Pending";
    } else if(todoList.lenth!=0) {
      document.getElementById("pendi").innerText="Pending Task";
    }
    console.log(todoList.length)
    
    if(todoListDone.lenth==0) {
      document.getElementById("donei").innerText="No Tasks Added to Done";
    } else if(todoListDone.lenth!=0) {
      document.getElementById("donei").innerText="Done Task";
    } 
    
}