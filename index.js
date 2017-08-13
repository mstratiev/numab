module.exports = (function() {

    var DEFAULT_SEPARATOR = '.';

    var configuration = {
        separator: DEFAULT_SEPARATOR
    };

    /**
     * Converts a string representation of a number e.g. 2,3k to a number value 2300.
     * @param {string} str 
     * @return {number}
     */
    var parse = function(str) {
        if (typeof(str) != 'string') {
            str = str + '';
        }
        var millions, thousands;
        var parsingString = str.toUpperCase().trim();
        var results = 0;

        // SWITCH FOR PARSING
        switch (true) {
            case (parsingString.indexOf('M') > -1):
                millions = true;
                break;
            case (parsingString.indexOf('K') > -1):
                thousands = true;
                break;
        }

        // replace separator with new custom one
        if (configuration.separator !== DEFAULT_SEPARATOR) {
            parsingString = parsingString.replace(configuration.separator, DEFAULT_SEPARATOR);
        }

        // PARSE STRING NUMBER
        var tempArr;
        if (millions) {
            tempArr = parsingString.split('M');
            results = tempArr[0] * 1000000;
        } else if (thousands) {
            tempArr = parsingString.split('K');
            results = tempArr[0] * 1000;
        } else {
            results = str * 1;
        }
        return results;
    };

    /**
     * Accepts options object { separator : {string} }.
     * @param {any} options Configuration object for the numab.
     */
    var configure = function(conf) {
        if (conf && conf.separator) {
            configuration.separator = conf.separator;
        }
    };

    return {
        parse: parse,
        config: configure
    };
})();