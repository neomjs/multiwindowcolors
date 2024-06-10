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
     * @param {Object} opts
     * @returns {Object}
     */
    read(opts) {
        return {success: true, data: [1, 2, 3]}
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
