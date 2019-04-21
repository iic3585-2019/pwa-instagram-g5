import $ from "jquery"
import './style.css'
import './bulma.min.css'

window.addEventListener('load', e => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register("./sw.js")
            console.log("EL service worker se ha registrado")
        } catch (error) {
            console.log("No se pudo registrar :(")
        }
    }
})

if (module.hot) {
    module.hot.accept()
}