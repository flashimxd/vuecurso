'use strict';

window.billComponent = Vue.extend({
    template: '\n                <ul v-bind:id="menuItem.id" class="dropdown-content" v-for="menuItem in menusDropdown">\n                    <li v-for="menu in menuItem.items">\n                        <a v-link="{name: menu.routeName}">{{menu.name}}</a>\n                    </li>\n                </ul>\n                <div class="navbar-fixed">\n                    <!-- <nav class="teal"> -->\n                    <nav>\n                        <div class="nav-wrapper container">\n                            <a href="#" class="right brand-logo">Code Contas</a>\n                            <a href="#" data-activates="nav-mobile" class="button-collapse">\n                                <i class="material-icons">menu</i>\n                            </a>\n\n                            <ul class="left hide-on-med-and-down">\n                                <li v-for="menu in menus">\n                                    <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId">\n                                        {{menu.name}} <i class="material-icons right">arrow_drop_down</i>\n                                    </a>\n                                    <a v-else v-link="{name: menu.routeName}">{{menu.name}}</a>\n                                </li>\n                            </ul>\n\n                            <ul id="nav-mobile" class="side-nav">\n                                <li v-for="menu in menus">\n                                    <a v-link="{name: menu.routeName}">{{menu.name}}</a>\n                                </li>\n                            </ul>\n\n                        </div>\n                    </nav>\n                </div>\n                <router-view></router-view>\n                ',

    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: 'Contas a pagar', routeName: 'bill-pay.list', dropdownId: "bill-pay" }, { name: 'Conta a receber', routeName: 'bill-receive', dropdownId: "bill-receive" }],

            menusDropdown: [{
                id: 'bill-pay',
                items: [{ id: 0, name: 'Listar contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Cadastar conta', routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive',
                items: [{ id: 0, name: 'Listar contas', routeName: 'bill-pay.list' }]
            }]
        };
    }
});