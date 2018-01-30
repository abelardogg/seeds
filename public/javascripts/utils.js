$(document).ready(function () {

    getHeader();
});

/**
 * GET user main info (Name, last name, city, etc.).
 */
function getUserBasicInfo(){
    const $xprssUserName = $('.xprss-user-name'),
        $xprssUserLastName = $('.xprss-user-last-name'),
        $xprssUserAge = $('.xprss-user-age'),
        $xprssUserCountry = $('.xprss-user-country'),
        currentYear = getCurrentYear();


    $.post( "/user-info", function( data ) {

        $xprssUserName.append(data.name);
        $xprssUserLastName.append(data.lastName);
        $xprssUserAge.append(currentYear-data.birth);
        $xprssUserCountry.append(data.country);
        console.log(data);
    });
}

function hrefHandler(){
    $('.fun-redirect-home').attr('href','/');
    $('.fun-redirect-profile').attr('href','/profile');
}

function getHeader() {
    $.post( "/main-header", function( data ) {
        $('#main-header').append(data);
        // console.log(data);
        hrefHandler();
        getUserBasicInfo();

    });

}

function getCurrentYear(){
    var d = new Date();
    var currentYear = d.getFullYear();
    return currentYear;
}