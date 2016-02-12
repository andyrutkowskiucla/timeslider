/**************
 * Javascript for HT Media's timeslider maps
 * By Harry Stevens, 2016
 * Licensed under the MIT license
 *************/

$(document).ready(function() {

	//responsiveness
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

		$('#viz-canvas').html('<img src="img/googft.gif" width="100%" />').css('height','200px');

	} else {

		// map style options
		var options = {
			center : new google.maps.LatLng(30, 10),
			zoom : 2,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			disableDefaultUI : true,
			streetViewControl : false,
			mapTypeControl : false,
			scrollwheel : false,
			draggable : false,
			zoomControl : false,
			disableDoubleClickZoom : true
		}

		// defaults
		var startYear = 1790;
		var endYear = 2010;
		var interval = 10;
		var loadTime = 10000;

		//iterator scrolls through years
		for (var i = startYear; i <= endYear; i += interval) {

			var yearDiv = 'y' + i;

			// Sets the map ID from the Google Fusion Table to be plugged into the layer
			var mapID;
			if (i < 1940) {
				mapID = ((i - 1790) / 10) + 2;
			} else {
				mapID = ((i - 1790) / 10) + 3;
			}

			// create divs for years to populate and then hide them all with the map-hide class
			$('.map-wrapper').append("<div id='" + yearDiv + "' class='map-canvas map-hide'></div>");

			var map = new google.maps.Map(document.getElementById(yearDiv), options);

			// draw the maps
			var drawmap = new google.maps.FusionTablesLayer({
				map : map,
				query : {
					select : "col3",
					from : "1M6_I7zXAmtnsL5LclhoSZgQbnc3Ivs6PYlJgVe8q"
				},
				options : {
					styleId : mapID,
					templateId : mapID
				},

			});

			// create custom legend

			/**
			 * The LegendControl adds a control to the map.
			 * This constructor takes the control DIV as an argument.
			 * @constructor
			 */
			function LegendControl(controlDiv, map) {

				// Set CSS for the control border.
				var controlUI = document.createElement('div');
				controlUI.style.backgroundColor = '#fff';
				controlUI.style.border = '2px solid #fff';
				controlUI.style.borderRadius = '2px';
				controlUI.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
				controlUI.style.marginRight = '10px';
				controlUI.style.marginTop = '10px';
				controlUI.style.textAlign = 'left';
				controlDiv.appendChild(controlUI);

				// Set CSS for the control interior.
				var controlText = document.createElement('div');
				controlText.style.color = 'rgb(25,25,25)';
				controlText.style.fontFamily = 'Lato,Arial,sans-serif';
				controlText.style.fontSize = '14px';
				controlText.style.lineHeight = '20px';
				controlText.style.paddingLeft = '5px';
				controlText.style.paddingRight = '5px';
				controlText.style.cursor = 'default';
				controlText.innerHTML = '<table><tr style="padding-bottom: 10px;"><td style="width:20px;height:10px;background:#146597">&nbsp;</td><td style="padding-left:4px;">Homosexuality always legal</td></tr><tr><td style="line-height:2px;">&nbsp;</td></tr><tr><td style="width:20px;height:10px;background:#007d24">&nbsp;</td><td style="padding-left:4px;">Homosexuality legalized</td></tr><tr><td style="line-height:2px;">&nbsp;</td></tr><tr><td style="width:20px;height:10px;background:#444444">&nbsp;</td><td style="padding-left:4px;">Homosexuality not legal</td></tr></table>';
				controlUI.appendChild(controlText);

				// reset map center and zoom
				map.addListener('mouseout', function() {
					setTimeout(function() {
						map.panTo({
							lat : 30,
							lng : 10
						});
					}, 1000);
				});

			}

			// Create the DIV to hold the control and call the LegendControl() constructor
			// passing in this DIV.
			var legendControlDiv = document.createElement('div');
			var legendControl = new LegendControl(legendControlDiv, map);

			legendControlDiv.index = 1;
			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legendControlDiv);

		}

		// show the first map
		$('#y' + startYear).removeClass('map-hide').addClass('map-show');

		//jQuery UI slider which will set the year based on the slider action
		$("#slider").slider({
			value : startYear,
			min : startYear,
			max : endYear,
			step : interval,
			slide : function(event, ui) {

				//Update the HTML with the new year
				$("#year").val(ui.value + "s");

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

		// Display a loading message for 10 seconds to let user know that data must load; then enable slider
		setTimeout(function() {
			$('#slider').slider('enable');
			$('.slider-years').css('color', '#000');
			$('.slider-start-year').css({
				'float' : 'left',
				'text-align' : 'left'
			});

			// Show years
			$('.slider-start-year').html(startYear + "s");
			$('.slider-end-year').html(endYear + "s");

			// Show controls
			$('.pre-load').css('display', 'none');
			$('.post-load').css('display', 'block');

		}, loadTime);

		//This updates the html so the user can see the year selected
		$('#year').val($('#slider').slider('value') + "s");

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
				'color' : '#b70b0b',
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
						$('#year').val(newMapNum + "s");
						$("#slider").slider("value", newMapNum);
					} else {
						clearInterval(advance);
						$('.slider-play').css(iconInactive);
					}
				}, 500);

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
					$('#year').val(startYear + "s");
				});

			});
		}, loadTime);

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

	}
});
