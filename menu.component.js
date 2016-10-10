window.MenuComponent = Vue.extend({
    template: ` <nav>
                    <ul>
                        <li v-for="menu in menus">
                            <!--<a href="#" @click.prevent="showView($event,menu.id)">{{menu.name}}</a> -->
                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                        </li>
                    </ul>
                </nav> `,
    data: function(){
        return {
            menus: [
                {id: 0, name: 'Listar contas',  routeName: 'bill.list'},
                {id: 1, name: 'Cadastar conta', routeName: 'bill.create'}
            ],
        }
    }
});