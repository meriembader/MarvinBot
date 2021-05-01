import React, { Component } from 'react'  
import axios from 'axios';  
import { Pie } from 'react-chartjs-2';  

export class Piechart extends Component {  

        constructor(props) {  

                super(props);  

                this.state = { Data: {} };  

        }  

        componentDidMount() {  

                axios.get(`http://localhost:3001/diagnostique/statDiagnosticDate`)  

                        .then(res => {  

                                console.log(res);  

                                const ipl = res.data;  

                                let element1 = [];  

                                let element = [];  

                                ipl.forEach(record => {  

                                    element1.push(record.element1);  

                                    element.push(record.element);  

                                });  

                                this.setState({  

                                        Data: {  

                                                labels: element1,  

                                                datasets: [  

                                                        {  

                                                                label: 'IPL 2018/2019 Top Run Scorer',  

                                                                data: runscore,  

                                                                backgroundColor: [  

                                                                        "#3cb371",  

                                                                        "#0000FF",  

                                                                        "#9966FF",  

                                                                        "#4C4CFF",  

                                                                        "#00FFFF",  

                                                                        "#f990a7",  

                                                                        "#aad2ed",  

                                                                        "#FF00FF",  

                                                                        "Blue",  

                                                                        "Red"  

                                                                ]  

                                                        }  

                                                ]  

                                        }  

                                });  

                        })  

        }  

        render() {  

                return (  

                       <div>  

                                <Pie  

                                        data={this.state.Data}  

                                        options={{ maintainAspectRatio: false }} />  

                        </div>  

                )  

        }  

}  

export default Piechart