import React from 'react';
import { useAuth } from 'reactfire';
import { Redirect } from 'react-router-dom'


export default function Dashboard(){
    const signOut = auth => auth.signOut().then(() => <Redirect to='/'/>);
    const auth = useAuth();
       return(
           <div className="dashboard">
                <h3>Dashboard...</h3>
                <button onClick={()=>signOut(auth)}>
                    Signout
                </button>
           </div>
       )
}