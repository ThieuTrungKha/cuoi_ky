import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import CommentForm from '../comment_home/comment_form';
const Statistical = () => {
    const [fields, setFields] = useState([]);
    const [frameworks, setFrameworks] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [username, setUsername] = useState('');
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

    const dataField = {
        labels: fields.map(fields => fields.nameField),
        datasets: [
            {
                label: 'Fields Count',
                data: fields.map(fields => fields.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                percentage: fields.map(field => ((field.count / _.sum(fields.map(f => f.count))) * 100).toFixed(2)),
            },
        ],
    };
    const dataLanguage = {
        labels: languages.map(languages => languages.nameLanguage),
        datasets: [
            {

                label: 'Language Count',
                data: languages.map(languages => languages.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                percentage: languages.map(field => ((languages.count / _.sum(languages.map(f => f.count))) * 100).toFixed(2)),
            },
        ],
    };

    const dataFrameworks = {
        labels: frameworks.map(frameworks => frameworks.nameFramework),
        datasets: [
            {
                label: 'Framework Count',
                data: frameworks.map(frameworks => frameworks.count),
                backgroundColor: 'rgb(40, 118, 221)',
                borderColor: 'rgb(40, 118, 221)',
                borderWidth: 1,
                percentage: frameworks.map(framework => ((framework.count / _.sum(frameworks.map(f => f.count))) * 100).toFixed(2)),
            },
        ],
    };


    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                type: 'linear',
                beginAtZero: true,
                display: false,
            },
            y: {
                barThickness: 5,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 20,
                        color: '#000000',
                    },
                    padding: 8,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.x !== null) {
                            label += new Number(context.parsed.x).toFixed(0);
                            label += ' (' + context.dataset.percentage[context.dataIndex] + '%)';
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className='container'>
            <h2>Most used web frameworks among developers worldwide, as of 2023</h2>
            <div className='containerBox'>
                <div className='boxDataField'>
                    <Bar data={dataField} options={options} />
                </div>
                <div className='boxDataFramework'>
                    <Bar data={dataFrameworks} options={options} />
                </div>
                <div className='boxDataField'>
                    <Bar data={dataLanguage} options={options} />
                </div>
            </div>
            <CommentForm username={username} />
        </div>

    );
};

export default Statistical;
