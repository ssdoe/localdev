"use strict";

import * as Popper from "@popperjs/core"
import * as bootstrap from 'bootstrap'
import $ from 'jquery'

window.$ = window.jQuery = $



$(function () {

  var feedback = {}

  // Model: Default data settings
  //-------------------------------------------------------------------------/
  feedback.model = {
    h: "", // Was this page helpful?: 1 = yes, 0 = no
    u: "", // The current page URL
    c: "", // Feedback content
    f: "", // Honeypot field. If left blank then a human has submitted the form.
    k: "", // User wished to be contacted
    p: "", // Preferred method of contact
    n: "", // Name of user requesting contact
    e: "", // Email of user requesting contact
    t: "" // Telephone number of user requesting contact
  };

  // Controller: Store Feedback form data
  //---------------------------------------------------------------/
  feedback.store = function (wasHelpful) {

    // Get Form data, store data
    // u, f, h, c
    feedback.model.u = window.location.href;
    feedback.model.f = $('#eds-c-page-feedback-form__honeypot').val();
    feedback.model.h = wasHelpful ? 1 : 0;//$('input.eds-c-helpful:checked').length > 0 ? 1 : 0;
    feedback.model.c = $('#eds-c-page-feedback-form__comments').val();
    feedback.model.k = $('#eds-c-page-feedback-form__contact-me:checked').length > 0 ? 1 : 0;
    feedback.model.p = $('#eds-c-page-feedback-form__contact-method-radios--email:checked').length > 0 ? 1 : 0;
    feedback.model.n = $('#eds-c-page-feedback-form__name').val() || 'not provided';
    feedback.model.e = $('#eds-c-page-feedback-form__email').val() || 'not provided';
    feedback.model.t = $('#eds-c-page-feedback-form__phone').val() || 'not provided';
    return true;
  };

  // Controller: Send Feedback form data, display result
  //---------------------------------------------------------------/
  feedback.send = function () {
    // Get stored Form data
    console.log('%cFEEDBACK SUBMITTED: ', 'background: #222; color: #ffffff');
    console.log('page: ' + feedback.model.u);
    console.log('was this page helpful: ' + feedback.model.h);
    console.log('comments: ' + feedback.model.c);
    console.log('like to be contacted: ' + feedback.model.k);
    console.log('preferred contact method: ' + feedback.model.p);
    console.log('name: ' + feedback.model.n);
    console.log('email address: ' + feedback.model.e);
    console.log('phone number: ' + feedback.model.t);
    console.log('------------------------------------');

    // Send Form data
    $.ajax({
      method: "POST",
      url: 'http://localhost:8080/pages/tickets/pws2064',
      data: feedback.model,
      cache: false,
      success: function (data) {
        return data
        // console.log(data)
      }
    }).done(function (data) {
      console.log("Feedback complete");
      console.log(data)
      // Reset the form back to the original slide
      //$('.eds-c-page-feedback-form').slick('slickGoTo', parseInt(0));
    });

  }


  // // Get html for contact slide which will be shown or hidden based on user input
  // if ($('.eds-c-page-feedback-form__slide--contact-details').elementExists()) {
  //   $contact = $('.eds-c-page-feedback-form__slide--contact-details').get(0).outerHTML;
  // }
  // var removedContact = 0;
  var wasHelpful = false;

  var yesFeedbackButton = "eds-c-page-feedback-form__button--yes"
  var noFeedbackButton = "eds-c-page-feedback-form__button--no"
  var cancelFeedbackForm = "eds-c-page-feedback-form__button--cancel"
  var submitFeedbackForm = "eds-c-page-feedback-form__button--submit"
  var returnFeedbackForm = "eds-c-page-feedback-form__button--return"
  var contactFeedbackForm = "eds-c-page-feedback-form__button--contact"
  var goBackContact = "eds-c-page-feedback-form__button--go-back"
  var $yesFeedbackCheckBox = $("#eds-c-page-feedback-form__was-this-page-helpful--yes")
  var $noFeedbackCheckBox = $("#eds-c-page-feedback-form__was-this-page-helpful--no")

  var current = 1, current_step, next_step, steps;
  // steps = $("fieldset").length;
  // console.log(steps)

  var $btns = $("button");

  $btns.each(function () {
    $(this).on('click', function () {

      current_step = $(this).parents("fieldset");
      next_step = $(this).parents("fieldset").next();


      if ($(this).hasClass(yesFeedbackButton) || $(this).hasClass(noFeedbackButton)) {
        current_step;
        next_step;
        next_step.fadeIn();
        current_step.hide();
        if ($(this).hasClass(yesFeedbackButton)) {
          $yesFeedbackCheckBox.prop("checked", true);
        } else if ($(this).hasClass(noFeedbackButton)) {
          $noFeedbackCheckBox.prop("checked", true);
        }
      } else if ($(this).hasClass(cancelFeedbackForm)) {
        current_step;
        next_step = $("#firstStep");
        next_step.fadeIn();
        current_step.hide();
        $yesFeedbackCheckBox.prop("checked", false);
        $noFeedbackCheckBox.prop("checked", false);
        $('#eds-c-page-feedback-form__comments').val("");
      } else if ($(this).hasClass(submitFeedbackForm)) {
        current_step;
        next_step = $("#thanksStep");
        next_step.fadeIn();
        current_step.hide();
        feedback.store(wasHelpful);
        feedback.send();
      } else if ($(this).hasClass(returnFeedbackForm) || $(this).hasClass(goBackContact)) {
        current_step;
        next_step = $("#firstStep");
        next_step.fadeIn();
        current_step.hide();
        $('#eds-c-page-feedback-form__comments').val("");
      } else if ($(this).hasClass(contactFeedbackForm)) {
        current_step;
        next_step = $("#contactDetails");
        next_step.fadeIn();
        current_step.hide();
        $('#contactDetails input').val("");
      }
    })
  });



  var menuID = '';
  $(".main-nav__list li").each(function () {
    $(this).prev("li").attr("id", "menu-" + menuID++);
  });


  // Recursive Unordered List to JSON
  //------------------------------------------------------
  var out = [];
  $(".addclasschildren ul li ul").addClass("children");
  function processOneLi(node) {
    // $("#doemenu ul li ul").addClass('childern')
    var aNode = node.children("a:first");
    var retVal = {
      "title": aNode.attr("title"),
      "url": aNode.attr("href"),
      "name": aNode.text()
    };
    node.find("> .children > li").each(function () {
      if (!retVal.hasOwnProperty("children")) {
        retVal.children = [];
      }
      retVal.children.push(processOneLi($(this)));
    });

    return retVal;
  }

  $("#doemenu").children("li").each(function () {
    out.push(processOneLi($(this)));
  });
  console.log("got the following JSON from your HTML:", JSON.stringify(out));
  $("#result").html(JSON.stringify(out, undefined, 2));
});



(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();