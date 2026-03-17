//= require jquery.min
//= require bootstrap.bundle.min
//= require metisMenu.min
//= require toastr

//= require rails-ujs
// Vendor Files
//= require waves.min
//= require jquery.slimscroll.min
//= require apexcharts.min
//= require jquery.dataTables.min
//= require dataTables.bootstrap4.min
//= require jquery.peity.min
//= require jquery.peity.init
//= require jquery.ana_customers.inity
//= require jquery.apexcharts.init
//= require irregular-data-series
$(document).ready(function () {

  // ── Toastr config ──
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  // ── Sidebar: collapse on mobile by default, open on desktop ──
  function handleSidebarOnResize() {
    if ($(window).width() <= 1024) {
      $('body').addClass('enlarge-menu');
    } else {
      $('body').removeClass('enlarge-menu');
    }
  }

  // Run on page load
  handleSidebarOnResize();

  // Run on window resize
  $(window).on('resize', function () {
    handleSidebarOnResize();
  });

  // Toggle button
  $('.button-menu-mobile').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('enlarge-menu');
  });

  // ── NCU Sidebar submenu toggles ──
  $('.ncu-parent-link').on('click', function (e) {
    e.preventDefault();
    var $li = $(this).closest('li');
    var $sub = $(this).next('.ncu-submenu');
    var $arrow = $(this).find('.ncu-arrow i');

    // Close siblings at same level
    $li.siblings('li').each(function () {
      $(this).find('> a .ncu-arrow i').removeClass('mdi-chevron-down').addClass('mdi-chevron-right');
      $(this).find('> .ncu-submenu').slideUp(150);
    });

    // Toggle current
    if ($sub.is(':visible')) {
      $sub.slideUp(200);
      $arrow.removeClass('mdi-chevron-down').addClass('mdi-chevron-right');
    } else {
      $sub.slideDown(200);
      $arrow.removeClass('mdi-chevron-right').addClass('mdi-chevron-down');
    }
  });

  // Auto-open submenus that are marked active on page load
  $('.ncu-has-sub.ncu-open').each(function () {
    $(this).find('> .ncu-submenu').show();
    $(this).find('> a .ncu-arrow i')
      .removeClass('mdi-chevron-right')
      .addClass('mdi-chevron-down');
    // Open nested level too
    $(this).find('.ncu-has-sub.ncu-open > .ncu-submenu').show();
  });

});
