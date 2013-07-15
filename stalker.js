// This executes as a callback from the proxy blocker service
function proxyBlock(json) {
	if ((document.URL != stalker.forward) &&
		json.proxy == 'Y'
	) {
		window.location = stalker.forward;
	}
}

// This function executes first -- as soon as we get the IP address from
// geoplugin.net web service
function jsStalkerGet(json) {

	if (
		// If we're not at the destination
		(document.URL != stalker.forward) &&

		// and at least one of the rules matches
		(
			stalker.ip_addresses.indexOf(json.geoplugin_request) != -1 ||
			stalker.cities.indexOf(json.geoplugin_city) != -1 ||
			stalker.states.indexOf(json.geoplugin_region) != -1
		) &&

		// and no white-listing rules apply
		(
			stalker.whitelist_ip_addresses.indexOf(json.geoplugin_request) == -1
		)
	) {
		// Forward the browser to the destination
		window.location = stalker.forward;
	}

	// Call the proxy blocker
	/* This JSONP call connects to my JSONP proxy
	 * (http://4gods.nl/~nik/proxyblock.php) of the Black Box proxy blocker
	 * here: http://www.shroomery.org/ythan/proxycheck.php. Go here for more
	 * info: http://www.shroomery.org/ythan/proxyblock.php
	 */
	if (stalker.proxies) {
		$.ajax({
			url: 'http://4gods.nl/~nik/proxyblock.php',
			type: 'GET',
			data: {
				ip: json.geoplugin_request,
				format: 'jsonp'
			},
			crossDomain: true,
			dataType: 'jsonp',
			jsonp: 'cb',
			jsonpCallback: 'proxyBlock'
		});
	}
}
