import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Book} from "./components/book/Book";
import {BookCreate} from "./components/book/BookCreate";
import {BookUpdate} from "./components/book/BookUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/book"} element={<Book/>}></Route>
          <Route path={"/book/create"} element={<BookCreate/>}></Route>
            <Route path={"/book/edit/:id"} element={<BookUpdate/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
