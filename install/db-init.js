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


db.roles.insertMany(
  [
    {
      _id: "59aa93669e4c765580019d6fe06f7911",
      name: "Read Only"
    },
    {
      _id: "25f38fd0e13c010926237d894a7d1a66",
      name: "Test Designer"
    },
    {
      _id: "229b0882f0c556ffb93114e1957b4f90",
      name: "Test Engineer"
    },
    {
      _id: "cd33c77df946e5e5e48a919145d8cee7",
      name: "Test Automation Engineer"
    },
    {
      _id: "6aa33bf7ee94091cc98704ae17eac97c",
      name: "Lead Test Engineer"
    },
    {
      _id: "eb1d3c24215f77110d94e7cffe1c2d03",
      name: "Software Engineer"
    },
    {
      _id: "283b1ba69952f08469210d1c7eaae321",
      name: "Product Owner"
    },
    {
      _id: "29a065197571513caaa62c58491729fb",
      name: "Manager"
    },
    {
      _id: "33f599c013417c04974ea278be7f4b52",
      name: "Administrator"
    }
  ]
);


db.users.insertOne(
  {
    _id: "3ebbce696d3e19e323bc540fb4a34fb4",
    email: "admin",
    password: "$2a$06$pr4OHqWj1HIqkd2i.SduP.st7Fx2uk2Pc3vBLLeQc7pbnZgKT8qVa",
    firstName: "John",
    lastName: "Doe",
    active: true,
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
    role: "33f599c013417c04974ea278be7f4b52",
    created: Date.now(),
    updated: Date.now(),
    createdBy: "admin",
    updatedBy: "admin"
  }
);

