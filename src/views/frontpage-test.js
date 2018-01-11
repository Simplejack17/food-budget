// import React, { Component } from 'react'
// import axios from 'axios'
//
// class FrontPage extends Component {
//
//   componentDidMount () {
//     var button = document.getElementById('btn');
//
//     button.addEventListener("click", function () {
//         var address = document.getElementById('address').value;
//         this.getLatitudeLongitude(this.searchRestaurants, address)
//     });
//   }
//
// searchRestaurants(result) {
// 	var lat = result.geometry.location.lat();
//   var long = result.geometry.location.lng();
//
//   axios.get("https://developers.zomato.com/api/v2.1/search", {
//         headers: {
//           'user-key': '7a6a8a2de6aa306f165cacd29b2909ab',
//           'Accept': 'application/json'
//         },
//         params: {
//           lat: lat,
//           lon: long,
//           radius: '100000'
//         }
//       })
//         .then((response) => {
//           console.log(response)
//         })
//         .catch((err) => {
//           console.log(err)
//         })
// }
//
// getLatitudeLongitude(callback, address) {
//     // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
//     address = address || 'Ferrol, Galicia, Spain';
//     // Initialize the Geocoder
//     geocoder = new google.maps.Geocoder();
//     if (geocoder) {
//         geocoder.geocode({
//             'address': address
//         }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 callback(results[0]);
//             }
//         });
//     }
// }
//
//
//   render () {
//     return (
//       <div>
//         <h1>Title</h1>
//         <input id="address" type="text" placeholder="Enter address here" />
//         <button id="btn">Get LatLong</button>
//         <div>
//             <p>Latitude:
//                 <input type="text" id="latitude" />
//             </p>
//             <p>Longitude:
//                 <input type="text" id="longitude" />
//             </p>
//         </div>
//       </div>
//     )
//   }
// }
//
//
// export default FrontPage
