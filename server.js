const express = require("express");
const cors = require("cors");
const db = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=>{
  db.pending.push(req.body);
  res.send("Registration sent for approval");
});

app.post("/login", (req,res)=>{
  const user = db.approved.find(
    u => u.email === req.body.email && u.password === req.body.password
  );
  res.send(user ? "OK" : "Not approved");
});

app.get("/pending",(req,res)=>{
  res.json(db.pending);
});

app.post("/approve",(req,res)=>{
  const user = db.pending.find(u=>u.email===req.body.email);
  db.approved.push(user);
  db.pending = db.pending.filter(u=>u.email!==req.body.email);
  res.send("Approved");
});

app.listen(3000,()=>console.log("Server running on 3000"));
