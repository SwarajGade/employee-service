import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { useTable } from 'react-table';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({ empId: "", name: "", manager: "", salary: "" });
  const [showCancel, setShowCancel] = useState(false);

  const columns = useMemo(() => [
    { Header: "EmpId", accessor: "empId" },
    { Header: "Name", accessor: "name" },
    { Header: "Manager", accessor: "manager" },
    { Header: "Salary", accessor: "salary" },
    {
      Header: "Edit",
      id: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (
        <button className='editBtn' onClick={() => handleUpdate(row.original)}>Edit</button>
      )
    },
    {
      Header: "Delete",
      id: "Delete",
      accessor: "delete",
      Cell: ({ row }) => (
        <button className='deleteBtn' onClick={() => handleDelete(row.original.empId)}>Delete</button>
      )
    },
  ], []);

  const data = useMemo(() => employees, [employees]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const getAllEmployees = () => {
    axios.get("http://localhost:8091/employees")
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      });
  };

  const clearAll = () => {
    setEmployeeData({ empId: "", name: "", manager: "", salary: "" });
    setShowCancel(false);
    getAllEmployees();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeData.empId) {
      // Update existing employee
      await axios.put(`http://localhost:8091/employees/${employeeData.empId}`, employeeData)
        .then((res) => {
          console.log(res.data);
          clearAll();
        });
    } else {
      // Add new employee
      await axios.post("http://localhost:8091/employees", employeeData)
        .then((res) => {
          console.log(res.data);
          clearAll();
        });
    }
  };

  const handleUpdate = (emp) => {
    setEmployeeData(emp);
    setShowCancel(true);
  };

  const handleDelete = async (empId) => {
    await axios.delete(`http://localhost:8091/employees/${empId}`)
      .then((res) => {
        console.log(res.data);
        getAllEmployees();
      });
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    setShowCancel(true);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <div className='main-container'>
        <h3>Employee</h3>
        <div className='add-panel'>
          <div className='addpaneldiv'>
            <label htmlFor="name">Name</label> <br />
            <input
              className='addpanelinput'value={employeeData.name} onChange={handleChange}
              type="text" name='name'id='name'
            />
          </div>
          <div className='addpaneldiv'>
            <label htmlFor="manager">Manager</label> <br />
            <input
              className='addpanelinput'value={employeeData.manager}
              onChange={handleChange}type="text"name='manager' id='manager'
            />
          </div>
          <div className='addpaneldiv'>
            <label htmlFor="salary">Salary</label> <br />
            <input
              className='addpanelinput'
              value={employeeData.salary}
              onChange={handleChange}
              type="text"
              name='salary'
              id='salary'
            />
          </div>
          <button className='addBtn' onClick={handleSubmit}>
            {employeeData.empId ? "Update" : "Add"}
          </button>
          <button className='cancelBtn' onClick={clearAll} disabled={!showCancel}>Cancel</button>
        </div>
        <input className='searchinput' type='search' name='inputsearch' id='inputsearch' placeholder='Search Employee Here' />
      </div>

      <table className='table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}> {column.render("Header")} </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.id}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
