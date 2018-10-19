# Mobile Web Specialist Certification Course

# Run the production version of the site
To see the latest version of the MWS Restaurant App, please `cd` into the `mws-restaurant-stage-1` directory. Perform the following steps in the following order:

1. Reset npm packages on local system and synchronize with those in `package.json`:
        
        rm -rf node_modules
        npm install

2. Create a `config.js` file containing your Google Maps API key. See GOOGLE API KEY section below.

3. Run the following gulp command to move your Google Maps API key into the production folder:
		
        gulp prod

4. `cd` into the `prod` directory.

		.../mws-restaurant-stage-1/prod

5. Run one of the following two Python commands to launch the page in your default browser (assuming Chrome for udacity) on port 8000:

		python -m SimpleHTTPServer 8000

		python3 -m http.server 8000


# Google API Key
I modified the referencing of the Google API key so that I could push my API code to GitHub without revealing my personal API key. I followed the process outlined by **derzorngottes** in the post *Hide API Keys*. You can read the details on this method at the following link:

https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

To review this page after cloning from GitHub, you will need to create your own `js/config.js` file and to store the following code in that file:

		var config = {
		    googleMapApi: 'XXX'
		}

where **XXX** represents your own valid Google Maps API key.

In the terminal, run `gulp prod` to migrate `config.js` to your production folder. 


# To Test Background Sync in WorkBox
See the section titled *Testing Workbox Background Sync* at the following link:
https://developers.google.com/web/tools/workbox/modules/workbox-background-sync

1. Suspend the server for `mws-restaurant-stage-3`

2. Perform a `PUT` or `POST` request that normally would be sent to the server.

3. Watch for the green-workbox-labeled lines in the console. Non-synced items will be stored in an IndexedDB database called `mwsQueue`.

4. Restore the server on `mws-restaurant-stage-3`.

5. Enter the following text into the `Sync` prompt on the service worker (see illustration in Google Developers article):

		workbox-background-sync:'mwsQueue'

6. Watch for the green-workbox-labeled lines in the console. You will see a re-test of the stored `PUT` or `POST` request. 

7. Refresh the page once, possibly twice. Watch for a final green-workbox-labeled line confirming the `PUT` or `POST` request completion on the server.


# References, Part I

## References specific to service worker research:
* course content
* https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/
* placement of sw.js in file structure: https://stackoverflow.com/questions/34147562/service-worker-is-caching-files-but-fetch-event-is-never-fired
* https://developers.google.com/web/fundamentals/primers/service-workers/

## References for JavaScript, CSS, HTML functionality:
* course content
* https://developer.mozilla.org/
* http://www.w3schools.com
 
**Note:** the machine I am using to test the site does not have sufficient resources to run a Lighthouse accessibility audit. Alternatively, there may be a bug in how Chromium performs this audit relative to the Chrome browser. (I am using Linux.) Instead, I used the following accessibility auditor available through Firefox:
https://addons.mozilla.org/en-US/firefox/addon/tota11y-accessibility-toolkit/?src=search

## References for fetch requests:
* course content 
* http://developer.mozilla.org/
	* Using Fetch
* http://www.w3schools.com


# References, Part II

## Improve audit responses:

### Deprecate jQuery in favor of plain-vanilla Javascript:
* https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

### Preload fontawesome stylesheet
* https://developers.google.com/web/updates/2016/03/link-rel-preload
* https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
* **Note:** deprecated in favor of subscribing to the JavaScript CDN. See notes on `config.js` file above.

### Preconnect to sites
* https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect

### Add a progressive Web App Manifest
* https://developers.google.com/web/tools/lighthouse/audits/install-prompt
* https://developers.google.com/web/fundamentals/web-app-manifest/

### Icon for pwa manifest
* Photo by Patrick Tomasso on Unsplash
* Patrick Tomasso: https://unsplash.com/photos/GXXYkSwndP4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
* Unsplash: https://unsplash.com/search/photos/restaurant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

### Meta tag for theme color
https://developers.google.com/web/tools/lighthouse/audits/address-bar

### Add aria-labelled by detail
* https://dequeuniversity.com/rules/axe/2.2/label?application=lighthouse
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
* https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html

