import { useState } from "react";
import { useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components'


const ExpensesList = styled.ul`
    list-styled = none

`;
const ExpensesListItem = styled.li`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 10px;
    padding: 5px;
    color: white;
    background-color: grey;
    border-radius: 10px;
`;



export const Expenses = () => {
    const[expenses, setExpenses] = useState([]);
    const [isLoading,setIsLoading] = useState([]);

    console.log(process.env)

        useEffect(()=>{
            fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
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
            <ExpensesList>
                {expenses.map((exp) => (
                    <ExpensesListItem  key={exp.id}>
                        <span>{exp.type}</span>
                        <span>€{exp.amount}</span>
                    </ExpensesListItem >
                ))}
            </ExpensesList>
        )
    }


