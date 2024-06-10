import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './admin_login.scss';

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const adminName = formData.get('adminName');
        const password = formData.get('password');

        try {
            const response = await axios.post('/adminlogin', { adminName, password });
            console.log(response.data);
            if (response.data.redirect === "/home_admin") {
                this.setState({ redirectToHome: true });
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/home_admin" />;
        }

        return (
            <div className="login-box">
                <div className="login-header">
                    <header>Người quản lý</header>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            className="input-field"
                            name="adminName"
                            placeholder="Tên đăng nhập"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            placeholder="Mật khẩu"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="forgot"></div>
                    <div className="input-submit">
                        <button type="submit" className="submit-btn" id="submit">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AdminLogin;
