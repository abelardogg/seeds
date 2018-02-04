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
            "name" : "abel",
            "last_name" : "gandara"
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(form),
            contentType: 'application/json',
            url: '/loginrequest',
            success: function(data){
               // data = JSON.parse(data);
                console.log(data);
            },
            error:function() {
                console.log('error');
            }
        });



    });
});