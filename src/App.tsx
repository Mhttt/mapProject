import './App.css';
import Map, { Source, Layer, CircleLayer } from 'react-map-gl';
import Filter from './components/Filter';
import trashcansData from './geojson/affaldskurve.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import TrashCans from './types';
import { Box } from '@mui/material';

const trashcans = trashcansData as TrashCans

const styles = {
	container: {
		position: 'relative',
		width: '100vw',
		height: '100vh',
	},
	search: {
		position: 'sticky',
	},
};

const layerStyle: CircleLayer = {
	id: 'point',
	type: 'circle',
	paint: {
		'circle-radius': 5,
		'circle-color': 'red',
	},
};


function App() {

	const [viewState, setViewState] = useState({
		longitude: 12.56,
		latitude: 55.68,
		zoom: 10.5,
	});

  const [selectedCity, setSelectedCity] = useState("")

  const cities = trashcans.features.map(item => {
    return item.properties.driftsbydel
  })

  const uniqueCities = Array.from(new Set(cities)).filter(item => item !== null)
  const filteredCities = selectedCity !== "" ? trashcans.features.filter(feature => feature.properties.driftsbydel === selectedCity) : trashcans.features
  const finalCities = {type: 'FeatureCollection', features: filteredCities}

 
	return (
		<Box sx={styles.container}>
			<Map
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle="mapbox://styles/mapbox/streets-v11"
			>
				<Filter
					setSelectedCity={setSelectedCity}
					cities={uniqueCities}
				></Filter>
				<Source id="my-data" type="geojson" data={finalCities as any}>
					<Layer {...layerStyle} />
				</Source>
			</Map>
		</Box>
	);
}

export default App;
