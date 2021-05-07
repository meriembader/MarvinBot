const PROXY_URL = "http://localhost:3004/";

export async function redirectTohospital(myLat, myLng, myHospitals) {

    const key = 'AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q';
    let filtredhospitals = [];
    for (let hospital of myHospitals) {
        const url = PROXY_URL + 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + myLat + ',' + myLng + '&destinations=side_of_road:' + hospital.Latitude + ',' + hospital.Longitude + '&key=' + key;
        let res = await fetch(url);
        let response = await res.json();
        console.log("hehe",response)
        if (response.rows[0].elements[0].status !== 'ZERO_RESULTS' && response.rows[0].elements[0].status !== "NOT_FOUND") {
            filtredhospitals.push({ hospital: hospital,
                 distance: response.rows[0].elements[0].distance.value,
                 temp: response.rows[0].elements[0].duration.text,
                 distancekm : response.rows[0].elements[0].distance.text});
        }
        
    }
    console.log(filtredhospitals);
    let returned = filtredhospitals.filter(hospital => +hospital.hospital.status > 0);
    returned.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0));
    return returned.slice(0, 5);
    
    ;
}