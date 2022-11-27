import {
	Autocomplete,
	TextField,
} from '@mui/material';
import { FC } from 'react';

interface Props {
	setSelectedCity: (value: string) => void;
	cities: string[];
}

const styles = {
	searchBar: {
		width: '300px',
    padding: '20px'
	},
};

const Filter: FC<Props> = ({ setSelectedCity, cities }) => {
	return (
		<>
			<Autocomplete
				freeSolo
				onChange={(e, value) => {
					setSelectedCity(value === null ? '' : value);
				}}
				options={cities}
				sx={styles.searchBar}
				renderInput={(params) => <TextField {...params} label="Search" />}
			/>
		</>
	);
};

export default Filter;
