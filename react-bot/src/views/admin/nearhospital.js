const PROXY_URL = "http://localhost:3004/";

export async function fetchNearestPlacesFromGoogle(latitude, longitude) {
    const key = 'AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q';
    let radMetter = 2 * 1000; // Search withing 2 KM radius
    const types = 'hospital';
    const url = PROXY_URL + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&types=' + types + '&key=' + key

    let res = await fetch(url);
    let response = await res.json();
    console.log(response);
    let places = [] // This Array WIll contain locations received from google
    for (let googlePlace of response.results) {
        var place = {}
        var lat = googlePlace.geometry.location.lat;
        var lng = googlePlace.geometry.location.lng;
        var coordinate = {
            latitude: lat,
            longitude: lng,
        }
        let generatedStatus = Math.floor(Math.random() * (50 - 0 + 1) + 0);

        var gallery = []
        const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
        if (googlePlace.photos) {
            for (let photo of googlePlace.photos) {
                var photoUrl = baseUrl + photo.photo_reference + '&key=' + key;
                console.log(photoUrl);
                gallery.push(photoUrl);
            }
        }

        place['placeTypes'] = generatedStatus 
        place['coordinate'] = coordinate
        place['placeId'] = googlePlace.place_id
        place['placeName'] = googlePlace.name
        place['gallery'] = gallery

        places.push(place);
    }
    return places;
    // Do your work here with places Array


}