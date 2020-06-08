import { Request, Response } from 'express';
import { openConnection } from '../../database/connection';
import Point from '../interfaces/Point';
import Item from '../interfaces/Item';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage }).single('image');

class PointController {
    static async index(request: Request, response: Response) {
        const connection = openConnection()

        const { city, uf } = request.query;
        const parsedItems: Array<Number> = String(request.query.items)
            .split(',')
            .map(item => Number.parseInt(item.trim()));

        try {
            const points: Array<Point> = await connection('points')
                .join('itemsPoints', 'itemsPoints.pointId', '=', 'points.id')
                .where('points.city', '=', String(city))
                .where('points.uf', '=', String(uf))
                .whereIn('itemsPoints.itemId', parsedItems)
                .select('points.*')
                .distinct();

            for (const point of points) {
                const items: Array<Item> = await connection('items')
                    .select('items.*')
                    .join('itemsPoints', 'itemsPoints.itemId', '=', 'items.id')
                    .where('itemsPoints.pointId', '=', point.id);

                point.items = items;
            }

            connection.destroy();
            return response.status(200).json(points);
        }
        catch (err) {
            console.log(err);
            connection.destroy();
            return response.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
        }
    }

    static async store(request: Request, response: Response) {
        upload(request, response, async () => {
            const serializatedPointDataRequest = {
                name: request.body.name,
                email: request.body.email,
                whatsapp: request.body.whatsapp,
                latitude: request.body.latitude,
                longitude: request.body.longitude,
                city: request.body.city,
                uf: request.body.uf,
                image: request.file.filename
            }

            const items: Array<String> = String(request.body.items).split(',');

            const connection = await openConnection();

            try {
                const pointsInsertedsIds = await connection('points').insert(serializatedPointDataRequest);

                const itemsPoints = items.map(itemId => {
                    return {
                        itemId,
                        pointId: pointsInsertedsIds[0]
                    }
                })

                await connection('itemsPoints').insert(itemsPoints)

                connection.destroy();
                return response.status(201).json({
                    id: pointsInsertedsIds[0],
                    ...serializatedPointDataRequest
                });
            }
            catch (err) {
                connection.destroy();
                return response.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
            }
        });
    }

    static async show(request: Request, response: Response) {
        const connection = openConnection();

        try {
            const id = Number.parseInt(request.params.id);

            const points: Point = await connection('points')
                .select('*')
                .where('points.id', '=', id)
                .first();

            const items: Array<Item> = await connection('items')
                .select('items.*')
                .join('itemsPoints', 'itemsPoints.itemId', '=', 'items.id')
                .where('itemsPoints.pointId', '=', id);

            points.items = items;

            connection.destroy();
            return response.status(200).json(points);
        }
        catch (err) {
            connection.destroy();
            return response.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
        }
    }
}

export default PointController;