module.exports = {
  async up(db) {
    await db.collection('journalarticles').updateMany({}, { $unset: { thumbnail: "" } });
  },

  async down(db) {
    // Rolling back would reintroduce the field with null values
    await db.collection('journalarticles').updateMany({}, { $set: { thumbnail: null } });
  },
};

