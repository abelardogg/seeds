$(document).ready(function () {
    const $xprssUserName = $('.xprss-user-name');
    $.post( "/", function( data ) {
        $xprssUserName.append(data.userName);
        console.log(data);
    });
});