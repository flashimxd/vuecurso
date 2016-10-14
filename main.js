var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {        
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
                    { date_due: '20/08/2016',   name: 'Conta de luz',        value: 60.00,      done: false },
                    { date_due: '21/08/2016',   name: 'Conta de água',       value: 50.99,      done: true },
                    { date_due: '23/08/2016',   name: 'Conta de telefone',   value: 90.98,      done: true },
                    { date_due: '24/08/2016',   name: 'Supermercado',        value: 400.00,     done: true },
                    { date_due: '25/08/2016',   name: 'Cartão de crédito',   value: 1000.98,    done: true },
                    { date_due: '26/08/2016',   name: 'Emprestimo',          value: 350.00,     done: true },
                    { date_due: '26/08/2016',   name: 'Gasolina',            value: 190.00,     done: true }
                ]
        }
    }
});

router.map({

    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },

            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },

            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    'bill-receives': {
        name: 'bill-receive',
        component: billReceiveComponent
    },
    '*': {
        component: billPayComponent
    }

});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-pays'
})