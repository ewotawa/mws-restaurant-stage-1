GOOGLE API KEY
I modified the referencing of the Google API key so that I could push my API code to GitHub without revealing my personal API key. I followed the process outlined by derzorngottes in the post "Hide API Keys". You can read the details on this method at the following link:

https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

To review this page after cloning from GitHub, you will need to create your own js/config.js file and to store the following code in that file:

var config = {
    googleMapApi: 'XXX'
}

where XXX represents your own valid Google Maps API key. 
