
const btnDel = document.getElementsByClassName('btn-del');
const btnAdd = document.getElementById('btn-add');
const btnCancel = document.getElementById('btn-batal');
const btnUbah = document.getElementById('btn-ubah');
const btnEdit = document.getElementsByClassName('btn-edit');
const btnChange = document.getElementsByClassName('btn-change');
const listComplete = document.getElementById('list-complete');
const listIncomplete = document.getElementById('list-incomplete');

const blank = document.getElementById("blank");

//get form data
const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const stats = document.getElementById('status');

//get form edit data
var editId;
const titleEdit = document.getElementById('titleEdit');
const authorEdit = document.getElementById('authorEdit');
const yearEdit = document.getElementById('yearEdit');

const get = JSON.parse(localStorage.getItem("storeBook"));

btnAdd.addEventListener('click', addHandler);
btnCancel.addEventListener('click', cancelHandler);
btnUbah.addEventListener('click', doEdit);

const renderList = function () {
     var data = JSON.parse(localStorage.getItem("storeBook"));
     var bookCompletedData = data.filter(item => item.isComplete == true)
     var bookIncompletedData = data.filter(item => item.isComplete == false)
     console.log(data);

     var listBookCompleted = bookCompletedData.map(item => {
          return `<div class="card" id="${item.id}">
          <p class="book-title">${item.title}</p>
          <p>Author  : ${item.author}</p>
          <p>Year    :${item.year}</p>
          <div class="btn-card">
               <button class="btn-edit" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
               <button class="btn-change"> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></button>
               <button class="btn-del" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
          </div>
     </div>`});

     var listBookIncompleted = bookIncompletedData.map(item => {
          return `<div class="card" id="${item.id}">
          <p class="book-title">${item.title}</p>
          <p>Author  :${item.author}</p>
          <p>Year    :${item.year}</p>
          <div class="btn-card">
               <button class="btn-edit" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
               <button class="btn-change" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
               <button class="btn-del" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
          </div>
     </div>`});

     listComplete.innerHTML = listBookCompleted;
     listIncomplete.innerHTML = listBookIncompleted;

     for (var i = 0; i < btnDel.length; i++) {
          btnChange[i].addEventListener('click', statusHandler)
          btnEdit[i].addEventListener('click', editHandler)
          btnDel[i].addEventListener('click', deleteHandler);
     }
}

function resetForm(){
     title.value = "";
     author.value = "";
     year.value = "";
     stats.value = "";
}

const updatelist = function () {
     var datas = JSON.parse(localStorage.getItem("storeBook"));
     var titleData = title.value;
     var authorData = author.value;
     var yearData = parseInt(year.value);
     var statsData = stats.checked;

     if(!titleData || !authorData || !yearData){
          alert("Data tidak boleh kosong")
          return;
     }

     const d = new Date();

     datas.push({
          id: `${yearData}+${d}`,
          title: titleData,
          author: authorData,
          year: yearData,
          isComplete: statsData,
     });
     localStorage.setItem("storeBook", JSON.stringify(datas));
     resetForm();

}
const deleteList = function (e) {
     var datas = JSON.parse(localStorage.getItem("storeBook"));
     var newDatas = datas.filter(d => d.id != e.target.parentElement.parentElement.id);
     localStorage.setItem("storeBook", JSON.stringify(newDatas));

}

function statusHandler(e) {
     e.preventDefault();
     var datas = JSON.parse(localStorage.getItem("storeBook"));
     var newDatas = datas.map(item => {
          if (item.id == e.target.parentElement.parentElement.id) {
               return (
                    {
                         id: item.id,
                         title: item.title,
                         author: item.author,
                         year: item.year,
                         isComplete: !item.isComplete,
                    }
               )
          }else{
               return item;
          };
     })
     localStorage.setItem("storeBook", JSON.stringify(newDatas));
     renderList();

}

function deleteHandler(e) {
     e.preventDefault();
     deleteList(e);
     renderList();
}

function editHandler(e){
     e.preventDefault();
     blank.classList.remove("inactive");
     editId = e.target.parentElement.parentElement.id;
     
}

function doEdit(){
     var titleData = titleEdit.value;
     var authorData = authorEdit.value;
     var yearData = parseInt(yearEdit.value);

     if(!titleData || !authorData || !yearData){
          alert("Data tidak boleh kosong")
          return;
     }

     var datas = JSON.parse(localStorage.getItem("storeBook"));
     var newDatas = datas.map(item => {
          if (item.id == editId) {
               return (
                    {
                         id: item.id,
                         title: titleData,
                         author: authorData,
                         year: yearData,
                         isComplete: item.isComplete,
                    }
               )
          }else{
               return item;
          };
     });
     localStorage.setItem("storeBook", JSON.stringify(newDatas));
     renderList();
}

function cancelHandler(e){
     e.preventDefault();
     blank.classList.add("inactive");
}

function addHandler(e) {
     e.preventDefault();
     updatelist();
     renderList();
}

if (get) {
     renderList();
}else{
     localStorage.setItem('storeBook', '[]');
};



