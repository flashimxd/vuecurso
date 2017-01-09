'use strict';

window.billPayListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
    template: '\n            <div class="container">\n                <div class="row">\n                    <h2>Minhas Contas a Pagar</h2>\n                    <table class="bordered highlight centered responsive-table z-depth-3">\n                        <thead>\n                            <tr>\n                                <th>#</th>\n                                <th>Vencimento</th>\n                                <th>Nome</th>\n                                <th>Valor</th>\n                                <th>Paga?</th>\n                                <th>A\xE7\xF5es</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr v-for="(idx,conta) in bills">\n                                <td>{{idx + 1}}</td>\n                                <td>{{conta.date_due | dateFormat}}</td>\n                                <td>{{conta.name}}</td>\n                                <td>{{conta.value | numberFormat}}</td>\n                                <td class="white-text" :class="{\'green lighten-2\' : conta.done, \'red lighten-2\': !conta.done}">{{conta.done | doneLabel }}</td>\n                                <td>\n                                    <a v-link="{name: \'bill-pay.update\', params: { id: conta.id}}">Editar</a> |\n                                    <a href="#" @click.prevent="openModalDelete(conta)">Excluir</a>\n                                </td>\n                            </tr>\n                        </tbody>\n\n                    </table>\n                </div>\n            </div>\n            <modal :modal="modal">\n                <div slot="content">\n                    <h4>Voc\xEA tem certeza..</h4>\n                    <p><strong>Deseja excluir essa conta ?</strong></p>\n                    <divider></divider>\n                    <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                    <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>\n                    <p>Vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>\n                    <divider></divider>\n                </div>\n                <div slot="footer">\n                    <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close " @click="deleteBill()">Ok</button>\n                    <button class="btn btn-flat waves-effect waves-red modal-action modal-close ">Cancelar</button>\n                </div>\n            </modal>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        Bills.query().then(function (response) {
            _this.bills = response.data;
        });

        $(document).ready(function () {
            $('.modal').modal();
        });
    },

    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            Bills.delete({ id: this.billToDelete.id }).then(function () {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                _this2.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});