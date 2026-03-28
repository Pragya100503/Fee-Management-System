// STUDENT LOGIN
async function studentLogin() {
  const admissionNo = document.getElementById("admissionNo").value;

  const res = await fetch("/student-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ admissionNo })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("student", JSON.stringify(data.student));
    window.location.href = "/index.html";
  } else {
    document.getElementById("msg").innerText = "❌ Invalid student";
  }
}

// ADMIN LOGIN
async function adminLogin() {
  const username = document.getElementById("adminUser").value;
  const password = document.getElementById("adminPass").value;

  const res = await fetch("/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/admin.html";
  } else {
    document.getElementById("msg").innerText = "❌ Invalid admin";
  }
}

// LOAD STUDENT DATA
window.onload = () => {
  const student = JSON.parse(localStorage.getItem("student"));

  if (student && document.getElementById("studentName")) {
    document.getElementById("studentName").innerText =
      "Welcome, " + student.name;

    // ✅ DEFAULT FEES = 5000
    document.getElementById("amount").value = student.fees || 5000;
  }
};

// OPEN PAYMENT MODAL
function openPayment() {
  document.getElementById("modal").style.display = "block";
}

// CLOSE PAYMENT MODAL
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// MAKE PAYMENT
async function pay(method) {
  const student = JSON.parse(localStorage.getItem("student"));

  const res = await fetch("/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      admissionNo: student.admissionNo,
      amount: 5000, // ✅ force fixed amount
      method
    })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/success.html";
  } else {
    alert("Payment failed");
  }
}

// ADMIN CASH PAYMENT
async function addCash() {
  const admissionNo = document.getElementById("cashAdmission").value;
  const amount = document.getElementById("cashAmount").value;

  await fetch("/cash-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ admissionNo, amount })
  });

  alert("Cash payment added");
}

// VIEW PAYMENTS
async function loadPayments() {
  const res = await fetch("/payments");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.admissionNo} - ₹${p.amount} (${p.method})`;
    list.appendChild(li);
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("student");
  window.location.href = "/login.html";
}