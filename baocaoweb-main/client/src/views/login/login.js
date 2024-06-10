import React from 'react';
import axios from 'axios';
import './login.scss';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/login', {
                username,
                password,
            });
            setMessage(res.data);
            history.push('/home');
            console.log(res.data);
        } catch (error) {
            console.error(error);
            setMessage('Error signing in');
        }
    };

    return (     
    <div className="logIn">
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            placeholder="Tên đăng nhập"
                            type="text"
                            className="fadeIn second"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            placeholder="Mật khẩu đăng nhập"
                            className="fadeIn third"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <br />
                    <input type="submit" className="fadeIn fourth" value="Đăng nhập" />
                </form>
                <div id="formFooter">
                    <a className="underlineHover" href="/signup">
                        Đăng ký
                    </a>
                </div>
                {message && <div>{message}</div>}
            </div>
        </div>
         </div>
    );
}