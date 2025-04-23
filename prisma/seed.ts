import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up the database');

  // First, create categories
  const categories = [
    { name: 'Burgers', description: 'Delicious burgers' },
    { name: 'Drinks', description: 'Refreshing beverages' },
    { name: 'Desserts', description: 'Sweet treats' },
    { name: 'Salads', description: 'Fresh and healthy' },
    { name: 'Sides', description: 'Perfect companions' },
  ];

  console.log('Seeding categories...');
  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: category,
      }),
    ),
  );

  // Create a map of category names to their IDs
  const categoryMap = new Map(
    createdCategories.map((category) => [category.name, category.id]),
  );

  // Helper function to get category ID safely
  const getCategoryId = (name: string): number => {
    const id = categoryMap.get(name);
    if (!id) {
      throw new Error(`Category ${name} not found`);
    }
    return id;
  };

  console.log('Categories seeded successfully');

  const products = [
    {
      name: 'Double Tower Cheeseburger',
      description:
        'Two Flame-Grilled beef patties, two slices of American cheese, a heap of bacon, BBQ sauce, mayo and three crispy onion rings served in a sesame seed bun.',
      price: new Prisma.Decimal(9.0),
      categoryId: getCategoryId('Burgers'),
      imageUrl:
        'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
      isAvailable: true,
    },
    {
      name: 'Bacon Double XL',
      description:
        'Two flamed-grilled beef patties topped with Applewood smoked bacon and American cheese, all in our toasted sesame seed bun.',
      price: new Prisma.Decimal(8.0),
      categoryId: getCategoryId('Burgers'),
      imageUrl:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
      isAvailable: true,
    },
    {
      name: 'Kids Hamburger',
      description:
        'Our original burger with ketchup served in a sesame seed bun.',
      price: new Prisma.Decimal(6.0),
      categoryId: getCategoryId('Burgers'),
      imageUrl:
        'https://images.unsplash.com/photo-1626082892105-1650809e18aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      isAvailable: true,
    },
    {
      name: 'Farmhouse Angus',
      description:
        "A flame-grilled Angus Beef Patty, toasted onion mayo, crispy bacon, oak-smoked cheddar cheese, rocket and pink pickled onions sandwiched between a soft brioche bun. You'd be barney not to try it.",
      price: new Prisma.Decimal(7.0),
      categoryId: getCategoryId('Burgers'),
      imageUrl:
        'https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
      isAvailable: true,
    },
    {
      name: 'French Veggie Burger',
      description:
        'Flame-grilled veggie hash, old-fashioned mustard sauce, crispy onions, arugula and slices of melted cheddar! Same process as the other products.',
      price: new Prisma.Decimal(7.0),
      categoryId: getCategoryId('Burgers'),
      imageUrl:
        'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      isAvailable: true,
    },
    {
      name: 'Ultimate Choco Brownie',
      description:
        'The generous meeting of a creamy vanilla, an authentic brownie, under a chocolate-hazelnut topping and a greedy layer of whipped cream.',
      price: new Prisma.Decimal(3.0),
      categoryId: getCategoryId('Desserts'),
      imageUrl:
        'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      isAvailable: false,
    },
    {
      name: 'Oreo Fusion',
      description:
        'Our classic soft serve ice cream with Oreo® chunks whisked in.',
      price: new Prisma.Decimal(2.0),
      categoryId: getCategoryId('Desserts'),
      imageUrl:
        'https://images.unsplash.com/photo-1561088411-d6fbd5cab600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      isAvailable: true,
    },
    {
      name: 'Chocolate Cake',
      description: 'The best chocolate cake we ever made! We love it !',
      price: new Prisma.Decimal(2.0),
      categoryId: getCategoryId('Desserts'),
      imageUrl:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80',
      isAvailable: true,
    },
    {
      name: 'Sprite',
      description: 'The sun-drenched & deliciously refreshing iced drink',
      price: new Prisma.Decimal(4.0),
      categoryId: getCategoryId('Drinks'),
      imageUrl:
        'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      isAvailable: true,
    },
    {
      name: 'Fanta',
      description:
        'Enjoy the fruity, refreshing taste of Fanta Orange, with zero added sugars. © 2019 The Coca-Cola Company. Fanta is a registered trademark of The Coca-Cola Company.',
      price: new Prisma.Decimal(3.0),
      categoryId: getCategoryId('Drinks'),
      imageUrl:
        'https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80',
      isAvailable: true,
    },
    {
      name: 'Coca-cola',
      description:
        'With its secret recipe, COCA-COLA is a sparkling and refreshing drink with a unique taste since 1886',
      price: new Prisma.Decimal(2.0),
      categoryId: getCategoryId('Drinks'),
      imageUrl:
        'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      isAvailable: true,
    },
    {
      name: 'The variety',
      description:
        'A tasty mix of salads, Neapolitan-style penne, marinated tomatoes, Grana Padano cheese, breaded chicken, and a delicious shallot and herb duo!',
      price: new Prisma.Decimal(4.0),
      categoryId: getCategoryId('Salads'),
      imageUrl:
        'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      isAvailable: true,
    },
    {
      name: 'Big green',
      description:
        'A tasty mix of salads, coral and spelt lentils, marinated tomatoes, Mozzarella balls, breaded chicken and a delicious shallot and herb duo!',
      price: new Prisma.Decimal(4.0),
      categoryId: getCategoryId('Salads'),
      imageUrl:
        'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1078&q=80',
      isAvailable: true,
    },
    {
      name: 'Greeny Cracky',
      description:
        'A tasty mix of salads, coral and spelt lentils, marinated tomatoes, Mozzarella balls, breaded chicken and a delicious shallot and herb duo!',
      price: new Prisma.Decimal(5.0),
      categoryId: getCategoryId('Salads'),
      imageUrl:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      isAvailable: true,
    },
    {
      name: 'Chicken Nuggets',
      description:
        'Bite-sized Chicken Nuggets, coated in a crispy tempura. Served with our BK dip.',
      price: new Prisma.Decimal(4.0),
      categoryId: getCategoryId('Sides'),
      imageUrl:
        'https://images.unsplash.com/photo-1627378378952-a736d8e12219?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1052&q=80',
      isAvailable: true,
    },
    {
      name: 'Fries',
      description: 'Our signature thick cut salted French Fries.',
      price: new Prisma.Decimal(2.0),
      categoryId: getCategoryId('Sides'),
      imageUrl:
        'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      isAvailable: true,
    },
    {
      name: 'Vegan Nuggets',
      description:
        'Certified by the Vegan Society®- Vegan Nuggets served with a dip of your choice.',
      price: new Prisma.Decimal(3.0),
      categoryId: getCategoryId('Sides'),
      imageUrl:
        'https://images.unsplash.com/photo-1646475696467-dea01be909d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
      isAvailable: true,
    },
  ];

  console.log('Seeding products...');
  await Promise.all(
    products.map((product) =>
      prisma.product.create({
        data: product,
      }),
    ),
  );

  console.log('Products seeded successfully');

  console.log('Seeding users...');
  const userData = {
    email: 'david.dupont@gmail.com',
    firstName: 'David',
    lastName: 'Dupont',
    passwordHash: 'toto',
    phoneNumber: '+33666666666',
    profileImageUrl:
      'https://images.unsplash.com/photo-1507003211009-59f0f17ded7e',
  };

  await prisma.user.create({
    data: userData,
  });

  console.log('Users seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
