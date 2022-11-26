import React from 'react';
import './App.css';
import Map, { Source, Layer, CircleLayer } from 'react-map-gl';
import Filter from './components/Filter';
import sportshaller from './geojson/sportshaller.json';

const layerStyle: CircleLayer = {
	id: 'point',
	type: 'circle',
	paint: {
		'circle-radius': 5,
		'circle-color': 'red',
	},
};

function App() {
	return (
		<div>
			<Filter></Filter>
			<Map
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} //sæt ind i en env
				initialViewState={{
					longitude: 12.57,
					latitude: 55.68,
					zoom: 10,
				}}
				style={{ width: '100vw', height: '100vh' }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			>
				<Source id="my-data" type="geojson" data={sportshaller as any}>
					<Layer {...layerStyle} />
				</Source>
			</Map>
		</div>
	);
}

export default App;
