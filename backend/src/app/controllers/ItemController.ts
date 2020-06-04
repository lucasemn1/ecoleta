import { Request, Response } from 'express';
import { openConnection } from '../../database/connection';

class ItemController {
    static async index(request: Request, response: Response) {
        const connection = openConnection();
        
        try {
            const items = await connection('items').select('*');

            connection.destroy();
            return response.status(200).json(items);
        }
        catch(err){
            connection.destroy();
            return response.status(500).json( { message: 'Erro interno no servidor' } );
        }

    }
}

export default ItemController;