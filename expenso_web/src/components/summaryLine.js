import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
// import { faSubscript } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};



const SummaryLine = () => {

    const filterDates = useSelector(state => state.filter)

    const filterDateFrom = useSelector(state => state.filter.dateFrom)
    const filterDateTo = useSelector(state => state.filter.dateTo)
    const filterDateRange = filterDateTo-filterDateFrom

    const dateCalc = (mult) => {
        setTimeout(()=>{
        let newDate = new Date(filterDateFrom+(filterDateRange*mult)).toISOString().split('T')[0].substr(5,10)
        return newDate
        },1000)
    }

    const labels = [
        `${dateCalc(0)} - ${dateCalc(0.2)}`,
        `${dateCalc(0.2)} - ${dateCalc(0.4)}`,
        `${dateCalc(0.4)} - ${dateCalc(0.6)}`,
        `${dateCalc(0.6)} - ${dateCalc(0.8)}`,
        `${dateCalc(0.8)} - ${dateCalc(1)}`,
    ];
    const values = [1, 2, 3, 4, 5, 6, 7];

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
        //   data: labels.map(() => 10),
          data: values.map((ayy) => ayy),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };


    return(
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <Line options={options} data={data} />
            </div>
            <h1>{filterDateRange}</h1>
        </div>
    )
}

export default SummaryLine




const styles={
    container:{
        width:'100%',
        // height:500,
        backgroundColor:'#ffd700',
        borderRadius:30,
        padding:15,

    },
    innerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
    
}