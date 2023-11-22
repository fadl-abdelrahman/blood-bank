



var users = []
document.getElementById("table").style.visibility = "hidden"


    fetch('https://donor-tq9e.onrender.com/donors')
    .then(response => response.json())
    .then(data => {
        if (data.messaga == "sucsess") {
            users = data.users
        }
    });



function select(term) {
    var usersRow = ""
    for (i = 0; i < users.length; i++) {
        if (users[i].bloodType.toLowerCase() == term) {
            usersRow += `<tr>
            <td>${users[i].bloodType}</td>
            <td><a href="">${users[i].phone}</a></td>
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
        document.getElementById("notMatch").innerHTML = ` <h4>( ${term} )  لا يوجد متبرعين لديهم فصيله دم    </h4>`
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

    alert("تـم تـسـجيـل الـمـتبرع بنجـاح")

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
                 if (data.messaga == "exist") {
                alert("المتبرع موجود بالفعل")
            }
            else {
                alert("بــرجاء ادخال البيانات بشكل صحيح")
            }
        });

}

function clear() {
    document.getElementById("addName").value = ""
    document.getElementById("addPhone").value = ""
    document.getElementById("addBloodType").value = ""
}


