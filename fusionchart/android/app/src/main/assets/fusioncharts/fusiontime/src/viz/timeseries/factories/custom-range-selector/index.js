import{componentFactory,pluckNumber}from"@fusioncharts/core/src/lib";import CustomRangeSelector from"../../../../_internal/components/custom-range-selector";export default function(chart){var dataSource=chart.getFromEnv("dataSource"),extensions=dataSource.extensions||{},isEnabled=pluckNumber(extensions.customrangeselector&&extensions.customrangeselector.enabled,1);componentFactory(chart,CustomRangeSelector,"customRangeSelector",+isEnabled,[{domain:chart.getFocusLimit(),style:extensions.customrangeselector&&extensions.customrangeselector.style||{}}])}