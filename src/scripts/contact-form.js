$(document).ready(function () {
  let isLoading = false;

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
        },
        agreement: {
          required: true
        }
      },
      messages: {
        email: 'Bitte geben Sie eine g&uumlltige E-Mail Adresse an, damit ich Sie kontaktieren kann.',
        name: 'Bitte geben Sie Ihren Namen an.',
        subject: 'Bitte geben Sie Ihren Betreff an.',
        message: 'Bitte geben Sie Ihre Nachricht an.',
        agreement: 'Bitte akzeptieren Sie die Datenschutzerklärung.'
      },
      submitHandler: () => {
        $('#contactForm').ajaxSubmit(() => {
          if (!isLoading) {
            isLoading = true;
            $('#submit-animate').addClass('loading');
            callLambda();
            return false;
          }

          return false;
        });
      }
    });
  });

  function callLambda() {
    const email = $('#contactEmail').val(),
      name = $('#contactName').val(),
      subject = $('#contactSubject').val(),
      message = $('#contactMessage').val(),
      agreement = $('#contactAgreement').val();

    $.ajax({
      type: 'POST',
      url: 'https://d5hcufbemj.execute-api.eu-west-1.amazonaws.com/prod',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        name: name,
        subject: subject,
        message: message,
        agreement: agreement
      }),
      success: sendSuccessHandler,
      error: sendErrorHandler
    });
  }

  function sendSuccessHandler(result) {
    $('#submit-success').show();
    $('#submit-error').hide();
    $('#submit-animate').removeClass('loading');
    $('#submit-animate').addClass('sent');
    console.log('Send!', result);
  }

  function sendErrorHandler(error) {
    console.log('Failed sending data', error);
    $('#submit-success').hide();
    $('#submit-error').show();
    $('#submit-animate').removeClass('loading');
    $('#submit-animate').addClass('sent');

    isLoading = false;
  }

});