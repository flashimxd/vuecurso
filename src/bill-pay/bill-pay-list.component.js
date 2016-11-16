window.billPayListComponent = Vue.extend({
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
                    <td>{{conta.date_due | dateFormat}}</td>
                    <td>{{conta.name}}</td>
                    <td>{{conta.value | numberFormat}}</td> 
                    <td class="minha-classe" :class="{'pago' : conta.done, 'nao-pago': !conta.done}">{{conta.done | doneLabel }}</td>  
                    <td>
                        <a v-link="{name: 'bill-pay.update', params: { id: conta.id}}">Editar</a> | 
                        <a href="#" @click.prevent="deleteBill(conta)">Excluir</a>
                    </td>        
                </tr>    
            </tbody>
            
        </table>
    `,
    data(){
        return { 
            bills: []
        }
    },
    created(){
        Bills.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {

        deleteBill(conta){
            
            if(confirm('Deseja excluir essa conta?')){
                Bills.delete({id: conta.id}).then(() => {
                    this.bills.$remove(conta);
                    this.$dispatch('change-info');
                })
            }
        }
    }
});