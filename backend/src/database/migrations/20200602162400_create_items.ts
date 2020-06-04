import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {    
    return knex.schema.createTable('items', (table) => {
        table.increments('id').primary();
        table.string('image', 255).notNullable();
        table.string('title', 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('items');
}

