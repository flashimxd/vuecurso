'use strict';

window.billPayMenuComponent = Vue.extend({
    template: ' <nav>\n                    <ul>\n                        <li v-for="menu in menus">\n                            <!--<a href="#" @click.prevent="showView($event,menu.id)">{{menu.name}}</a> -->\n                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>\n                        </li>\n                    </ul>\n                </nav> ',
    data: function data() {
        return {
            menus: [{ id: 0, name: 'Listar contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Cadastar conta', routeName: 'bill-pay.create' }]
        };
    }
});