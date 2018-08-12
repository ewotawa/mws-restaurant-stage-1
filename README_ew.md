RUN THE PRODUCTION VERSION
To see the latest version of the MWS Restaurant App, please run the python SimpleHTTPServer command from within the mws-restaurant-stage-1/prod directory.

GOOGLE API KEY
I modified the referencing of the Google API key so that I could push my API code to GitHub without revealing my personal API key. I followed the process outlined by derzorngottes in the post "Hide API Keys". You can read the details on this method at the following link:

https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

To review this page after cloning from GitHub, you will need to create your own js/config.js file and to store the following code in that file:

var config = {
    googleMapApi: 'XXX',
    fontAwesome: 'YYY'
}

where XXX represents your own valid Google Maps API key
and YYY represents your own valid Font Awesome CDN code. 

You can create your own Font Awesome CDN code by providing an e-mail address at the following site:
https://cdn.fontawesome.com/ 


REFERENCES:
References specific to service worker research:
(1) course content
(2) https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/
(3) placement of sw.js in file structure: https://stackoverflow.com/questions/34147562/service-worker-is-caching-files-but-fetch-event-is-never-fired
(4) https://developers.google.com/web/fundamentals/primers/service-workers/


References for JavaScript, CSS, HTML functionality:
(1) course content
(2) https://developer.mozilla.org/
(3) http://www.w3schools.com

Note: the machine I am using to test the site does not have sufficient resources to run a Lighthouse accessibility audit. Alternatively, there may be a bug in how Chromium performs this audit relative to the Chrome browser. (I am using Linux.) Instead, I used the following accessibility auditor available through Firefox:
https://addons.mozilla.org/en-US/firefox/addon/tota11y-accessibility-toolkit/?src=search

References for fetch requests:
(1) course content 
(2) http://developer.mozilla.org/
    (a) Using Fetch
(3) http://www.w3schools.com

REFERENCES: PART II

Improve audit responses:

(1) deprecate jQuery in favor of plain-vanilla Javascript:
https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

(2) preload fontawesome stylesheet
https://developers.google.com/web/updates/2016/03/link-rel-preload
https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
Note: deprecated in favor of subscribing to the JavaScript CDN. See notes on config.js file above.

(3) preconnect to sites
https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect

(4) Add a progressive Web App Manifest
https://developers.google.com/web/tools/lighthouse/audits/install-prompt
https://developers.google.com/web/fundamentals/web-app-manifest/

(5) icon for pwa manifest
Photo by Patrick Tomasso on Unsplash
Patrick Tomasso: https://unsplash.com/photos/GXXYkSwndP4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
Unsplash: https://unsplash.com/search/photos/restaurant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

(6) meta tag for theme color
https://developers.google.com/web/tools/lighthouse/audits/address-bar

(7) add aria-labelled by detail
https://dequeuniversity.com/rules/axe/2.2/label?application=lighthouse
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html

(8) improve color contrast for accessibility
https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse

(9) static/dynamic map hybrid
https://medium.com/@lorenzozaccagnini/improve-google-map-performance-in-your-pwa-fe24a6b3a37b
https://developers.google.com/maps/documentation/maps-static/intro
https://www.w3schools.com/cssref/sel_id.asp
https://css-tricks.com/forums/topic/make-div-disappear-with-css-media-queries-on-screen-width/
https://developer.mozilla.org/en-US/docs/Web/API/Screen/width

(10) JavaScript minification and uglification
https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md
https://www.npmjs.com/package/gulp-uglify
https://www.npmjs.com/package/pump
https://www.npmjs.com/package/gulp-gzip
https://www.npmjs.com/package/gulp-babel
https://www.npmjs.com/package/gulp-sourcemaps