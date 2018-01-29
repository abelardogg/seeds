$(document).ready(function () {

    getUserInfo();
    getHeader();
});

/**
 * GET user main info (Name, last name, city, etc.).
 */
function getUserInfo(){
    const $xprssUserName = $('.xprss-user-name');
    $.get( "/user-info", function( data ) {
        $xprssUserName.append(data.userName);
        console.log(data);
    });
}

function hrefHandler(){
    $('.redirect-home').attr('href','/')
}

function getHeader() {
    $.post( "/main-header", function( data ) {
        $('#main-header').append(data);
        console.log(data);
        hrefHandler();

    });

}