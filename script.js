const content = document.querySelector("#tableBody");
const submit=document.querySelector("#add");

//POST API
submit.addEventListener('click',()=>{
    let fullName=document.querySelector("#fName").value;
    let course=document.querySelector("#cCourse").value;
    let yearLevel=document.querySelector("#yLevel").value;
    let email=document.querySelector("#eMail").value;
    let formData={fullName,course,yearLevel,email};

    fetch("https://prelim-midterm-backend.onrender.com/api/students",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).then(response => {
        alert("Student Added Successfully");
        location.reload();
    }).catch((error)=>{
        console.log(error);
        alert("Something went wrong");
    })
    // alert("Student Added Successfully");
    // location.reload();
});


window.addEventListener('load', ()=>{
    getStudents();
})

function getStudents(){
    let html="";

    fetch('https://prelim-midterm-backend.onrender.com/api/students',{mode:'cors'})
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        data.forEach(element => {
            html += `
            <tr>
                <td>${element.fullName}</td>
                <td>${element.course}</td>
                <td>${element.yearLevel}</td>
                <td>${element.email}</td>
                <td>${element.dateEnrolled ? new Date(element.dateEnrolled).toLocaleDateString() : '—'}</td>
            </tr>`;
        });

        content.innerHTML = html;
    })
    .catch(error=>{
        console.log(error);
        alert("Something went wrong");
    });
}






