import Component from '../../../node_modules/neo.mjs/src/controller/Component.mjs';

/**
 * @class Colors.view.ViewportController
 * @extends Neo.controller.Component
 */
class ViewportController extends Component {
    static config = {
        /**
         * @member {String} className='Colors.view.ViewportController'
         * @protected
         */
        className: 'Colors.view.ViewportController'
    }

    /**
     * @member {String[]} connectedApps=[]
     */
    connectedApps = []
    /**
     * @member {Number|null} intervalId
     */
    intervalId = null
    /**
     * @member {Object} widgetIndexMap
     */
    widgetIndexMap = {
        'bar-chart': 3,
        'pie-chart': 2,
        table      : 1
    }

    /**
     * @param {String} name The name of the reference
     */
    async createPopupWindow(name) {
        let me                         = this,
            widget                     = me.getReference(name),
            winData                    = await Neo.Main.getWindowData(),
            rect                       = await me.component.getDomRect(widget.vdom.id), // using the vdom id to always get the top-level node
            {height, left, top, width} = rect;

        height -= 50; // popup header in Chrome
        left   += winData.screenLeft;
        top    += (winData.outerHeight - winData.innerHeight + winData.screenTop);

        Neo.Main.windowOpen({
            url           : `./childapps/widget/index.html?name=${name}`,
            windowFeatures: `height=${height},left=${left},top=${top},width=${width}`,
            windowName    : name
        })
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     * @param {Number} data.windowId
     */
    async onAppConnect(data) {
        if (data.appName !== 'Colors') {
            let me           = this,
                app          = Neo.apps[data.appName],
                mainView     = app.mainView,
                {windowId}   = data,
                url          = await Neo.Main.getByPath({path: 'document.URL', windowId}),
                widgetName   = new URL(url).searchParams.get('name'),
                widget       = me.getReference(widgetName),
                widgetParent = widget.up();

            me.connectedApps.push(widgetName);

            widgetParent.remove(widget, false);
            mainView.add(widget)
        }
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     * @param {Number} data.windowId
     */
    async onAppDisconnect(data) {
        let me                  = this,
            {appName, windowId} = data,
            url                 = await Neo.Main.getByPath({path: 'document.URL', windowId}),
            widgetName          = new URL(url).searchParams.get('name'),
            widget              = me.getReference(widgetName),
            widgetParent        = widget.up();

        // Closing a code preview window needs to drop the preview back into the related main app
        if (appName !== 'Colors') {
            widgetParent.remove(widget, false);
            me.component.insert(me.widgetIndexMap[widgetName], widget);

            me.getReference(`detach-${widgetName}-button`).disabled = false
        }
        // Close popup windows when closing or reloading the main window
        else {
            Neo.Main.windowClose({names: me.connectedApps, windowId})
        }
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.currentWorker.on({
            connect   : me.onAppConnect,
            disconnect: me.onAppDisconnect,
            scope     : me
        })
    }

    /**
     *
     */
    onComponentConstructed() {
        super.onComponentConstructed();

        let me    = this,
            model = me.getModel();

        Colors.backend.ColorService.read({
            amountColors : model.getData('amountColors'),
            amountColumns: model.getData('amountColumns'),
            amountRows   : model.getData('amountRows')
        }).then(response => {
            let {data} = response;

            me.getStore('colors').data = data.tableData;
            me.updateCharts(data.summaryData)
        })
    }

    /**
     * @param {Object} data
     */
    async onDetachBarChartButtonClick(data) {
        data.component.disabled = true;
        await this.createPopupWindow('bar-chart')
    }

    /**
     * @param {Object} data
     */
    async onDetachPieChartButtonClick(data) {
        data.component.disabled = true;
        await this.createPopupWindow('pie-chart')
    }

    /**
     * @param {Object} data
     */
    async onDetachTableButtonClick(data) {
        data.component.disabled = true;
        await this.createPopupWindow('table')
    }

    /**
     * @param {Object} data
     */
    onStopButtonClick(data) {
        let me = this;

        if (me.intervalId) {
            clearInterval(me.intervalId);
            me.intervalId = null
        }
    }

    /**
     * @param {Object} data
     */
    onStartButtonClick(data) {
        let me           = this,
            intervalTime = 1000 / 60, // assuming 60 FPS
            model        = me.getModel(),
            table        = me.getReference('table');

        if (!me.intervalId) {
            me.intervalId = setInterval(() => {
                Colors.backend.ColorService.read({
                    amountColors : model.getData('amountColors'),
                    amountColumns: model.getData('amountColumns'),
                    amountRows   : model.getData('amountRows')
                }).then(response => {
                    let {data} = response;

                    table.bulkUpdateRecords(data.tableData);
                    me.updateCharts(data.summaryData)
                })
            }, intervalTime)
        }
    }

    /**
     * @param {Object} data
     */
    updateCharts(data) {
        this.getReference('bar-chart').chartData = data;
        this.getReference('pie-chart').chartData = data
    }
}

Neo.setupClass(ViewportController);

export default ViewportController;
