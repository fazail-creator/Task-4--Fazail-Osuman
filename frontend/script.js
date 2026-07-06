const API = "http://localhost:5000/api/interns";

const form = document.getElementById("internForm");
const list = document.getElementById("internList");
const msg = document.getElementById("message");

async function loadInterns() {
    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("Failed to load interns");
        }

        const data = await res.json();

        list.innerHTML = "";

        data.forEach((intern) => {

          list.innerHTML += `
          <div class="card">

              <h3>${intern.name}</h3>

              <p><strong>Email:</strong> ${intern.email}</p>

              <p><strong>Department:</strong> ${intern.department}</p>

              <p><strong>Phone:</strong> ${intern.phone}</p>

              <div class="actions">

                  <button onclick="editIntern(${intern.id})">
                      Edit
                  </button>

                  <button onclick="deleteIntern(${intern.id})">
                      Delete
                  </button>

              </div>

          </div>
          `;

        });

    } catch (error) {

        list.innerHTML = "<p>Could not load interns.</p>";

    }
}

async function deleteIntern(id){

const answer = confirm("Are you sure you want to delete this intern?");

if(!answer) return;

try{

const response = await fetch(`${API}/${id}`,{

method:"DELETE"

});

const data = await response.json();

if(!response.ok){

throw new Error(data.message);

}

msg.textContent=data.message;

loadInterns();

}
catch(error){

msg.textContent=error.message;

}

}

async function editIntern(id) {

    const name = prompt("Enter new name:");

    const email = prompt("Enter new email:");

    const department = prompt("Enter new department:");

    const phone = prompt("Enter new phone number:");

    if (!name || !email || !department || !phone) {
        alert("All fields are required.");
        return;
    }

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                department,
                phone
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        msg.textContent = data.message;

        loadInterns();

    } catch (error) {

        msg.textContent = error.message;

    }

}



form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const intern = {

        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        phone: document.getElementById("phone").value.trim()

    };

    console.log(intern);

    try {

        const res = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(intern)

        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message);
        }

        msg.textContent = result.message;

        form.reset();

        loadInterns();

    } catch (error) {

        msg.textContent = error.message;

    }

});

loadInterns();