import './Profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Profile() {
    return (
        <div className='text-wrap'>
            <div className='barTop'>
                <div className='barTop-title'>
                    LGP
                </div>
            </div>

            <div className='profile-wrap'>
                <div className='profile-title'>
                    Hồ sơ
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Họ tên
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Ngày sinh
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Địa chỉ
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Ngôn ngữ
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        E-mail
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Số điện thoại
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

            </div>

            <div className='split'>

            </div>

            <div className='profile-wrap'>
                <div className='profile-title'>
                    Thông tin tài khoản
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Số hồ sơ
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Hỗ trợ bởi
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

                <div className='profile-box'>
                    <div className='box-text'>
                        Kiểu đăng ký
                    </div>
                    <input className='box-fill'>

                    </input>
                </div>

            </div>
            <div className='button-wrap'>
                <button className='profile-button'>
                    Lưu thay đổi
                </button>
            </div>
            <div className='barDown'>
                <div className='barDown-items'>
                    <a href='/Video' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href='/Text' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href='/Lesson' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href='/Profile' className='active-icon'>
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Profile