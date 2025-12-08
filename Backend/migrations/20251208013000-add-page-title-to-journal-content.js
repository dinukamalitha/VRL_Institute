module.exports = {
  async up(db) {
    await db
      .collection('journalcontents')
      .updateMany(
        { pageTitle: { $exists: false } },
        { $set: { pageTitle: 'VRL Journal' } }
      );
  },

  async down(db) {
    await db
      .collection('journalcontents')
      .updateMany(
        {},
        { $unset: { pageTitle: "" } }
      );
  },
};


