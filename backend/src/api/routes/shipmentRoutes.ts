import { Router } from 'express';
import { AppDataSource } from 'src/database/connection';
import { Shipment } from 'src/database/models/shipmentModel';
import { User } from 'src/database/models/userModel';

const router = Router();
router.get('/', async (req, res) => {
    const shipments = await AppDataSource.manager.find(Shipment);
    res.status(200).send(shipments);
});

router.get('/:id', async (req, res) => {
    const shipment = await AppDataSource.manager.findOne(Shipment, { where: { id: req.params.id } });
    if (shipment) {
        res.status(200).send(shipment);
    } else {
        res.status(404).send('Shipment not found');
    }
});

router.put('/:id', async (req, res) => {
    const { recipientName, recipientAddress, shipmentDetails } = req.body;
    const shipment = await AppDataSource.manager.findOne(Shipment, { where: { id: req.params.id } });
    if (shipment) {
        shipment.address = recipientAddress;
        shipment.name = recipientName;
        shipment.status = shipmentDetails;

        await AppDataSource.manager.save(shipment);
        res.status(200).send(shipment);
    } else {
        res.status(404).send('Shipment not found');
    }
});

router.delete('/:id', async (req, res) => {
    const shipment = await AppDataSource.manager.findOne(Shipment, { where: { id: req.params.id } });
    if (shipment) {
        await AppDataSource.manager.remove(shipment);
        res.status(204).send();
    } else {
        res.status(404).send('Shipment not found');
    }
});

export default router;
