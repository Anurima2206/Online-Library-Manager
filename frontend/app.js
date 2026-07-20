
const API = "http://localhost:5000/api";

/* ==========================
          LOGIN
========================== */

async function login() {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const role =
    document.getElementById("role").value;

    if (!email || !password || !role) {

        alert("Please fill all fields.");

        return;
    }

    try {

        const res = await fetch(`${API}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        if (!res.ok) {

            alert(data.message || "Login Failed");

            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("studentId", data.id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        if (data.role === "student") {

            window.location.href = "student.html";

        }

        else if (data.role === "librarian") {

            window.location.href = "librarian.html";

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

}


/* ==========================
        SEARCH BOOKS
========================== */

async function searchBooks() {

    try {

        const res = await fetch(`${API}/books`);

        const books = await res.json();

        const searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

        const filtered = books.filter(book =>

            book.title
            .toLowerCase()
            .includes(searchText)

            ||

            book.author
            .toLowerCase()
            .includes(searchText)

        );

        const list =
        document.getElementById("bookList");

        if (!list) return;

        list.innerHTML = "";

        filtered.forEach(book => {

            list.innerHTML += `

            <li>

                ${book.title}

                -

                ${book.author}

                (Available :

                ${book.availableCopies})

            </li>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}


/* ==========================
        ADD BOOK
========================== */

async function addBook() {

    const title =
    document.getElementById("newTitle").value;

    const author =
    document.getElementById("newAuthor").value;

    const qty =
    document.getElementById("newQty").value;

    const img =
    document.getElementById("newImg").value;

    if (!title || !author || !qty) {

        alert("Please fill all fields.");

        return;
    }

    try {

        const res = await fetch(`${API}/books/add`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title,

                author,

                availableCopies: qty,

                image: img

            })

        });

        const data = await res.json();

        if (!res.ok) {

            alert(data.message);

            return;

        }

        alert("Book Added Successfully!");

    }

    catch (err) {

        console.log(err);

    }

}


/* ==========================
          LOGOUT
========================== */

function logout() {

    localStorage.clear();

    window.location.href = "index.html";

}