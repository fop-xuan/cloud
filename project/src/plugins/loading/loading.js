import Vue from 'vue'
import loading from './loading.vue'

const LoadingConstructor = Vue.extend(loading)
const loadingInstence = new LoadingConstructor()
loadingInstence.vm = loadingInstence.$mount()

function showLoading() {
    document.body.appendChild(loadingInstence.vm.$el)
}

function removeLoading() {
    document.body.removeChild(loadingInstence.vm.$el)
}

export default {
    install: function (vm) {
        vm.prototype.$showLoading = showLoading
        vm.prototype.$removeLoading = removeLoading
    }
}
