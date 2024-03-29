const Category = require("../models/category");
const Book = require("../models/book");
const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const slugifyField = require('../helpers/slugfield');
const { name } = require("ejs");

async function populate() {
  const count = await Category.count();
  if (count == 0) {
    const users = await User.bulkCreate([
      {username: "Admin", email: "zahide.dusgun@gmail.com", password: await bcrypt.hash("asd123", 10)},
      {username: "Moderator", email: "zahide.dusgun@gmail.com", password: await bcrypt.hash("asd123", 10)},
      {username: "Zahide", email: "zahide.dusgun@gmail.com", password: await bcrypt.hash("asd123", 10)},
      {username: "Student", email: "zahide.dusgun@gmail.com", password: await bcrypt.hash("asd123", 10)},
      {username: "Berk", email: "zahide.dusgun@gmail.com", password: await bcrypt.hash("asd123", 10)},
      
  ]);
    const roles = await Role.bulkCreate([
      {roleName: "admin"},
      {roleName: "moderator"},
      {roleName: "student"},
  ]);

  await users[0].addRole(roles[0]);  
  await users[0].addRole(roles[1]);   
  await users[1].addRole(roles[1]);  
  await users[2].addRole(roles[1]);   
  await users[3].addRole(roles[2]);  
  await users[4].addRole(roles[2]);   

    await Category.bulkCreate([
      { categoryName: "Fiction", url: slugifyField("Fiction"),},
      { categoryName: "Non-Fiction", url: slugifyField("Non-Fiction"),},
      { categoryName: "Science Fiction", url: slugifyField("Science Fiction"),},
      { categoryName: "Fantasy", url: slugifyField("Fantasy"),},
      { categoryName: "Mystery", url: slugifyField("Mystery"),},
    ]);

    await Book.bulkCreate([
      {
        name: "The Alchemist",
        url: slugifyField("The Alchemist"),
        description: "A book about following your dreams",
        image: "alchemist.jpg",
        categoryId: 1,
      },
    ]);

    await Book.bulkCreate([
      {
        name: "The Da Vinci Code",
        url: slugifyField("The Da Vinci Code"),
        description: "A book about a code",
        image: "davinci.jpg",
        categoryId: 2,
        },
    ]);

    await Book.bulkCreate([
      {
        name: "The Hobbit",
        url: slugifyField("The Hobbit"),
        description: "A book about a hobbit",
        image: "hobbit.jpg",
        categoryId: 4,
      },
    ]);

    await Book.bulkCreate([
      {
        name: "The Hunger Games",
        url: slugifyField("The Hunger Games"),
        description: "A book about games",
        image: "hungergames.jpg",
        categoryId: 4,
      },
    ]);

    await Book.bulkCreate([
      {
        name: "The Shining",
        url: slugifyField("The Shining"),
        description: "A book about shining",
        image: "shining.jpg",
        categoryId: 5,
      },
    ]);
        
  }
}

module.exports = populate;