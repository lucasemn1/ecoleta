import Item from './Item';

interface Point {
    id: number,
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    latitude: string,
    longitude: string,
    city: string,
    uf: string,
    items?: Array<Item>;
}

export default Point;