globe.graphic = function() {

	// if we're on touch, add the mobile template
	if (Modernizr.touch) {
		globe.graphicMobile($('#gf .panorama'), $('#gf .subtitle, #gf .source-and-credit'));

		$('#gf .instructions span').html('Click on a person');
	} else {

		$('#gf .instructions span').html('Mouseover a person');
	}

	if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
		$('html').addClass('ipad ios7');
	}
	
	$('#gf .thumbnails').removeClass('hidden');

	var minZoom = 2;
	var maxZoom = 5;

	// create the map
	var map = L.map($('#gf .panorama').get(0), {
		attributionControl: false
	});

	// get the bounds from original image dimensions
	var panoramaBounds = [
		map.unproject([0, 3655], maxZoom),
		map.unproject([5483, 0], maxZoom)
	];

	var bounds = L.latLngBounds(
		L.latLng(-panoramaBounds[1].lat, panoramaBounds[0].lng),
		L.latLng(-panoramaBounds[0].lat, panoramaBounds[1].lng)
	);

	if (!Modernizr.touch) {
		bounds = bounds.pad(0.4);
	}

	L.tileLayer('https://cache.boston.com/multimedia/graphics/projectFiles/2014/04/photo/{z}/{x}/{y}.jpg', {
		minZoom: minZoom,
		maxZoom: maxZoom,
		tms: true,
		continuousWorld: true
	}).addTo(map);

	// don't allow movement beyond bounds
	map.setMaxBounds(bounds);

	// set the zoom depending on width
	var initialZoom = 2;
	if ($(window).width() > 710) {
		initialZoom = 3;
	}

	map.setView(bounds.getCenter(), initialZoom);

	// get the data - polygons, runner details, etc
	var data = globeGraphicRunners;

	// create the layer that will hold all outline polygons
	var polygonsLayer = L.featureGroup();

	// add polygons to layer
	for (var i = 0; i < data.length; i++) {
		var datum = data[i];
		polygonsLayer.addLayer(L.polygon(datum.latlngs, {runner: datum, opacity: 0, fillOpacity: 0}));
	}

	var popup;
	var outlineRectangle;

	// mouseover outline will populate runner details
	polygonsLayer.on('mousemove click', function(e) {

		if ($('#gf .mobile-header .navicon').hasClass('minus')) {
			$('#gf .mobile-header .navicon').click();
		}

		$('#gf .instructions').remove();

		var polygon = e.layer;
		var bounds = polygon.getBounds();
		var runner = polygon.options.runner;

		// if we're on touch, place details at bottom
		if (Modernizr.touch) {

			$('#gf .details')
				.html(window.JST['details.template'](runner))
				.removeClass('hidden');

		} else {

			// make a popup
			if (!popup) {
				popup = L.popup({
						closeButton: false,
						closeOnClick: false,
						offset: L.point(0, -10),
						autoPan: false
					})
					.setLatLng({lat: bounds.getNorth(), lng: bounds.getCenter().lng})
					.setContent(window.JST['details.template'](runner))
					.openOn(map);
			} else {
				popup
					.setLatLng({lat: bounds.getNorth(), lng: bounds.getCenter().lng})
					.setContent(window.JST['details.template'](runner))
					.update();
			}

		}

		// draw the outline rectangle for this runner
		var outlineRectangleContainerNorthCenter = {
			x: map.latLngToContainerPoint(bounds.getCenter()).x,
			y: map.latLngToContainerPoint(bounds._northEast).y
		};

		var mapOffset = $(map.getContainer()).offset();

		// if rectangle already exists, update its bounds
		if (outlineRectangle) {

			outlineRectangle.setBounds(bounds);
		} else {

			outlineRectangle = L.rectangle(bounds, {
				color: "#FFF",
				opacity: 1,
				weight: 2,
				fill: false,
				clickable: false
			});
			map.addLayer(outlineRectangle);
		}

	});

	$('#gf').on('click', '.details', function(e) {
		e.stopPropagation();
	});

	polygonsLayer.addTo(map);

	map.on('mousemove click', function(e) {

		// if we click on the runner details, don't let event through
		// we don't want a map click
		if ($(e.originalEvent.target).offsetParent().is($('#gf .details'))) {
			e.originalEvent.stopPropagation();
		}
	});

	$('#gf .instructions').removeClass('hidden').click(function(e) {
		if ($('#gf .mobile-header .navicon').hasClass('minus')) {
			$('#gf .mobile-header .navicon').click();
		}

		$('#gf .instructions').remove();
	});

};