window.billListComponent = Vue.extend({
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
            bills: this.$root.$children[0].bills
        }
    },
    methods: {

        loadBill: function(bill){
            this.$dispatch('change-bill', bill);
        },

        deleteBill: function(conta){
            if(confirm('Deseja excluir essa conta?')){
                this.bills.$remove(conta);
            }
        }

    }
});