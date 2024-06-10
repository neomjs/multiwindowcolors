import Model from '../../../node_modules/neo.mjs/src/data/Model.mjs';

/**
 * @class Colors.model.Color
 * @extends Neo.data.Model
 */
class Color extends Model {
    static config = {
        /**
         * @member {String} className='Colors.model.Color'
         * @protected
         */
        className: 'Colors.model.Color',
        /**
         * @member {Object[]} fields
         */
        fields: [{
            name: 'id',
            type: 'String'
        }, {
            name: 'index',
            type: 'Integer'
        }, {
            name: 'columnA',
            type: 'String'
        }, {
            name: 'columnB',
            type: 'String'
        }, {
            name: 'columnC',
            type: 'String'
        }, {
            name: 'columnD',
            type: 'String'
        }, {
            name: 'columnE',
            type: 'String'
        }, {
            name: 'columnF',
            type: 'String'
        }, {
            name: 'columnG',
            type: 'String'
        }, {
            name: 'columnH',
            type: 'String'
        }, {
            name: 'columnI',
            type: 'String'
        }, {
            name: 'columnJ',
            type: 'String'
        }]
    }
}

Neo.setupClass(Color);

export default Color;
