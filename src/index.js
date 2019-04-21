import $ from "jquery"
import './style.css'
import '../node_modules/bulma/css/bulma.min.css'

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

console.log("Esto es un print de la cosa!")

if (module.hot) {
    module.hot.accept()
}