$(document).ready(function () {

  $('#submit').click(function (event) {
    const form = $('#contactForm');
    form.validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        name: {
          required: true
        },
        subject: {
          required: true
        },
        message: {
          required: true
        }
      },
      messages: {
        email: 'Bitte geben Sie eine g&uumlltige E-Mail Adresse an, damit ich Sie kontaktieren kann.',
        name: 'Bitte geben Sie Ihren Namen an.',
        subject: 'Bitte geben Sie Ihren Betreff an.',
        message: 'Bitte geben Sie Ihre Nachricht an.'
      },
      submitHandler: () => {
        $('#contactForm').ajaxSubmit(() => {
          callLambda();
          return false;
        });
      }
    });
  });

  function callLambda() {
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
  }

  function sendSuccessHandler(result) {
    console.log('Send!', result);
  }

  function sendErrorHandler(error) {
    console.log('Failed sending data', error);

  }

});