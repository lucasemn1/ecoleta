import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {    
    return knex.schema.createTable('itemsPoints', (table) => {
        table.increments('id').primary();
        table.integer('pointId').references('id').inTable('points').onDelete('CASCADE');
        table.string('itemId').references('id').inTable('items').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('itemsPoints');
}

