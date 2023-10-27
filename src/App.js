import React, {useState, useEffect} from 'react'
import Todolist from './todolist'
import axios from "axios"
import "./App.css"



const App = () => {

  //json placeholder data
  const [data, setData] = useState([]);


  //add tasks
  const [addTask, setAddTask] = useState("");

  const [searchTask, setSearchTask] = useState("");

  //add task error state variable
  const [errorMsg, setErrorMsg] = useState(null);


  //present list data (edit)
  const [presentData, setPresentData] = useState({});


  //new task (edit)
  const [addNewTask, setAddNewTask] = useState("");
  

  //handle change for task variable
  const handleChange = (e)=>{
    setAddTask(e.target.value);
    setErrorMsg(null);
  }

  //handlesearchTask

  const handlesearchTask = (e)=>{
    setSearchTask(e.target.value)
  }


  //handleSubmit for task variable
  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!addTask){
      setErrorMsg('Please enter a task');
    }
    else{
      setErrorMsg(null);
      setData([...data, {title : addTask}])
      setAddTask('');
      alert("task added...")
    }
  }

  //handleDelete for task variable
  const handleDelete = (datalist)=>{
    const newTodoList = data.filter((list)=>list.id !== datalist.id); 
    setData(newTodoList);
  }



  //handleEdit

  const handleEdit = (datalist)=>{
    setPresentData(datalist)
  }

  //handle change for new task variable

  const handleNewChange = (e)=>{
    setAddNewTask(e.target.value);
  }

  //handle submit for new task variable
  const handleNewSubmit = (e)=>{
    e.preventDefault();

    if(!addNewTask){
      alert("Enter new task");
      return;
    }
    let copyData = [...data];
    let index = copyData.findIndex(list=>list.id === presentData.id);

    if (index !== -1) {
      copyData[index].title = addNewTask;
      setData(copyData);
      alert("task edit succesfull...");
      setAddNewTask("");
    }
  }


  //handleStatus

  const handleStatus = (datalist)=>{
    let copyData = [...data];
    let index = copyData.findIndex(list=>list.id === datalist.id);

    if (index !== -1) {
      copyData[index].completed = true;
      setData(copyData);
      
    }
  }



useEffect(()=>{
  axios.get("https://jsonplaceholder.typicode.com/users/1/todos").then(res=>setData(res.data)).catch(err=>console.log(err));
},[])




  return (
    <div>
      <center>
        
          <div >
            <h2 >Todo Management </h2>
            <h4 style={{position:"relative"}}>Total tasks  <span className='badgeee'>{data && data.length}</span> </h4>
           

            <div >
            <form onSubmit={handleSubmit}> 

            <input className = "input_field filter" type='text' name='searchTask' value={searchTask} placeholder='search task based on status' onChange={handlesearchTask}/>
            <br /><br />

              <input className = "input_field" type='text' name='addTask' value={addTask} placeholder='add task' onChange={handleChange} style={{border: `2px solid ${errorMsg ? "red":"blue"}`}}/>

              
 
              <button type='submit' className='btn btn-primary'><i className="fa fa-plus fa-1x"></i> Add</button>


            </form>
            {errorMsg && <small style={{color:"red", marginLeft:"-13rem"}}>{errorMsg}</small>}
              
            </div>
            
           
          </div>
       
        <br />
        
      </center>

      <Todolist  data ={data} handleDelete = {handleDelete} handleEdit = {handleEdit} handleStatus = {handleStatus}  searchTask = {searchTask}/>


      {/* model */}

      <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
     <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Edit Task</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form className="auth-input" onSubmit={handleNewSubmit}>
                                                                                        
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Old Task</label>
                            <input type="text" className="form-control"  value={presentData.title} readOnly/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">New Task</label>

                            <input className="form-control" type='text' name='addNewTask' value={addNewTask} placeholder="New Task" onChange={handleNewChange}/>
                        </div>

                       
                                                                                                            

                        <div className="mt-2">
                            <button className="btn btn-success m-lg-1" type="submit">Edit</button>
                            <button type="button" className="btn btn-danger" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>

                        
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
     </div>
      </div>

      {/* model close */}

    </div>
  )
}

export default App