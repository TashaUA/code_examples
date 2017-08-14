
$(document).ready(function () {

    function validateForm(form) {
        var validated = true,
            re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,20}(?:\.[a-z]{2})?)$/i,
            rd = /\d/;

        $(form).find("input[type='text']").each(function () {
            if ($(this).attr('placeholder') && $(this).attr('placeholder') === $(this).val()) $(this).val('');

            if (($.trim($(this).val()).length < 3)) {
                $(this).addClass("highlight");
                validated = false;
            }
            else {
                if ($(this).attr('id') === 'email') {
                    if (re.test($(this).val())) {
                        $(this).removeClass("highlight");
                    } else {
                        $(this).addClass("highlight");
                        validated = false;
                    }
                } else if ($(this).attr('id') === 'phone') {
                    if ((rd.test($(this).val()) && ($.trim($(this).val()).length > 6)) && $(this).val() !== '0') {
                        $(this).removeClass("highlight");
                    } else {
                        $(this).addClass("highlight");
                        validated = false;
                    }
                } else {
                    $(this).removeClass("highlight");
                }
            }
        });

        $(form).find("select").each(function () {
            if ($(this).val() === 0) {
                $(this).parent().addClass("highlight");
                validated = false;
            } else {
                $(this).parent().removeClass("highlight");
            }
        });

        return validated;
    }

    $('.wrapper').on('submit', '#tradingForm', function (e) {
        e.preventDefault();
        var validated = validateForm(this);
        if (validated) {
            var postData = {
                'email': $('input[name="email"]').val()
            };
            $.ajax({
                type: "POST",
                url: 'ajax_response.php',
                data: postData,
                success: function (result) {

                    if (result) {
                        $(".errorMessage").html('<p>Registration successful</p>');
                    }
                    else {
                        $(".errorMessage").html('Please, enter valid \'Email\'');
                    }
                },
                error: function () {
                    console.log('error');
                }
            });
        } else {
            $(this).find('.errorMessage').html('Please, fill in correctly all fields');
        }
        return false;
    });


    $("input[type='text']").each(function () {
        var el = $(this);
        if (!('placeholder' in el)) {
            el.focus(function () {
                if (el.val() === el.attr('placeholder')) {
                    el.val('');
                }
            }).blur(function () {
                if (el.val() === '') {
                    el.val(el.attr('placeholder'));
                }
            }).blur();
        }
    });

});
