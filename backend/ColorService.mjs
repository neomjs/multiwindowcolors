import Base from 'neo.mjs/src/core/Base.mjs';

/**
 * @class Colors.backend.ColorService
 * @extends Neo.core.Base
 * @singleton
 */
class ColorService extends Base {
    static config = {
        /**
         * @member {String} className='Colors.backend.ColorService'
         * @protected
         */
        className: 'Colors.backend.ColorService',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    /**
     * @member {String[]} colorsMap
     */
    colorsMap = [
        '#1c60a0',
        '#206db6',
        '#247acb',
        '#2e87da',
        '#4493de',
        '#59a0e2',
        '#6face6',
        '#85b9ea',
        '#9bc5ed',
        '#b0d2f1'
    ]

    /**
     * @param {Object} opts
     * @param {Number} opts.amountColors
     * @param {Number} opts.amountColumns
     * @param {Number} opts.amountRows
     * @returns {Object[]}
     */
    generateData(opts) {
        let me             = this,
            {amountColors} = opts,
            data           = [],
            i              = 0,
            startCharCode  = 'A'.charCodeAt(0),
            j, record;

        for (; i < opts.amountRows; i++) {
            record = {id: `row${i + 1}`};

            for (j=0; j < opts.amountColumns; j++) {
                record['column' + String.fromCharCode(startCharCode + j)] = me.getRandomInteger(amountColors)
            }

            data.push(record)
        }

        return data
    }

    /**
     * @param {Object} data
     * @param {Object} opts
     * @returns {Object[]}
     */
    generateSummaryData(data, opts) {
        let {amountColors} = opts,
            colorSummary   = {},
            returnData     = [],
            i              = 0;

        for (; i < amountColors; i++) {
            colorSummary['color' + i] = 0
        }

        data.forEach(item => {
            Object.entries(item).forEach(([key, value]) => {
                if (key !== 'id') {
                    colorSummary['color' + (value - 1)]++
                }
            })
        });

        for (i=0; i < amountColors; i++) {
            returnData.push({color: this.colorsMap[i], count: colorSummary['color' + i]})
        }

        return returnData
    }

    /**
     * @param {Number} maxValue
     * @returns {Number}
     */
    getRandomInteger(maxValue) {
        return Math.floor(Math.random() * maxValue) + 1
    }

    /**
     * @param {Object} opts
     * @param {Number} opts.amountColors
     * @param {Number} opts.amountColumns
     * @param {Number} opts.amountRows
     * @returns {Object}
     */
    read(opts) {
        let data = this.generateData(opts);

        return {
            success: true,

            data: {
                summaryData: this.generateSummaryData(data, opts),
                tableData  : data
            }
        }
    }
}

let instance = Neo.setupClass(ColorService);

export default instance;
