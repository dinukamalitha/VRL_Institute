module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
    // Create the 'publications' collection if it doesn't exist
    const collections = await db.listCollections({ name: 'publications' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('publications');
    }

    // Optional: create indexes for faster queries
    await db.collection('publications').createIndex({ title: 1 });
    await db.collection('publications').createIndex({ category: 1 });
    await db.collection('publications').createIndex({ createdAt: -1 });

    console.log("Migration up: 'publications' collection created with indexes");
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.collection('publications').drop();
    console.log("Migration down: 'publications' collection dropped");
  }
};
