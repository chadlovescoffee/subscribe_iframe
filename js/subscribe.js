
subscribe = {

  app: function() {

    // Required Js
    var required_js = 'js/materialize.min.js';

    // Append Required JS
    if (!$('head script[src="' + required_js + '"]').length > 0) {
      $('head').append('<script type="text/javascript" src="' + required_js + '"></script>');
    }



    // Required CSS
    var required_css = [
      'http://fonts.googleapis.com/icon?family=Material+Icons',
      'css/materialize.min.css',
      'css/subscribe.css'
    ];


    // Append Required CSS
    var i = 0;
    var css_html = '';

    $(required_css).each(function () {
      if (!$('head link[href="' + required_css[i] + '"]').length > 0) {
        css_html += '<link href="' + required_css[i] + '" rel="stylesheet">';
      }
      ++i;
    });

    $('head').append(css_html);




    // Destination
    var destination = subscribe_setup.destination;


    // Initial Form
    var initial_form_html =
    '<div class="initial_form_container column_wrapper">' +
    '<h3 class="center-align subscribe_heading">Subscribe</h3>' +
    ' <p class="tagline center-align">Receive early access to concert tickets, exclusive meet & greets, and more!</p>'  +



    // Email Input Container
    ' <div class="email_col">' +

          // email input
    '    <div class="email_container input-field">' +
    '      <input id="email" type="email" class="validate email_input">' +
    '      <label class="email_label" for="email">Email</label>' +
    '    </div>' +

          // Agree to terms checkbox
    '     <div class="agree_container">' +
    '       <input type="checkbox" id="check_terms">' +
    '       <label for="check_terms" class="text">' +
    '          I agree with the <a href="http://www.warnermusic.ca/terms-of-use/" target="_blank">Terms of Use</a>' +
    '          and <a href="http://www.warnermusic.ca/privacy-policy/" target="_blank">Privacy Policy</a>.' +
    '       </label>' +
    '     </div>' +

    ' </div>' + // End email_column

    // Subscribe Button Container
    ' <div class="first subscribe_container blocked submit_col">' +
    '   <a class="first subscribe_button btn-floating waves-effect waves-light disabled"><i class="material-icons">add</i></a>' +
    ' </div>' +

    '</div>';



    // Secondary form HTML
    var secondary_form_html =
    '<div class="secondary_form_container">' +

    '<div class="row">' +

    // Name
    '    <div class="input-field col s6">' +
    '      <input id="name" type="text">' +
    '      <label for="name" class="name_label">First Name</label>' +
    '    </div>' +

    //Birth Date select
    '   <div class="input-field col s6">' +
    '     <input type="date" class="datepicker">' +
    '     <label class="date_label" for="date">Birth Date</label>' +
    '   </div>' +

    '</div>' +


    '<div class="row">' +

    // Postal Code
    '    <div class="input-field col s6">' +
    '      <input id="postal" type="text">' +
    '      <label for="postal">Postal Code</label>' +
    '    </div>' +

    //Country select
    '   <div class="input-field col s6">' +
    '     <select id="country">' +
    countryList() +
    '     </select>' +
    '     <label class="country_label" for="country">Country</label>' +
    '   </div>' +

    '</div>' + // end row


    '<div class="row">' +

    // Checkbox Warner
    '  <div class="col s12 check_warner">' +
    '    <p>' +
    '      <input type="checkbox" id="check_warner" />' +
    '      <label for="check_warner">Subscribe to Warner Music Canada for updates, contests, and music.</label>' +
    '    </p>' +
    '  </div>' +

    '</div>' + //end row


    // finish Button
    ' <div class="row">' +
    '   <div class="last subscribe_container col s12 m3 blocked">' +
    '    <button class="last subscribe_button btn waves-effect waves-light disabled browser-default modal-action modal-close" type="submit" name="action">' +
    '       Finish' +
    '     </button>' +
    '   </div>' +
    ' </div>' +

    '</div>'; // end secondary_form_container



    // Terms Modal
    var terms_modal =
    '<div id="terms_modal" class="modal modal-fixed-footer">' +
    '  <div class="modal-content">' +

    '     <div class="valign-wrapper">' +
    '      <div class="preloader-wrapper small active">' +
    '      <div class="spinner-layer spinner-green-only">' +
    '        <div class="circle-clipper left">' +
    '          <div class="circle"></div>' +
    '        </div><div class="gap-patch">' +
    '          <div class="circle"></div>' +
    '        </div><div class="circle-clipper right">' +
    '          <div class="circle"></div>' +
    '        </div>' +
    '      </div>' +
    '      </div>' +
    '     </div>' +

    '  </div>' +
    '  <div class="modal-footer">' +
    '    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>' +
    '  </div>' +
    '</div>';


    // Privacy Modal
    var privacy_modal =
    '<div id="privacy_modal" class="modal modal-fixed-footer">' +
    '  <div class="modal-content">' +

    '     <div class="valign-wrapper">' +
    '      <div class="preloader-wrapper small active">' +
    '      <div class="spinner-layer spinner-green-only">' +
    '        <div class="circle-clipper left">' +
    '          <div class="circle"></div>' +
    '        </div><div class="gap-patch">' +
    '          <div class="circle"></div>' +
    '        </div><div class="circle-clipper right">' +
    '          <div class="circle"></div>' +
    '        </div>' +
    '      </div>' +
    '      </div>' +
    '     </div>' +

    '   </div>' +
    '  <div class="modal-footer">' +
    '    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>' +
    '  </div>' +
    '</div>';




    // Document Ready
    $(document).ready(function() {
      $(destination).html('<div class="subscribe_pkg" style="display: none;">' + initial_form_html + secondary_form_html + terms_modal + privacy_modal + '</div>');
      $('select').material_select();
    });


    // INITIAL FORM -------------

    //Email unfocus / unblock subscribe
    $(destination + ' #email').focusout(function() {
      setTimeout(function(){
        unblock_subscribe();
      }, 400);
    });

    // Agree to Terms check
    $(document).on('click', destination + ' #check_terms', function() {
      $(destination + ' #check_terms').toggleClass('checked');
        unblock_subscribe();
    });

    // // terms link
    // $(document).on('click', destination + ' .terms.link', function() {
    //   $(destination + ' #terms_modal .modal-content').load('http://www.warnermusiccanada.com/scripts/subscribe/terms.html');
    //   $(destination + ' #terms_modal').openModal();
    // });
    //
    // // privacy link
    // $(document).on('click', destination + ' .privacy.link', function() {
    //   $(destination + ' #privacy_modal .modal-content').load('http://www.warnermusiccanada.com/scripts/subscribe/privacy.html');
    //   $(destination + ' #privacy_modal').openModal();
    // });


    // Unblock first subscribe button
    function unblock_subscribe() {

      if( $(destination + ' #email').hasClass('valid') && $(destination + ' #check_terms').hasClass('checked')){
        console.log('unblock');
        $(destination + ' .first.subscribe_button').removeClass('disabled');
        $(destination + ' .first.subscribe_container  ').css('pointer-events', 'auto');

      } else {
        $(destination + ' .first.subscribe_button').addClass('disabled')
        $(destination + ' .first.subscribe_container').css('pointer-events', 'none');
      }
    }

    // Initial Submit Click
    $(document).on('click', destination + ' .first.subscribe_button', function() {

      var initial_form_results = {
        'cdc_id': subscribe_setup.cdc_id,
        'datasource': subscribe_setup.datasource,
        'email': $(destination + ' #email').val()
      }

      $.getJSON('http://www.warnermusic.ca/feeds/cdc_subscribe.php?callback=?', initial_form_results, function(data) {
         $(destination + ' .initial_form_container').css('display', 'none');
         $(destination + ' .secondary_form_container').slideToggle(800);
         $(destination + ' .secondary_form_container #country').val(data.country);
         $(destination + ' .secondary_form_container #country').material_select();
      })
    });



    // SECONDARY FORM -------------

    // Date Picker
    $(destination + ' .datepicker').pickadate({
      onOpen: function() {
        $(destination + ' .date_label').addClass('active');
      },
      onClose: function() {
        unblock_subscribe_last();
        if($(destination + ' .datepicker').val().length == 0){
         $(destination + ' .date_label').removeClass('active');
        }
      },
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 100, // Creates a dropdown of 99 years to control year
      max: true
    })


    // Check Warner Toggle
    var warner_check = '';
    $(document).on('click', destination + ' #check_warner', function() {
      $(destination + ' .check_warner').toggleClass('checked');

      if( $(destination + ' .check_warner').hasClass('checked') ){
        warner_check = 1;
      } else {
        warner_check = 0;
      }

      unblock_subscribe_last();
    });


    // Inputs focus-out
    $(destination + ' .secondary_form_container input').focusout(function() {
      unblock_subscribe_last();
    });


    // unblock subscribe last
    function unblock_subscribe_last() {
      if( $(destination + ' #name').val().length > 0 || $(destination + ' #postal').val().length > 0 || $(destination + ' .datepicker').val().length > 0 || $(destination + ' .check_warner').hasClass('checked') ){
        $(destination + ' .last.subscribe_button').removeClass('disabled');
        $(destination + ' .last.subscribe_container').css('pointer-events', 'auto');
      } else {
        $(destination + ' .last.subscribe_button').addClass('disabled')
        $(destination + ' .last.subscribe_container').css('pointer-events', 'none');
      }
    }


    // final submit click
    $(document).on('click', destination + ' .last.subscribe_button', function() {

      var final_form_results = {
        'cdc_id': subscribe_setup.cdc_id,
        'datasource': subscribe_setup.datasource,
        'email': $(destination + ' #email').val(),
        'name': $(destination + ' #name').val(),
        'country': $(destination + ' #country').val(),
        'postal': $(destination + ' #postal').val(),
        'birth_date': $.trim($(destination + ' .datepicker').val()),
        'warner_subscribe': warner_check
      }


      $.getJSON('http://www.warnermusic.ca/feeds/cdc_subscribe.php?callback=?', final_form_results, function(data) {
        Materialize.toast('Thanks for subscribing!', 4000);

        // Reset Initial Form
        $(destination + ' .initial_form_container').fadeIn();
        $(destination + ' .initial_form_container #email').val('').removeClass('valid');
        $(destination + ' .initial_form_container .email_label').removeClass('active');
        $(destination + ' .initial_form_container #check_terms').removeClass('checked');
        $(destination + ' .initial_form_container #check_terms').attr('checked', false);
        unblock_subscribe();

        // Reset Secondary form
        $(destination + ' .secondary_form_container').slideToggle(500);
        $(destination + ' .secondary_form_container #name').val('');
        $(destination + ' .secondary_form_container #postal').val('');
        $(destination + ' .secondary_form_container .datepicker').val('');
        $(destination + ' .secondary_form_container .check_warner').removeClass('checked');
        $(destination + ' .secondary_form_container #check_warner').attr('checked', false);
        $(destination + ' .secondary_form_container .last.subscribe_button').addClass('disabled');
        $(destination + ' .secondary_form_container .last.subscribe_container').css('pointer-events', 'none');
        $(destination + ' .secondary_form_container label').removeClass('active');
      });
    });

  } //end app

};

