import React from 'react';
import axios from 'axios';
import './form.scss';

class FrameworkForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frameworks: [],
            languages: [],
            newFramework: {
                nameFramework: '',
                docFramework: '',
                describe: '',
                id_language: '',
            },
            showAddSuccessMessage: false,
            showDeleteSuccessMessage: false,

            // update
            showUpdateForm: false,
            selectedFrameworkId: null,
            selectedFramework: {
                nameFramework: '',
                docFramework: '',
            },
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const frameworksResponse = await axios.get('/getFramework');
            // console.log(frameworksResponse.data);
            this.setState({
                frameworks: frameworksResponse.data.data_framework,
                languages: frameworksResponse.data.data_language,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newFramework: {
                ...prevState.newFramework,
                [name]: value,
            },
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (this.state.showUpdateForm) {
            this.setState((prevState) => ({
                selectedFramework: {
                    ...prevState.selectedFramework,
                    [name]: value,
                },
            }));
        } else {
            this.setState((prevState) => ({
                newFramework: {
                    ...prevState.newFramework,
                    [name]: value,
                },
            }));
        }
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { newFramework } = this.state;
        try {
            await axios.post('/addFramework', newFramework);
            console.log(newFramework);
            // Refresh the frameworks list after successful submission
            this.fetchData();
            this.setState({
                newFramework: {
                    nameFramework: '',
                    docFramework: '',
                    describe: '',
                    id_language: '',
                },
            });
            this.setState({ showAddSuccessMessage: true }); // Hiển thị thông báo xóa thành công
            setTimeout(() => this.setState({ showAddSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error adding framework:', error);
        }
    };

    handleDelete = async (id) => {
        try {
await axios.get(`/deleteFramework/${id}`);
            this.fetchData();
            this.setState({ showDeleteSuccessMessage: true });
            setTimeout(() => this.setState({ showDeleteSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error deleting framework:', error);
        }
    };
    handleUpdate = async (id) => {
        try {
            const response = await axios.get(`/updateFramework/${id}`);
            console.log(response.data);
            this.setState({
                showUpdateForm: true,
                selectedFrameworkId: id,
                selectedFramework: {
                    nameFramework: response.data.findFramework.nameFramework,
                    docFramework: response.data.findFramework.docFramework,
                },
            });
        } catch (error) {
            console.error('Error fetching field data:', error);
        }
    };

    handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { selectedFrameworkId, selectedFramework } = this.state;
        try {
            await axios.post(`/update_framework/${selectedFrameworkId}`, selectedFramework);
            this.fetchData();
            this.setState({
                showUpdateForm: false,
                selectedFrameworkId: null,
                selectedFramework: {
                    nameFramework: '',
                    docFramework: '',
                },
            });
        } catch (error) {
            console.error('Error updating language:', error);
        }
    };
    render() {
        const { frameworks, languages, newFramework, showUpdateForm, selectedFramework } = this.state;
        return (
            <>
                {!showUpdateForm && (
                    <div className="form-box">
                        <form onSubmit={this.handleSubmit} className="my-form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên Framework</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameFramework"
                                    placeholder="Nhập Framework"
                                    name="nameFramework"
                                    value={newFramework.nameFramework}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">

                                <label htmlFor="exampleInputPassword1">Tài liệu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="docFramework"
                                    placeholder="Nhập tài liệu"
name="docFramework"
                                    value={newFramework.docFramework}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="exampleInputEmail1">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="describe"
                                    placeholder="Nhập mô tả"
                                    name="describe"
                                    value={newFramework.describe}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="id_language"
                                value={newFramework.id_language}
                                onChange={this.handleInputChange}
                            >
                                <option value="default" selected>
                                    Chọn lĩnh vực
                                </option>
                                {languages.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.nameLanguage}
                                    </option>

                                ))}
                            </select>

                            <button type="submit" className="btn btn-primary">  Thêm </button>
                            {this.state.showAddSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Thêm framework thành công!
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
                                    placeholder="Nhập Framework"
                                    name="nameFramework"
                                    value={selectedFramework.nameFramework}
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
                                    name="docFramework"
                                    value={selectedFramework.docFramework}
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
                        {frameworks.map((framework) => (
                            <div key={framework._id} className="col-sm-6 col-md-4 col-lg-3">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{framework.nameFramework}</h5>
                                        <p>-------</p>
                                        <p className="card-text">{framework.describe}</p>

                                        <button
                                            className="btn btn-primary"
                                            style={{ backgroundColor: 'rgb(245, 10, 10)' }}
                                            onClick={() => this.handleDelete(framework._id)}
                                        >
                                            Xóa
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.handleUpdate(framework._id)}
                                        >
                                            Cập nhật
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
                </div >
            </>
        );
    }
}

export default FrameworkForm;