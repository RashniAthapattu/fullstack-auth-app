export interface Shipment {
    id: number;
    name: string;
    weight: number;
    destination: string;
    status: ShipmentStatus;
}

export enum ShipmentStatus {
    PENDING = "PENDING",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
}