### Improve color contrast for accessibility
* https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse

## Static/dynamic map hybrid
* https://medium.com/@lorenzozaccagnini/improve-google-map-performance-in-your-pwa-fe24a6b3a37b
* https://developers.google.com/maps/documentation/maps-static/intro
* https://www.w3schools.com/cssref/sel_id.asp
* https://css-tricks.com/forums/topic/make-div-disappear-with-css-media-queries-on-screen-width/
* https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
* https://developer.mozilla.org/en-US/docs/Web/Events/resize
* https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
* https://developer.mozilla.org/en-US/docs/Web/Events/load

## JavaScript minification and uglification
* https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md
* https://www.npmjs.com/package/gulp-uglify
* https://www.npmjs.com/package/pump
* https://www.npmjs.com/package/gulp-gzip
* https://www.npmjs.com/package/gulp-babel
* https://www.npmjs.com/package/gulp-sourcemaps

## Compression and browserSync
* https://github.com/BrowserSync/browser-sync/issues/451
* https://www.npmjs.com/package/compression
* https://www.browsersync.io/docs/options/
* https://browsersync.io/docs/gulp

## Progressive jpg
* https://www.npmjs.com/package/imagemin
* https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/
* https://www.npmjs.com/package/gulp-imagemin
* https://www.tecmint.com/optimize-and-compress-jpeg-or-png-batch-images-linux-commandline/
* https://fettblog.eu/snippets/node.js/progressive-jpegs-gm/
* https://stackoverflow.com/questions/34141246/how-to-create-lossless-progressive-jpg-jpeg-images-with-gulp
* https://www.npmjs.com/package/gulp-gm
* http://aheckmann.github.io/gm/docs.html
* https://www.npmjs.com/package/is-progressive

## Synchronize npm packages across machines
* https://github.com/olefredrik/FoundationPress/issues/780


# References, Part III

## WorkBox: installed with `sudo npm i workbox-build`
* https://www.youtube.com/watch?v=XbCwxeCqxw4
* https://www.npmjs.com/package/workbox-build
* https://developers.google.com/web/tools/workbox/modules/workbox-background-sync
* https://github.com/WICG/BackgroundSync/blob/master/explainer.md
* https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
* https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events

## Lazy load images
* https://www.youtube.com/watch?v=XbCwxeCqxw4
* https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve
* https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
* https://developers.google.com/web/updates/2016/04/intersectionobserver
* https://github.com/olefredrik/FoundationPress/issues/780

## Styling and functionality of like button
* https://www.youtube.com/watch?v=XbCwxeCqxw4
* https://www.w3schools.com/howto/howto_js_toggle_class.asp
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

## WorkBox asynchronous `PUT` and `POST` requests
* https://developers.google.com/web/tools/workbox/modules/workbox-background-sync
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.routing
* https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.routing.Router#registerRoute

## Format date values
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates
* https://stackoverflow.com/questions/40751111/getmonth-is-not-a-function-error-parsing-date
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
* https://www.w3schools.com/js/js_date_formats.asp

## IndexedDB reference
* https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
* https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
* https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll

## HTML forms
* https://www.w3schools.com/cssref/pr_font_weight.asp
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/How_to_structure_an_HTML_form
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/The_native_form_widgets
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data

## fetch POST
* https://www.youtube.com/watch?v=XbCwxeCqxw4
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
* https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
* https://davidwalsh.name/fetch
* https://stackoverflow.com/questions/29775797/fetch-post-json-data
* https://googlechrome.github.io/samples/fetch-api/fetch-post.html

## render form in UI
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

## database server readme
* https://github.com/ewotawa/mws-restaurant-stage-3/blob/master/README.md

## Udacity MWS Nanodegree Stage 3 Rubric
* https://review.udacity.com/#!/rubrics/1132/view

## Follow-up edits after 10/18/2018 review

### Add `node-modules` folder to the `gitignore` file
* *Application sizes was too big try not to add `node_modules` folder.*
* https://stackoverflow.com/questions/29820791/git-ignore-node-modules-folder-everywhere




#**From Original README**

# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality. 

### What do I do from here?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.
3. Explore the provided code, and make start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.
4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write. 



