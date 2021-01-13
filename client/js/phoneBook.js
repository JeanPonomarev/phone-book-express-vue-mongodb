import 'bootstrap/dist/css/bootstrap.min.css';
import "../scss/style.scss";

import "bootstrap/dist/js/bootstrap.bundle";

import Vue from "vue";
import PhoneBook from "./PhoneBook.vue";

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from "vee-validate";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
    render: createElement => createElement(PhoneBook)
}).$mount("#app");