
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
        return 'Nenhuma conta a pagar';
    }else{
        return "Existem "+value+" contas a pagar!";
    }

});

var MenuComponent = Vue.extend({
    template: ` <nav>
                    <li v-for="menu in menus">
                        <a href="#" @click.prevent="showView($event,menu.id)">{{menu.name}}</a>
                    </li>
                </nav> `,
    data: function(){
        return {
            menus: [
                {id: 0, name: 'Listar contas'},
                {id: 1, name: 'Cadastar conta'}
            ],
        }
    }, 
    methods: {
        showView: function(ev, id){

           this.$dispatch('change-activedView', id);

           if(id == 1){
               //this.$parent.formType = 'insert';
               this.$dispatch('change-formType', 'insert');
           }
        },
    }
});

var billListComponent = Vue.extend({
    template: `
    <style type="text/css">
                .pago{
                    color: green;
                }

                .nao-pago{
                    color: red;
                }
        </style>
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Paga?</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(idx,conta) in bills">
                    <td>{{idx + 1}}</td>
                    <td>{{conta.date_due}}</td>
                    <td>{{conta.name}}</td>
                    <td>{{conta.value | currency 'R$ '}}</td> 
                    <td class="minha-classe" :class="{'pago' : conta.done, 'nao-pago': !conta.done}">{{conta.done | doneLabel }}</td>  
                    <td>
                        <a href="#" @click.prevent="loadBill(conta)">Editar</a> | 
                        <a href="#" @click.prevent="deleteBill(conta)">Excluir</a>
                    </td>        
                </tr>    
            </tbody>
            
        </table>
    `,
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
    },
    methods: {

        loadBill: function(bill){
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType    = 'update';
        },

        deleteBill: function(conta){
            if(confirm('Deseja excluir essa conta?')){
                this.bills.$remove(conta);
            }
        }

    }
});

var billCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due"/>
            <br/><br/>
            <label>Nome: </label>
            <select v-model="bill.name">
                <option v-for="name in names" :value="name">{{name}}</option>
            </select>
            <br/><br/>
            <label>Valor:</label> 
            <input type="text" v-model="bill.value">
            
            <br/><br/>
            <label>Pago? </label>
            <input type="checkbox" v-model="bill.done"/>

            <br/><br/>
            <input type="submit" value="Enviar"/>

        </form>
    `,
    props: ['bill', 'formType'],
    data: function(){
        return {
            names: [
                    'Conta de luz',
                    'Conta de água',
                    'Conta de telefone',
                    'Supermercado',
                    'Cartão de crédito',
                    'Emprestimo',
                    'Gasolina'
            ]
        }
    },
    methods: {

        submit: function(){

            if(this.formType == 'insert'){
                this.$parent.$children[1].bills.push(this.bill);
            }

            this.bill =  { date_due: '', name: '', value: 0, done: 0 }

            this.$parent.activedView = 0;
        }

    }
});


var appComponent = Vue.extend({
     components: {
        'menu-component' : MenuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
            <style type="text/css">

                .red{
                    color: red;
                }

                .green{
                    color: green;
                }

                .gray{
                    color: gray;
                }

                .minha-classe{
                    background-color: burlywood;
                }
            </style>

            <h1>{{title}}</h1>

            <h3 :class="{'gray' : status === false, 'green': status === 0, 'red': status > 0 }">{{status | statusGeneral}}</h3> 

            <menu-component></menu-component>

            <div v-show="activedView == 0">
                
                <bill-list-component v-ref:bill-list-component></bill-list-component>

            </div>

            <div v-show="activedView == 1">

                <bill-create-component :bill.sync="bill" :form-type="formType"></bill-create-component>

            </div> 
        `,
        data: function(){
            return {
                title: "Contas a pagar",
                activedView: 0,
                formType: '',
                bill: {
                    date_due: '',
                    name: '',
                    value: 0,
                    done: false
                }
            }
    },
    computed: {
        status: function(){

            var billListComponent = this.$refs.billListComponent;

            if(!billListComponent.bills.length){
                return false;
            }

            var count = 0;

            for(var i in billListComponent.bills){
                if(!billListComponent.bills[i].done){
                    count++;
                }
                
            }

            return count;
        }
    },

    methods: {

    },

    events:{
        'change-activedView' : function(activedView){
            this.activedView = activedView;
        },

        'change-formType' : function(formType){
            this.formType = formType;
        }
    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: "#app"
});