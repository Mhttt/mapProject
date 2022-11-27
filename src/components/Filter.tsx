import {
	Autocomplete,
	Box,
	IconButton,
	TextField,
} from '@mui/material';
import { FC } from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';

interface Props {
	setSelectedCity: (value: string) => void;
	setDarkMode: (value: boolean) => void;
  darkMode: boolean,
	cities: string[];
}

const styles = {
	searchBar: {
		width: '70%',
		padding: '20px',
		'& .MuiInputBase-root': {
			backgroundColor: '#f8f8f8',
		},
	},
	container: {
		display: 'flex',
		width: '500px',
		height: '55px',
	},
	button: {
		width: '10%',
		top: '20px',
		backgroundColor: 'white',
		borderRadius: '10%',
		color: 'black',
	},
};

const Filter: FC<Props> = ({ setSelectedCity, setDarkMode, cities, darkMode }) => {
	return (
    
		<Box sx={styles.container}>
			<Autocomplete
				freeSolo
				onChange={(e, value) => {
					setSelectedCity(value === null ? '' : value);
				}}
				options={cities}
				sx={styles.searchBar}
				renderInput={(params) => <TextField {...params} label="Search" />}
			/>
			<IconButton disableRipple={false} sx={styles.button} onClick={() => {setDarkMode(!darkMode)}}> 
        <ModeNightIcon></ModeNightIcon>
       </IconButton>
		</Box>
	);
};

export default Filter;
