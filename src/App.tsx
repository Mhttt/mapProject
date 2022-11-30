import './App.css';
import Map, {
	Source,
	Layer,
	CircleLayer,
	NavigationControl,
	Popup,
} from 'react-map-gl';
import Filter from './components/Filter';
import trashcansData from './geojson/trashcans.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useState } from 'react';
import TrashCans, { Features } from './types';
import { Box } from '@mui/material';
import PopUp from './components/PopUp';

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
		zoom: 11,
	});
	const [selectedCity, setSelectedCity] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [selectedCoords, setSelectedCoords] = useState<number[]>()
	const [, setShowPopup] = useState(true)
	const [zoomLevel, setZoomLevel] = useState(11)

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

 
  // For loading the dynamic popupcard data
  // const toCheck = [[selectedCoords !== undefined ? selectedCoords[0] : 0, selectedCoords !== undefined ? selectedCoords[1] : 0 ]]
  // const filteredCity = trashcans.features.filter((feature) => feature.geometry.coordinates[0][0] === toCheck[0][0] && feature.geometry.coordinates[0][1] === toCheck[0][1])
  
    
  
	const addClickedCoord = (
		event: mapboxgl.MapLayerMouseEvent,
		list: Features[]
	) => {
		const listTest = [];
		for (let i = 0; i < list.length; i++) {
			if (
				Math.abs(event.lngLat.lng - list[i].geometry.coordinates[0][0]) <=
					(zoomLevel > 14.5 ? 0.0001 : zoomLevel > 12 ? 0.0002 : 0.001) &&
				Math.abs(event.lngLat.lat - list[i].geometry.coordinates[0][1]) <=
					(zoomLevel > 14.5 ? 0.0001 : zoomLevel > 12 ? 0.0002 : 0.001)
			) {
				const longToAdd = list[i].geometry.coordinates[0][0];
				const latToAdd = list[i].geometry.coordinates[0][1];
				listTest.push([longToAdd, latToAdd]);
				setSelectedCoords([
					list[i].geometry.coordinates[0][0],
					list[i].geometry.coordinates[0][1],
				]);
				setShowPopup(true);
			}
		}
	};

	const finalCities = { type: 'FeatureCollection', features: filteredCities };

	return (
		<Box sx={styles.container}>
			<Map
				onZoom={(e) => {
					setZoomLevel(e.viewState.zoom);
				}}
				onClick={(e) => {
					addClickedCoord(e, filteredCities);
				}}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle={
					darkMode === false
						? 'mapbox://styles/mapbox/streets-v11'
						: 'mapbox://styles/mapbox/dark-v11'
				}
			>
				<Filter
					setSelectedCity={setSelectedCity}
					darkMode={darkMode === true ? true : false}
					setDarkMode={setDarkMode}
					cities={uniqueCities}
				></Filter>
				{selectedCoords && (
					<Popup
						style={{ minWidth: '440px', minHeight: '300px' }}
						longitude={selectedCoords[0]}
						latitude={selectedCoords[1]}
						anchor="bottom"
						onClose={() => setSelectedCoords(undefined)}
					>
						<PopUp
							location="Ørstadsparken"
							municipality="Amager"
							emptyMethod="Maskinel"
							onClose={() => {
							}}
							coords={[[12.56586039, 55.6793311]]}
						></PopUp>
					</Popup>
				)}
				<Source id="my-data" type="geojson" data={finalCities as any}>
					<Layer {...layerStyle} />
				</Source>
				<NavigationControl
					style={{ backgroundColor: darkMode === false ? 'white' : 'grey' }}
					position="bottom-left"
				></NavigationControl>
			</Map>
		</Box>
	);
}

export default App;
