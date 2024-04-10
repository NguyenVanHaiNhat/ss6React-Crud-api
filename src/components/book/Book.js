import {useEffect, useState} from "react";
import * as BookService from "../service/BookService"
import {Link} from "react-router-dom";
import moment from "moment";
import * as CategoryService from "../service/CategoryService"
import axios from "axios";
export function Book() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryList, setCategoryList] = useState([])
    const [sort, setSort] = useState("");

    useEffect(() => {
        getAllBook();
    }, [search, sort]);

    const getAllBook = async () => {
        try {
            const list = await BookService.getAll(search, sort);
            setBooks(list);
        } catch (e) {
            console.log(e);
        }
    }

    const formatDate = (date) => {
        const newDate = moment(date).format("DD/MM/YYYY");
        return newDate;
    }

    const handleSearch = () => {
        console.log(search)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleChangeSort = (e) => {
        setSort(e.target.value);
        console.log(sort);
    }

    const getAllCategory = async () => {
        try {
            const list = await CategoryService.getAllCategory();
            setCategoryList(list);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);


    return(

        <>
            <div className="row mx-5">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <h2>Quản lý sách</h2>
                </div>
            </div>

            <div className="row mx-5">
                <div className="col-2">
                    <Link to={"/book/create"} className="btn btn-primary">Thêm mới</Link>
                </div>
            </div>

            <form className="d-flex mx-5 mt-3 mb-3" role="search">
                <input className="form-control me-2" onChange={(e) => {handleChange(e)}} type="search" placeholder="Nhập tên sách" aria-label="Search"/>
                <button className="btn btn-outline-success" type="button" onClick={()=>{handleSearch()}}>Tìm</button>
            </form>
            <div className="row mx-5 mb-3">
                <label htmlFor="kkk4" className="form-label">Sắp xếp</label>
                <select id="kkk4" className="form-select" onChange={(e) => {handleChangeSort(e)}}>
                    <option selected disabled value="">---</option>
                    {categoryList.map(i => (
                        <option value={i.name} key={i.id}>{i.name}</option>
                    ))}
                    <option value="">Xóa lọc</option>

                </select>

            </div>


            <div className="row mx-5">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã sách</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Ngày nhập</th>
                        <th scope="col">Số lượng</th>

                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.code}</td>
                                <td>{book.name}</td>
                                <td>{book.category.name}</td>
                                <td>{formatDate(book.date)}</td>
                                <td>{book.quantity}</td>
                                <td>
                                    <button><Link to={'edit/' + book.id}>Update</Link></button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        axios.delete('http://localhost:8080/book/' + book.id).then(res => {
                                            alert('Xóa thành công!!!');
                                            getAllBook();
                                        })
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>


        </>
    )
}