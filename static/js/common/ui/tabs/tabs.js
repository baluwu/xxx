'use strict';

define(function(require, exports, module) {
    var $ = require('jquery');
    var locStore = require('lib/store/local-storage');
 
    /* 构造函数
     * @param data 
     * [{ 
     *      path: 'xxx', 点击访问路径
     *      icon_class: 'xxx', 图标
     *      val: 'xxx', 值
     *      id: 'xxx', id唯一 防重
     *      delable: false, 是否可删除
     *      active: true, 激活
     *      cls: 'xxxx' 类名 可自定义样式
     * }]
     */
    function tabs(cfg, data) {

        var dft_cfg = {
            /*tab上限*/
            max_tab: 10,
            /*tab容器*/
            tab_contaner: 't-tab',
            /*内容容器*/
            ctt_container: 't-b-r',
            /*激活的类名*/
            active_class: 't-tab-active'
        };

        this.cfg = $.extend(
            cfg || {}, 
            dft_cfg
        );

        this.ctn = $('.' + this.cfg.tab_contaner);

        this.cnt = data.length;

        if (!this.cnt) return;

        var that = this;
        var html = '<ul>';

        data.forEach(function(el) {
            var cls = el.cls;
            html += 
                '<li ' + (el.active ? 
                    ('class="' + cls + ' ' + that.cfg.active_class + '" ') : 
                    (cls ? 'class="' + cls + '" ' : '')) +
                (el.path ? ('data-url="' + el.path + '" ') : '') +
                'data-id="' + el.id + '" ' + 
                'delable="' + (el.delable ? 1 : 0) + '"' + '>' +
                '<i class="iconfont ' + el.icon_class + '"></i>' + el.val +
                (el.delable ? '<i class="iconfont icon-guanbi1"></i>' : '') + 
                '</li>';
        });        

        html += '<li class="l-add">+</li></ul>';

        this.ctn.html(html);

        _bind_event(this);
        _load_content(
            $('.' + this.cfg.active_class),
            $('.' + this.cfg.ctt_container)
        );
    }

    function _bind_close(item) {
        item.unbind('click').click(function() {
            item.parent().remove();
        });
    }

    function _get_rd_color() {
        var colors = [
            '1faa9a', 'ee4b3e', 'e9bc1b', '432f21', '202020', '004687', 'ff5a09', '342800'
        ];
        
        return '#' + colors[(Math.floor(Math.random() * 100)) % 8];
    }

    /**
     *  加载tab内容
     *  内容由item的data-url属性指定
     *  @param item {Object} 当前点击的tab
     *  @param oCten {Object} tab页内容的容器
     */
    function _load_content(item, oCtn) {
        var key = item.attr('data-id');
        var content = locStore.get(key);
        var url = item.attr('data-url');

        if (!url) return oCtn.html('');
        
        var color = _get_rd_color();

        item.css({borderTopColor: color});

        if (content) 
            oCtn.html(content);           
        else {
            $.ajax({
                method: 'GET',
                dataType: 'html',
                url: url
            }).then(function(r) {
                oCtn.html(r);           
                locStore.set(
                    item.attr('data-id'), r
                );
            }).catch(function(err) {
                oCtn.html(err.responseText);
            })
        }
    }

    function _bind_event(o) {
        var ctn = o.ctn;
        /*添加*/
        ctn.find('.l-add')
            .click(function() {
                console.log($(this));
            });

        /*关闭*/
        ctn.find('.icon-guanbi1').each(function(i, el) {
            _bind_close($(el));
            this.cnt--;
        });

        /*item点击*/
        ctn.find('li').click(function() {
            var item = $(this), act_cls = o.cfg.active_class;

            ctn.find('.' + act_cls).removeClass(act_cls);

            if (item.hasClass(act_cls)) return;

            item.addClass(act_cls);
    
            _load_content(item, $('.' + o.cfg.ctt_container));
        });
    }

    tabs.prototype.add = function(icon_class, val) {
        if (this.cnt >= this.cfg.max_tab) return ;

        $('<li class="' + this.cfg.active_class + '"><i class="iconfont ' +
            icon_class + '"></i>' + val + '</li>')
        .appendTo($('.' + this.cfg.tab_contaner + ' ul li:last'));

        this.cnt++;
    }

    module.exports = tabs; 
});
