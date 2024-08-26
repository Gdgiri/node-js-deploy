import Employee from "../Models/employeeSchema.js";

//create new employee
export const createEmployee = async (req, res) => {
  try {
    // create all method
    const newEmployee = new Employee(req.body);
    await newEmployee.save(); // post ku save method use pananum
    res.status(200).json({
      message: "Employee created successfully",
      result: [newEmployee],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ meassage: "Internal Server Error in create Employee" });
  }
};

// get all employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json({
      message: "Employee Retrived successfully",
      result: [employee],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error in get employee " });
  }
};

//get employee by id
export const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findById(empId);
    if (!employee) {
      res.status(404).send("Employee Not Found");
    }
    res.status(200).json({
      message: "Employee Retrived successfully",
      result: [employee],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "internal server error in getbyid employee " });
  }
};

//edit employee by id
export const updateEmployee = async (req, res) => {
  try {
    // Step 1: Get employee ID from request parameters
    const empId = req.params.id;

    // Step 2: Get employee details from request body
    const {
      employeeFirstName,
      employeeLastName,
      employeeEmail,
      employeeDesignation,
    } = req.body;

    // Step 3: Perform the update operation
    const updateResult = await Employee.updateOne(
      { _id: empId },
      {
        employeeFirstName,
        employeeLastName,
        employeeEmail,
        employeeDesignation,
      }
    );

    // Step 4: Check if the update was successful
    if (updateResult.matchedCount === 0) {
      return res.status(400).json({ message: "Employee Not Found" });
    }

    // Step 5: Retrieve the updated employee
    const updatedEmployee = await Employee.findOne({ _id: empId });

    // Step 6: Send the response with the updated employee data
    res.status(200).json({
      message: "Employee updated successfully",
      result: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in edit employee" });
  }
};

// delete employee by id

export const deleteEmployee = async (req, res) => {
  try {
    // Get the employee ID from the route parameters
    const empId = req.params.id;

    // Perform the deletion operation
    const deleteResult = await Employee.deleteOne({ _id: empId });

    // Check if the employee was found and deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    // If deleted successfully
    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error in delete employee" });
  }
};
