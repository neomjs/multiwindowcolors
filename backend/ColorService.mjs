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
     * todo
     * @returns {Object}
     */
    create() {
        return {success: false}
    }

    /**
     * todo
     * @returns {Object}
     */
    destroy() {
        return {success: false}
    }

    /**
     * @param {Object} opts
     * @returns {Object[]}
     */
    generateData(opts) {
        let me             = this,
            {amountColors} = opts,
            data           = [],
            i              = 0,
            len            = 20;

        for (; i < len; i++) {
            data.push({
                id     : `row${i + 1}`,
                columnA: me.getRandomInteger(amountColors),
                columnB: me.getRandomInteger(amountColors),
                columnC: me.getRandomInteger(amountColors),
                columnD: me.getRandomInteger(amountColors),
                columnE: me.getRandomInteger(amountColors),
                columnF: me.getRandomInteger(amountColors),
                columnG: me.getRandomInteger(amountColors),
                columnH: me.getRandomInteger(amountColors),
                columnI: me.getRandomInteger(amountColors),
                columnJ: me.getRandomInteger(amountColors)
            })
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

        console.log(colorSummary);

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

    /**
     * todo
     * @returns {Object}
     */
    update() {
        return {success: false}
    }
}

let instance = Neo.setupClass(ColorService);

export default instance;
