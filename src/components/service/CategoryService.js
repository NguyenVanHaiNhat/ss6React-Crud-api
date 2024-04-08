import axios from "axios";

export const getAllCategory = async () => {
    try {
        const res = axios.get(`http://localhost:8080/category`);
        return (await res).data
    } catch (e){
        console.log(e);
    }
}