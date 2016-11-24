const names = [ 'Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Emprestimo', 'Gasolina' ];

window.billPayCreateComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="row">
                <h3>Nova conta</h3>
                <form name="form" @submit.prevent="submit">

                    <div class="row">
                        <div class="input-field col s6">
                            <label class="active" for="vencimento">Vencimento:</label>
                            <input id="vencimento" type="text" v-model="bill.date_due | dateFormat"/>
                        </div>
                        <div class="input-field col s6">
                            <label for="valor" class="active">Valor:</label>
                            <input id="valor" type="text" v-model="bill.value | numberFormat">
                        </div>
                    </div>


                     <div class="row">
                        <div class="input-field col s6">
                            <label for="name" class="active">Nome: </label>
                            <select v-model="bill.name" class="browser-default" id="name">
                                <option value="" disabled selected>Escolha uma conta</option>
                                <option v-for="name in names" :value="name">{{name}}</option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <input type="checkbox" v-model="bill.done" class="filled-in" id="pago"/>
                            <label for="pago">Pago? </label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn btn-large right">Enviar</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    `,
    data(){
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        }
    },
    created(){

        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }

        $('#name').material_select();
    },
    methods: {

        submit(){

            var data = this.bill.toJSON();
            if(this.formType == 'insert'){

                Bills.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                })

            }else{
                Bills.update({id: this.bill.id}, data).then(() => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },

        getBill(id){
            Bills.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            })
        },

        getDueDate(date_due) {

            let dateDueObject = date_due;
            if(!(date_due instanceof Date)){
                dateDueObject = new Date(date_due.split('/').reverse().join('-')+'T03:00:00');
            }

            return dateDueObject.toISOString().split('T')[0];
        }

    }
});