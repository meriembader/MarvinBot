import React, {useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/diagnostique/statDiagnostic';

export const getdata = async () => {
    try{
        const {data} = await axios.get(baseUrl + 'daily');
        return data;
    }catch(error) {
        throw error;
    }
}

export const getPieData = async () => {
    try{
        const {data} = await axios.get(baseUrl);
        return data;
    }catch(error){
        throw error;
    }
}



const PieChart = () => {
  const [_id, set_id] = useState(0);
  const [nb_user, setNb_user] = useState(0);

  const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 90, 100, 0);
      const gradient1 = ctx.createLinearGradient(0, 90, 100, 0);
      gradient.addColorStop(0, '#ff9a9e');
      gradient.addColorStop(0.5, '#fad0c4');
      gradient.addColorStop(1, '#fad0c4');

      gradient1.addColorStop(0, '#B7F8DB');
      gradient1.addColorStop(0.5, '#50A7C2');
      gradient1.addColorStop(1, '#B7F8DB');

      return {
          labels: ['_id', 'nb_user'],
          datasets:[
              {
              label: 'Data',
              data: [_id, nb_user],
              backgroundColor: [gradient1, gradient],
              borderColor: [gradient1, gradient],
              borderWidth: 1,
              }
          ]
      }
  }
  const options = {
      responsive: true,
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  }
  const getChartData = async () => {
      try{
          let _id = 0;
          let nb_user = 0;
          const response = await getPieData();
          if (response !== null) {
              const {_id, nb_user} = response;
              const total = _id.value + nb_user.value;
              _id = parseFloat(((_id.value / total) * 100).toFixed(2));
              nb_user = parseFloat(((nb_user.value / total) * 100).toFixed(2));

              set_id(_id);
              setNb_user(nb_user);
          }
      }catch(error) {
          console.log(error);
      }
  }

  useEffect(() => {
      getChartData();
  }, []);
  return (
      <Pie data={data} options={options}/>
  );
}

export default PieChart;