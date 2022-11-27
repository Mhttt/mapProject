import './App.css';
import Map, {
	Source,
	Layer,
	CircleLayer,
	NavigationControl,
} from 'react-map-gl';
import Filter from './components/Filter';
import trashcansData from './geojson/affaldskurve.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import TrashCans from './types';
import { Box } from '@mui/material';

const trashcans = trashcansData as TrashCans;

const styles = {
	container: {
		position: 'relative',
		width: '100vw',
		height: '100vh',
	},
};


function App() {
	const [viewState, setViewState] = useState({
		longitude: 12.56,
		latitude: 55.68,
		zoom: 10.5,
	});
	const [selectedCity, setSelectedCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const layerStyle: CircleLayer = {
		id: 'point',
		type: 'circle',
		paint: {
			'circle-radius': 5,
			'circle-color': darkMode === false ? 'red' : 'darkblue',
		},
	};

	const cities = trashcans.features.map((item) => {
		return item.properties.driftsbydel;
	});

	const uniqueCities = Array.from(new Set(cities)).filter(
		(item) => item !== null
	);
	const filteredCities =
		selectedCity !== ''
			? trashcans.features.filter(
					(feature) => feature.properties.driftsbydel === selectedCity
			  )
			: trashcans.features;
	const finalCities = { type: 'FeatureCollection', features: filteredCities };

  console.log(darkMode);
	return (
		<Box sx={styles.container}>
			<Map
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle={darkMode === false ? 'mapbox://styles/mapbox/streets-v11':'mapbox://styles/mapbox/dark-v11'}
			>
				<Filter
					setSelectedCity={setSelectedCity}
          darkMode={darkMode === true ? true : false}
					setDarkMode={setDarkMode}
					cities={uniqueCities}
				></Filter>
				<Source id="my-data" type="geojson" data={finalCities as any}>
					<Layer {...layerStyle} />
				</Source>
				<NavigationControl style={{backgroundColor: darkMode === false ? 'white' :'grey'}} position="bottom-left"></NavigationControl>
			</Map>
		</Box>
	);
}

export default App;
