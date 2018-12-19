$(document).ready(function() {

  $('.dlg-wrapper-edit, .dlg-wrapper, .dlg-wrapper-prof, .dlg-wrapper-alert, .dlg-wrapper-transit').hide();
  $('.dlg-box-edit, .dlg-box, .dlg-box-prof, .dlg-box-alert, .dlg-box-transit').hide();

  $('#dlg-edit').click(function() {
    event.preventDefault()
    $('.dlg-wrapper-prof').fadeIn();
    $('.dlg-box-prof').fadeIn();
  })

  $('.dlg-box-prof .dlg-footer .cancel').click(function() {
    $('.dlg-wrapper-prof').fadeOut();
    $('.dlg-box-prof').fadeOut();
  })

  $('.dlg-box-alert .dlg-footer .ok').click(function() {
    $('.dlg-wrapper-alert').fadeOut();
    $('.dlg-box-alert').fadeOut();
  })

  $('#change-pass-text').click(function() {
    event.preventDefault()
    $(this).hide()
    $('#change-pass').fadeIn()
  })

  // Check Again
  $('.item-not-delivered').click(function() {
    $('.dlg-wrapper-edit').fadeIn();
    $('.dlg-box-edit').fadeIn();
  })

  $('.item-delivered').click(function() {
    $('.dlg-wrapper').fadeIn();
    $('.dlg-box').fadeIn();
  })

  $('.dlg-box .dlg-footer .a, .dlg-box .dlg-footer button').click(function () {
    $('.dlg-wrapper').fadeOut();
    $('.dlg-box').hide();
  })

  $('.dlg-box-edit .dlg-footer button').click(function () {
    $('.dlg-wrapper-edit').fadeOut();
    $('.dlg-box-edit').hide();
  })



  $('.status button').click(function(){
    $('.dropdown').toggleClass('show_dropdown')
  });

  $(this).click(function(e){
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
