"use strict";

window.billReceiveComponent = Vue.extend({
    /* components: {
        'menu-component' : billPayMenuComponent
    },*/
    template: "\n            <!-- <style type=\"text/css\">\n\n                .red{\n                    color: red;\n                }\n\n                .green{\n                    color: green;\n                }\n\n                .gray{\n                    color: gray;\n                }\n\n                .minha-classe{\n                    background-color: burlywood;\n                }\n            </style> -->\n\n            <h1>{{title}}</h1>\n            <!--\n            <h3 :class=\"{'gray' : status === false, 'green': status === 0, 'red': status > 0 }\">{{status | statusGeneral}}</h3> \n\n            <menu-component></menu-component>\n\n            <router-view></router-view> -->\n        ",
    data: function data() {
        return {
            title: "Contas a receber"
        };
    } /*,
      computed: {
         status: function(){
              var bills = this.$root.$children[0].billsPay;
              if(!bills.length){
                 return false;
             }
              var count = 0;
              for(var i in bills){
                 if(!bills[i].done){
                     count++;
                 }
                 
             }
              return count;
         }
      }*/

});