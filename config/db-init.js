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


db.users.insertOne({ email: "admin", password: "admin", firstName: "John", lastName: "Doe", title: "Administrator" });