import './Layout.scss';
// import Register from '../Register';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Layout() {
  return (
    <div className="wrap">
      <div className="bg">
        <div className="ins">
          <div className="ins-head">
            Welcome to
          </div>

          <div className="ins-logo">
            pSLR
          </div>

          <div className="ins-text">
            Nhấp vào nút để bắt đầu xem hướng dẫn bằng văn bản

          </div>
          <a href="/register">
            <button className="ins-but">
              BẮT ĐẦU
            </button>
          </a>
        </div>


      </div>

      <div className="bg2">
        <div className="ins">
          <div className="ins2-text">
            Nhấp vào nút để bắt đầu xem hướng dẫn bằng Ngôn ngữ ký hiệu

          </div>
          <a href="/register">
            <button className="ins2-but">
              BẮT ĐẦU
            </button>
          </a>
        </div>
      </div>
      {/* <Routes>
        <Route path ='/register' element={<Register/>}/>
        <Route path ='/' element={<Layout/>}/>
      </Routes> */}
    </div>

  );
}

export default Layout;