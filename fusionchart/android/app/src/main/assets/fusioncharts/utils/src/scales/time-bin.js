import _inheritsLoose from"@babel/runtime/helpers/inheritsLoose";import{timeMillisecond,timeSecond,timeMinute,timeHour,timeDay,timeWeek,timeMonth,timeYear}from"../time-intervals";import ScaleCalendarBin,{copyScaleBin}from"./calendar-bin";import{TIME_SPAN}from"../defaults/time";var ScaleTimeBin=function(_ScaleCalendarBin){_inheritsLoose(ScaleTimeBin,_ScaleCalendarBin);function ScaleTimeBin(){var _this;_this=_ScaleCalendarBin.call(this,timeYear,timeMonth,timeWeek,timeDay,timeHour,timeMinute,timeSecond,timeMillisecond)||this;_this.setTimeFormat();_this.setDomain([].concat(TIME_SPAN));return _this}var _proto=ScaleTimeBin.prototype;_proto.getType=function getType(){return""};_proto.setTimeFormat=function setTimeFormat(format){if(format===void 0){format={}}var localeConverter=this._localeConverter,_format=format,millisecond=_format.millisecond,second=_format.second,minute=_format.minute,hour=_format.hour,day=_format.day,month=_format.month,year=_format.year;this.formatters={millisecond:{major:localeConverter.formatter(millisecond||"%I:%M:%S.%L %p"),minor:localeConverter.formatter(millisecond||"%L ms"),context:localeConverter.formatter(millisecond||"%b %d, %Y, %I:%M:%S.%L %p")},second:{major:localeConverter.formatter(second||"%I:%M:%S %p"),minor:localeConverter.formatter(second||"%S s"),context:localeConverter.formatter(second||"%b %d, %Y, %I:%M:%S %p")},minute:{major:localeConverter.formatter(minute||"%I:%M %p"),minor:localeConverter.formatter(minute||"%M m"),context:localeConverter.formatter(minute||"%b %d, %Y, %I:%M %p")},hour:{major:localeConverter.formatter(hour||"%I %p"),minor:localeConverter.formatter(hour||"%I %p"),context:localeConverter.formatter(hour||"%b %d, %Y, %I %p")},day:{major:localeConverter.formatter(day||"%b %d"),minor:localeConverter.formatter(day||"%d"),context:localeConverter.formatter(day||"%b %d, %Y")},month:{major:localeConverter.formatter(month||"%b"),minor:localeConverter.formatter(month||"%b"),context:localeConverter.formatter(month||"%b %Y")},year:{major:localeConverter.formatter(year||"%Y"),minor:localeConverter.formatter(year||"%Y"),context:localeConverter.formatter(year||"%Y")}}};_proto.tickFormat=function tickFormat(specifier){var _this2=this;return specifier?function(d){return _this2._localeConverter.formatter(specifier).format(d)}:function(d,type,tickType){if(_this2._timeFormat[type]){return _this2._localeConverter.formatter(_this2._timeFormat[type]).format(d)}return _this2.formatters[type][tickType].format(d)}};_proto.copy=function copy(){return copyScaleBin(this,new ScaleTimeBin)};return ScaleTimeBin}(ScaleCalendarBin);export default ScaleTimeBin;