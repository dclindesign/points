// Userlist data array for filling in info box
var userListData = [];

//toggle school time by username
function toggledojo() {
    console.log('launch toggledojo');
    $('#dojo').toggle();
    //  $('#inputUsercolor').toggle();
}

function togglecolor() {
    console.log('launch togglecolor');
    //  $('#inputUserdojopoints').toggle();
    $('#color').toggle();
}

function toggleclass() {
    console.log('launch toggleclass');
    var classuser = document.getElementById('inputUsername').value;
    console.log(classuser);
    //    if (($('select#inputUsercolor').is(':visible')) && ($('input#inputUserdojopoints').is(':visible'))){
    //     togglecolor();
    //     toggledojo();
    //}
    if (classuser == 'Dustin') {
        if (($('select#inputUsercolor').is(':visible')) && ($('input#inputUserdojopoints').is(':hidden'))) {
            togglecolor();
            toggledojo();
        } else
        if (($('select#inputUsercolor').is(':visible')) && ($('input#inputUserdojopoints').is(':visible'))) {
            togglecolor();
        } else {}
    } else
    if (classuser == 'Matthew') {
        if (($('select#inputUsercolor').is(':hidden')) && ($('input#inputUserdojopoints').is(':visible'))) {
            togglecolor();
            toggledojo();
        } else
        if (($('select#inputUsercolor').is(':visible')) && ($('input#inputUserdojopoints').is(':visible'))) {
            toggledojo();
        } else {}
    } else {}
}
// convert time based on username
function convertusertime() {
    var convertname = $('#addUser fieldset select#inputUsername').val();
    if (convertname == 'Dustin') {
        convertdtime();
    } else {
        convertctime();
    }
}
// changetime dojotime
function convertdtime() {
    //  var convertname = $('#addUser fieldset select#inputUsername').val();
    var convertdojopoints = $('#addUser fieldset input#inputUserdojopoints').val();
    var convertusercolor = $('#addUser fieldset select#inputUsercolor').val();
    if ((convertdojopoints == '1') && (convertusercolor == 'N/A')) {
        console.log('adding 60min');
        cgtime = '60';
        console.log(cgtime);
        document.getElementById('inputUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((convertdojopoints == '2') && (convertusercolor == 'N/A')) {
        console.log('adding 90min');
        cgtime = '90';
        console.log(cgtime);
        document.getElementById('inputUserschoolgtime').value = cgtime;
        return true;
    } else
        console.log('adding 0min');
    cgtime = '0';
    console.log(cgtime);
    document.getElementById('inputUserschoolgtime').value = cgtime;
    return true;
}

function convertctime() {
    //    var convertname = $('#addUser fieldset input#inputUsername').val();
    var convertdojopoints = $('#addUser fieldset input#inputUserdojopoints').val();
    var convertusercolor = $('#addUser fieldset select#inputUsercolor').val();

    console.log('starting convertctime');
    console.log(convertusercolor);
    if ((convertusercolor == 'Purple') && (convertdojopoints === '' || '0')) {
        console.log('adding 18min');
        cgtime = '18';
        console.log(cgtime);
        document.getElementById('inputUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((convertusercolor == 'Blue') && (convertdojopoints === '' || '0')) {
        console.log('adding 15min');
        cgtime = '15';
        console.log(cgtime);
        document.getElementById('inputUserschoolgtime').value = cgtime;
        return true;
    } else
    if ((convertusercolor == 'Red') && (convertdojopoints === '' || '0')) {
        console.log('adding 12min');
        cgtime = '12';
        console.log(cgtime);
        document.getElementById('inputUserschoolgtime').value = cgtime;
        return true;
    } else
        console.log('adding 0min');
    cgtime = '0';
    console.log(cgtime);
    document.getElementById('inputUserschoolgtime').value = cgtime;
    return true;
}
