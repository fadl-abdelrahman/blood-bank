



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
    document.getElementById("parag").style.display = "none"
    document.getElementById("welcomeText").style.display = "none"
            document.getElementById("notMatch").style.display = "none";

    

    oPositive = users.filter(X=>X.bloodType=="O+")
    onigative = users.filter(X=>X.bloodType=="O-")
    bPositive = users.filter(X=>X.bloodType=="B+")
    bnigative = users.filter(X=>X.bloodType=="B-")
    aPositive = users.filter(X=>X.bloodType=="A+")
    anigative = users.filter(X=>X.bloodType=="A-")
    abPositive = users.filter(X=>X.bloodType=="AB+")
    abnigative = users.filter(X=>X.bloodType=="AB-")
     userLength = users.length
    
    var usersRow = ""
    for (i = 0; i < users.length; i++) {
        usersRow +=
            `<tr class="p-2">
            <td > <button onclick="deleteDonor(${[i]})" class="btn btn-danger">حذف</button></td>
             <td ><button onclick="updateDonor(${[i]})" class="btn btn-primary">تعديل</button></td>
            <td>${users[i].bloodType}</td>
        <td><a href="tel:${users[i].phone}"><i class="text-primary"><span>&#128222;</span></i> </a></td>
        <td>${users[i].name}</td>
      
     </tr>`
        document.getElementById("table").style.visibility = "visible"
        document.getElementById("headers").style.display = "none"
        document.getElementById("tbody").innerHTML = usersRow

           document.getElementById("filter").innerHTML = ` 
      
        <tr>
        <td> <div class="bloods "> <h6">(-O) ${onigative.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(+O) ${oPositive.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(-A) ${anigative.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(+A) ${aPositive.length}</h6></div></td>
        </tr>
        <tr>
        <td> <div class="bloods "> <h6">(-B) ${bnigative.length}</h6></div></td>
        <td><div class="bloods "> <h6">(+B) ${bPositive.length}</h6></div></td>
        <td><div class="bloods "> <h6">(-AB) ${abnigative.length}</h6></div></td>
        <td><div class="bloods "> <h6">(AB+) ${abPositive.length}</h6></div></td>
        </tr>`
        document.getElementById("total").innerHTML=`<h5>اجمـالي المـتبرعـين ${users.length}</h5>`


    }

}
function logout(){
    window.location.reload()
}

function select(term) {
    var usersRow = ""
    for (i = 0; i < users.length; i++) {
        if (users[i].bloodType.toLowerCase() == term ) {
            usersRow += `<tr>
            <td>${users[i].bloodType}</td>
            <td><i class="text-primary"><span>&#128222;</span></i> <a href="tel:${users[i].phone}"> أتصال  </a></td>
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
            <td > <button onclick="deleteDonor(${[i]})" class="btn btn-danger">حذف</button></td>
             <td ><button onclick="updateDonor(${[i]})" class="btn btn-primary">تعديل</button></td>
            <td>${users[i].bloodType}</td>
            <td><a href="tel:${users[i].phone}"><i class="text-primary"><span>&#128222;</span></i> </a></td>
            <td>${users[i].name}</td>
</tr>`
        }

        document.getElementById("tbody").innerHTML = usersRow
            document.getElementById("filter").innerHTML = ` 
      
        <tr>
        <td> <div class="bloods "> <h6">(-O) ${onigative.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(+O) ${oPositive.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(-A) ${anigative.length}</h6></div></td>
        <td> <div class="bloods "> <h6">(+A) ${aPositive.length}</h6></div></td>
        </tr>
        <tr>
        <td> <div class="bloods "> <h6">(-B) ${bnigative.length}</h6></div></td>
        <td><div class="bloods "> <h6">(+B) ${bPositive.length}</h6></div></td>
        <td><div class="bloods "> <h6">(-AB) ${abnigative.length}</h6></div></td>
        <td><div class="bloods "> <h6">(AB+) ${abPositive.length}</h6></div></td>
        </tr>`
        document.getElementById("total").innerHTML=`<h5>اجمـالي المـتبرعـين ${users.length}</h5>`
    }
}
function deleted(){
    alert("نم حذف المتبرع بنجاح")
}

var myid 
function updateDonor(i){
myid= i
   document.getElementById("update").style.display = "block";

    document.getElementById("updateName").value = users[i].name
    document.getElementById("updatePhone").value = users[i].phone
    document.getElementById("updateBloodType").value = users[i].bloodType
}
function cancelUpdate() {
    document.getElementById("update").style.display = "none";
}
function doneUpdate(){
    alert("تم تعديل بيانات المتبرع بنجاح")
}
function clearUpdate() {
    document.getElementById("updateName").value = ""
    document.getElementById("updatePhone").value = ""
    document.getElementById("updateBloodType").value = ""
}
function confirmUpdate(){
    id = myid
    let upid=users[id]._id
    var newName = document.getElementById("updateName").value
    var newPhone = document.getElementById("updatePhone").value 
    var newBloodType = document.getElementById("updateBloodType").value
let updated={
        name : newName,
        phone : newPhone,
        bloodType : newBloodType
}
fetch(`https://donor-tq9e.onrender.com/donors/${upid}`, {
    method: 'PUT',
    body: JSON.stringify(updated),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.messaga == "sucsess") {
            doneUpdate()
            cancelUpdate()
            clearUpdate()
        }
        else {
            alert(" بــرجاء ادخال البيانات بشكل صحيح ")
        }
    });
}


function deleted(){
    alert("نم حذف المتبرع بنجاح")
    document.getElementById("delete").style.display = "none";
      document.getElementById("deleteCode").value = ""
}
function cancelDelete() {
    document.getElementById("delete").style.display = "none";
}
var delId
function deleteDonor(i){
    delId=i
    document.getElementById("delete").style.display = "block";
    document.getElementById("delText").innerHTML=` سيتم حذف المتبرع ${users[i].name} من قائمة المتبرعين نهائيا`

}
function confirmDelete() {
        delIdlCode = document.getElementById("deleteCode").value
      let deletcode = {
code : delIdlCode
    }
    id=delId
    fetch(`https://donor-tq9e.onrender.com/donors/${users[id]._id}`, {
        method: 'DELETE',
                body: JSON.stringify(deletcode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.messaga == "sucsess") {
                deleted()
                document.getElementById("delete").style.display = "none";

            }
            else {
                alert(" بــرجاء ادخال البيانات بشكل صحيح ")
            }
        });
}


