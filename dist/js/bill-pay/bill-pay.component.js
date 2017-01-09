"use strict";

window.billPayComponent = Vue.extend({
    template: "\n            <div class=\"section\">\n                <div class=\"container\">\n                    <h4>{{title}}</h4>\n\n                    <div class=\"row\">\n                        <div class=\"col s7\">\n                            <div class=\"card z-depth-2\" :class=\"{'grey' : status === false, 'green': status === 0, 'red': status > 0 }\">\n                                <div class=\"card-content white-text\">\n                                    <p class=\"card-title\">\n                                        <i class=\"material-icons\">account_balance</i>\n                                    </p>\n                                    <h5>{{status | statusGeneral}}</h5>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col s5\">\n                            <div class=\"card z-depth-2\">\n                                <div class=\"card-content\">\n                                    <p class=\"card-title\">\n                                        <i class=\"material-icons\">payment</i>\n                                    </p>\n                                    <h5>{{total | numberFormat}}</h5>\n                                </div>\n                            </div>\n                        </div><!-- fecha col 5 -->\n                    </div>\n\n                </div>\n            </div>\n            <div class=\"divider\"></div>\n            <router-view></router-view>\n        ",
    data: function data() {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {

            if (!bills.length) {
                this.status = false;
            }

            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Bills.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bills.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});