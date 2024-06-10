import ColorModel from '../model/Color.mjs';
import Store      from '../../../node_modules/neo.mjs/src/data/Store.mjs';

/**
 * @class Colors.store.Colors
 * @extends Neo.data.Store
 */
class Colors extends Store {
    static config = {
        /**
         * @member {String} className='Colors.store.Colors'
         * @protected
         */
        className: 'Colors.store.Colors',
        /**
         * @member {Neo.data.Model} model=ColorModel
         */
        model: ColorModel
    }
}

Neo.setupClass(Colors);

export default Colors;
