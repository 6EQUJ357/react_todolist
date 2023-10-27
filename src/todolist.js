import React from 'react'
import "./App.css"


const Todolist = (params) => {
  
  return (
    <div className='top' >
      
        {params.data.length >0 ? params.data.filter((task) =>task.completed? "Completed".toLowerCase().startsWith(params.searchTask.toLowerCase()) : "Not Completed".toLowerCase().startsWith(params.searchTask.toLowerCase())).map(list=>

          <div  key={list.id} className='container' style={{backgroundColor: `${list.completed === true ? "green" : "aqua"}`, color: `${list.completed === true ? "white" : "black"}`}}>
            <div className ="show_list"  onClick={()=>params.handleStatus(list)}>
            <p className="child_para1">{list.title} </p>
            <p className="child_para2">{list.completed ? "Completed" : "Not Completed"}</p>

            </div>
              
           
           
            <button className="child_button edit" onClick={()=>params.handleEdit(list)} data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i class="fa fa-edit fa-2x"></i></button> 
            
            <button className="child_button" onClick={()=>params.handleDelete(list)}><i className="fa fa-trash fa-2x"></i></button> 

            
          </div>
        )
      :

        <div>
          <h1>no data...</h1>
        </div>
        }
    </div>
   
  )
}

export default Todolist