function countryList() {
  var html='' +
  '<option value="AF">Afghanistan</option>' +
  '<option value="AL">Albania</option>' +
  '<option value="DZ">Algeria</option>' +
  '<option value="AS">American Samoa</option>' +
  '<option value="AD">Andorra</option>' +
  '<option value="AO">Angola</option>' +
  '<option value="AI">Anguilla</option>' +
  '<option value="AQ">Antarctica</option>' +
  '<option value="AG">Antigua and Barbuda</option>' +
  '<option value="AR">Argentina</option>' +
  '<option value="AM">Armenia</option>' +
  '<option value="AW">Aruba</option>' +
  '<option value="AU">Australia</option>' +
  '<option value="AT">Austria</option>' +
  '<option value="AZ">Azerbaijan</option>' +
  '<option value="BS">Bahamas</option>' +
  '<option value="BH">Bahrain</option>' +
  '<option value="BD">Bangladesh</option>' +
  '<option value="BB">Barbados</option>' +
  '<option value="BY">Belarus</option>' +
  '<option value="BE">Belgium</option>' +
  '<option value="BZ">Belize</option>' +
  '<option value="BJ">Benin</option>' +
  '<option value="BM">Bermuda</option>' +
  '<option value="BT">Bhutan</option>' +
  '<option value="BO">Bolivia, Plurinational State Of</option>' +
  '<option value="BQ">Bonaire, Sint Eustatius and Saba</option>' +
  '<option value="BA">Bosnia and Herzegovina</option>' +
  '<option value="BW">Botswana</option>' +
  '<option value="BV">Bouvet Island</option>' +
  '<option value="BR">Brazil</option>' +
  '<option value="IO">British Indian Ocean Territory</option>' +
  '<option value="BN">Brunei Darussalam</option>' +
  '<option value="BG">Bulgaria</option>' +
  '<option value="BF">Burkina Faso</option>' +
  '<option value="BI">Burundi</option>' +
  '<option value="KH">Cambodia</option>' +
  '<option value="CM">Cameroon</option>' +
  '<option value="CA">Canada</option>' +
  '<option value="CV">Cape Verde</option>' +
  '<option value="KY">Cayman Islands</option>' +
  '<option value="CF">Central African Republic</option>' +
  '<option value="TD">Chad</option>' +
  '<option value="CL">Chile</option>' +
  '<option value="CN">China</option>' +
  '<option value="CX">Christmas Island</option>' +
  '<option value="CC">Cocos (Keeling) Islands</option>' +
  '<option value="CO">Colombia</option>' +
  '<option value="KM">Comoros</option>' +
  '<option value="CG">Congo</option>' +
  '<option value="CD">Congo, The Democratic Republic Of The</option>' +
  '<option value="CK">Cook Islands</option>' +
  '<option value="CR">Costa Rica</option>' +
  '<option value="HR">Croatia</option>' +
  '<option value="CU">Cuba</option>' +
  '<option value="CW">Curaçao</option>' +
  '<option value="CY">Cyprus</option>' +
  '<option value="CZ">Czech Republic</option>' +
  '<option value="CI">Côte D\'Ivoire</option>' +
  '<option value="DK">Denmark</option>' +
  '<option value="DJ">Djibouti</option>' +
  '<option value="DM">Dominica</option>' +
  '<option value="DO">Dominican Republic</option>' +
  '<option value="EC">Ecuador</option>' +
  '<option value="EG">Egypt</option>' +
  '<option value="SV">El Salvador</option>' +
  '<option value="GQ">Equatorial Guinea</option>' +
  '<option value="ER">Eritrea</option>' +
  '<option value="EE">Estonia</option>' +
  '<option value="ET">Ethiopia</option>' +
  '<option value="FK">Falkland Islands (Malvinas)</option>' +
  '<option value="FO">Faroe Islands</option>' +
  '<option value="FJ">Fiji</option>' +
  '<option value="FI">Finland</option>' +
  '<option value="FR">France</option>' +
  '<option value="GF">French Guiana</option>' +
  '<option value="PF">French Polynesia</option>' +
  '<option value="TF">French Southern Territories</option>' +
  '<option value="GA">Gabon</option>' +
  '<option value="GM">Gambia</option>' +
  '<option value="GE">Georgia</option>' +
  '<option value="DE">Germany</option>' +
  '<option value="GH">Ghana</option>' +
  '<option value="GI">Gibraltar</option>' +
  '<option value="GR">Greece</option>' +
  '<option value="GL">Greenland</option>' +
  '<option value="GD">Grenada</option>' +
  '<option value="GP">Guadeloupe</option>' +
  '<option value="GU">Guam</option>' +
  '<option value="GT">Guatemala</option>' +
  '<option value="GG">Guernsey</option>' +
  '<option value="GN">Guinea</option>' +
  '<option value="GW">Guinea-Bissau</option>' +
  '<option value="GY">Guyana</option>' +
  '<option value="HT">Haiti</option>' +
  '<option value="HM">Heard Island and McDonald Islands</option>' +
  '<option value="VA">Holy See (Vatican City State)</option>' +
  '<option value="HN">Honduras</option>' +
  '<option value="HK">Hong Kong</option>' +
  '<option value="HU">Hungary</option>' +
  '<option value="IS">Iceland</option>' +
  '<option value="IN">India</option>' +
  '<option value="ID">Indonesia</option>' +
  '<option value="IR">Iran, Islamic Republic Of</option>' +
  '<option value="IQ">Iraq</option>' +
  '<option value="IE">Ireland</option>' +
  '<option value="IM">Isle of Man</option>' +
  '<option value="IL">Israel</option>' +
  '<option value="IT">Italy</option>' +
  '<option value="JM">Jamaica</option>' +
  '<option value="JP">Japan</option>' +
  '<option value="JE">Jersey</option>' +
  '<option value="JO">Jordan</option>' +
  '<option value="KZ">Kazakhstan</option>' +
  '<option value="KE">Kenya</option>' +
  '<option value="KI">Kiribati</option>' +
  '<option value="KP">Korea, Democratic People\'s Republic Of</option>' +
  '<option value="KR">Korea, Republic of</option>' +
  '<option value="KW">Kuwait</option>' +
  '<option value="KG">Kyrgyzstan</option>' +
  '<option value="LA">Lao People\'s Democratic Republic</option>' +
  '<option value="LV">Latvia</option>' +
  '<option value="LB">Lebanon</option>' +
  '<option value="LS">Lesotho</option>' +
  '<option value="LR">Liberia</option>' +
  '<option value="LY">Libya</option>' +
  '<option value="LI">Liechtenstein</option>' +
  '<option value="LT">Lithuania</option>' +
  '<option value="LU">Luxembourg</option>' +
  '<option value="MO">Macao</option>' +
  '<option value="MK">Macedonia, the Former Yugoslav Republic Of</option>' +
  '<option value="MG">Madagascar</option>' +
  '<option value="MW">Malawi</option>' +
  '<option value="MY">Malaysia</option>' +
  '<option value="MV">Maldives</option>' +
  '<option value="ML">Mali</option>' +
  '<option value="MT">Malta</option>' +
  '<option value="MH">Marshall Islands</option>' +
  '<option value="MQ">Martinique</option>' +
  '<option value="MR">Mauritania</option>' +
  '<option value="MU">Mauritius</option>' +
  '<option value="YT">Mayotte</option>' +
  '<option value="MX">Mexico</option>' +
  '<option value="FM">Micronesia, Federated States Of</option>' +
  '<option value="MD">Moldova, Republic of</option>' +
  '<option value="MC">Monaco</option>' +
  '<option value="MN">Mongolia</option>' +
  '<option value="ME">Montenegro</option>' +
  '<option value="MS">Montserrat</option>' +
  '<option value="MA">Morocco</option>' +
  '<option value="MZ">Mozambique</option>' +
  '<option value="MM">Myanmar</option>' +
  '<option value="NA">Namibia</option>' +
  '<option value="NR">Nauru</option>' +
  '<option value="NP">Nepal</option>' +
  '<option value="NL">Netherlands</option>' +
  '<option value="NC">New Caledonia</option>' +
  '<option value="NZ">New Zealand</option>' +
  '<option value="NI">Nicaragua</option>' +
  '<option value="NE">Niger</option>' +
  '<option value="NG">Nigeria</option>' +
  '<option value="NU">Niue</option>' +
  '<option value="NF">Norfolk Island</option>' +
  '<option value="MP">Northern Mariana Islands</option>' +
  '<option value="NO">Norway</option>' +
  '<option value="OM">Oman</option>' +
  '<option value="PK">Pakistan</option>' +
  '<option value="PW">Palau</option>' +
  '<option value="PS">Palestinian Territory, Occupied</option>' +
  '<option value="PA">Panama</option>' +
  '<option value="PG">Papua New Guinea</option>' +
  '<option value="PY">Paraguay</option>' +
  '<option value="PE">Peru</option>' +
  '<option value="PH">Philippines</option>' +
  '<option value="PN">Pitcairn</option>' +
  '<option value="PL">Poland</option>' +
  '<option value="PT">Portugal</option>' +
  '<option value="PR">Puerto Rico</option>' +
  '<option value="QA">Qatar</option>' +
  '<option value="RO">Romania</option>' +
  '<option value="RU">Russian Federation</option>' +
  '<option value="RW">Rwanda</option>' +
  '<option value="RE">Réunion</option>' +
  '<option value="BL">Saint Barthélemy</option>' +
  '<option value="SH">Saint Helena, Ascension and Tristan Da Cunha</option>' +
  '<option value="KN">Saint Kitts And Nevis</option>' +
  '<option value="LC">Saint Lucia</option>' +
  '<option value="MF">Saint Martin (French Part)</option>' +
  '<option value="PM">Saint Pierre And Miquelon</option>' +
  '<option value="VC">Saint Vincent And The Grenadines</option>' +
  '<option value="WS">Samoa</option>' +
  '<option value="SM">San Marino</option>' +
  '<option value="ST">Sao Tome and Principe</option>' +
  '<option value="SA">Saudi Arabia</option>' +
  '<option value="SN">Senegal</option>' +
  '<option value="RS">Serbia</option>' +
  '<option value="SC">Seychelles</option>' +
  '<option value="SL">Sierra Leone</option>' +
  '<option value="SG">Singapore</option>' +
  '<option value="SX">Sint Maarten (Dutch part)</option>' +
  '<option value="SK">Slovakia</option>' +
  '<option value="SI">Slovenia</option>' +
  '<option value="SB">Solomon Islands</option>' +
  '<option value="SO">Somalia</option>' +
  '<option value="ZA">South Africa</option>' +
  '<option value="GS">South Georgia and the South Sandwich Islands</option>' +
  '<option value="SS">South Sudan</option>' +
  '<option value="ES">Spain</option>' +
  '<option value="LK">Sri Lanka</option>' +
  '<option value="SD">Sudan</option>' +
  '<option value="SR">Suriname</option>' +
  '<option value="SJ">Svalbard And Jan Mayen</option>' +
  '<option value="SZ">Swaziland</option>' +
  '<option value="SE">Sweden</option>' +
  '<option value="CH">Switzerland</option>' +
  '<option value="SY">Syrian Arab Republic</option>' +
  '<option value="TW">Taiwan, Province Of China</option>' +
  '<option value="TJ">Tajikistan</option>' +
  '<option value="TZ">Tanzania, United Republic of</option>' +
  '<option value="TH">Thailand</option>' +
  '<option value="TL">Timor-Leste</option>' +
  '<option value="TG">Togo</option>' +
  '<option value="TK">Tokelau</option>' +
  '<option value="TO">Tonga</option>' +
  '<option value="TT">Trinidad and Tobago</option>' +
  '<option value="TN">Tunisia</option>' +
  '<option value="TR">Turkey</option>' +
  '<option value="TM">Turkmenistan</option>' +
  '<option value="TC">Turks and Caicos Islands</option>' +
  '<option value="TV">Tuvalu</option>' +
  '<option value="UG">Uganda</option>' +
  '<option value="UA">Ukraine</option>' +
  '<option value="AE">United Arab Emirates</option>' +
  '<option value="GB">United Kingdom</option>' +
  '<option value="US">United States</option>' +
  '<option value="UM">United States Minor Outlying Islands</option>' +
  '<option value="UY">Uruguay</option>' +
  '<option value="UZ">Uzbekistan</option>' +
  '<option value="VU">Vanuatu</option>' +
  '<option value="VE">Venezuela, Bolivarian Republic of</option>' +
  '<option value="VN">Viet Nam</option>' +
  '<option value="VG">Virgin Islands, British</option>' +
  '<option value="VI">Virgin Islands, U.S.</option>' +
  '<option value="WF">Wallis and Futuna</option>' +
  '<option value="EH">Western Sahara</option>' +
  '<option value="YE">Yemen</option>' +
  '<option value="ZM">Zambia</option>' +
  '<option value="ZW">Zimbabwe</option>' +
  '<option value="AX">Åland Islands</option>';
  return html;
}
