async function getData() {
    let data = await fetch("https://jsonplaceholder.typicode.com/users");
    let jsonData = await data.json();
    return jsonData;
}

const selectDataBox = document.querySelector("#dataBox");
function showUserData(user) {
    selectDataBox.classList.remove("default");
    selectDataBox.classList.add("active");

    selectDataBox.innerHTML = `
        <ul>
            <li><span class="label">Name:</span> ${user.name}</li>
            <li><span class="label">Email:</span> ${user.email}</li>
            <li><span class="label">Phone:</span> ${user.phone}</li>
            <li><span class="label">City:</span> ${user.address.city}</li>
            <li><span class="label">Company:</span> ${user.company.name}</li>
        </ul>
    `;
}

async function createUsers() {
    let users = await getData();
    const selectUsersBox = document.querySelector("#usersBox");

    users.forEach((user) => {
        let BTN = document.createElement("button");
        BTN.textContent = user.name;

        BTN.addEventListener("click", function () {
            let selectBtns = document.querySelectorAll("#usersBox button");

            if (this.classList.contains("active")) {
                this.classList.remove("active");
                selectDataBox.classList.remove("active");
                selectDataBox.classList.add("default");
                selectDataBox.innerHTML = "<p>Press On User To Show His Data</p>";
            } else {
                selectBtns.forEach((btn) => {
                    btn.classList.remove("active");
                });

                this.classList.add("active");
                showUserData(user);
            }
        });

        selectUsersBox.appendChild(BTN);
    });
}

createUsers();
