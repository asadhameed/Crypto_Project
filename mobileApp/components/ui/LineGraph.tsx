import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

import Colors from "../../constant/Colors";

const { width: SIZE } = Dimensions.get("window");

type Props = {
  historyData: any;
  range: Number;
};

const LineGraph: React.FC<Props> = ({ historyData, range }: Props) => {
  const points = monotoneCubicInterpolation({ data: historyData, range });
  return (
    <ChartPathProvider data={{ points: points, smoothingStrategy: "bezier" }}>
      <View style={styles.chartLineWrapper}>
        <ChartPath
          height={SIZE}
          stroke={Colors.graphStrokeColor}
          width={SIZE}
        />
        <ChartDot style={{ backgroundColor: Colors.graphBackgroundColor }} />
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default LineGraph;
