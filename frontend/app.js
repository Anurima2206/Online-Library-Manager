const API = "http://localhost:5000/api";

// ================= LOGIN =================
async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token && data.role === role) {

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("studentId", data.id);

    // Role-based redirection
    if (role === "student") {

      if (email === "priya@university.com") {
        window.location.href = "student.html";
      }

      else if (email === "anurima@university.com") {
        window.location.href = "student2.html";
      }

      else {
        alert("Student demo page not configured.");
      }

    } else if (role === "librarian") {
      window.location.href = "librarian.html";
    }

  } else {
    alert("Invalid credentials or wrong role");
  }
}


// ================= SEARCH BOOKS =================
async function searchBooks() {

  const res = await fetch(`${API}/books`);
  const books = await res.json();

  const searchText = document.getElementById("searchInput").value.toLowerCase();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(searchText)
  );

  const list = document.getElementById("bookList");

  if (!list) return;

  list.innerHTML = "";

  filtered.forEach(book => {
    list.innerHTML += `
      <li>
        ${book.title} - ${book.author}
        (Available: ${book.availableCopies})
      </li>
    `;
  });
}


// ================= ADD BOOK (Librarian) =================
async function addBook() {

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const copies = document.getElementById("copies").value;

  await fetch(`${API}/books/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      author,
      availableCopies: copies
    })
  });

  alert("Book Added Successfully!");
}
async function addBook() {

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const copies = document.getElementById("copies").value;

  if (!title || !author || !copies) {
    alert("Please fill all fields!");
    return;
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/books/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      author,
      availableCopies: copies
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Book Added Successfully!");

    // Clear fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("copies").value = "";

    searchBooks(); // Refresh list
  } else {
    alert(data.message || "Error adding book");
  }
}


// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}