import React from 'react';
import {View} from 'react-native';
import {AreaChart, Grid} from 'react-native-svg-charts';
import {Circle, Path} from 'react-native-svg';

class DecoratorExample extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    const Decorator = ({x, y, data}) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
    };

    const Line = ({line}) => (
      <Path d={line} stroke={'rgba(134, 65, 244)'} fill={'none'} />
    );

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <AreaChart
          style={{height: 200}}
          data={data}
          contentInset={{top: 20, bottom: 30}}>
          <Grid />
          <Line />
          <Decorator />
        </AreaChart>
      </View>
    );
  }
}

export default DecoratorExample;
