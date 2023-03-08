import { useState, useEffect ,useLayoutEffect,useRef,chartRef} from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import "../css/lineandtornado.css";
import LineChartData from "../json/line-chart-data.json" ; 
import Tornado from './TornadoDiagram';
// Using right now to read Json files as discussed with chan, may need change it to fetch depending on how the backend is done. 

// This Component was written by Shivank let me know if you have any questions.

//This arrow function below multiples values with 100 to convert them to percentages for the graphs. 
const data = LineChartData.map((item) => {
  return {
      Maicer: item.Maicer,
      Digital: item.Digital * 100,
      CurrentPathway: item.CurrentPathway * 100
  }
});
export default function Linechart() {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const chartContainer = document.querySelector(".recharts-wrapper");
        // const h3 = document.querySelector("h3");
        const chartHeight = chartContainer.clientHeight ;
        const chartWidth = chartContainer.clientWidth;
        setChartHeight(chartHeight);
        setChartWidth(chartWidth);
      }, 100);
    };
  
    window.addEventListener("resize", handleResize);
  
    handleResize();
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='cont'>
    <div className='Tornado'>
      <Tornado chartWidth={chartWidth} chartHeight={chartHeight} />
      </div>
    
    {/* This is the line chart */}      
      <div ref={chartRef} className='Line' style={{textAlign:'center',  minWidth: "400px"}}>
        <h3 style={{fontSize: '24px'}}>CEAC </h3>
        
        <ResponsiveContainer width="99%" aspect={1} >
          <LineChart
            width={500}
            height={500}
            data={data}
            margin={{ bottom: 20, top: 10 }}
          >
            <XAxis
              label={{ value: 'WTP (GBP)', position: 'insideBottom', offset: -10, fontWeight: 'bold', fill: 'black' }}
              dataKey="Maicer"
              tick={{ fontSize: '12px' }}
            />
            <YAxis
              label={{
                value: 'Probabilty Cost Effective',
                fill: 'black',
                position: 'inside',
                angle: -90,
                dx: -20,
                fontWeight: 'bold',
                fontSize: '100%',
              }}
              tickFormatter={(tick) => `${tick}%`}
              tickCount={11}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tick={{ fontSize: '12px' }}
            />
            <Tooltip />
            <Legend layout="centric" verticalAlign="middle" align="right" />
            <Line type="monotone" dataKey="CurrentPathway" stroke="orange" strokeWidth={1.5} />
            <Line type="monotone" dataKey="Digital" stroke="blue" strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}