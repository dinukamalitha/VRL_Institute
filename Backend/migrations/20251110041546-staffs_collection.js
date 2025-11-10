module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
    // Create the 'staffs' collection if it doesn't exist
    const collections = await db.listCollections({ name: 'staffs' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('staffs');
    }

    // Optional: create indexes for faster queries
    await db.collection('staffs').createIndex({ createdAt: -1 });

    console.log("Migration up: 'staffs' collection created with indexes");
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.collection('staffs').drop();
    console.log("Migration down: 'staffs' collection dropped");
  }
};
