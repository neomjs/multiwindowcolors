import Component   from '../../../node_modules/neo.mjs/src/model/Component.mjs';
import ColorsStore from '../store/Colors.mjs';

/**
 * @class Colors.view.ViewportModel
 * @extends Neo.model.Component
 */
class ViewportModel extends Component {
    static config = {
        /**
         * @member {String} className='Colors.view.ViewportModel'
         * @protected
         */
        className: 'Colors.view.ViewportModel',
        /**
         * @member {Object} data
         */
        data: {
            /**
             * @member {Number} data.amountColors=7
             */
            amountColors: 7,
            /**
             * @member {Number} data.amountColumns=10
             */
            amountColumns: 10
        },
        /**
         * @member {Object} stores
         */
        stores: {
            colors: {
                module: ColorsStore
            }
        }
    }
}

Neo.setupClass(ViewportModel);

export default ViewportModel;
