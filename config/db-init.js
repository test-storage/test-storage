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
        _id: "3ebbce696d3e19e323bc540fb4a34fb4",
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
        },
        created: Date.now(),
        updated: Date.now(),
        createdBy: "admin",
        updatedBy: "admin"
    }
);