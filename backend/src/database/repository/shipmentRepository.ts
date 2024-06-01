import { Shipment } from '../models/shipmentModel';

export const createShipment = async (shipmentData): Promise<Shipment> => {
    const shipment = await Shipment.save(shipmentData);
    return shipment;
};

export const findShipmentById = async (id): Promise<Shipment> => {
    const existingShipment = await Shipment.findOneBy({ id });
    return existingShipment;
};

export const updateShipment = async (id, updatedData): Promise<Shipment> => {
    const shipment = await Shipment.findOneBy({ id });
    if (shipment) {
        Object.assign(shipment, updatedData);
        await shipment.save();
    }
    return shipment;
};

export const deleteShipment = async (id): Promise<void> => {
    const shipment = await Shipment.findOneBy({ id });
    if (shipment) {
        await shipment.remove();
    }
};

export const getAllShipments = async (): Promise<Shipment[]> => {
    const shipments = await Shipment.find();
    return shipments;
};

export const findShipmentByUserId = async (userId): Promise<Shipment[]> => {
    const shipments = await Shipment.find({ where: { user: userId } });
    return shipments;
};
