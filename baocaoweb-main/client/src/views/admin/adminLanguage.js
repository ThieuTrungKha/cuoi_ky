import React from 'react';
import axios from 'axios';
import './form.scss';

class LanguageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataField: [],
            languages: [],
            newLanguage: {
                nameLanguage: '',
                docLanguage: '',
                describe: '',
                idField: '',
            },
            showDeleteSuccessMessage: false,
            showSuccessMessage: false,
            // update
            showUpdateForm: false,
            selectedLanguageId: null,
            selectedLanguage: {
                nameLanguage: '',
                docLanguage: '',
            },
        };
    }

    componentDidMount() {
        this.fetchFieldData();
    }

    fetchFieldData = async () => {
        try {
            const response = await axios.get('/getLanguage');
            this.setState({
                dataField: response.data.data_field,
                languages: response.data.data_language
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (this.state.showUpdateForm) {
            this.setState((prevState) => ({
                selectedLanguage: {
                    ...prevState.selectedLanguage,
                    [name]: value,
                },
            }));
        } else {
            this.setState((prevState) => ({
                newLanguage: {
                    ...prevState.newLanguage,
                    [name]: value,
                },
            }));
        }
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { newLanguage } = this.state;
        try {
            await axios.post('/addLanguage', newLanguage); 
            this.fetchFieldData();
            this.setState({
                newLanguage: {
                    nameLanguage: '',
                    docLanguage: '',
                    describe: '',
                    id_field: '',
                },
            });
            this.setState({ showSuccessMessage: true });
            setTimeout(() => this.setState({ showSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error adding language:', error);
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.get(`/deleteLanguage/${id}`);
            this.fetchFieldData();
            this.setState({ showDeleteSuccessMessage: true });
            setTimeout(() => this.setState({ showDeleteSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error deleting language:', error);
        }
    };


    handleUpdate = async (id) => {
        try {
            const response = await axios.get(`/updateLanguage/${id}`);
            console.log(response.data.findLanguage
            );
            this.setState({
                showUpdateForm: true,
                selectedLanguageId: id,
                selectedLanguage: {
                    nameLanguage: response.data.findLanguage.nameLanguage,
                    docLanguage: response.data.findLanguage.docLanguage,
                },
            });
        } catch (error) {
            console.error('Error fetching field data:', error);
        }
    };

    handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { selectedLanguageId, selectedLanguage } = this.state;
        try {
            await axios.post(`/update_language/${selectedLanguageId}`, selectedLanguage);
            this.fetchFieldData();
            this.setState({
                showUpdateForm: false,
                selectedLanguageId: null,
                selectedLanguage: {
                    nameLanguage: '',
                    docLanguage: '',
                },
            });
        } catch (error) {
            console.error('Error updating language:', error);
        }
    };
    render() {
        const { newLanguage, dataField, languages, showUpdateForm, selectedLanguage, showSuccessMessage } = this.state;
        return (
            <>
                {!showUpdateForm && (
                    <div className="form-box">
                        <form onSubmit={this.handleSubmit} className="my-form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên Language</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Nhập language"
                                    name="nameLanguage"
                                    value={newLanguage.nameLanguage}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Tài liệu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Nhập tài liệu"
                                    name="docLanguage"
                                    value={newLanguage.docLanguage}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Nhập mô tả"
                                    name="describe"
                                    value={newLanguage.describe}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="id_field"
                                value={newLanguage.idField}
                                onChange={this.handleInputChange}
                            >
                                <option selected disabled>
                                    Chọn lĩnh vực
                                </option>
                                {dataField.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.nameField}
                                    </option>
                                ))}
                            </select>

                            <button type="submit" className="btn btn-primary">
                                Thêm
                            </button>
                            {showSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Thêm ngôn ngữ thành công!
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {showUpdateForm && (
                    <div className="form-box">
                        <form onSubmit={this.handleUpdateSubmit} className="my-form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên lĩnh vực</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Nhập language"
                                    name="nameLanguage"
                                    value={selectedLanguage.nameLanguage}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Nhập tài liệu"
                                    name="docLanguage"
                                    value={selectedLanguage.docLanguage}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Cập nhật
                            </button>
                        </form>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        {languages.map((item) => (
                            <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
                                <div className="card mb-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.nameLanguage}</h5>
                                        <p>-------</p>
                                        <p className="card-text">{item.docLanguage}</p>
                                        <a
                                            onClick={() => this.handleUpdate(item._id)}
                                            className="btn btn-primary"
                                        >
                                            Cập nhật
                                        </a>
                                        <button
                                            className="btn btn-primary"
                                            style={{ backgroundColor: 'rgb(245, 10, 10)' }}
                                            onClick={() => this.handleDelete(item._id)}
                                        >
                                            Xóa
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                        {this.state.showDeleteSuccessMessage && (
                            <div className="alert alert-success" role="alert">
                                Xóa thành công!
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default LanguageForm;
