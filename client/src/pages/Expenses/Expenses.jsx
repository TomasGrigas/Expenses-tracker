import { useState } from "react";
import { useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";
import { API_URL } from "../../constants/constants";



export const Expenses = () => {
    const[expenses, setExpenses] = useState([]);
    const [isLoading,setIsLoading] = useState([]);

        useEffect(()=>{
            fetch(`${API_URL}/expenses?userId=${LOGGED_IN_USER}`)
            .then(res=>res.json())
            .then(data => {
                setExpenses(data);
                setIsLoading(false);
            });
        }, []);

        if(isLoading){
            return <div>Loading...</div>
        }

        return (
            <div>
                {expenses.map((exp) => <div key={exp.id}>{exp.amount}</div>)}
            </div>
        )
    }


