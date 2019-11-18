// Upon clicking the burger button, open up nav structure in mobile.
$('button').click(function() {
    $(this).toggleClass('expanded').siblings('div').slideToggle();
  });

// Scroll Down: Hide Header, Scroll Up: Show Header
  