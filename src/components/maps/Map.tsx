'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import { useState } from 'react'
import Userlocation from '../Userlocation'

const Map = () => {

    const [coord, setCoord] = useState<[number, number]>([-5.371539305501985, 105.26787193038027])

    return (
        <div className="bg-gray-100 dark:bg-slate-700 p-1 rounded-md">
            <div className='relative z-0 overflow-hidden'>
                <MapContainer style={{ height: '80vh', width: '100vw' }} center={coord} zoom={13} scrollWheelZoom={true}>
                    <LayersControl position="topleft">
                        <LayersControl.Overlay checked name="Street Map">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                maxZoom={25}
                            />
                        </LayersControl.Overlay >

                        <LayersControl.Overlay checked name="Google Satellite">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                maxZoom={25}
                            />
                        </LayersControl.Overlay>
                    </LayersControl>

                    <Userlocation />
                </MapContainer>
            </div>
        </div>
    )
}

export default Map