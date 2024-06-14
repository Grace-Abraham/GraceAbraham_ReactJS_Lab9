import React, { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import { getDataFromServer } from "../services/ItemService";
import '../App.css';
import ExpenseTrackerForm from "./ExpenseTrackerForm";
export default function ShowList(){


    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [graceSpent, setGraceSpent] =  useState<number>(0);
    const [koshySpent, setKoshySpent] =  useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(()=>{
        console.log('in use-effect');
        const fetchItemsData = async () => {
            try{
                const data = await getDataFromServer();
                console.log(data);    
                setItems(data);
                calculateOnItems(data);
            }
            catch(error: any){
                console.error(error);
                setError(error);
            }
        }
        fetchItemsData();
    },[showForm])

    const calculateOnItems = (data: IDataList[]) => {

        var gracespent1: number = 0;
        var koshyspent1: number = 0;
        data.map((item) => 
            item.payeeName === "Grace" 
                ? (gracespent1 = gracespent1 + item.price)
                : (koshyspent1 = koshyspent1 + item.price)
        );
        setGraceSpent(gracespent1);
        setKoshySpent(koshyspent1);
        setSum(gracespent1+koshyspent1);

    }
    const getTableHeaders = () => {
        return (
            <>
            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
        )
    }

    const renderExpense = (expense:IDataList) =>{
        return (
            <div key={expense.id}>
                <div className="use-inline date">{expense.setDate}</div>
                <div className="use-inline">{expense.product}</div>
        <div className="use-inline price">{expense.price}</div>
        <div className={'use-inline ${expense.payeeName}'}>{expense.payeeName}</div>
            </div>   
        )
    }

    const renderSummary = () => {
        return <>
            <div className="use-inline"> Total </div>
            <div className="use-inline total">{sum}</div><br/>
            <div className="use-inline"> Grace </div>
            <div className="use-inline total Grace">{graceSpent}</div><br/>
            <div className="use-inline"> Koshy paid: </div>
            <div className="use-inline total Koshy">{koshySpent}</div> <br />
            <span className="use-inline payable">{graceSpent > koshySpent ? "Pay Grace" : "Pay Koshy"}</span>
            <span className="use-inline payable price">{Math.abs((graceSpent-koshySpent)/2)}</span>
        </>
    }
    return <>
    <header id="page-Header"> Expense Tracker </header>
    <button id="Add-Button" onClick={()=>setShowForm(true)}> Add </button>
    {
        showForm && (
            <div className="form">
                <ExpenseTrackerForm onClose={() => setShowForm(false)} onTrue={() => setShowForm(false)}/>
            </div>
        )
    }
    {getTableHeaders()}
    {items && items.map((expense)=>renderExpense(expense))}
    <hr/>
    {renderSummary()}

    </>
}