$('#contact-form').on('submit', function (event) {

  $(this).find('p').text('');

  var emailRegExp = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
    phoneRegExp = /^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/,
    $name = $('#name'),
    $email = $('#email'),
    $phone = $('#phone'),
    $type = $('#type'),
    $submit = $('#submit'),
    userData = {
      name: $name.val().trim(),
      email: $email.val().trim(),
      phone: $phone.val().trim(),
      type: $type.val().trim()
    },
    isValid = true;

  $submit.attr('disabled', true);

  if (userData.name.length < 2 || userData.name.length > 50) {
    $name.next().text(' * Name is required');
    isValid = false;
  }

  if (!emailRegExp.test(userData.email)) {
    $email.next().text(' * A valid email is required');
    isValid = false;
  }

  if (!phoneRegExp.test(userData.phone)) {
    $phone.next().text(' * A valid phone is required');
    isValid = false;
  }

  if (userData.type == '') {
    $type.next().text(' * Please choose type');
    isValid = false;
  }

  if (!isValid) {
    $submit.attr('disabled', false);
  } else {

    $.ajax({
      url: '/app/server.php',
      type: 'POST',
      dataType: 'html',
      data: userData,
      success: function (res) {
        if (res == 1) {
          window.location = 'tnx.html';
        } else {
          $submit.next().text(' * Problem saving your details');
        }
      }
    });

  }

  event.preventDefault();
});