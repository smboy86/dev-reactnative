import TC from"../time-converter";var DEFAULT_TIME_FORMAT_STRING="%a, %-d %b %Y, %H:%M:%S:%L";function parseDate(dateStr,format,enableUTC){var specifier,parsed;if(format){specifier=(typeof enableUTC!=="undefined"?enableUTC:false)?TC.utcParser(format):TC.parser(format);parsed=specifier.parse(dateStr);parsed=parsed&&parsed.getTime()}if(!parsed){parsed=(typeof enableUTC!=="undefined"?enableUTC:false)?+new Date(dateStr+"Z"):+new Date(dateStr)}if(!parsed)throw new Error("Incorrect string or format provided");return parsed}function formatDate(timestamp,_format,enableUTC){var specifier,formatted,format=_format;if(isNaN(parseInt(timestamp,10)))throw new Error("Timestamp must be a number: "+timestamp);if(!format){format=DEFAULT_TIME_FORMAT_STRING}specifier=(typeof enableUTC!=="undefined"?enableUTC:false)?TC.utcFormatter(format):TC.formatter(format);formatted=specifier.format(new Date(timestamp));if(!formatted)throw new Error("Incorrect format provided: "+format);return formatted}export{parseDate,formatDate};