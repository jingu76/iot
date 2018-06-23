export class Stop {
  id: string;
  lines: string[]; 
  name: string;
  type: number;
  visible: boolean;
  x: number;
  y: number;
}

export class Route {
  waypoints: [[string]];
}

export class MapInfo {
    id: string;
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
    id: string;
    is_circle: number; 
    name: string;
    waypoints: [[string]];
}