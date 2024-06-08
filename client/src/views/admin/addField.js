import React from 'react';
import axios from 'axios';
import './form.scss';
class FieldForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataField: [],
            newField: {
                nameField: '',
                describe: '',
            },
            showSuccessMessage: false,
            showDeleteSuccessMessage: false,
            // update
            showUpdateForm: false,
            selectedFieldId: null,
            selectedField: {
                nameField: '',
                describe: '',
            },
        };
    }

    componentDidMount() {
        this.fetchFieldData();
    }

    fetchFieldData = async () => {
        try {
            const response = await axios.get('/viewAddField');
            this.setState({
                dataField: response.data.dataField,
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (this.state.showUpdateForm) {
            this.setState((prevState) => ({
                selectedField: {
                    ...prevState.selectedField,
                    [name]: value,
                },
            }));
        } else {
            this.setState((prevState) => ({
                newField: {
                    ...prevState.newField,
                    [name]: value,
                },
            }));
        }
    };

    handleSubmit = async (e) => { 
        e.preventDefault();
        const { newField } = this.state;
        try {
            await axios.post('/fieldAdmin', newField); 
            // Cập nhật dữ liệu sau khi thêm mới
            this.fetchFieldData();
            this.setState({
                newField: {
                    nameField: '',
                    describe: '',
                },
            });
            this.setState({ showSuccessMessage: true });
            setTimeout(() => this.setState({ showSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error adding field:', error);
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.get(`/edit/${id}`);
            this.fetchFieldData();
            this.setState({ showDeleteSuccessMessage: true });
            setTimeout(() => this.setState({ showDeleteSuccessMessage: false }), 3000);
        } catch (error) {
            console.error('Error deleting framework:', error);
        }
    };

    handleUpdate = async (id) => {
        try {
            const response = await axios.get(`/update_view/${id}`);
            console.log(response.data.field.nameField);
            this.setState({
                showUpdateForm: true,
                selectedFieldId: id,
                selectedField: {
                    nameField: response.data.field.nameField,
                    describe: response.data.field.describe,
                },
            });
        } catch (error) {
            console.error('Error fetching field data:', error);
        }
    };

    handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { selectedFieldId, selectedField } = this.state;
        try {
            await axios.post(`/update/${selectedFieldId}`, selectedField);
            this.fetchFieldData();
            this.setState({
                showUpdateForm: false,
                selectedFieldId: null,
                selectedField: {
                    nameField: '',
                    describe: '',
                },
            });
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };
    render() {
        const { newField, dataField, showSuccessMessage, showUpdateForm, selectedField } = this.state;
        return (
            <>
                {!showUpdateForm && (
                    <div className="form-box">
                        <form onSubmit={this.handleSubmit} className="my-form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên lĩnh vực</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Nhập lĩnh vực"
                                    name="nameField"
                                    value={newField.nameField}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Nhập mô tả"
                                    name="describe"
                                    value={newField.describe}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Thêm
                            </button>
                            {showSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Thêm lĩnh vực thành công!
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
                                    placeholder="Nhập lĩnh vực"
                                    name="nameField"
                                    value={selectedField.nameField}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Mô tả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Nhập mô tả"
                                    name="describe"
                                    value={selectedField.describe}
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
                        {dataField.map((item) => (
                            <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
                                <div className="card mb-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.nameField}</h5>
                                        <p>-------</p>
                                        <p className="card-text">{item.describe}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.handleUpdate(item._id)}
                                        >
                                            Cập nhật
                                        </button>
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
                    </div>
                </div>
            </>
        );
    }
}

export default FieldForm;
