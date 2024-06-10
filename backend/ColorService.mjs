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
        return {success: true, data: this.generateData()}
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
