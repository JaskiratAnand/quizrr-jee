const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Creating users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'securepassword123',
    }
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'potter.harry@example.com',
      name: 'Harry Potter',
      password: 'harrypotter123',
    }
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'john.cena@example.com',
      name: 'John Cena',
      password: 'johncena123',
    }
  })

  const user4 = await prisma.user.create({
    data: {
      email: 'pardeep.kumar@example.com',
      name: 'Pardeep Kumar',
      password: 'kumarpardeep29',
    }
  })

  // Creating a test series
  const testSeries1 = await prisma.testSeries.create({
    data: {
      title: 'Math Series',
      description: 'Series of math-related tests',
    }
  })

  const testSeries2 = await prisma.testSeries.create({
    data: {
      title: 'Science Series',
      description: 'Series of science-related tests',
    }
  })

  // Creating tests
  const test1 = await prisma.test.create({
    data: {
      title: 'Algebra',
      testSeriesId: testSeries1.id,
    }
  })

  const test2 = await prisma.test.create({
    data: {
      title: 'Trignometry',
      testSeriesId: testSeries1.id,
    }
  })

  const test3 = await prisma.test.create({
    data: {
      title: 'Physics Concepts',
      testSeriesId: testSeries2.id,
    }
  })

  const test4 = await prisma.test.create({
    data: {
      title: 'Chemistry',
      testSeriesId: testSeries2.id,
    }
  })

  // Creating questions
  await prisma.question.createMany({
    data: [
      {
        qtitle: 'Write the solution set of the equation x2 - 4 = 0 in roster form',
        options: [],
        correctAns: '{-2, 2}',
        type: 'FillInTheBlanks',
        testId: test1.id,
      },
      {
        qtitle: 'Solve for x: 2x = 8',
        options: ['2', '4', '6', '8'],
        correctAns: '4',
        type: 'MCQ',
        testId: test1.id,
      },
      {
        qtitle: 'Is tan(60º) = √3/4',
        options: [],
        correctAns: 'false',
        type: 'TrueOrFalse',
        testId: test2.id,
      },
      {
        qtitle: 'What is Newton`s Second Law of Motion?',
        options: ['F = ma', 'V = IR', 'E = mc^2', 'pV = nRT'],
        correctAns: 'F = ma',
        type: 'MCQ',
        testId: test3.id,
      },
      {
        qtitle: 'The Alkali metals are called good reducing agents. This implies that__',
        options: ['They easily capture electrons', 'They are not stable at room temperature', 'They are not stable at room temperature', 'They don’t act with dilute acids'],
        correctAns: 'They easily lose electrons',
        type: 'MCQ',
        testId: test4.id,
      },
    ],
  })

  // Creating purchases
  await prisma.purchase.create({
    data: {
      userId: user1.id,
      testSeriesId: testSeries1.id,
    }
  })

  await prisma.purchase.create({
    data: {
      userId: user2.id,
      testSeriesId: testSeries2.id,
    }
  })

  await prisma.purchase.create({
    data: {
      userId: user3.id,
      testSeriesId: testSeries1.id,
    }
  })
  await prisma.purchase.create({
    data: {
      userId: user3.id,
      testSeriesId: testSeries2.id,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
