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


db.users.insertOne(
    {
        email: "admin",
        password: "admin",
        firstName: "John",
        lastName: "Doe",
        work: {
            title: "Administrator",
            phone: "+7 (495) 123-45-67",
            company: "Example LLC"
        },
        social: {
            skype: "#",
            facebook: "#",
            twitter: "#",
            linkedin: "#",
            github: "#"
        }
    });