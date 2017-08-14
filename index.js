module.exports = (function() {

    var DEFAULT_SEPARATOR = '.';
    var DEFAULT_DELIMINER = ',';
    var DEFAULT_THOUSANDS = 'K';
    var DEFAULT_MILLIONS = 'M';

    function NumabInstance(conf) {
        var configuration = {
            separator: undefined,
            isCaseSensitive: false,
            symbols: {
                thousands: undefined,
                millions: undefined
            }
        };

        configure(conf);

        /**
         * Converts a string representation of a number.
         * e.g. 2.3k to a number value 2300
         * @param {string} str 
         * @return {number}
         */
        function parse(str) {
            if (typeof(str) != 'string') {
                str = str + '';
            }

            // prepare and clean the string
            var parsingString = str.trim();
            if (!configuration.isCaseSensitive) {
                parsingString = parsingString.toUpperCase();
            }

            if (parsingString == '') {
                // returns NaN if string is empty or was composed only of spaces
                return NaN;
            }
            var millions, thousands;
            var results = 0;

            // replace separator with new custom one
            if (configuration.separator) {
                if (parsingString.indexOf(DEFAULT_SEPARATOR) > -1 &&
                    parsingString.indexOf(configuration.separator) < 0) {
                    return NaN;
                }
                parsingString = parsingString.replace(configuration.separator, DEFAULT_SEPARATOR);
            }

            if (configuration.symbols.millions) {
                parsingString = parsingString.replace(configuration.symbols.millions, DEFAULT_MILLIONS);
            }

            if (configuration.symbols.thousands) {
                parsingString = parsingString.replace(configuration.symbols.thousands, DEFAULT_THOUSANDS);
            }

            // preparse
            switch (true) {
                case (parsingString.indexOf(DEFAULT_MILLIONS) > -1):
                    millions = true;
                    break;
                case (parsingString.indexOf(DEFAULT_THOUSANDS) > -1):
                    thousands = true;
                    break;
            }

            // parse string number
            var tempArr;
            if (millions) {
                tempArr = parsingString.split(DEFAULT_MILLIONS);
                results = tempArr[0] * 1000000;
            } else if (thousands) {
                tempArr = parsingString.split(DEFAULT_THOUSANDS);
                results = tempArr[0] * 1000;
            } else {
                results = str * 1;
            }
            return results;
        }

        /**
         * Converts a "humanized" string representation of number to machine-readable number.
         * e.g. "1.000" or "1,000" to a number value 1000
         * @param {string} str The string that is to be parsed.
         */
        function dehumanize(str) {
            var strArr = str.split(configuration.separator ? configuration.separator : DEFAULT_SEPARATOR);
            var number = strArr[0] ? strArr[0].split(configuration.delimiter ? configuration.delimiter : DEFAULT_DELIMINER).join('') * 1 : 0;
            var decimal = strArr[1] ? strArr[1] * 1 / (strArr[1].length * 10) : 0;
            return number + decimal;
        }

        /**
         * Configures the Numab instance.
         * Accepts options object { separator : {string} }.
         * @param {any} conf Configuration object for the numab.
         */
        function configure(conf) {
            if (!conf) return;
            if (conf.separator) {
                configuration.separator = conf.separator;
            }
            if (conf.symbols && !conf.isCaseSensitive) {
                if (conf.symbols.thousands) {
                    configuration.symbols.thousands = conf.symbols.thousands.toUpperCase();
                }
                if (conf.symbols.millions) {
                    configuration.symbols.millions = conf.symbols.millions.toUpperCase();
                }
            } else if (conf.symbols && conf.isCaseSensitive) {
                configuration.isCaseSensitive = conf.isCaseSensitive;
                if (conf.symbols.thousands) {
                    configuration.symbols.thousands = conf.symbols.thousands;
                }
                if (conf.symbols.millions) {
                    configuration.symbols.millions = conf.symbols.millions;
                }
            }
        }

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
            dehumanize: dehumanize,
            config: configure
        };
    }

    return new NumabInstance();
})();


a = module.exports.parse('   ');

console.log(a)