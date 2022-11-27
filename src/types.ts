

export default interface TrashCans {
  features: Features[]
}

interface Features {
	geomtry: Geometry;
	properties: Properties;
}

interface Geometry {
	type: string;
	coordinates: number[][];
}

interface Properties {
	driftsbydel: string
}
