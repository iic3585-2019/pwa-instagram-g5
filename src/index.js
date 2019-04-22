import $ from "jquery"
import '../node_modules/bulma/css/bulma.min.css'
import axios from 'axios'

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

const USERS = {
    1: { name: "Francisco" },
    2: { name: "Gabriel" }
}

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

$(document).ready(() => {
    load_friends_posts()
})

const load_friends_posts = async () => {
    const current_user = get_current_user()
    if (current_user === null) {
        return null
    }

    let posts = await get_friends_posts(current_user)

    $("#posts_container").ready((e) => {
        $("#posts_container").empty()

        posts["posts"].forEach(post => {
            $("#posts_container").append(post_html_helper(post))
        })
    })
}

const post_html_helper = (post) => {
    return `
    <div class="box">
        <div class="columns is-centered is-mobile">
            <div class="column is-narrow">
                            
                <img class="post-image" src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/02/Corgi-Cropped.jpeg" alt="Placeholder image">

            </div>
        </div>
    
        ${USERS[post.user_id]["name"]}:<br>
        ${post.content}
    </div>
    `
}

// ========================================================================
// Jquery stuff
// ========================================================================
$("#user_button").on('click', (e) => {
    e.preventDefault()
    const selected_value = $("#user_select option:selected").val()
    localStorage.setItem('current_user', selected_value)

    load_friends_posts()
})

$("#new_post_button").on('click', (e) => {
    e.preventDefault()

    $("#add_post_modal").ready(() => {
        $("#add_post_modal").addClass("is-active")
    })
})

$("#close_post_modal_button").on('click', (e) => {
    e.preventDefault()
    close_modal()
})

$("#create_post_button").on('click', (e) => {
    e.preventDefault()

    const content = $("#add_post_modal textarea").val()
    const tagged_friend = $("#add_post_modal input").val()

    const current_user = get_current_user()
    if (current_user === null) {
        return null
    }

    axios.post(`${API_URL}/posts/create_post`,
        {
            user_id: current_user,
            content: content,
            tagged_friend: tagged_friend
        })
        .then(function (response) {
            console.log(response.data)
            close_modal()
        })
        .catch(function (error) {
            console.log(error);
        })

    //
})

const close_modal = () => {
    $("#add_post_modal").ready(() => {
        $("#add_post_modal").removeClass("is-active")
    })
}

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