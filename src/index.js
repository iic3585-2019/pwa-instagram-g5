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

const get_current_user = () => {
    return localStorage.getItem("current_user")
}

const API_URL = "http://192.168.0.30:3000"
const get_friends_posts = async (user_id) => {

    if ((user_id === "") || (user_id === null)) {
        console.log("No se ha escogido usuario")
        return []
    }

    const res = await fetch(`${API_URL}/posts/get_friends_posts?user_id=${user_id}`)
    const json_res = await res.json()
    return json_res
}

$(document).ready(async () => {
    let posts = await get_friends_posts(localStorage.getItem("current_user"))

    console.log("Los post que llegaron son:")
    console.log(posts)
    $("#posts_container .card-content").ready((e) => {
        posts["posts"].forEach(post => {
            $("#posts_container .card-content").append(post_html_helper(post))
        })
    })
    // debugger
})

const post_html_helper = (post) => {
    return `
    <div class="box">

        ${post.content}

    </div>
    `
}

$("#user_button").on('click', (e) => {
    e.preventDefault()
    const selected_value = $("#user_select option:selected").val()
    localStorage.setItem('current_user', selected_value)
})

$("#user_select").ready(() => {
    const current_user = get_current_user()

    if (current_user === null) {
        $(`#user_select option[value=${-1}]`).attr('selected', 'selected')
        return null
    }

    $(`#user_select option[value=${current_user}]`).attr('selected', 'selected')
})



console.log("Esto es un print de la cosa!")

if (module.hot) {
    module.hot.accept()
}