window.billComponent = Vue.extend({
    template: `
                <ul v-bind:id="menuItem.id" class="dropdown-content" v-for="menuItem in menusDropdown">
                    <li v-for="menu in menuItem.items">
                        <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                    </li>
                </ul>
                <div class="navbar-fixed">
                    <!-- <nav class="teal"> -->
                    <nav>
                        <div class="nav-wrapper container">
                            <a href="#" class="right brand-logo">Code Contas</a>
                            <a href="#" data-activates="nav-mobile" class="button-collapse">
                                <i class="material-icons">menu</i>
                            </a>

                            <ul class="left hide-on-med-and-down">
                                <li v-for="menu in menus">
                                    <a v-if="menu.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropdownId">
                                        {{menu.name}} <i class="material-icons right">arrow_drop_down</i>
                                    </a>
                                    <a v-else v-link="{name: menu.routeName}">{{menu.name}}</a>
                                </li>
                            </ul>

                            <ul id="nav-mobile" class="side-nav">
                                <li v-for="menu in menus">
                                    <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                                </li>
                            </ul>

                        </div>
                    </nav>
                </div>
                <router-view></router-view>
                `
                ,
    created(){
        $(document).ready(function(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data() {
        return {
            menus: [
                { name: 'Contas a pagar',  routeName: 'bill-pay.list', dropdownId: "bill-pay"},
                { name: 'Conta a receber', routeName: 'bill-receive', dropdownId: "bill-receive"}
            ],

            menusDropdown: [
                {
                    id: 'bill-pay',
                    items: [
                        {id: 0, name: 'Listar contas',  routeName: 'bill-pay.list'},
                        {id: 1, name: 'Cadastar conta', routeName: 'bill-pay.create'}
                    ]
                },
                {
                    id: 'bill-receive',
                    items: [
                        {id: 0, name: 'Listar contas',  routeName: 'bill-pay.list'}
                    ]
                }

            ]
        }
    }
});