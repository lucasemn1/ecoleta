import { openConnection } from '../connection';

export async function seed() {
    const connection = openConnection();

    await connection('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e baterias', image: 'baterias.svg' },
        { title: 'Papéis e papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos orgânicos', image: 'eletronicos.svg' },
        { title: 'Resíduos eletrônicos', image: 'organicos.svg' },
        { title: 'Óleo de cozinha', image: 'oleo.svg' },
    ]);

    connection.destroy();
}