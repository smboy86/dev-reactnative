import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Platform} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'scrollline2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: "Harry's SuperMart",
          subCaption: 'Top 5 stores in last month by revenue',
          numberprefix: '$',
          theme: 'fint',
          flatScrollBars: '1',
          scrollheight: '10',
          numVisiblePlot: '5',
        },
        categories: [
          {
            category: [
              {
                label: '2019.05.07',
              },
              {
                label: '2019.05.03',
              },
              {
                label: '2019.03.01',
              },
              {
                label: '2019.02.22',
              },
              {
                label: '2019.02.15',
              },
              {
                label: '2019.02.01',
              },
              {
                label: '2019.01.31',
              },
            ],
          },
        ],
        dataset: [
          {
            data: [
              {
                value: '27400',
              },
              {
                value: '29800',
              },
              {
                value: '25800',
              },
              {
                value: '26800',
              },
              {
                value: '29600',
              },
              {
                value: '32600',
              },
              {
                value: '31800',
              },
            ],
          },
        ],
      },
    };

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: {uri: 'file:///android_asset/fusioncharts.html'},
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    height: 400,
  },
});
