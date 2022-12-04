

export default interface TrashCans {
  features: Features[]
}

export interface Features {
	geometry: Geometry;
	properties: Properties;
}

interface Geometry {
	type: string;
	coordinates: number[][];
}

interface Properties {
	driftsbydel: string;
  stednavn: string;
  toemningsmetode: string;
  navn: string;
  adresse: string;
  postnrby: string;
  anvendelse: string;
}
