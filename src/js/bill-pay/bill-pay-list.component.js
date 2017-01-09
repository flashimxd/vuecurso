window.billPayListComponent = Vue.extend({
     components: {
        'modal': modalComponent
    },
    template: `
            <div class="container">
                <div class="row">
                    <h2>Minhas Contas a Pagar</h2>
                    <table class="bordered highlight centered responsive-table z-depth-3">
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
                                <td class="white-text" :class="{'green lighten-2' : conta.done, 'red lighten-2': !conta.done}">{{conta.done | doneLabel }}</td>
                                <td>
                                    <a v-link="{name: 'bill-pay.update', params: { id: conta.id}}">Editar</a> |
                                    <a href="#" @click.prevent="openModalDelete(conta)">Excluir</a>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            <modal :modal="modal">
                <div slot="content">
                    <h4>Você tem certeza..</h4>
                    <p><strong>Deseja excluir essa conta ?</strong></p>
                    <divider></divider>
                    <p>Nome: <strong>{{billToDelete.name}}</strong></p>
                    <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>
                    <p>Vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>
                    <divider></divider>
                </div>
                <div slot="footer">
                    <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close " @click="deleteBill()">Ok</button>
                    <button class="btn btn-flat waves-effect waves-red modal-action modal-close ">Cancelar</button>
                </div>
            </modal>
    `,
    data(){
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        }
    },
    created(){
        Bills.query().then((response) => {
            this.bills = response.data;
        });

        $(document).ready(function(){        
            $('.modal').modal();    
        });
    },
    methods: {

        deleteBill(){
            Bills.delete({id: this.billToDelete.id}).then(() => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                this.$dispatch('change-info');
            })
        
        },
        openModalDelete(bill){
            this.billToDelete = bill;
            $('#modal-delete').modal('open'); 
        }
    }
});