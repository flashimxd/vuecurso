"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não paga" : "paga";
});

Vue.filter('statusGeneral', function (value) {

    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return 'Nenhuma conta a pagar';
    } else {
        return value + " contas a pagar!";
    }
});

Vue.filter("numberFormat", {
    read: function read(value) {
        var number = 0;

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');

            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {

            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : null;
                if (dateString) {
                    value = new Date(dateString + 'T03:00:00');
                } else {
                    return value;
                }
            }

            return Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
        }

        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + 'T03:00:00');
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
    }
});