$(document).ready(function () {
    const $xprssUserName = $('.xprss-user-name');
    $.get( "/user-info", function( data ) {
        $xprssUserName.append(data.userName);
        console.log(data);
    });
});