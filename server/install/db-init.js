db.getSiblingDB('test-storage').createUser(
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


db.getSiblingDB('test-storage').roles.insertMany(
  [
    {
      _id: "readonly",
      name: "Read Only"
    },
    {
      _id: "testdesigner",
      name: "Test Designer"
    },
    {
      _id: "testengineer",
      name: "Test Engineer"
    },
    {
      _id: "automationengineer",
      name: "Test Automation Engineer"
    },
    {
      _id: "leadtestengineer",
      name: "Lead Test Engineer"
    },
    {
      _id: "softwareengineer",
      name: "Software Engineer"
    },
    {
      _id: "productowner",
      name: "Product Owner"
    },
    {
      _id: "manager",
      name: "Manager"
    },
    {
      _id: "administrator",
      name: "Administrator"
    }
  ]
);


db.getSiblingDB('test-storage').users.insertOne(
  {
    _id: "3ebbce696d3e19e323bc540fb4a34fb4",
    email: "admin",
    password: "$2a$06$pr4OHqWj1HIqkd2i.SduP.st7Fx2uk2Pc3vBLLeQc7pbnZgKT8qVa",
    firstName: "John",
    lastName: "Doe",
    active: true,
    avatarColor: 250,
    workInfo: {
      jobTitle: "Administrator",
      phoneNumber: "+7 (495) 123-45-67",
      companyName: "Example LLC"
    },
    social: {
      skype: "#",
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    role: "administrator",
    created: Date.now(),
    updated: Date.now(),
    createdBy: "system",
    updatedBy: "system"
  }
);

