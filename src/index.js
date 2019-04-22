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
    1: {
        name: "Francisco",
        token: "fR3ofrOXF2s:APA91bHUtsSI2AxopZpRWyfIQsUljxxuO-A85iYJnAgfjvva5MAjTcJZbZQL983jdU-swu1hPaPdN3WlMECBz8MCuYXEZY1ozf6-LaRCa7kyG-57bYpaudNtYima_46LmiEBGI1H3k_E"
    },
    2: {
        name: "Gabriel",
        token: "fKcK-zlFkPs:APA91bGLRiVTd5tUg16SozLsuUtAIPavCqZyEV1y0NNNfuAmIiwCYl9vTPxIoEccTkKXrdRouPVUCJgFiFGhAEt3MN-jVrILmw3HTTqs0BZXsA9NJyWxEAVwbSk4xTGBAuCEHSctZen7"
    }
}

let gCurrentToken;

const get_current_user = () => {
    return localStorage.getItem("current_user")
}

// const API_URL = "http://192.168.0.30:3000"
const API_URL = "http://0.0.0.0:3000"
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
            <div class="column is-four-fifths">
                            
                <img class="post-image" src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/02/Corgi-Cropped.jpeg" alt="Placeholder image">

            </div>
        </div>
    
        ${USERS[post.user_id]["name"]}:<br>
        ${post.content}
    </div>
    `
}

const firebase_function = () => {
    var config = {
        apiKey: "AIzaSyC6y5E8L2XXjcT9C9ypMb_yNn1XnedQN_c",
        authDomain: "pwa-instagram.firebaseapp.com",
        databaseURL: "https://pwa-instagram.firebaseio.com",
        projectId: "pwa-instagram",
        storageBucket: "pwa-instagram.appspot.com",
        messagingSenderId: "723544637426"
    };
    firebase.initializeApp(config);

    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging();
    // Add the public key generated from the console here.
    messaging.usePublicVapidKey("BCX1Tpm1SJtm865859nUIavWSG0zTz2Fe-HEE5kxjJU295dOj50Jahos1l_JhnD5g0d3sY-j1boZfCIJLMZZ8So");
    messaging.requestPermission().then(function () {
        console.log('Notification permission granted.');
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then(function (currentToken) {
            if (currentToken) {
                console.log("hay token!");
                console.log(currentToken)
                gCurrentToken = currentToken;
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                // updateUIForPushPermissionRequired();
                // setTokenSentToServer(false);
            }
        }).catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
        });
    }).catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    });
    messaging.onMessage(function (payload) {
        console.log("Recibiste mensaje");
        console.log(payload)
    });
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

    let token_user = 1;
    if (current_user == 1) {
        token_user = 2;
        console.log("Se asigno al gabo");
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

            axios.post(`https://fcm.googleapis.com/fcm/send`,
                {
                    "notification": {
                        "title": "instagram-pwa",
                        "body": `${USERS[current_user].name} ha subido un nuevo post`,
                        "click_action": "http://localhost:8080/"
                    },

                    "to": `${USERS[2].token}`
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "key=AAAAqHae__I:APA91bF2FCpH4lknOJ1QgTaQGnyzBNjozZ_opw0hJtjQ9zaBdjFx8LwklliaDaQ_BHM9zgj4F1oWbFVUVxorkxOhwCvs018dR31XRZXwWTQGDNaUl7Fiftcus-0_5lFT9FXQbWLGdrql"
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    close_modal()

                })
                .catch(function (error) {
                    console.log(error);
                })
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

firebase_function()
if (module.hot) {
    module.hot.accept()
}