'use strict';

define(function(require, exports, module) {
    var get_xy = function() {
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return {
            width: w,
            height: h
        }
    }

    var $ = require('jquery');
    var tabs = require('common/ui/tabs/tabs');

    var _init_components = function() {
        /*初始化local large storage*/
        var store_size = 36 * 1024 * 1024;
        
        window.LLS_NAME = 'LLS_ERP';
        window.LLS = new LargeLocalStorage({size: store_size, name: window.LLS_NAME});

        return window.LLS.initialized.then(function(alloc_size) {
            
            if (alloc_size != -1 && alloc_size != store_size) {
                console.log('LLS failed to alloc capacity');
            }

            console.log(window.LLS);
        });
    };

    var _init_ui = function() {
        /*init tabs*/
        var _tabs = new tabs({}, [
            {cls: 'dashboard', icon_class: 'icon-shouyefill', val: '首页', id: 'dashboard', delable: false, active: true, path: './include/dashboard.html'},
            {icon_class: 'icon-shangpin', val: '商品管理', id: 'goods', delable: true, active: false},
            {icon_class: 'icon-dingdan', val: '订单管理', id: 'trade', delable: true, active: false, path: './include/order.html'},
            {icon_class: 'icon-purchase', val: '采购管理', id: 'purchase', delable: true, active: false},
            {icon_class: 'icon-18', val: '设置', id: 'setting', delable: true, active: false},
            {icon_class: 'icon-iconfontcangkukucun', val: '库存管理', id: 'stock', delable: true, active: false},
            {icon_class: 'icon-shouhouwuyou', val: '售后管理', id: 'service', delable: true, active: false}
        ]);
    };

    var init = function() {
        _init_components().then(function() {
            _init_ui();
        });
    };

    init();
});
