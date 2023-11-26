



var users = []
document.getElementById("table").style.visibility = "hidden"
document.getElementById("searchInput").style.display = "none"
document.getElementById("logout").style.display = "none"



function fetchData() {
    fetch('https://donor-tq9e.onrender.com/donors')
    .then(response => response.json())
    .then(data => {
        if (data.messaga == "sucsess") {
            users = data.users}
    });
}
setInterval (fetchData,2000)

function adminLogin() {
    let adminCode = document.getElementById("adminCode").value
    let body = {
        code: adminCode
    }
    fetch("https://donor-tq9e.onrender.com/donors/admins", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.messaga == "sucsess") {
                alert("WELCOME")
                getAlldonors()
            }
            else {
                alert("ERROR ADMIN CODE")
            }
        });


    document.getElementById("adminCode").value = ""


}

function getAlldonors() {
    document.getElementById("addDonorBtn").style.display = "none"
    document.getElementById("selectValue").style.display = "none"
    document.getElementById("searchInput").style.display = "block"
    document.getElementById("adminCode").style.display = "none"
        document.getElementById("adminBtn").style.display = "none"
    document.getElementById("logout").style.display = "block"


    var usersRow = ""
    for (i = 0; i < users.length; i++) {
        usersRow +=
            `<tr class="p-2">
            <td>${users[i].isActive}</td>
            <td ><button  class=" editeBtn">حذف</button> <button class="editeBtn">تعديل</button></td>
        <td>${users[i].bloodType}</td>
        <td><a href="tel:${users[i].phone}"> &#9742;</a></td>
        <td>${users[i].name}</td>
      
     </tr>`
        document.getElementById("table").style.visibility = "visible"
        document.getElementById("headers").style.display = "none"
        document.getElementById("tbody").innerHTML = usersRow

    }

}
function logout(){
    window.location.reload()
}

function select(term) {
    var usersRow = ""
    for (i = 0; i < users.length; i++) {
        if (users[i].bloodType.toLowerCase() == term && users[i].isActive==true) {
            usersRow += `<tr>
            <td>${users[i].bloodType}</td>
            <td><a href="tel:${users[i].phone}"> أتصال <i><span>&#9742;</span></i> </a></td>
            <td>${users[i].name}</td>
           
         </tr>`
            document.getElementById("notMatch").style.display = "none";
            document.getElementById("table").style.visibility = "visible";
            document.getElementById("tbody").innerHTML = usersRow
        }
        if (usersRow == "") {
            document.getElementById("table").style.visibility = "hidden";
            document.getElementById("notMatch").style.display = "block";
            if (term == "اختر فصيلة الدم")
                document.getElementById("notMatch").style.display = "none";
        }
        document.getElementById("notMatch").innerHTML = ` <h4>( ${term} )  لايوجد متبرعين لدى فصيلة    </h4>`
    }
}

function add() {
    document.getElementById("add").style.visibility = "visible";
    document.getElementById("notMatch").style.display = "none";

}

function cancel() {
    document.getElementById("add").style.visibility = "hidden";
}

function addSuccess() {

    alert(" تـم تـسـجيـل الـمـتبرع بنجـاح")

}

function addDonor() {

    let addName = document.getElementById("addName").value
    let addPhone = document.getElementById("addPhone").value
    let addBloodType = document.getElementById("addBloodType").value

    let donorObject = {
        name: addName,
        phone: addPhone,
        bloodType: addBloodType
    }

    ApiCrud("POST", donorObject)


}

function ApiCrud(endPoint, body) {
    fetch("https://donor-tq9e.onrender.com/donors", {
        method: endPoint,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.messaga == "sucsess") {
                clear()
                cancel()
                addSuccess()
            }
            else {
                alert(" بــرجاء ادخال البيانات بشكل صحيح او التأكد من ان المتبرع غير مسجل من قبل")
           
                 }
        });

}

function clear() {
    document.getElementById("addName").value = ""
    document.getElementById("addPhone").value = ""
    document.getElementById("addBloodType").value = ""
}
function search(term) {

    var usersRow = "";

    for (i = 0; i < users.length; i++) {

        if (users[i].name.toLowerCase().indexOf(term) == 0) {
            usersRow += ` <tr>
            <td ><button  class=" editeBtn">حذف</button> <button class="editeBtn">تعديل</button></td>
            <td>${users[i].bloodType}</td>
            <td><a href="tel:${users[i].phone}"> &#9742; </a></td>
            <td>${users[i].name}</td>
</tr>`
        }

        document.getElementById("tbody").innerHTML = usersRow
    }


}



