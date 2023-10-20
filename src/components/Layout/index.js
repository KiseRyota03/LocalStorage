import './Layout.scss';
// import Register from '../Register';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Layout() {
    return (
        <div className="wrap">
            <div className="bg">
                <div className="ins">
                    <div className="ins-head"></div>

                    <div className="ins-logo">Please select</div>

                    <div className="ins-text">In what way do you want to see our instructions?</div>
                    <div>

                    <a href="/register">
                        <button className="layout-btn">By written language</button>
                    </a>
                    </div>
                    <div>

                    <a href="/register">
                        <button className="layout-btn">By sign language</button>
                    </a>
                    </div>
                    <div className='for_padding'>
                      .
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
