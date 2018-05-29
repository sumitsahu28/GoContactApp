$(document).ready(function(){
    axios.get("/contacts")
    .then(async function(response){
       if(response.data != null) {
       await (function(){
        var html='', i=0;
        for(i=0;i<response.data.length;i++)
        {
            html += `<tr data-id="${response.data[i].id}">
            <td contenteditable="true">${response.data[i].name}</td>
            <td contenteditable="true">${response.data[i].mobile}</td>
            <td contenteditable="true">${response.data[i].address}</td>
            <td><button class="updateBtn" onclick="updateContact(this)">click</button></td>
            <td><button class="deleteBtn" onclick="deleteContact(this)">click</button></td>
            </tr>`
        }
        document.getElementById("allContacts").innerHTML=html;
        })();
    } else {
        document.getElementById("allContacts").innerHTML=`<p style="text-align: center;">Add a contact in your list!</p>`
    }
    })
    .catch(function(error){
        console.log(error)
    })
})

function updateContact(contact) {
    var contactID = $(contact).parent().parent().attr("data-id");
    var name = $(contact).parent().parent().find("td:eq(0)").text();
    var mobile = $(contact).parent().parent().find("td:eq(1)").text();
    var address = $(contact).parent().parent().find("td:eq(2)").text();
    console.log(contactID, name, mobile, address);
    axios.put("/contacts", {id:contactID,name:name, mobile:mobile, address:address})
    .then(function(response){
        if(response.data.result=="success")
        location.reload();
    })
    .catch(function(err){
        console.log(err);
    })
}

function deleteContact(contact) {
    var token = getCookie("session");
    console.log("token", token);
    contactID = $(contact).parent().parent().attr("data-id");
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.delete("/contacts",{data:{id:contactID, name:"", mobile:"", address:""}})
    .then(function(response){
        console.log(response)
        if(response.data.result=="success")
        {
            location.reload();
        }
    })
    .catch(function(error){
        console.log(error)
    })    
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}