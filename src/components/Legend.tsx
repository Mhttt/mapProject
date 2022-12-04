import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface legendProps {
	legend1: string;
	legend2: string;
	legend3: string;
	legend4: string;
	darkMode: boolean;
}

const Legend: FC<legendProps> = ({
	legend1,
	legend2,
	legend3,
	legend4,
	darkMode,
}) => {
	return (
		<Box
			sx={{
				backgroundColor: darkMode ? 'grey' : 'white',
				position: 'absolute',
				right: '0px',
				bottom: '20px',
				height: '100px',
				width: '260px',
				zIndex: 1000,
				p: '5px',
			}}
		>
			<Grid container>
				<Grid item xs={12}>
					<Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
						Map Legend
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<img
						src={darkMode ? legend4 : legend1}
						height="10px"
						alt="red circle"
					></img>
					<Typography display="inline"> Trashcan</Typography>
				</Grid>
				<Grid item xs={6}>
					<img src={legend2} height="15px" alt="blue circle"></img>
					<Typography display="inline"> Recycle centre</Typography>
				</Grid>
				<Grid item xs={6}>
					<img src={legend3} height="10px" alt="yellow circle"></img>
					<Typography display="inline"> Toilet</Typography>
				</Grid>
				<Grid item xs={6}>
					<img
						src={darkMode ? legend1 : legend4}
						height="10px"
						alt="green circle"
					></img>
					<Typography display="inline"> Parking lot</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Legend;
