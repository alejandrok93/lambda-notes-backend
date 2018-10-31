exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", table => {
    table.increments().primary();
    table.string("title").notNullable();
    table.text("content");
    table.integer("user_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
