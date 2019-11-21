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
$('.button').each(function(e) {

    let duration = 3000,
        btn = $(this),
        svg = btn.find('svg'),
        svgPath = new Proxy({
            y: null,
            smoothing: null
        }, {
            set(target, key, value) {
                target[key] = value;
                if(target.y !== null && target.smoothing !== null) {
                    svg.html(getPath(target.y, target.smoothing, null))
                }
                return true;
            },
            get(target, key) {
                return target[key];
            }
        });

    btn.css('--duration', duration);

    svgPath.y = 20;
    svgPath.smoothing = 0;

    btn.on('click', e => {

        window.location.href = "https://github.com/ygev/cluse/archive/master.zip";
        if(!btn.hasClass('loading')) {

            btn.addClass('loading');

            TweenMax.to(svgPath, duration * .065 / 1000, {
                smoothing: .3
            });

            TweenMax.to(svgPath, duration * .265 / 1000, {
                y: 12,
                ease: Elastic.easeOut.config(1.12, .4)
            }).delay(duration * .065 / 1000);

            setTimeout(() => {
                svg.html(getPath(0, 0, [
                    [3, 14],
                    [8, 19],
                    [21, 6]
                ]));
            }, (duration / 2));

        }

        return false;

    });

});

function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
    let points = pointsNew ? pointsNew : [
            [4, 12],
            [12, update],
            [20, 12]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}
