const collectionName = "notes";

export const up = async (db, client) => {
    await db
        .collection(collectionName)
        .updateMany(
            { isPinned: { $exists: false } },
            { $set: { isPinned: false } }
        );
};

export const down = async (db, client) => {
    return db
        .collection(collectionName)
        .updateMany(
            { isPinned: { $exists: true } },
            { $unset: { isPinned: 1 } }
        );
};
