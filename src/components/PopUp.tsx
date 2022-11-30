import { Box, Typography } from '@mui/material';
import {FC} from 'react';

interface PopUpProps {
  location: string,
  municipality: string,
  onClose: () => void,
  emptyMethod: string,
  coords: number[][]
}

const PopUp: FC<PopUpProps> = ({location, municipality, emptyMethod, onClose, coords}) => {
  const mapImage = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${coords[0][0]},${coords[0][1]},12,0/200x200?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
  return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				minWidth: '400px',
				height: '200px',
			}}
		>
			<Box>
				<Box >
					<Typography variant='h5'>This is a trashcan</Typography>
						<Typography sx={{fontWeight: 'bold'}} variant='subtitle1' display='inline'>District: </Typography>
						<Typography variant='body2' display='inline'>{municipality}</Typography>
					<Box>
						<Typography sx={{fontWeight: 'bold'}} variant='subtitle1' display='inline'>Location: </Typography>
						<Typography variant='body2' display='inline'>{location}</Typography>
					</Box>
					<Box>
						<Typography sx={{fontWeight: 'bold'}}variant='subtitle1' display='inline'>It's emptied using the: </Typography>
						<Typography variant='body2' display='inline'>{emptyMethod} method</Typography>
					</Box>
					<Typography sx={{fontWeight: 'bold', marginTop: '10px'}} variant='body2'>Remember to throw out your trash! #GreenCPH</Typography>
				</Box>
			</Box>
			<Box>
				<img style={{margin: '5px'}} src={mapImage} alt="The image of the post" />
			</Box>
		</Box>
	);
}

export default PopUp