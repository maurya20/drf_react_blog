import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'




export const BlogContext = createContext()
export const BlogProvider = (props)=>{
    const [appState, setAppState] = useState({logAction:"", logged_in:false, username:"", uid:26})
    
    useEffect(() => {
      if (localStorage.getItem('blogtoken'))
      axios.get('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('blogtoken')}`
        }
      }).then(res => 
        setAppState({username:res.data.username, logged_in:true})
        //console.log(res.data)
      
      ).catch(function(error) {
        return
      });
        
    }
    , [appState.logAction]);



    return (
            <BlogContext.Provider value={[appState, setAppState]}>
                {props.children}
            </BlogContext.Provider>
    )
}