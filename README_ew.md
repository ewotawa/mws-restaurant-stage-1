GOOGLE API KEY
I modified the referencing of the Google API key so that I could push my API code to GitHub without revealing my personal API key. I followed the process outlined by derzorngottes in the post "Hide API Keys". You can read the details on this method at the following link:

https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

To review this page after cloning from GitHub, you will need to create your own js/config.js file and to store the following code in that file:

var config = {
    googleMapApi: 'XXX'
}

where XXX represents your own valid Google Maps API key. 


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