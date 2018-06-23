export class Stop {
  id: number;
  lines: number[]; 
  name: string;
  type: number;
  visible: boolean;
  x: number;
  y: number;
}

export class Route {
  waypoints: [[number]];
}

export class MapInfo {
    id: number;
    name: string;
    type: string;
    url: string;
    coordinate: string;
    error_code: number; 
    error_msg: string;
    lines: Line[];
    stops: Stop[];
    timestamp: number;
}

export class Line {
    id: number;
    is_circle: number; 
    name: string;
    waypoints: [[number]];
}

export class CarLocation {
    lat: number;
    lon: number;
    theta: number;
}

export class Option {
    scaleFactor ?: number;
    width ?: number;
    height ?: number; 
    useCarPoint ?: boolean;
    inside ?: boolean;
}

export class Anchor {
    x: number;
    y: number;
}