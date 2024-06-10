import Base from '../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class Colors.view.HeaderToolbar
 * @extends Neo.container.Base
 */
class HeaderToolbar extends Base {
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
