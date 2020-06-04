import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {    
    return knex.schema.createTable('points', (table) => {
        table.increments('id').primary();
        table.string('image', 255).notNullable();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('whatsapp', 20).notNullable();
        table.string('latitude', 255).notNullable();
        table.string('longitude', 255).notNullable();
        table.string('city', 100).notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('point');
}

