import React, { useEffect, useState } from 'react'
import Slidebar from '../Slidebar'
import axios from 'axios';

const Profile = () => {
    const [branch, setTodos] = useState('');
    const [branchData, setBranchData] = useState([]);
    const [refresh, setRefresh] = useState(false);
  
    useEffect(()=>{
      axios.get("http://localhost:5000/api/branches")
      .then((response)=>{
        setBranchData(response?.data.branch);
      })
      .catch((error)=>{
        console.log("error==>",error);
      })
    },[refresh])
    // console.log("branchData",branchData);
    const addBranch = () =>{
      const objToSend ={
        branch: branch
      }
      axios.post("http://localhost:5000/api/branches",objToSend)
      .then((response)=>{
        setRefresh(!refresh)
      })
      .catch((error)=>{
        console.log("error==>",error);
      })
    }
    const deleteBranch = (id) =>{
      axios.delete(`http://localhost:5000/api/branches/${id}`)
      .then((response)=>{
        setRefresh(!refresh)
      })
      .catch((error)=>{
        console.log("error==>",error);
      })
    }
    const editBranch = (id) =>{
      var editValue = prompt('Enter Edit Value');
      console.log('editValue',editValue);
      const objToSend ={
        branch: editValue,
        id:id
      }
      axios.put(`http://localhost:5000/api/branches`,objToSend)
      .then((response)=>{
        setRefresh(!refresh)
      })
      .catch((error)=>{
        console.log("error==>",error);
      })
    }
  return (
    <>
    <Slidebar
        title="Profile"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />

<div>
      <h1>Todos</h1>
      <input placeholder='add ToDO' onChange={(e)=> setTodos(e.target.value)}/>
      <button onClick={addBranch}>Add</button>
      {branchData && branchData.map((e,i)=>{
        {/* console.log('e',e) */}
        return(
          <div style={{display:'flex', flexDirection:'row',gap:10}}>
          <li key={i}>{e.branch}</li>
          <button onClick={()=>editBranch(e._id)}>Edit</button>
          <button onClick={()=>deleteBranch(e._id)}>Delete</button>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Profile