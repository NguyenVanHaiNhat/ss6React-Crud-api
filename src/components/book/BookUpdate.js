import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as CategoryService from "../service/CategoryService";
import * as BookService from "../service/BookService";

export function BookUpdate(){
    let {id} = useParams();
    let [data, setData] = useState({});
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const getAllCategory = async () => {
        try {
            const list = await CategoryService.getAllCategory()
            setCategories(list);
        } catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        getAllCategory()
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/book/' + id).then(res => {
            setData(res.data)
        })
    }, []);

    const handleUpdate = async (value) => {
        const newValue = {...value, category: JSON.parse(value.category)}
        console.log(newValue);
        await BookService.updateBook(newValue);
        navigate("/book")
        alert("Update thành công")
    }


    const validationUpdate = {
        code : Yup.string().required("Vui lòng nhập mã sách").matches(/^BO-[0-9]{4}$/, "Mã sách phải đúng định dạng BO-XXXX"),
        name : Yup.string().required("vui lòng nhập tên sách").max(100, "Tên sách không dài quá 100 kí tự"),
        date : Yup.date().required("Vui lòng nhập ngày").max(new Date("2024-04-08"), "Ngày không được lớn hơn ngày hiện tại"),
        quantity : Yup.number().required("Vui lòng nhập số lượng").min(0, "vui lòng nhập số lượng lớn hơn 0").integer("vui lòng nhập số nguyên")
    }
    return (
        <>
            <h1>Edit</h1>
            <Formik
                initialValues={data}
                onSubmit={handleUpdate}
                validationSchema={Yup.object(validationUpdate)}
                enableReinitialize={true}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="kk1" className="form-label">Mã sách</label>
                        <Field name="code" type="text" className="form-control" id="kk1"/>
                        <ErrorMessage name="code" component="span" className="k-span"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="kk2" className="form-label">Tên sách</label>
                        <Field name="name" type="text" className="form-control" id="kk2"/>
                        <ErrorMessage name="name" component="span" className="k-span"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="kk3" className="form-label">Thể loại</label>
                        <Field name="category" as="select" className="form-control" id="kk3" required>
                            <option value="" selected disabled >Chọn thể loại</option>
                            {
                                categories.map(category => (
                                    <option key={category.id}
                                            value={JSON.stringify(category)}>{category.name}</option>
                                ))
                            }

                        </Field>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="kk4" className="form-label">Ngày nhập sách</label>
                        <Field name="date" type="date" className="form-control" id="kk4"/>
                        <ErrorMessage name="date" component="span" className="k-span"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="kk5" className="form-label">Số lượng sách</label>
                        <Field name="quantity" type="number" className="form-control" id="kk5"/>
                        <ErrorMessage name="quantity" component="span" className="k-span"></ErrorMessage>
                    </div>


                    <div className="d-grid gap-2">
                        <button className="btn btn-success" type="submit">Thêm mới</button>
                        <Link to={"/book"} className="btn btn-danger">Hủy</Link>
                    </div>
                </Form>
            </Formik>
        </>
    )
}