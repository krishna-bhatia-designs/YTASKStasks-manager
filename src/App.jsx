import Navbar from './components/navbar.jsx'
import { MdEditSquare } from "react-icons/md";
import {useRef,useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AiFillDelete } from "react-icons/ai";
function App() {
  const inputRef=useRef(null)
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  useEffect(()=>{
    const data=localStorage.getItem("tasks");
    if(data){
      let parsedData=JSON.parse(data);
      setTasks(parsedData);
    }
  },[])

  useEffect(()=>{
    if(tasks.length > 0){
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
  },[tasks])
  


  const handleDelete=(e,id)=>{
    const newTasks=tasks.filter((item)=>item.id!==id);
    setTasks(newTasks);
  }
  const handleEdit=(e,id)=>{
    if(confirm("do you want to edit this task?")){
    let t=tasks.filter((item)=>item.id===id);

    inputRef.current.value=t[0].task;
    handleDelete(null,t[0].id);
    setTask(inputRef.current.value);
    }
  }

  const handleClear=()=>{
    inputRef.current.value=""
    setTask("");
  }
  const handleAdd=()=>{
    if(confirm("do you want to add this task?")){
    setTasks([...tasks, {id:uuidv4(),task,iscompleted:false}]);
    
    handleClear();
    }
    
  }
  const handleChange=(e)=>{
    setTask(e.target.value)
  }
  const handleCheck=(e)=>{
    let id=e.target.name;
    let index=tasks.findIndex((item)=>{
      return item.id===id});
    const newTasks=[...tasks];
    newTasks[index].iscompleted=!newTasks[index].iscompleted;
    setTasks(newTasks);
  }
  const handleshowFinished=()=>{
    setShowFinished(!showFinished);
      

  }
  return (
    <>
      <div className="container mx-auto p-4 bg-violet-100 min-h-screen md:w-2/3 rounded-2xl">
        <Navbar />
        <div className="md:text-3xl font-bold justify-self-center p-2">YTASKS-Manage Your Tasks At One Place</div>
       
        <div className="flex flex-col max-w-md mx-auto mt-4">
           <h1 className="justify-self-start font-bold md:text-xl m">Add Task</h1>
          <input value={task} onChange={handleChange} ref={inputRef} type="text" placeholder="Add a new task" className="border p-2 mt-4 w-full rounded-xl" />
        <button onClick={handleAdd} disabled={task.length<=2} className="bg-green-500 text-white p-2 mt-2 w-full rounded-xl disabled:bg-green-200 disabled:text-black">Add Task</button>
        <button onClick={handleClear} className="bg-blue-500 text-white p-2 mt-2 w-full rounded-xl">Clear Task</button>
        </div>
        <div className='flex items-center justify-center mt-2 align-middle'>
        <input type="checkbox" onChange={handleshowFinished} className='ml-4 mt-2 w-5 h-5 gap-5' checked={task.iscompleted}/><div className='p-4 m-2 font-bold justify-self-center'>Show Finished Tasks</div>
        </div>
        {tasks.length===0 && <h2 className="text-center mt-9 text-xl">No tasks added yet.</h2>}
        <div className='h-[1px] bg-black opacity-40 w-3/4 justify-self-center'></div>
    
    {tasks.map((item, index) => {
      
      return (showFinished || !item.iscompleted) && <div key={index} className="flex  border p-4 mt-4 justify-between items-center bg-gray-200 rounded-xl ">
        <div className='flex gap-2'>
           <input type="checkbox" onChange={handleCheck} className='w-5 h-5 mt-1 gap-5' name={item.id} id=''checked={item.iscompleted}/>
            <h3 className='2xl font-bold'><div  className={item.iscompleted ? 'line-through' : ''}>{item.task}</div></h3>
        </div>
        <div className="btn gap-4 mt-4 flex align-middle">
            <button onClick={(e)=>handleEdit(e,item.id)} className="rounded-lg size-5"><MdEditSquare className='w-6 h-6 text-purple-900' /></button>
            <button onClick={(e)=>handleDelete(e,item.id)} className="rounded-lg size-5"><AiFillDelete className='w-6 h-6 text-purple-900'/></button>
        </div>
      </div>

})}
  
        

      </div>
    </>
  )
}

export default App