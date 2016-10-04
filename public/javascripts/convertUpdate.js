// Userlist data array for filling in info box
var userListData = [];

//toggle school time by username
function utoggledojo() {
    console.log('launch utoggledojo');
    $('#udojo').toggle();

}

function utogglecolor() {
    console.log('launch utogglecolor');
    $('#ucolor').toggle();
}

function utoggleclass() {
    console.log('launch utoggleclass');
    var uclassuser = document.getElementById('updateUsername').value;
    console.log(uclassuser);
    if (uclassuser == 'Dustin') {
        if (($('select#updateUsercolor').is(':visible')) && ($('input#updateUserdojopoints').is(':hidden'))) {
            utogglecolor();
            utoggledojo();
        } else
        if (($('select#updateUsercolor').is(':visible')) && ($('input#updateUserdojopoints').is(':visible'))) {
            utogglecolor();
        } else {}
    } else
    if (uclassuser == 'Matthew') {
        if (($('select#updateUsercolor').is(':hidden')) && ($('input#updateUserdojopoints').is(':visible'))) {
            utogglecolor();
            utoggledojo();
        } else
        if (($('select#updateUsercolor').is(':visible')) && ($('update#updateUserdojopoints').is(':visible'))) {
            utoggledojo();
        } else {}
    } else {}
}
// convert time based on username
function uconvertusertime() {
    var uconvertname = $('#updateUser fieldset select#updateUsername').val();
    if (uconvertname == 'Dustin') {
        uconvertdtime();
    } else {
        uconvertctime();
    }
}
// changetime dojotime
function uconvertdtime() {
    var uconvertdojopoints = $('#updateUser fieldset input#updateUserdojopoints').val();
    var uconvertusercolor = $('#updateUser fieldset select#updateUsercolor').val();
    if ((convertdojopoints == '1') && (uconvertusercolor == 'N/A')) {
        console.log('adding 60min');
        cgtime = '60';
        console.log(cgtime);
        document.getElementById('updateUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((uconvertdojopoints == '2') && (uconvertusercolor == 'N/A')) {
        console.log('adding 90min');
        cgtime = '90';
        console.log(cgtime);
        document.getElementById('updateUserschoolgtime').value = cgtime;
        return true;
    } else
        console.log('adding 0min');
    cgtime = '0';
    console.log(cgtime);
    document.getElementById('updateUserschoolgtime').value = cgtime;
    return true;
}

function uconvertctime() {
    var convertdojopoints = $('#updateUser fieldset input#updateUserdojopoints').val();
    var convertusercolor = $('#updateUser fieldset select#updateUsercolor').val();

    console.log('starting convertctime');
    console.log(convertusercolor);
    if ((convertusercolor == 'Purple') && (convertdojopoints === '' || '0')) {
        console.log('adding 18min');
        cgtime = '18';
        console.log(cgtime);
        document.getElementById('updateUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((convertusercolor == 'Blue') && (convertdojopoints === '' || '0')) {
        console.log('adding 15min');
        cgtime = '15';
        console.log(cgtime);
        document.getElementById('updateUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((convertusercolor == 'Red') && (convertdojopoints === '' || '0')) {
        console.log('adding 12min');
        cgtime = '12';
        console.log(cgtime);
        document.getElementById('updateUserschoolgtime').value = cgtime;
        return true;
    } else
        console.log('adding 0min');
    cgtime = '0';
    console.log(cgtime);
    document.getElementById('updateUserschoolgtime').value = cgtime;
    return true;
}
