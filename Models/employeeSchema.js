import mongoose from "mongoose";

//creating the schema

const employeeSchema = mongoose.Schema({
  employeeFirstName: String,
  employeeLastName: String,
  employeeEmail: String,
  employeeDesignation: String,
});

//creating the collection

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
