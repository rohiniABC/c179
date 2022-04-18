let latitude, longitude
$(document).ready(function(){
    alert("please allow the device to know your location")
    initGeolocation();
})

$(function(){
    $("#navigate-button").click(function(){
        window.location.href=`ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    }
    else{
        alert("sorry, your bowser does not support geolocation service!!")
    }
}

function success(position){
    latitude=position.coords.latitude
    longitude=position.coords.longitude
    mapboxgl.accessToken="pk.eyJ1IjoiYW5pa2EtMTEiLCJhIjoiY2wxdzNkYjZoMHNsNTNrbzVqa2RsazMxbCJ9.YaL9BvzaROAlaTIdmhVUEg"
    var map=new mapboxgl.Map({
        container:"map",
        style:"mapbox://styles/mapbox/streets-v11",
        center:[longitude,latitude],
        zoom:16
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions:{
                enableHighAccuracy:true
            },
        trackUserLocation:true
        }), 
    )

    map.addControl(
        new MapboxDirections({
            accessToken:mapboxgl.accessToken
        }),
        'top-left'
    )
    
    map.on('click',function(e){
        destination=e.lngLat
    })
    
}





