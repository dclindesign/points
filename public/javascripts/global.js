// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

        // Username link click
        $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

        // Add User button click
        $('#btnAddUser').on('click', addUser);

            // Delete User link click
        $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

//Start the update user process
        $('#userList table tbody').on('click', 'td a.linkupdateuser', changeUserInfo);

 // Cancel Update User button click

  $('#btnCancelUpdateUser').on('click', togglePanels);

  // Add class to updated fields

$('#updateUser input').on('change', function(){$(this).addClass('updated')});

// Update User button click

 $('#btnUpdateUser').on('click', updateUser);

 //on page load
 populateTable();
  });

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {


          // Stick our user data array into a userlist variable in the global object
          userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.date + '">' + this.date + '</a></td>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a>/<a href="#" class="linkupdateuser" rel="' + this._id + '">update</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
}

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
  //  var thisUserName = $(this).attr('rel');
//console.log(thisUserName);
// Retrieve ID from link rel attribute
var _Date = $(this).attr('rel');
console.log(_Date);
    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.date; }).indexOf(_Date);
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfodate').text(thisUserObject.date);
    $('#userInfoname').text(thisUserObject.name);
    $('#userInfodojopoint').text(thisUserObject.dojopoint);
    $('#userInfocolor').text(thisUserObject.color);
    $('#userInfoschoolGtime').text(thisUserObject.schoolGtime);
    $('#userInfokumonGtime').text(thisUserObject.kumonGtime);
    $('#userInfochinesepoints').text(thisUserObject.chinesepoints);
    $('#userInfousedGtime').text(thisUserObject.usedGtime);

   }

   // Add User
   function addUser(event) {
       event.preventDefault();

       // Super basic validation - increase errorCount variable if any fields are blank
       var errorCount = 0;
       $('#addUser input').each(function(index, val) {
           if($(this).val() === '') { errorCount++; }
       });

       // Check and make sure errorCount's still at zero
       if(errorCount === 0) {

           // If it is, compile all user info into one object
           var newUser = {
               'date': $('#addUser fieldset input#inputUserDate').val(),
               'name': $('#addUser fieldset select#inputUserName').val(),
               'dojopoints': $('#addUser fieldset input#inputUserDojoPoints').val(),
               'color': $('#addUser fieldset input#inputUserColor').val(),
               'schoolGtime': $('#addUser fieldset input#inputUserSchoolGtime').val(),
               'kumonGtime': $('#addUser fieldset select#inputUserkumonGtime').val(),
               'chinesepoints': $('#addUser fieldset input#inputUserChinesePoints').val(),
               'usedGTime': $('#addUser fieldset input#inputUserUsedGTime').val()
           };

           // Use AJAX to post the object to our adduser service
           $.ajax({
               type: 'POST',
               data: newUser,
               url: '/users/adduser',
               dataType: 'JSON'
           }).done(function( response ) {

               // Check for successful (blank) response
               if (response.msg === '') {

                   // Clear the form inputs
                   $('#addUser fieldset input').val('');

                   // Update the table
                   populateTable();

               }
               else {

                   // If something goes wrong, alert the error message that our service returned
                   alert('Error: ' + response.msg);

               }
           });
       }
       else {
           // If errorCount is more than 0, error out
           alert('Please fill in all fields');
           return false;
       }
   }

   // Delete User
   function deleteUser(event) {

       event.preventDefault();

       // Pop up a confirmation dialog
       var confirmation = confirm('Are you sure you want to delete this user?');

       // Check and make sure the user confirmed
       if (confirmation === true) {

           // If they did, do our delete
           $.ajax({
               type: 'DELETE',
               url: '/users/deleteuser/' + $(this).attr('rel')
           }).done(function( response ) {

               // Check for a successful (blank) response
               if (response.msg === '') {
               }
               else {
                   alert('Error: ' + response.msg);
               }

               // Update the table
               populateTable();

           });

       }
       else {

           // If they said no to the confirm, do nothing
           return false;

       }}
       var Fb = {}; //An empty object literal for holding the function
       Fb.log = function(obj, consoleMethod) {
         if (typeof consoleMethod === "string" && typeof console[consoleMethod] === "function") {
           console[consoleMethod](obj);
         } else {
           console.log(obj);
         }
       };

       // Toggle addUser and updateUser panels

       function togglePanels(){
           $('#addUserPanel').toggle();
           $('#updateUserPanel').toggle();
         }

         // put User Info into the 'Update User Panel'
         function changeUserInfo(event) {
           //
           event.preventDefault();

           // If the addUser panel is visible, hide it and show updateUser panel
           if($('#addUserPanel').is(":visible")){
             togglePanels();
           }

           // Get Index of object based on _id value
           var _id = $(this).attr('rel');
           var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(_id);
           console.log(JSON.stringify(arrayPosition));
           // Get our User Object
           var thisUserObject = userListData[arrayPosition];
           console.log("updateuser =" + JSON.stringify(thisUserObject));
           // Populate Info Box
           $('#updateUserName').val(thisUserObject.name);
           $('#updateUserDate').val(thisUserObject.date);
           $('#updateUserDojoPoints').val(thisUserObject.dojopoints);
           $('#updateUserColor').val(thisUserObject.color);
           $('#updateUserSchoolGtime').val(thisUserObject.schoolGtime);
           $('#updateUserkumonGtime').val(thisUserObject.kumonGtime);
           $('#updateUserChinesePoints').val(thisUserObject.chinesepoints);
           $('#updateUserUsedGTime').val(thisUserObject.usedGtime);

           // Put the userID into the REL of the 'update user' block
           $('#updateUser').attr('rel',thisUserObject._id);
         }

         // Update User
         function updateUser(event) {
           console.log("In Update User");
           event.preventDefault();

           // Pop up a confirmation dialog
           var confirmation = confirm('Are you sure you want to update this user?');

           // Check and make sure the user confirmed
           if (confirmation === true) {
             // If they did, do our update

             //set the _id of the user to be updated

           var _id = $(this).parentsUntil('div').parent().attr('rel');
             console.log("ID = " + _id);
             //create a collection of the updated fields
             var fieldsToBeUpdated = $('#updateUser input.updated');
         //    alert("fieldsToBeUpdated = " + JSON.stringify(fieldsToBeUpdated))
             Fb.log("fieldsToBeUpdated " + fieldsToBeUpdated, "object");

             //create an object of the pairs
             var updatedFields = {};
             $(fieldsToBeUpdated).each(function () {
               var key = $(this).attr('placeholder');
               //replace(" ", "").toLowerCase();
               console.log("Attribute " + $(this).attr('placeholder'));
               var value = $(this).val();
               console.log("Value =" + value);
               updatedFields[key] = value;
             });
          //   thisUserName = document.getElementById("updateUserName").value;
          //   console.log("Username =" + thisUserName);
             //updatedFields['gender'] = value;

             console.log("updatedFields = " + JSON.stringify(updatedFields));
             alert(JSON.stringify(updatedFields));
             //alert(updatedFields)
             // do the AJAX
             console.log("ajax starting");

$.ajax({
    type: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    url: '/users/updateuser/' + _id,
    data: JSON.stringify(updatedFields)
}).done(function( response ) {

               // Check for a successful (blank) response
               if (response.msg === '') {
                 togglePanels();
        //         console.log("Username =" + thisUserName);
          //       showUserInfo("test2");
                 console.log("updated success" + updatedFields);
               }
               else {
                 alert('Error: ' + response.msg);
                 console.log("updatedfailed");
               }

               // Update the table
               populateTable();

             });

           }
           else {

             // If they said no to the confirm, do nothing
             return false;

           }
         }
