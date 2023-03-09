import { bottomNavigationActionClasses } from "@mui/material";
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
  ResponsiveContainer,
  ZAxis,
  Label,
} from "recharts";

export default function ScatterPlot(data) {
  var dataXMin = Math.min(data.QALYs);
  var dataXMax = Math.max(data.QALYs);
  var dataYMin = Math.min(data.COST);
  var dataYMax = Math.max(data.COST);

  return (
    <div style={{ textAlign: "center", minWidth: "400px" }}>
      <h3 style={{ fontSize: "24px" }}>Scatter Plots </h3>
      <ResponsiveContainer width="99%" aspect={1}>
        <ScatterChart
          width={600}
          height={600}
          margin={{ bottom: 20 }}
          data={data}
        >
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis
            axisLine={true}
            pointsAtX
            type="number"
            dataKey="QALYs"
            // number 0.0 is in quotation marks to avoid displaying as "0" automatically
            //  ticks={[-1,-0.8,-0.6,-0.4,-0.2,"0.0",0.2,0.4,0.6,0.8,1]}
            tick={{ fontSize: "12" }}
            tickLine={true}
            tickCount={11}
            domain={[dataXMin, dataXMax]}
          >
            <Label
              value="Incremental QALYs"
              position="insideBottom"
              fontWeight={"bold"}
              fill="#000000"
              offset={-10}
            />
          </XAxis>
          <YAxis
            axisLine={true}
            type="number"
            dataKey="COST"
            //  ticks={[-5000,-4000,-3000,-2000,-1000,1000,2000,3000,4000,5000]}
            tick={{ fontSize: "12" }}
            tickLine={true}
            domain={[dataYMin, dataYMax]}
            allowDecimals={false}
            tickCount={11}
          >
            <Label
              value="Incremental Cost (GBP)"
              angle={-90}
              position="center"
              fontWeight={"bold"}
              fill="#000000"
              dx={-20}
            />
          </YAxis>
          {/* ZAxis range sets the size of the scatter*/}
          <ZAxis range={[20]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          {/* <Legend layout="centric" verticalAlign="middle" align="right" /> */}
          <Scatter
            name="PSA Scatter"
            data={data}
            stroke="#2F75B5"
            fillOpacity={0}
            fill="#2F75B5"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          {/* Reference Line is set at 0|0 and replicates the x and y axis */}
          <ReferenceLine y={0} stroke="black" strokeWidth={0.8} />
          <ReferenceLine x={0} stroke="black" strokeWidth={0.8} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// export default function ScatterPlot() {

//   return (
//     <div style={{textAlign:'center',  minWidth: "400px"}}>
//       <h1 style={{fontSize: '24px'}}>Scatter Plots </h1>
//       <ResponsiveContainer width="100%" aspect={1}>
//       <ScatterChart
//         width={500}
//         height={500}
//         data={data}

//       >
//         <CartesianGrid horizontal={false} vertical={false} />
//         <XAxis axisLine={false} pointsAtX type="number" dataKey="QALYs"
//        // number 0.0 is in quotation marks to avoid displaying as "0" automatically
//        ticks={[-1,-0.8,-0.6,-0.4,-0.2,"0.0",0.2,0.4,0.6,0.8,1]}
//        tick={{fontSize:"12", dy:-295}}
//        tickLine={false}>
//          <Label value="Incremental QALYs" position='insideBottom' fontWeight={"bold"} fill="#000000" offset={-10}/>
//         </XAxis>
//         <YAxis axisLine={false} type="number" dataKey="COST"
//        ticks={[-5000,-4000,-3000,-2000,-1000,1000,2000,3000,4000,5000]}
//        tick={{fontSize:"12", dx:290}} tickLine={false}>
//          <Label value="Incremental Cost (GBP)" angle={-90} position='center' fontWeight={"bold"} fill="#000000"/>
//         </YAxis>
//          {/* ZAxis range sets the size of the scatter*/}
//         <ZAxis range={[20]}/>
//         <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//         <Legend wrapperStyle={{bottom:150, left:280}}/>
//        <Scatter name="PSA Scatter" data={data}
//         stroke="#2F75B5" fillOpacity={0} fill="#2F75B5"/>
//         <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//         {/* Reference Line is set at 0|0 and replicates the x and y axis */}
//         <ReferenceLine y={0} stroke="black" strokeWidth={0.8} />
//         <ReferenceLine x={0} stroke="black" strokeWidth={0.8} />
//       </ScatterChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
