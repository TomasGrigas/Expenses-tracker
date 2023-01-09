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
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

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

        const handleExpenseAdd = (e) => {
            e.preventDefault();
            fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type, 
                    amount,
                    userId: 1
                })
            })
            .then((res) => res.json())
            .then((data) => {
                setExpenses(data);
                setType('');
                setAmount('');
            });
        }
    
        const totalSum = expenses.reduce((totalSum, expense) => totalSum += parseInt(expense.amount), 0);

        return (
            <ExpensesList>
                       <form onSubmit={handleExpenseAdd}>
                <input 
                    placeholder="Type" 
                    required 
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                />
                <input 
                    placeholder="Amount" 
                    type="number" 
                    required 
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
                <button>Add</button>
            </form>
            <h2>Total spent: €{totalSum}</h2>
                {expenses.map((exp) => (
                    <ExpensesListItem  key={exp.id}>
                        <span>{exp.type}</span>
                        <span>€{exp.amount}</span>
                    </ExpensesListItem >
                ))}
            </ExpensesList>
        )
    }


