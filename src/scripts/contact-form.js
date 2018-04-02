$(document).ready(function () {

  $('#submit').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    const form = $('contactForm');

    const email = $('#contactEmail').val(),
      name = $('#contactName').val(),
      subject = $('#contactSubject').val(),
      message = $('#contactMessage').val();

    $.ajax({
      type: 'POST',
      url: 'https://d5hcufbemj.execute-api.eu-west-1.amazonaws.com/prod',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        name: name,
        subject: subject,
        message: message
      }),
      success: sendSuccessHandler,
      error: sendErrorHandler
    });

  });

  function sendSuccessHandler(result) {
    console.log('Send!', result);
  }

  function sendErrorHandler(error) {
    console.log('Failed sending data', error);

  }

});