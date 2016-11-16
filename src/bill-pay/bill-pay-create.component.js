const names = [ 'Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Emprestimo', 'Gasolina' ];

window.billPayCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due | dateFormat"/>
            <br/><br/>
            <label>Nome: </label>
            <select v-model="bill.name">
                <option v-for="name in names" :value="name">{{name}}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="text" v-model="bill.value | numberFormat">

            <br/><br/>
            <label>Pago? </label>
            <input type="checkbox" v-model="bill.done"/>

            <br/><br/>
            <input type="submit" value="Enviar"/>
        </form>
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