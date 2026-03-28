const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Dummy DB
const students = [
  { admissionNo: "A101", name: "Pragya", fees: 5000 },
  { admissionNo: "A102", name: "Rahul", fees: 5000 }
];

const admin = {
  username: "admin",
  password: "1234"
};

let payments = [];

// STUDENT LOGIN
app.post("/student-login", (req, res) => {
  const { admissionNo } = req.body;

  const student = students.find(s => s.admissionNo === admissionNo);

  if (student) {
    res.json({ success: true, student });
  } else {
    res.json({ success: false });
  }
});

// ADMIN LOGIN
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// PAYMENT
app.post("/pay", (req, res) => {
  const { admissionNo, amount, method } = req.body;

  const payment = {
    id: Date.now(),
    admissionNo,
    amount,
    method,
    status: "SUCCESS"
  };

  payments.push(payment);

  setTimeout(() => {
    res.json({ success: true });
  }, 1500);
});

// ADMIN CASH PAYMENT
app.post("/cash-payment", (req, res) => {
  const { admissionNo, amount } = req.body;

  payments.push({
    id: Date.now(),
    admissionNo,
    amount,
    method: "CASH",
    status: "SUCCESS"
  });

  res.json({ success: true });
});

// GET PAYMENTS
app.get("/payments", (req, res) => {
  res.json(payments);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});