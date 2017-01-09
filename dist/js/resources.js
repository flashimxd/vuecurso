'use strict';

Vue.http.options.root = 'http://localhost:8001/api';

window.Bills = Vue.resource('bills{/id}', {}, {
    total: { method: 'GET', url: 'bills/total' }
});