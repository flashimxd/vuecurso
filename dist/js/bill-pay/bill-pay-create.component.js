'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Emprestimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n        <div class="container">\n            <div class="row">\n                <h3>Nova conta</h3>\n                <form name="form" @submit.prevent="submit">\n\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <label class="active" for="vencimento">Vencimento:</label>\n                            <input id="vencimento" type="text" v-model="bill.date_due | dateFormat"/>\n                        </div>\n                        <div class="input-field col s6">\n                            <label for="valor" class="active">Valor:</label>\n                            <input id="valor" type="text" v-model="bill.value | numberFormat">\n                        </div>\n                    </div>\n\n\n                     <div class="row">\n                        <div class="input-field col s6">\n                            <label for="name" class="active">Nome: </label>\n                            <select v-model="bill.name" class="browser-default" id="name">\n                                <option value="" disabled selected>Escolha uma conta</option>\n                                <option v-for="name in names" :value="name">{{name}}</option>\n                            </select>\n                        </div>\n                        <div class="input-field col s6">\n                            <input type="checkbox" v-model="bill.done" class="filled-in" id="pago"/>\n                            <label for="pago">Pago? </label>\n                        </div>\n                    </div>\n\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <button class="btn btn-large right">Enviar</button>\n                        </div>\n                    </div>\n\n                </form>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },
    created: function created() {

        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }

        $('#name').material_select();
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {

                Bills.save({}, data).then(function (response) {
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bills.update({ id: this.bill.id }, data).then(function () {
                    Materialize.toast('Conta atualizada com sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Bills.get({ id: id }).then(function (response) {
                _this2.bill = new BillPay(response.data);
            });
        },
        getDueDate: function getDueDate(date_due) {

            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + 'T03:00:00');
            }

            return dateDueObject.toISOString().split('T')[0];
        }
    }
});