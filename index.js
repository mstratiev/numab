module.exports = (function() {

    var DEFAULT_SEPARATOR = '.';

    function NumabInstance(conf) {
        var configuration = {
            separator: undefined
        };

        configure(conf);

        /**
         * Converts a string representation of a number.
         * e.g. 2,3k to a number value 2300.
         * @param {string} str 
         * @return {number}
         */
        function parse(str) {
            if (typeof(str) != 'string') {
                str = str + '';
            }

            // prepare and clean the string
            var parsingString = str.toUpperCase().trim();

            if (parsingString == '') {
                // returns NaN if string is empty or was composed only of spaces
                return NaN;
            }
            var millions, thousands;
            var results = 0;

            // preparse
            switch (true) {
                case (parsingString.indexOf('M') > -1):
                    millions = true;
                    break;
                case (parsingString.indexOf('K') > -1):
                    thousands = true;
                    break;
            }

            // replace separator with new custom one
            if (configuration.separator) {
                if (parsingString.indexOf(DEFAULT_SEPARATOR) > -1 &&
                    parsingString.indexOf(configuration.separator) < 0) {
                    return NaN;
                }
                parsingString = parsingString.replace(configuration.separator, DEFAULT_SEPARATOR);
            }

            // parse string number
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
         * Configures the Numab instance.
         * Accepts options object { separator : {string} }.
         * @param {any} conf Configuration object for the numab.
         */
        function configure(conf) {
            if (conf) {
                configuration.separator = conf.separator;
            }
        };

        /**
         * Creates a separate instance of Numab.
         * @param {*} conf configuration options to pass to the new instance.
         */
        function createInstance(conf) {
            return new NumabInstance(conf);
        }

        return {
            createInstance: createInstance,
            parse: parse,
            config: configure
        };
    }

    return new NumabInstance();
})();