import { FC } from "react";


interface Props {
  setSelectedCity: (value: string) => void,
  cities: string[]
}

const Filter: FC<Props> = ({setSelectedCity, cities}) => {

	return (
		<select defaultValue={""} name="cities" onChange={(e) => setSelectedCity(e.target.value)}>
			{cities.map((item) => (
				<option key={item} value={item}>{item}</option>
			))}
			<option value={""}> All cities </option>
		</select>
	);
}

export default Filter;
