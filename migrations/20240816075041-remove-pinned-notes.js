const collectionName = "users";
export const up = async (db, client) => {
    await db
        .collection(collectionName)
        .updateMany(
            { pinned_note: { $exists: true } },
            { $unset: { pinned_note: 1 } }
        );
};

export const down = async (db, client) => {
    return db
        .collection(collectionName)
        .updateMany(
            { pinned_note: { $exists: false } },
            { $set: { pinned_note: [] } }
        );
};
