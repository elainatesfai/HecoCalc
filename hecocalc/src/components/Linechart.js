import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label  
} from "recharts";
import LineChartData from "../components//LineChartData.json" ; 
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
  return (  
  
  <div>
  <h1 style={{fontSize: '24px'}}>CEAC </h1>
    {/*I have tested that the graph will not apprear properly unless it is atleast 400px wide, so the div I  will pass will be minimum 400px it can made large*/ }     
    {/* <ResponsiveContainer width="50%" height="50%" aspect={1}> */}
    {/* The responsive container allows the graph to change when the screensize changes */}
      <LineChart
        width={650}
        height={650}
        data={data} // This is where we will pass the json file.
        // margin= {{ top: 10, right: 30, left: 30, bottom: 10 }}
      >
        {/* All these below are componets of the line chart, imported from the recharts library */}
        <CartesianGrid horizontal={false} vertical={false} /> {/* Adjust the graph grid apearance */}
        <XAxis dataKey= "Maicer" tick={{fontSize:"12"}}>
          <Label value="WTP (GBP)" position='insideBottom' fontWeight={"bold"} fill="#000000" offset={-10} />
        </XAxis>
        <YAxis label={{value:"Probabilty Cost Effective", position: 'inside', offset: 20, fill: 'black', fontSize: '100%', textAnchor: 'end', angle: -90,fontWeight: 'bold' }} 
        tickFormatter={(tick) => `${tick}%`} // Gives the y axis ticks the percentage sign.
        tickCount={11}
        ticks={[0,10,20,30,40,50,60,70,80,90,100]} // Makes displays values from 0-100% with increments of 10%
        tick={{fontSize: '12px'}} 
        />
        <Tooltip /> {/* when someone hovers it shows the value of the line. */}
        <Legend wrapperStyle={{bottom:150, left:230}}/> {/* Shows which colour belongs to which line. */}
        <Line type="monotone" dataKey="CurrentPathway" stroke="orange" strokeWidth={1.5}/>

        <Line type="monotone" dataKey="Digital" stroke="blue" strokeWidth={1.5}/>
      </LineChart>      
    {/* </ResponsiveContainer> */}
    {/* The Line Below is for the lable of the x-axis, I tried to put a label on x axis component but it would stick to the axis and would not move no matter what I changed*/}
    {/* <h3 style={{fontSize: '14px', textAlign:"center"}}>WTP (GBP)</h3>  */}
    </div>
  );
}
