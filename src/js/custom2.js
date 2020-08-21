$('a[href*="#"]').on('click', function (e) {
	if($(this).hasClass('smoothscroll')) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1469, 'linear');
	}
});