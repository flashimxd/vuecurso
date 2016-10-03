
Vue.filter('doneLabel', function(value){
    if(value == 0){
        return 'Não paga';
    }else{
        return 'Paga';
    }

});

Vue.filter('statusGeneral', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada";
    }
    
    if(!value){
        return 'Nenhuma conta a pagar'
    }else{
        return "Existem "+value+" contas a pagar!";
    }
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: 'Listar contas'},
            {id: 1, name: 'Cadastar conta'}
        ],
        activedView: 0,
        formType: '',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Emprestimo',
            'Gasolina'
        ],
        bills: [
            { date_due: '20/08/2016',   name: 'Conta de luz',        value: 60.00,      done: false },
            { date_due: '21/08/2016',   name: 'Conta de água',       value: 50.99,      done: true },
            { date_due: '23/08/2016',   name: 'Conta de telefone',   value: 90.98,      done: true },
            { date_due: '24/08/2016',   name: 'Supermercado',        value: 400.00,     done: true },
            { date_due: '25/08/2016',   name: 'Cartão de crédito',   value: 1000.98,    done: true },
            { date_due: '26/08/2016',   name: 'Emprestimo',          value: 350.00,     done: true },
            { date_due: '26/08/2016',   name: 'Gasolina',            value: 190.00,     done: true }
        ],
    },
    computed: {
        status: function(){

            if(!this.bills.length){
                return false;
            }

            var count = 0;

            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
                
            }

            return count;
        }
    },

    methods: {

        showView: function(ev, id){
           this.activedView = id;

           if(id == 1){
               this.formType = 'insert';
           }
        },

        submit: function(){

            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }

            this.bill =  { date_due: '', name: '', value: 0, done: 0 }

            this.activedView = 0;
        },

        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType    = 'update';
        },

        deleteBill: function(conta){
            if(confirm('Deseja excluir essa conta?')){
                this.bills.$remove(conta);
            }
        }
    }
});