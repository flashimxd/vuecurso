window.billComponent = Vue.extend({
    template: ` <nav>
                    <ul>
                        <li v-for="menu in menus">
                            <!--<a href="#" @click.prevent="showView($event,menu.id)">{{menu.name}}</a> -->
                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                        </li>
                    </ul>
                </nav>
                <router-view></router-view>
                `
                ,
    data: function(){
        return {
            menus: [
                { name: 'Contas a pagar',  routeName: 'bill-pay.list'},
                { name: 'Conta a receber', routeName: 'bill-receive'}
            ],
        }
    }
});