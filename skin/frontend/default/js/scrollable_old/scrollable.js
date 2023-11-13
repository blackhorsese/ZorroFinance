/*function scrollable(){
	$(".scrollable_nav a").click(function() {
		$('.section.scrollable .scrolable-content').animate({
			scrollTop: $($(this).data('href')).offset().top
		}, 500);
	});
	
	$(".scrollable_nav a").click(function() {
		var $this = $(this);
		var childPos = $($this.data('href')).offset();
		var parentPos = $($this.data('href')).parent().offset();
		$('.scrollable_nav a.active').removeClass('active');
		$this.addClass('active');		
		var childOffset = {
			top: childPos.top - parentPos.top,
			left: childPos.left - parentPos.left
		};
		$('.section.scrollable .fp-scrollable').slimScroll({ scrollTo: childOffset.top+'px' });
	});	
}
function checkVisibleSections(e, pos){
	$('.scrolable-content .subsection').each(function(){
		var $this = $(this);
		var $this_top = $this.offset().top - $('.scrolable-content').offset().top;
		if(pos >= $this_top){
			var $this_id = $(this).attr('id');	   
			$('.scrollable_nav a').removeClass('active');
		 	$('.scrollable_nav a[data-href="#'+$this_id+'"]').addClass('active');
		}else if(Number($('.scrolable-content').innerHeight()) === pos+$(window).innerHeight()){
			var $last_id = $('.scrolable-content .subsection:last').attr('id');	   
			$('.scrollable_nav a').removeClass('active');
		 	$('.scrollable_nav a[data-href="#'+$last_id+'"]').addClass('active');
		}
	});	
}*/