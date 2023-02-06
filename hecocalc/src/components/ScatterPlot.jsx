import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
  ZAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import data from '../scatterdata.json';

export default function ScatterPlot() {

  return (
    <>
    <h1 style={{fontSize: '24px'}}>Scatter Plots </h1>
    {/* <ResponsiveContainer width="50%" height="50%" aspect={1}> */}
    <ScatterChart
      width={650}
      height={650}
      data={data}
    >
      <CartesianGrid horizontal={false} vertical={false} />
      <XAxis axisLine={false} pointsAtX type="number" dataKey="QALYs" 
      // number 0.0 is in quotation marks to avoid displaying as "0" automatically
      ticks={[-1,-0.8,-0.6,-0.4,-0.2,"0.0",0.2,0.4,0.6,0.8,1]} 
      tick={{fontSize:"12", dy:-295}}
      tickLine={false}>
        <Label value="Incremental QALYs" position='insideBottom' fontWeight={"bold"} fill="#000000" offset={-10}/>
      </XAxis>

      <YAxis axisLine={false} type="number" dataKey="COST" 
      ticks={[-5000,-4000,-3000,-2000,-1000,1000,2000,3000,4000,5000]} 
      tick={{fontSize:"12", dx:290}} tickLine={false}>
        <Label value="Incremental Cost (GBP)" angle={-90} position='center' fontWeight={"bold"} fill="#000000"/>
      </YAxis>

      {/* ZAxis range sets the size of the scatter*/}
      <ZAxis range={[20]}/>
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend wrapperStyle={{bottom:150, left:280}}/>
      <Scatter name="PSA Scatter" data={data} 
     stroke="#2F75B5" fillOpacity={0} fill="#2F75B5"/>
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      {/* Reference Line is set at 0|0 and replicates the x and y axis */}
      <ReferenceLine y={0} stroke="black" strokeWidth={0.8} />
      <ReferenceLine x={0} stroke="black" strokeWidth={0.8} />
    </ScatterChart>
    {/* </ResponsiveContainer> */}

    </>
  );
}
