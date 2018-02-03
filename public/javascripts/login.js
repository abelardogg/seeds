$(document).ready(function () {
    let form = {};
    
    $('#login-submit-button').on('click', function (e) {

        /**
         *
         * TODO REMOVE this
         * set cookies for testing purposes, remove this behaviour
         *
         */
        document.cookie = "isLogged=true";
        window.location.href = '/';


        form = {
            email : $('#login-email-input'),
            pass : $('#login-password-input')
        }
    });
});