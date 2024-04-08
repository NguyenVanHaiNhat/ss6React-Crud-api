import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Form, Formik} from "formik";
import * as Yup from "yup";

export function BookUpdate(){
    let {id} = useParams();
    let [data, setData] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/book/' + id).then(res => {
            setData(res.data)
        })
    }, []);
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
                onSubmit={values => {
                    axios.put('http://localhost:8080/book/' + id, values).then(res => {
                        navigate('/book')
                    })
                }}
                validationSchema={Yup.object(validationUpdate)}
                enableReinitialize={true}
            >
                <Form></Form>
            </Formik>
        </>
    )
}