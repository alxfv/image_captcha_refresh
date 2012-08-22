(function ($) {

  Drupal.behaviors.imageCaptchaRefresh = {
    attach: function (context) {
      var link = $('#reload-captcha');
      if (link.length > 0) {
        var date = new Date();
        link.not('.processed').bind('click', function () {
          $(this).addClass('processed');
          // send post query for getting new captcha data
          var url = this.href + '?' + date.getTime();
          $.get(
            url,
            {},
            function (response) {
              if(response.status == 1) {
                $('.captcha').find('img').attr('src', response.data.url);
                $('input[name=captcha_sid]').val(response.data.sid);
                $('input[name=captcha_token]').val(response.data.token);
              }
              else {
                alert(response.message);
              }
            },
            'json'
            );
          return false;
        });
      }
    }
  };
})(jQuery);