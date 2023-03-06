import React from "react";
// import {
//   Chart,
//   CommonSeriesSettings,
//   Legend,
//   SeriesTemplate,
//   Animation,
//   ValueAxis,
//   Tooltip,
//   Size,
//   AxisTitle,
//   Label,
//   Format,
//   AdaptiveLayout,
// } from "devextreme-react/chart";
import {
  LineChart,
  CartesianGrid,
  CartesianAxis,
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  
} from "recharts";
import data from "../json/tornado-data.json";

//palette specifies the colors for the chart
var palette = ["#2F75B5", "#EC7D31"];
const labels = ["Hospitalisation", "NeuroResponse"];
const sortedData = data.sort((a, b) => a.category.localeCompare(b.category));

class Tornado extends React.Component {
  //Defines the min and max of the axis
  visualRange = [0, 3500];

  

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "24px" }}>Tornado diagram (ICER)</h3>
        <ResponsiveContainer width="99%" aspect={1}>
        <BarChart width={730} height={500} data={sortedData} layout="vertical">
  <CartesianGrid strokeDasharray="3 3" />
  <YAxis dataKey="yAxisLabel" type="category" />
  <XAxis type="number" domain={[-3000, 3000]} baseValue={1800} />
  <Tooltip />
  <Legend />
  <Bar dataKey="start" fill="#8884d8" baseValue={1800}/>
  <Bar dataKey="end" fill="#82ca9d" />
</BarChart>
</ResponsiveContainer>
        {/* <Chart
          id="chart"
          dataSource={data}
          barGroupPadding={0.2}
          rotated={true}
          palette={palette}
        >
          <AdaptiveLayout width={400} height={400} />
          <Size 
          height={700} 
          />
          {/* The tornado diagram is created as a bar range chart, 
          the following takes the defined ranges from the json file */}
          {/* <CommonSeriesSettings
            type="rangeBar"
            format="currency"
            argumentField="yAxisLabel"
            rangeValue1Field="start"
            rangeValue2Field="end"
            barOverlapGroup="yAxisLabel"
          ></CommonSeriesSettings>

          <Legend
            position="inside"
            verticalAlignment="bottom"
            horizontalAlignment="right"
          ></Legend>

          <ValueAxis
            //Sets the axis range from 0,3500 (visualRange)
            defaultVisualRange={this.visualRange}
            tickInterval={500}
          > */}
            {/* <AxisTitle text={"ICER"} width={100} />
            <Label>
              <Format type="currency" currency={"GBP"} />
            </Label>
          </ValueAxis>

          <Tooltip enabled={true} />

          <SeriesTemplate nameField="category" />
          <Animation enabled={false} /> */}
        {/* </Chart>  */}
      </div>
    );
  }
}

export default Tornado;
