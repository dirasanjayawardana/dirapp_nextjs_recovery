import React, { useState, useEffect } from 'react';
import { useMap } from "react-leaflet";
import L from 'leaflet';

import 'leaflet.locatecontrol';
import "leaflet-compass/dist/leaflet-compass.min.js";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

const Userlocation = () => {
    const map = useMap();

    const handleLocateClick = () => {
        map.locate({ setView: true });
    }

    const locateControl = L.control.locate({
        position: "topleft",
        drawCircle: true,
        showCompass: true,
        strings: {
            title: "Show my location",
        },
        initialAutoActivate: true,
        locateOptions: {
            enableHighAccuracy: true
        },
        onActivate: () => handleLocateClick(),
    });

    useEffect(() => {
        locateControl.addTo(map);

        // L.control.compass({
        //     autoActive: true,
        //     position: 'topleft',
        // }).addTo(map);

    }, [map]);

    return null;
}

export default Userlocation
