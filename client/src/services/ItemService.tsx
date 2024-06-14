import axios from "axios";
import IDataList from "../models/IDataList";

export const getDataFromServer = () =>{
    return axios.get<IDataList[]>(`http://localhost:3000/items`)
            .then( response => response.data );
}

export const pushDataFromUser = (newPurchase : Omit<IDataList,"id">) => {
    return axios.post<IDataList>(
        `http://localhost:3000/items`,
        newPurchase,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
}