
export type ThreeboxOptions = {
    id: string;
    type: string;
    obj: string;
    scale: number | { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    adjustment: { x: number; y: number; z: number };
    units: string;
    anchor: string;
    bbox: boolean;
}