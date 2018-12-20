$(document).on('click', '.icon-style, .a', function (event) {
      event.preventDefault();    // Now the link doesn't do anything
      var href = this.href;      // The link's URL is in this variable
    });
    $(document).ready(function () {
      $('.dlg-wrapper').hide()
      $('.dlg-wrapper-edit').hide()
      $('.dlg-wrapper-email').hide()
      $('.dlg-wrapper-emailconfirm').hide()
      $('.dlg-box').hide();
      $('.dlg-box-edit').hide();
      $('.dlg-box-email').hide();
      $('.dlg-box-emailconfirm').hide();

      //Cancel Delete
      $('.dlg-footer button').click(function () {
        $('.dlg-wrapper').fadeOut();
        $('.dlg-box').hide();
      })

      //Delete Order
      $('.dlg-footer .a').click(function () {
        $('.dlg-wrapper').fadeOut();
        $('.dlg-box').hide();
      })

      //Open Delete Modal
      $('.trash').click(function () {
        $('.dlg-wrapper').fadeIn();
        $('.dlg-box').fadeIn();
      })

      // Discard Changes on Edit
      $('.dlg-box-edit .dlg-footer button').click(function () {
        $('.dlg-wrapper-edit').fadeOut();
        $('.dlg-box-edit').hide();
      })

      // Save Changes on Edit
      $('.dlg-box-edit .dlg-footer .a').click(function () {
        $('.dlg-wrapper-edit').fadeOut();
        $('.dlg-box-edit').hide();
      })

      // Open Edit Modal
      $('.edit').click(function () {
        $('.dlg-wrapper-edit').fadeIn();
        $('.dlg-box-edit').fadeIn();
      })

      // Implement Dropdown
      $('.status button').click(function () {
        $('.dropdown').toggleClass('show_dropdown')
      });

      //Click anywhere in the document except class status and dropdown
      $(this).click(function (e) {
        $('.status')
          .not($('.status').has($(e.target)))
          .children('.dropdown')
          .removeClass('show_dropdown');
      })

      $(".profile").click(function(){
        $("#profile-dialog").toggleClass("show_dialogg")
      })
    
      $(this).click(function(e){
        $('#inner')
          .not($('#inner').has($(e.target)))
          .children('#profile-dialog')
          .removeClass('show_dialogg');
      })

      // Open Send Email
      $('#dlg-edit').click(function() {
        event.preventDefault()
        $('.dlg-wrapper-email').fadeIn();
        $('.dlg-box-email').fadeIn();
      })

      // Cancel Email
      $('#cancel-email-btn').click(function(){
        $('.dlg-wrapper-email').fadeOut();
        $('.dlg-box-email').fadeOut();
      })

      // Display all Orders made
      $('.dropdown .all').click(function () {
        $('.list-item').show();
      })

      // Display Delivered Orders
      $('.dropdown .delivered').click(function () {
        $('.item-not-delivered').hide();
        $('.item-delivered').show();
      })

      // Display Non delivered Orders
      $('.dropdown .not-delivered').click(function () {
        $('.item-not-delivered').show();
        $('.item-delivered').hide();
      })

      // Cancel Email Confirm
      $('#dlg-emailconfirm-btn').click(function(){
        $('.dlg-wrapper-emailconfirm').fadeOut()
        $('.dlg-box-emailconfirm').fadeOut()
      })

      //Nav Menu dropdown
      $('.menu').on('click', function() {
        $('.dropdown-two').toggle()
      })

      $('.dropdown .all').click(function() {
        $('.list-item').show();
      })
      $('.dropdown .delivered').click(function() {
        $('.item-not-delivered').hide();
        $('.item-in-transit').hide();
        $('.item-delivered').show();
      })
      $('.dropdown .not-delivered').click(function() {
        $('.item-not-delivered').show();
        $('.item-in-transit').hide();
        $('.item-delivered').hide();
      })
      $('.dropdown .in-transit').click(function() {
        $('.item-not-delivered').hide();
        $('.item-in-transit').show();
        $('.item-delivered').hide();
      })
    });
