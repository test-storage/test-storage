conn = new Mongo();
db = conn.getDB("test-storage");

db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "test-storage"
            }
        ]

    }
);