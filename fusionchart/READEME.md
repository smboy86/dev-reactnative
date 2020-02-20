# 2. react-native-fusioncharts

ref. [https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native](https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native)

소스 샘플 ref. [https://github.com/fusioncharts/react-native-fusioncharts-samples](https://github.com/fusioncharts/react-native-fusioncharts-samples)

차트 종류 (official site)
ref. [https://www.fusioncharts.com/dev/chart-attributes/](https://www.fusioncharts.com/dev/chart-attributes/)

## 2.1 설치방법

### 2.1.1  라이브러리 설치

    $ yarn add react-native-webview react-native-fusioncharts fusioncharts

### 2.1.2 asset 복사

설치한 라이브러리에서 에셋을 복사해와야 한다.

1. 복사할 위치 (from)

        ~\node_modules\@fusioncharts

2. 복사한 위치 (to)

        ~\android\app\src\main\assets\fusioncharts (폴더생성)

3. 복사한 폴더내에 pakage.json 삭제 (몽땅인지는 확인중)

        1. ~\android\app\src\main\assets\fusioncharts\chart\~~pakage.json~~ 삭제

### 2.1.3 html 파일 생성 (2군데 복사)

    # IOS
    경로 - (편한곳) 소스코드에서 libpath 를 지정함
    ~\src\assets\fusioncharts.html
    
    # Android
    ~\android\app\src\main\assets\fusioncharts.html

[fusioncharts.html](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/31b8a101-5253-4dde-a4e1-faab5b23a691/fusioncharts.html)

### 2.1.4 pakage.json 스크립트 등록 (2줄 삽입)

    "scripts": {
        ......
        "clean:build:android": "rm -rf android/app/build",
        "prod:android": "npm run clean:build:android  && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
    },

### 2.1.5 스크립트 실행 (assets을 빌드하는건가?)

    $ npm run prod:android

## 2.2 구현 예제

> app.js 에 그냥 통으로 복사 붙여넣기 하면됨

    import React, { Component } from "react";
    import { Platform, StyleSheet, Text, View } from "react-native";
    import FusionCharts from "react-native-fusioncharts";
    export default class PlainColumn2D extends Component {
      constructor(props) {
        super(props);
        //STEP 2 - Chart Data
        const chartData = [
          { label: "Venezuela", value: "290" },
          { label: "Saudi", value: "260" },
          { label: "Canada", value: "180" },
          { label: "Iran", value: "140" },
          { label: "Russia", value: "115" },
          { label: "UAE", value: "100" },
          { label: "US", value: "30" },
          { label: "China", value: "30" }
        ];
        //STEP 3 - Chart Configurations
        const chartConfig = {
          type: "column2d",
          width: "100%",
          height: "400",
          dataFormat: "json",
          dataSource: {
            chart: {
              caption: "Countries With Most Oil Reserves [2017-18]",
              subCaption: "In MMbbl = One Million barrels",
              xAxisName: "Country",
              yAxisName: "Reserves (MMbbl)",
              numberSuffix: "K",
              theme: "fusion"
            },
            data: chartData
          }
        };
        this.state = chartConfig;
        this.libraryPath = Platform.select({
          // Specify fusioncharts.html file location
          android: {
            uri: "file:///android_asset/fusioncharts.html"
          },
          ios: require("./assets/fusioncharts.html")
        });
      }
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>A Column 2D Chart</Text>
    
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
    
        padding: 10
      },
    
      header: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 10
      },
    
      chartContainer: {
        height: 400,
        borderColor: "#000",
        borderWidth: 1
      }
    });

## 2.3 다양한 템플릿

[https://www.fusioncharts.com/dev/chart-attributes/](https://www.fusioncharts.com/dev/chart-attributes/)

1. 이곳에서 JavaScript alias: area2d  << 이것과
2. json 데이터를 소스에 붙여 넣으면 손쉽게 구현 가능 

### 2.4 에러내용

1. 에러

        {description: "net::ERR_FILE_NOT_FOUND", code: -1, canGoForward: false, canGoBack: false, title: "웹페이지를 사용할 수 없음", …}
        	description: "net::ERR_FILE_NOT_FOUND"
        	code: -1
        	canGoForward: false
        	canGoBack: false
        	title: "웹페이지를 사용할 수 없음"
        	loading: false
        	url: "file:///android_asset/fusioncharts.html"
        	target: 7
        	__proto__: Object