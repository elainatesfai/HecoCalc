import React from "react";
import {
  Chart,
  CommonSeriesSettings,
  Legend,
  SeriesTemplate,
  Animation,
  ValueAxis,
  Tooltip,
  Size,
  AxisTitle,
  Label,
  Format,
  AdaptiveLayout,
  ResponsiveBox
} from "devextreme-react/chart";
import data from "../json/tornado-data.json";

//palette specifies the colors for the chart
var palette = ["#2F75B5", "#EC7D31"];

class Tornado extends React.Component {
  //Defines the min and max of the axis
  // visualRange = [0, 3500];

  render() {
    return (
      <div style={{ textAlign: "center"}}>
        <h3 style={{ fontSize: "24px" }}>Tornado diagram (ICER)</h3>
        {/* <ResponsiveBox aspectRatio={1} style={{ width: '100%' }}> */}
        <Chart
          id="chart"
          dataSource={data}
          barGroupPadding={0.2}
          rotated={true}
          palette={palette}
          style={{ height: '100%', width: '100%' }}
        >
          <AdaptiveLayout width={200} height={200} /> 
          <Size height= {this.props.chartHeight}
          width={this.props.chartWidth} />
          {/* The tornado diagram is created as a bar range chart, 
          the following takes the defined ranges from the json file */}
          <CommonSeriesSettings
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
            backgroundColor={"transparent"}
          ></Legend>

          <ValueAxis
            //Sets the axis range from 0,3500 (visualRange)
            // defaultVisualRange={this.visualRange}
            tickInterval={500}
          >
            <AxisTitle text={"ICER"} width={100} />
            <Label>
              <Format type="currency" currency={"GBP"} />
            </Label>
          </ValueAxis>

          <Tooltip enabled={true} />

          <SeriesTemplate nameField="category" />
          <Animation enabled={false} />
        </Chart>
        {/* </ResponsiveBox> */}
      </div>
    );
  }
}

export default Tornado;
