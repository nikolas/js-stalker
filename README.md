js-stalker
==========
If someone is stalking you on your website, here's what you do. This method is
all in JavaScript so it works on Tumblr. Of course.. that means that for a
stalker to get around it, they can just disable JavaScript in their browser.
To prevent that, hide the `<body>` element with CSS, and show that element when
JavaScript is loaded.

### How to block people on Tumblr ###
Click "Edit HTML" in the theme customizer. Paste this code after the `<head>` tag:
```html
<!-- js-stalker code -- https://github.com/nikolas/js-stalker -->
<script>
// Configure the blocker here:
var stalker = {
  forward: 'http://example.org/stop-stalking-me!!!!',
  ip_addresses: ['127.0.0.1'],
  whitelist_ip_addresses: ['127.0.0.2'],
  cities: ['Seattle', 'Olympia'],
  states: ['OR'],
  proxies: true
};
</script>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>
// stalker.js
function proxyBlock(a){document.URL!=stalker.forward&&"Y"==a.proxy&&(window.location=stalker.forward)}
function jsStalkerGet(a){document.URL==stalker.forward||(-1==stalker.ip_addresses.indexOf(a.geoplugin_request)&&-1==stalker.cities.indexOf(a.geoplugin_city)&&-1==stalker.states.indexOf(a.geoplugin_region)||-1!=stalker.whitelist_ip_addresses.indexOf(a.geoplugin_request))||(window.location=stalker.forward);stalker.proxies&&$.ajax({url:"http://4gods.nl/~nik/proxyblock.php",type:"GET",data:{ip:a.geoplugin_request,format:"jsonp"},crossDomain:!0,dataType:"jsonp",jsonp:"cb",jsonpCallback:"proxyBlock"})}
</script>
<script src="http://www.geoplugin.net/json.gp?jsoncallback=jsStalkerGet" type="application/javascript"></script>
<!-- end js-stalker -->
```

If you want to still see who gets caught in the blocker in your StatCounter, make sure the StatCounter code is before the js-stalker code.

### Options ###
#### Specify the site to forward stalkers to ####
```javascript
var stalker = { forward: 'http://example.org/stop-stalking-me!!!!' };
```

#### Block their house ####
If you want to block them from going to your site at their house, find their IP
address with StatCounter - http://statcounter.com/.

```javascript
var stalker = { ip_addresses: ['127.0.0.1'] };
```

Allow certain IP's to get through by putting them in the whitelist:
```javascript
var stalker = { whitelist_ip_addresses: ['127.0.0.2'] };
```

#### Block their city ####
To block anyone in Seattle or Olympia:
```javascript
var stalker = { cities: ['Seattle', 'Olympia'] };
```

#### Block anonymous proxies ####
js-stalker can block users that are suspected of using an anonymous proxy like
Tor or hidemyass.com.
```javascript
var stalker = { proxies: true };
```

