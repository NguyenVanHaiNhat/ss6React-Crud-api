import axios from "axios";
import {bool} from "yup";

export const getAll = async (search, sort) => {
    try {
        const res = await axios.get(`http://localhost:8080/book?_sort=quantity&_order=asc&name_like=${search}&category.name_like=${sort}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const createBook = async (book) => {
    try {
        const res = await axios.post("http://localhost:8080/book", book);
        console.log(res.data)
    } catch (e){
        console.log(e)
    }
}

export const updateBook = async (book) => {
    try {
        const res = await axios.put("http://localhost:8080/book/" + book.id, book);
        console.log(res.data)
    } catch (e) {
        console.log(e);
    }
}

// export const deleteBook = async (id) => {
//     try {
//         const res = await axios.delete("http://localhost:8080/book/" + id);
//         console.log(res.data)
//     } catch (e) {
//         console.log(e);
//     }
// }