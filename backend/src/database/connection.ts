import knex from 'knex';

export const openConnection = (): knex => {
    return knex({
        client: "sqlite3",
        connection: {
            filename: "./src/database/database.sqlite"
        },
        migrations: {
            directory: "./src/database/migrations"
        },
        seeds: {
            directory: "./src/database/seeds"
        },
        useNullAsDefault: true
    });
};