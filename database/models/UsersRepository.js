const AbstractRepository = require("./AbstractRepository");

class UsersRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "users" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(users) {
    // Execute the SQL INSERT query to add a new users to the "users" table
    const [result] = await this.database.query(
      `insert into ${this.table} (roles_id, pseudo, firstname, lastname, avatar, points, city, email, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        users.roles_id,
        users.pseudo,
        users.firstname,
        users.lastname,
        users.avatar,
        users.points,
        users.city,
        users.email,
        users.hashedPassword,
      ]
    );

    // Return the ID of the newly inserted users
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific users by its ID
    const [rows] = await this.database.query(
      `select id, roles_id, pseudo, firstname, lastname, avatar, points, city, email from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the users
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "users" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  // The U of CRUD - Update operation

  async update(users) {
    const [result] = await this.database.query(
      `update ${this.table} set roles_id = ?, pseudo = ?, firstname = ?, lastname = ?, avatar = ?, points = ?, city = ?, email = ? where id = ?`,
      [
        users.roles_id,
        users.pseudo,
        users.firstname,
        users.lastname,
        users.avatar,
        users.points,
        users.city,
        users.email,
        users.id,
      ]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    await this.database.query(
      `DELETE FROM pictures WHERE street_arts_id IN (SELECT id FROM street_arts WHERE users_id = ?)`,
      [id]
    );

    await this.database.query(
      `DELETE FROM street_arts_categories WHERE street_arts_id IN (SELECT id FROM street_arts WHERE users_id = ?)`,
      [id]
    );

    await this.database.query(`DELETE FROM street_arts WHERE users_id = ?`, [
      id,
    ]);

    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = UsersRepository;