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
//= require app

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

  // ── Sidebar responsive behavior ──
  function isMobile() {
    return $(window).width() < 992;
  }

  // On load: collapse on mobile, open on desktop
  if (isMobile()) {
    $('body').addClass('sidebar-collapsed');
  } else {
    $('body').removeClass('sidebar-collapsed');
  }

  // On resize: auto adjust
  $(window).on('resize', function () {
    if (isMobile()) {
      $('body').addClass('sidebar-collapsed');
    } else {
      $('body').removeClass('sidebar-collapsed');
    }
  });

  // Toggle button click
  $('.button-menu-mobile').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('sidebar-collapsed');
  });

  // Close sidebar when clicking overlay on mobile
  $(document).on('click', '.sidebar-overlay', function () {
    $('body').addClass('sidebar-collapsed');
  });

  // Add overlay div if not present
  if ($('.sidebar-overlay').length === 0) {
    $('body').append('<div class="sidebar-overlay"></div>');
  }

  // Show/hide overlay with sidebar on mobile
  $(document).on('click', '.button-menu-mobile', function () {
    if (isMobile()) {
      if ($('body').hasClass('sidebar-collapsed')) {
        $('.sidebar-overlay').fadeOut(200);
      } else {
        $('.sidebar-overlay').fadeIn(200);
      }
    }
  });

  // ── NCU Sidebar submenu toggles ──
  $('.ncu-parent-link').on('click', function (e) {
    e.preventDefault();
    var $parent = $(this).closest('li');
    var $submenu = $(this).next('.ncu-submenu');
    var $arrow = $(this).find('.ncu-arrow');

    // Close siblings
    $parent.siblings('.ncu-has-sub').each(function () {
      $(this).removeClass('ncu-open');
      $(this).find('.ncu-submenu').slideUp(150);
      $(this).find('.ncu-arrow').css('transform', 'rotate(0deg)');
    });

    // Toggle current
    if ($parent.hasClass('ncu-open')) {
      $parent.removeClass('ncu-open');
      $submenu.slideUp(200);
      $arrow.css('transform', 'rotate(0deg)');
    } else {
      $parent.addClass('ncu-open');
      $submenu.slideDown(200);
      $arrow.css('transform', 'rotate(90deg)');
    }
  });

  // Auto-open active submenus on page load
  $('.ncu-has-sub.ncu-open').each(function () {
    $(this).find('> a .ncu-arrow').css('transform', 'rotate(90deg)');
    $(this).find('> .ncu-submenu').show();
    // Also open nested
    $(this).find('.ncu-has-sub.ncu-open > .ncu-submenu').show();
  });

});
