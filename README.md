js-stalker
==========
If someone is stalking you on your website, here's what you do. This method is
all in JavaScript so it works on Tumblr. Of course.. that means that for a
stalker to get around it, they can just disable JavaScript in their browser.
Hopefully they don't figure that out.

#### Block their house ####
If you want to block them from going to your site at their house, find their IP
address with StatCounter - http://statcounter.com/.

```javascript
var stalker = {ip_addresses: ['127.0.0.1']};
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
