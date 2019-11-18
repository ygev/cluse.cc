// Upon clicking the burger button, open up nav structure in mobile.
$('button').click(function() {
    $(this).toggleClass('expanded').siblings('div').slideToggle();
  });


  