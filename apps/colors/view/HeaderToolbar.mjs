import NumberField from '../../../node_modules/neo.mjs/src/form/field/Number.mjs';
import Toolbar     from '../../../node_modules/neo.mjs/src/toolbar/Base.mjs';

/**
 * @class Colors.view.HeaderToolbar
 * @extends Neo.toolbar.Base
 */
class HeaderToolbar extends Toolbar {
    static config = {
        /**
         * @member {String} className='Colors.view.HeaderToolbar'
         * @protected
         */
        className: 'Colors.view.HeaderToolbar',
        /**
         * @member {String[]} cls=['portal-header-toolbar']
         */
        cls: ['portal-header-toolbar'],
        /**
         * @member {Object[]} items
         */
        items: [{
            handler: 'onStartButtonClick',
            text   : 'Start'
        }, {
            handler: 'onStopButtonClick',
            text   : 'Stop'
        }, {
            module       : NumberField,
            bind         : {value: data => data.amountColors},
            clearable    : false,
            editable     : false,
            labelPosition: 'inline',
            labelText    : 'Amount Colors',
            listeners    : {change(data) {data.component.getModel().setData('amountColors', data.value)}},
            maxValue     : 10,
            minValue     : 3,
            width        : 120
        }, '->', {
            handler  : 'onDetachTableButtonClick',
            iconCls  : 'far fa-window-maximize',
            reference: 'detach-table-button',
            text     : 'Table'
        }, {
            handler  : 'onDetachPieChartButtonClick',
            iconCls  : 'far fa-window-maximize',
            reference: 'detach-pie-chart-button',
            text     : 'Pie Chart'
        }, {
            handler  : 'onDetachBarChartButtonClick',
            iconCls  : 'far fa-window-maximize',
            reference: 'detach-bar-chart-button',
            text     : 'Bar Chart'
        }]
    }
}

Neo.setupClass(HeaderToolbar);

export default HeaderToolbar;