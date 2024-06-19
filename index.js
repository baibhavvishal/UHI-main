import express from "express";
import bodyParser from "body-parser";
import { createUser } from "./repositries/userRepository.js";
import { readAllMed } from "./repositries/medRepository.js";
import { connectDB } from "./config/db.js";
import * as dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const dt2a = await readAllMed();
    console.log(dt2a);
    res.render("index.ejs", {
      input1: dt2a,
    });
  } catch (error) {
    console.error("Error reading med data:", error);
    // Handle the error appropriately, e.g., render an error page
    res.status(500).send("Internal Server Error");
  }
});

app.post("/prescription", async(req, res) => {
    const data1 = req.body;     
    const date1=new Date();
    const date2=date1.toISOString();
    const reqDate=date2;
    data1.currentDate=reqDate;
    const month=reqDate.slice(5,7);
    const day=reqDate.slice(8,10);
    const hour=reqDate.slice(11,13);
    const minute=reqDate.slice(14,16)
    data1.prescriptionNumber=month+day+hour+minute;
    const medicines=req.body.medicines;
    createUser(data1);
    res.render("prescription.ejs", {
        input: data1,
        medicines: medicines,
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
