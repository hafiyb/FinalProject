
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);


// import { faSubscript } from '@fortawesome/free-solid-svg-icons';





const SummaryPieEarnings = () => {

  const incomeData = useSelector(state => state.income.incomes)

  const filterDates = useSelector(state => state.filter)

  const filterDateFrom = useSelector(state => state.filter.dateFrom)
  const filterDateTo = useSelector(state => state.filter.dateTo)
  const filterDateRange = filterDateTo-filterDateFrom

  const dataFilter = (type) =>{
    let temp = 0

    incomeData.forEach(data => {
      if(data.type == type
        && new Date(data.entry_date.substr(0,10)) >= new Date(filterDateFrom) 
        && new Date(data.entry_date.substr(0,10)) <= new Date(filterDateTo)
        && data.status == 1
        ){
          temp += parseFloat(data.value)
        }
    });
    console.log(temp)
    return temp
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
  };

  const data = {
    labels: ['Salary', 'Side-job', 'Sales', 'Misc.', ],
    datasets: [
      {
        label: 'Expenses',
        data: [
          dataFilter('Salary'),
          dataFilter('Side-job'),
          dataFilter('Sales'),
          dataFilter('Misc.'),

      ],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 2,
        hoverOffset:1,
        cutout:'50%',
      },
    ],
    options:{
      plugins:{
        legend:{
          labels:{
            boxWidth:200
          },
          position: 'right',
          display:false
        }
      }
    }
  };


  return(
      <div style={styles.container}>
          <h2 style={{}} >Incomes by Type</h2>
          <hr style={{width:'80%',margin:10}} />
          <div style={styles.innerContainer}>
            <Pie data={data} options={options} />
          </div>

      </div>
  )
}

export default SummaryPieEarnings



const styles={
    container:{
        width:'100%',
        height:280,
        backgroundColor:'#ffd700',
        borderRadius:30,
        padding:40,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    innerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'100%',
        width:'100%'
    }
    
}