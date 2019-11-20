// Upon clicking the burger button, open up nav structure in mobile.
$('button').click(function() {
    $(this).toggleClass('expanded').siblings('div').slideToggle();
  });

// Scroll Down: Hide Header, Scroll Up: Show Header

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 0);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('div').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('div').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}
  

// BUTTON EFFECTS
