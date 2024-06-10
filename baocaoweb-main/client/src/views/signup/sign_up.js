import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './sign_up.scss';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [selectedTechnology, setSelectedTechnology] = useState('');
    const [selectedFrameworks, setSelectedFrameworks] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [fields, setFields] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [frameworks, setFrameworks] = useState([]);

    const navigate = useHistory();

    useEffect(() => {
        axios.get('/signup')
            .then(response => {
                setFields(response.data.fields);
                setLanguages(response.data.languages);
                setFrameworks(response.data.frameworks);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleTechnologyChange = (event) => {
        setSelectedTechnology(event.target.value);
        setSelectedLanguages([]);
        setSelectedFrameworks([]);
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (event.target.name === 'framework') {
            if (checked) {
                setSelectedFrameworks(prevFrameworks => [...prevFrameworks, value]);
            } else {
                setSelectedFrameworks(prevFrameworks =>
                    prevFrameworks.filter(framework => framework !== value)
                );
            }
        } else if (event.target.name === 'language') {
            if (checked) {
                // Chỉ chọn một ngôn ngữ, loại bỏ các ngôn ngữ trước đó nếu có
                setSelectedLanguages([value]);
            } else {
                setSelectedLanguages([]);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra xem đã chọn đủ ngôn ngữ và framework chưa
        if (selectedTechnology === '' || selectedLanguages.length < 1 || selectedFrameworks.length < 1) {
            setMessage('Vui lòng chọn đủ lĩnh vực công nghệ, ngôn ngữ và framework');
            return; // Không thực hiện submit nếu chưa đủ lựa chọn
        }

        // Nếu đã chọn đủ, tiến hành gửi biểu mẫu
        const selectedField = fields.find(field => field.nameField === selectedTechnology);
        axios.post('/register', { username, password, email, selectedFieldId: selectedField?._id, selectedLanguages, selectedFrameworks })
            .then(res => {
                setMessage(res.data);
                navigate.push('/');
            })
            .catch(error => {
                console.error(error);
                setMessage('Lỗi khi đăng ký');
            });
    };
    const languageOptions = (
        <>
            <h4>Ngôn ngữ cho {fields.find(field => field.nameField === selectedTechnology)?.nameField}</h4>
            {languages
                .filter(language => language.id_field === fields.find(field => field.nameField === selectedTechnology)?._id)
                .map(language => (
                    <label key={language._id}>
                        <input
                            type="checkbox"
                            name="language"
                            value={language._id}
                            checked={selectedLanguages.includes(language._id)}
                            onChange={handleCheckboxChange}
                        />
                        {language.nameLanguage}
                    </label>
                ))}
        </>
    );

    const frameworkOptions = (
        <>
            <h4>Các Framework cho {languages.find(lang => selectedLanguages.includes(lang._id))?.nameLanguage} </h4>
            {selectedLanguages.map(language => {
                const selectedLanguage = languages.find(lang => lang._id === language);
                return (
                    <div key={selectedLanguage?._id}>
                        {frameworks
                            .filter(framework => framework.id_language === selectedLanguage?._id)
                            .map(framework => (
                                <label key={framework._id}>
                                    <input
                                        type="checkbox"
                                        name="framework"
                                        value={framework._id}
                                        checked={selectedFrameworks.includes(framework._id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {framework.nameFramework}
                                </label>
                            ))}
                    </div>
                );
            })}
        </>
    );


    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h1>Đăng ký</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên người dùng"
                        className="fadeIn second"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input type="email" id="email" className="fadeIn second"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={password}
                        className="fadeIn third"
                        onChange={event => setPassword(event.target.value)}
                    />
                    <h4>Lĩnh vực công nghệ</h4>
                    {fields.map(field => (
                        <div className="form-check" key={field._id}>
                            <label>
                                <input
                                    type="radio"
                                    name="technology"
                                    value={field.nameField}
                                    checked={selectedTechnology === field.nameField}
                                    onChange={handleTechnologyChange}
                                />
                                {field.nameField}
                            </label>
                        </div>
                    ))}
                    {languageOptions}
                    {frameworkOptions}
                    <input type="submit" className="fadeIn fourth" value="Đăng ký" />
                </form>
                <h2>{message}</h2>
            </div>
        </div>
    );
};

export default SignUp;
