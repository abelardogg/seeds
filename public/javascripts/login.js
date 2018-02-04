$(document).ready(function () {
    let form = {};

    $('#login-submit-button').on('click', function (e) {

        /**
         *
         * TODO REMOVE this
         * set cookies for testing purposes, remove this behaviour
         *
         */
        // document.cookie = "isLogged=true";
        // window.location.href = '/';


        form = {
            "email" : "dog",
            "pass" : "dsadsa"
        };

        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/loginrequest',
            success: function(d){console.log('ajax success', d)},
            dataType: 'json'
        });



    });
});