/**************
 * Javascript for HT Media's timeslider maps
 * By Harry Stevens, 2016
 * Licensed under the MIT license
 *************/

$(document).ready(function() {

	//responsiveness
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

		$('#viz-canvas').html('<img src="cartodb.gif">').css('height','200px');

	} else {
		//cartoDB vars
		var cartoUserName = 'harrystevensht';
		var options = {
			cartodb_logo : true,
			search : false,
			shareable : false,
			zoomControl : false,
			center : [30, 0],
			zoom : 2
		}

		// defaults
		var startYear = 1790;
		var endYear = 2010;
		var interval = 10;
		var loadTime = 10000;
		var playSpeed = 900;

		// tables
		y1790 = 'e096f612-cfaa-11e5-a9d5-0e5db1731f59';
		y1800 = '6e3977d8-cfc4-11e5-90ff-0ea31932ec1d';
		y1810 = 'fa374ea4-cfc4-11e5-966f-0ecfd53eb7d3';
		y1820 = '5372c304-cfc5-11e5-ac24-0e5db1731f59';
		y1830 = 'c2c1f6da-cfc5-11e5-819b-0e787de82d45';
		y1840 = '02e227a8-cfc6-11e5-8ed5-0e674067d321';
		y1850 = '2c037506-cfc6-11e5-92b8-0e5db1731f59';
		y1860 = '788997ec-cfc7-11e5-a9d5-0e5db1731f59';
		y1870 = 'b2d9d36c-cfc7-11e5-b02c-0ecfd53eb7d3';
		y1880 = 'e935c9c0-cfc7-11e5-8162-0e5db1731f59';
		y1890 = '172cb33e-cfc8-11e5-ac24-0e5db1731f59';
		y1900 = '610534ae-cfc8-11e5-8ed5-0e674067d321';
		y1910 = '906ae3e2-cfc8-11e5-81b1-0e31c9be1b51';
		y1920 = 'edf3388e-cfc8-11e5-b811-0ecd1babdde5';
		y1930 = '348d83a8-cfc9-11e5-ac50-0e3ff518bd15';
		y1940 = '651212a0-cfc9-11e5-8c14-0e674067d321';
		y1950 = 'c28a74b8-cfc9-11e5-b4a0-0e674067d321';
		y1960 = 'f690f692-cfc9-11e5-b44a-0ecd1babdde5';
		y1970 = '23d66dd0-cfca-11e5-985b-0e3ff518bd15';
		y1980 = '44acf416-cfca-11e5-87b6-0e5db1731f59';
		y1990 = '9b3c2630-cfca-11e5-be42-0ecd1babdde5';
		y2000 = 'db734e68-cfca-11e5-8c14-0e674067d321';
		y2010 = '305a0e08-cfcb-11e5-a5cc-0e31c9be1b51';

		//iterator scrolls through years
		for (var i = startYear; i <= endYear; i += interval) {

			var yearDiv = 'y' + i;

			// convert div string to variable name in order to grab the table ids
			var yearVar = window[yearDiv];

			// create divs for years to populate and then hide them all with the map-hide class
			$('.map-wrapper').append("<div id='" + yearDiv + "' class='map-canvas map-hide'></div>");

			// draw the maps
			cartodb.createVis(yearDiv, 'http://' + cartoUserName + '.cartodb.com/api/v2/viz/' + yearVar + '/viz.json', options, addLogo);

		}

		function addLogo(vis, layers) {

			// add HT logo
			var logoDiv = vis.container[0].firstChild.children[7];
			$(logoDiv).html('<a href="http://www.hindustantimes.com" target="_blank"><img width="26" height="26" src="img/ht-logo.png" style="position:absolute; bottom:4px; left:8px; display:block; width:26px!important; height:26px!important; border:none; outline:none;" alt="Hindustan Times" title="Hindustan Times"></a><a href="http://www.cartodb.com" target="_blank"><img width="71" height="29" src="http://cartodb.s3.amazonaws.com/static/new_logo.png" style="position:absolute; bottom:5px; left:40px; display:block; width:71px!important; height:29px!important; border:none; outline:none;" alt="CartoDB" title="CartoDB"></a>');
			
			console.log(vis.container[0].firstChild.children[3]);

		}

		// Show first map
		$('#y' + startYear).removeClass('map-hide').addClass('map-show');

		//jQuery UI slider which will set the year based on the slider action
		$("#slider").slider({
			value : startYear,
			min : startYear,
			max : endYear,
			step : interval,
			slide : function(event, ui) {

				//Update the HTML with the new year
				$("#year").val((ui.value) + 's');

				//Create a variable for the year
				var year = (ui.value);

				//Hide all the map-canvas divs and then show the one with the selected year
				$('.map-show').addClass('map-hide').removeClass('map-show');

				var yearId = '#y' + year;

				$(yearId).removeClass('map-hide').addClass('map-show');

			}
		});

		// Allow slider action only after everything is loaded
		$('#slider').slider('disable');

		// Display a loading message for 5 to let user know that data must load; then enable slider
		setTimeout(function() {
			$('#slider').slider('enable');
			$('.slider-years').css('color', '#000');
			$('.slider-start-year').css({
				'float' : 'left',
				'text-align' : 'left'
			});

			// Show years
			$('.slider-start-year').html(startYear + 's');
			$('.slider-end-year').html(endYear + 's');

			// Show controls
			$('.pre-load').css('display', 'none');
			$('.post-load').css('display', 'block');

		}, loadTime);

		//This updates the html so the user can see the star year
		$('#year').val(($('#slider').slider('value')) + 's');

		// Set map-canvas width
		var canvasWidth = $('#viz-canvas').width();
		$('.map-canvas').css('width', canvasWidth);

		// Set map-canvas width responsively
		$(window).resize(function() {
			canvasWidth = $('#viz-canvas').width();
			$('.map-canvas').css('width', canvasWidth);
		});

		// Auto-play

		// Active after loading time
		setTimeout(function() {

			// Icon styling
			var iconInactive = {
				'color' : '#000',
				'cursor' : 'pointer'
			}
			var iconActive = {
				'color' : '#e74c3c',
				'cursor' : 'default'
			}

			// Enable controls
			$('.slider-play').css(iconInactive);
			$('.slider-pause').css(iconInactive);
			$('.slider-rewind').css(iconInactive);

			$('.slider-play').click(function() {

				// Toggle icon styles
				$(this).css(iconActive);
				$('.slider-pause').css(iconInactive);
				$('.slider-rewind').css(iconInactive);

				// sets the play interval
				var advance = setInterval(function() {
					// get the current map
					var currMapId = $('.map-show').attr('id');
					var currMapNum = Number((currMapId).split('y')[1]);

					// set the new map
					var newMapNum = currMapNum + interval;
					var newMapId = 'y' + newMapNum;

					// show the new map, resetting at year 2020.
					if (newMapNum >= (endYear + interval)) {

					} else {
						$('#' + newMapId).removeClass('map-hide').addClass('map-show');
						// hide current map
						$('#' + currMapId).removeClass('map-show').addClass('map-hide');
					}

					// update display year and the slider
					if (newMapNum <= endYear) {
						$('#year').val(newMapNum + 's');
						$("#slider").slider("value", newMapNum);
					} else {
						clearInterval(advance);
						$('.slider-play').css(iconInactive);
					}
				}, playSpeed);

				// pause the slider
				$('.slider-pause').click(function() {
					// Toggle icon styles
					$(this).css(iconActive);
					$('.slider-play').css(iconInactive);
					setTimeout(function() {
						$('.slider-pause').css(iconInactive);
					}, 100);

					clearInterval(advance);
				});

				// rewind the slider
				$('.slider-rewind').click(function() {
					// Toggle icon styles
					$(this).css(iconActive);
					$('.slider-play').css(iconInactive);
					setTimeout(function() {
						$('.slider-rewind').css(iconInactive);
					}, 100);

					clearInterval(advance);

					$('.map-canvas').removeClass('map-show').addClass('map-hide');
					$('#y' + startYear).removeClass('map-hide').addClass('map-show');
					$('#slider').slider('value', startYear);
					$('#year').val(startYear + 's');
				});

			});

			// rewind the without having clicked play
			$('.slider-rewind').click(function() {
				// Toggle icon styles
				$(this).css(iconActive);
				$('.slider-play').css(iconInactive);
				setTimeout(function() {
					$('.slider-rewind').css(iconInactive);
				}, 100);
				$('.map-canvas').removeClass('map-show').addClass('map-hide');
				$('#y' + startYear).removeClass('map-hide').addClass('map-show');
				$('#slider').slider('value', startYear);
				$('#year').val(startYear + 's');
			});
		}, loadTime);
	}
});

