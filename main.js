var router = new VueRouter();


var mainComponent = Vue.extend({
    components: {        
        'app-component': appComponent
    },
    template: '<app-component></app-component>',
    data: function(){
        return {
            bills: [
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
    '/bills': {
        name: 'bill.list',
        component: billListComponent
    },

    '/bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },

     '/bill/:index/update': {
        name: 'bill.update',
        component: billCreateComponent
    },

    '*': {
        component: billListComponent
    }

});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bills'
})