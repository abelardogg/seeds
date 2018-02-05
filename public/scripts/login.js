$(document).ready(function () {
    //clear cookies
    deleteCookie('isLogged');
    deleteCookie('izloggedzat');

    let form = {};

    $('#login-submit-button').on('click', function (e) {

        e.preventDefault();

        /**
         *
         * TODO REMOVE this
         * set cookies for testing purposes, remove this behaviour
         *
         */
        // document.cookie = "isLogged=true";
        // window.location.href = '/';


        form = {
            "email" : $('#login-email-input').val(),
            "pass" : $('#login-password-input').val()
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(form),
            contentType: 'application/json',
            url: '/loginrequest',
            success: function(data){

                console.log(data);

                if(data.success==='true'){
                    alert('login');

                    document.cookie = "isLogged=true";
                    document.cookie = "izloggedzat="+data.sat+"";
                    location.reload();

                } else {
                    console.log('login failed');
                }
            },
            error:function() {
                console.log('error');
            }
        });



    });
});


