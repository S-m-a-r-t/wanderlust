
let api_Key = MAP_api_Key ;
maptilersdk.config.apiKey = api_Key; // Set your MapTiler API key here
const map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element in which the SDK will render the map
style: maptilersdk.MapStyle.STREETS,
center: coord, // starting position [lng, lat]
zoom: 8 // starting zoom
});
