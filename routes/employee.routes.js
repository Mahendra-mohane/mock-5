const express = require("express");
let { EmployeeModel } = require("../models/employee.model");
let EmployeeRouter = express.Router();

//for employees//

EmployeeRouter.post("/api/employees", async (req, res) => {
  try {
    let { firstName, lastName, email, department, salary } = req.body;
    let Employee = new EmployeeModel({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    await Employee.save();

    res.status(201).send({ message: "New Employee added" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all employee here
EmployeeRouter.get("/api/employees", async (req, res) => {
  try {
    const Employees = await EmployeeModel.find();
    res.status(200).send(Employees);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// filter by department here 
EmployeeRouter.get("/api/employees/:department", async (req, res) => {
  const department = req.params.department;


  try {
    const employees = await EmployeeModel.find({ department });
    res.status(200).send(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed in getting Filtered employees" });
  }
});

// sorted by salary here 
EmployeeRouter.get("/api/employees/sort/:odr", async (req, res) => {
  const odr = req.params.odr;
  let value;
  try {
    if (odr == "asc") {
      value = 1;
    } else if (odr == "desc") {
      value = -1;
    }
    const employees = await EmployeeModel.find().sort({ salary: value });
    res.status(200).send(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "sorting employee failed" });
  }
});

// delete employees here  //
EmployeeRouter.delete("/api/employees/:id", async (req, res) => {
  const employeeid = req.params.id;

  try {
    await EmployeeModel.findByIdAndDelete(employeeid);
    res.send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Employee" });
  }
});

module.exports = {
  EmployeeRouter,
};
