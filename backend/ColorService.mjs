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
     * @returns {Object[]}
     */
    generateData() {
        let me   = this,
            data = [],
            i    = 0,
            len  = 20;

        for (; i < len; i++) {
            data.push({
                id     : `row${i + 1}`,
                columnA: me.getRandomInteger(),
                columnB: me.getRandomInteger(),
                columnC: me.getRandomInteger(),
                columnD: me.getRandomInteger(),
                columnE: me.getRandomInteger(),
                columnF: me.getRandomInteger(),
                columnG: me.getRandomInteger(),
                columnH: me.getRandomInteger(),
                columnI: me.getRandomInteger(),
                columnJ: me.getRandomInteger()
            })
        }

        return data
    }

    /**
     * @param {Object} data
     * @returns {Object[]}
     */
    generateSummaryData(data) {
        let startCharCode = 'A'.charCodeAt(0),
            colorSummary  = {
                colorA: 0,
                colorB: 0,
                colorC: 0,
                colorD: 0,
                colorE: 0
            },
            chartData;

        data.forEach(item => {
            Object.entries(item).forEach(([key, value]) => {
                if (key !== 'id') {
                    colorSummary['color' + String.fromCharCode(startCharCode + value - 1)]++
                }
            })
        });

        return [
            {color: '#247acb', count: colorSummary['colorA']},
            {color: '#4493de', count: colorSummary['colorB']},
            {color: '#6face6', count: colorSummary['colorC']},
            {color: '#9bc5ed', count: colorSummary['colorD']},
            {color: '#c6def5', count: colorSummary['colorE']}
        ]
    }

    /**
     * @returns {Number}
     */
    getRandomInteger() {
        return Math.floor(Math.random() * 5) + 1
    }

    /**
     * @param {Object} opts
     * @returns {Object}
     */
    read(opts) {
        let data = this.generateData();

        return {
            success: true,
            data: {
                summaryData: this.generateSummaryData(data),
                tableData  : data
            }
        }
    }

    /**
     * todo
     * @returns {Object}
     */
    update() {
        return {success: false};
    }
}

let instance = Neo.setupClass(ColorService);

export default instance;
