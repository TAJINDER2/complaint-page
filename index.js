let addBtn = document.getElementById("adbtn");
let title = document.getElementById("nametext");
let email = document.getElementById("emailtext");
let phone = document.getElementById("phonetext");
let note = document.getElementById("message");

addBtn.addEventListener("click", (e) => {
    if (title.value == "" || email.value == "" || phone.value == "" || note.value == "") {
        alert("please enter all details");
    }
    let messages = localStorage.getItem("messages");
    if (messages == null) {
        messagesObj = [];
    }
    else {
        messagesObj = JSON.parse(messages);
    }
    let noteObj = {
        title: title.value,
        email: email.value,
        phone: phone.value,
        note: note.value
    }
    messagesObj.push(noteObj);
    localStorage.setItem("messages", JSON.stringify(messagesObj));
    title.value = "";
    email.value = "";
    phone.value = "";
    note.value = "";

    showMessages();
})

function showMessages() {
    let messages = localStorage.getItem("messages");
    if (messages == null) {
        messagesObj = [];
    }
    else {
        messagesObj = JSON.parse(messages);

    }
    let html = "";
    messagesObj.forEach(function (element, index) {
        html += `<div class="note">
        <p class="note-counter">Complaint No ${index + 1}</p>
        <h5 class="note-title">Name: ${element.title}</h5>
        <h5 class="note-titl">Email: ${element.email}</h5>
        <h5 class="note-tit">Phone: ${element.phone}</h5>
        <p class="note-text"> Message: ${element.note}</p>
        <button  id="${index}" onclick="deletnote(this.id)" class="deletebtn">delete</button>
        <button id="${index}" onclick="editnote(this.id)" class="editbtn">edit</button>
    </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (messagesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
}

function deletnote(index) {

    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let messages = localStorage.getItem("messages");
        if (messages == null) {
            messagesObj = [];
        } else {
            messagesObj = JSON.parse(messages);
        }

        messagesObj.splice(index, 1);
        localStorage.setItem("messages", JSON.stringify(messagesObj));
        showMessages();
    }

}

function editnote(index) {
    let messages = localStorage.getItem("messages");
    let title = document.getElementById("nametext");
    let email = document.getElementById("emailtext");
    let phone = document.getElementById("phonetext");
    let note = document.getElementById("message");

    if (title.value !== "" || email.value !== "" || phone.value !== "" || note.value !== "") {
        return alert("Please clear the form before editing a note")
    }

    if (messages == null) {
        messagesObj = [];
    } else {
        messagesObj = JSON.parse(messages);
    }
    console.log(messagesObj);

    messagesObj.findIndex((element, index) => {
        title.value = element.title;
        email.value = element.email;
        phone.value = element.phone;
        note.value = element.note;
        
    })
    messagesObj.splice(index, 1);
    localStorage.setItem("messages", JSON.stringify(messagesObj));
    showMessages();
}
showMessages();




