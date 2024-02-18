// Context.js
import React, { useEffect, useState } from "react";
import "./Context.css";
import Apirequest from "./Apirequest";


function Context() {
  const [task, setTask] = useState("");
 
  const [item, setItem] = useState([]);


  const [search, setSearch] = useState("");
  const API_URL = "http://localhost:3500/items";

  function handleChange(id) {
    setItem(
      item.map((it) => (it.id === id ? { ...it, check: !it.check } : it))
    );
  }

  function handleDel(id) {
    setItem(item.filter((it) => it.id !== id));
  }

  async function handleAdd () {

    const additem={id:Date.now(),desp:task,check:false}
   

    setItem(() => [
      ...item,
      additem
    ]);
    setTask("");
    const optionobject=
    {
      method:'POST',
      header:
      {
        'Content-Type':'application/JSON'
      },
      body:JSON.stringify(additem)
    }
    const result= await Apirequest(API_URL,optionobject);

    
   
  }

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) throw Error("Data not found");
   
        const listitems = await response.json();
        setItem(listitems);
       
       


       
        

      }
      catch (err) {
        console.log("erroe");
        
        


      }

    }

    (async () => await fetchdata())()

    

  }, []);

  const filterlist = item.filter((it) =>
    it.desp.toLowerCase().includes(search)
  );

  return (
    <div className="full">

      <div className="container">
        <h2>TODo list</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <main>

        {item.length === 0 ? (
          <p className="empty-message">Empty</p>
        ) : (
          <ul>
           
            {filterlist.map((it) => (
              <li key={it.id} className={`todo-item ${it.check ? "completed" : ""}`}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={it.check}
                  onChange={() => handleChange(it.id)}
                />
                {it.desp}
               
                <button
                  className="delete-button"
                  onClick={() => handleDel(it.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        </main>
        <div className="input-container">
        <input autoFocus type="text" value={task} onChange={(e)=>setTask(e.target.value)}/>
        
          <button className="add-button" onClick={() => handleAdd()}>
            Add
          </button>
        </div>

      </div>
    </div>
  );
}

export default Context;
