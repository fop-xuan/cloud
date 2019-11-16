import Vue from 'vue'
import notification from './notification.vue'

const NotificationConstructor = Vue.extend(notification)

let options = {}

function showNotify(init) {
    options = Object.assign(options, init)
    const notificationInstence = new NotificationConstructor({ data: options })
    notificationInstence.vm = notificationInstence.$mount()
    document.body.appendChild(notificationInstence.vm.$el)
    options.isShow = true
    setTimeout(() => {
        options.isShow = false
        setTimeout(() => {
            document.body.removeChild(notificationInstence.vm.$el)
        }, 1000)
    }, 3000)
}

export default {
    install: function (vm) {
        vm.prototype.$showNotify = showNotify
    }
}
