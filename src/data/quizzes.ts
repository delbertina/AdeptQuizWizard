import { Quiz } from "../types/quiz";

export const Quizzes: Array<Quiz> = [
  {
    id: 1,
    title: "Quiz #1",
    description: "The first quiz created",
    videoURL: "https://www.youtube.com/watch?v=gAWYROgu4JU",
    created: 0,
    modified: 0,
    questions: [
      {
        id: 1,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
      {
        id: 2,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
      {
        id: 3,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "Regular Expressions 101",
    description: "An introductory quiz on the basics of regular expressions.",
    videoURL: "https://example.com/regex-intro",
    created: 0,
    modified: 0,
    questions: [
      {
        id: 1,
        text: "What does the regex pattern `\\d` match?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "Any digit" },
          { id: 2, text: "Any non-digit character" },
          { id: 3, text: "Any whitespace character" },
          { id: 4, text: "Any word character" },
        ],
        feedbackFalse: "Incorrect. `\\d` matches any digit.",
        feedbackTrue: "Correct! `\\d` matches any digit.",
      },
      {
        id: 2,
        text: "What does the regex pattern `\\w` match?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "Any digit" },
          { id: 2, text: "Any whitespace character" },
          { id: 3, text: "Any special character" },
          { id: 4, text: "Any word character" },
        ],
        feedbackFalse: "Incorrect. `\\w` matches any word character.",
        feedbackTrue: "Correct! `\\w` matches any word character.",
      },
      {
        id: 3,
        text: "Which regex pattern matches the beginning of a line?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "$" },
          { id: 2, text: "^" },
          { id: 3, text: "*" },
          { id: 4, text: "." },
        ],
        feedbackFalse: "Incorrect. `^` matches the beginning of a line.",
        feedbackTrue: "Correct! `^` matches the beginning of a line.",
      },
      {
        id: 4,
        text: "What does the regex pattern `.` match?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "A period character" },
          { id: 2, text: "A whitespace character" },
          { id: 3, text: "A digit" },
          { id: 4, text: "Any character except a newline" },
        ],
        feedbackFalse: "Incorrect. `.` matches any character except a newline.",
        feedbackTrue: "Correct! `.` matches any character except a newline.",
      },
      {
        id: 5,
        text: "What does the regex pattern `\\s` match?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Any digit" },
          { id: 2, text: "Any word character" },
          { id: 3, text: "Any whitespace character" },
          { id: 4, text: "Any special character" },
        ],
        feedbackFalse: "Incorrect. `\\s` matches any whitespace character.",
        feedbackTrue: "Correct! `\\s` matches any whitespace character.",
      },
      {
        id: 6,
        text: "Which regex pattern is used to denote a group?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "()" },
          { id: 2, text: "[]" },
          { id: 3, text: "{}" },
          { id: 4, text: "??" },
        ],
        feedbackFalse: "Incorrect. `()` is used to denote a group.",
        feedbackTrue: "Correct! `()` is used to denote a group.",
      },
      {
        id: 7,
        text: "What does the regex pattern `[^a-z]` match?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "Any lowercase letter" },
          { id: 2, text: "Any character except a lowercase letter" },
          { id: 3, text: "Any uppercase letter" },
          { id: 4, text: "Any digit" },
        ],
        feedbackFalse:
          "Incorrect. `[^a-z]` matches any character except a lowercase letter.",
        feedbackTrue:
          "Correct! `[^a-z]` matches any character except a lowercase letter.",
      },
      {
        id: 8,
        text: "Which regex pattern matches the end of a line?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "$" },
          { id: 2, text: "^" },
          { id: 3, text: "*" },
          { id: 4, text: "." },
        ],
        feedbackFalse: "Incorrect. `$` matches the end of a line.",
        feedbackTrue: "Correct! `$` matches the end of a line.",
      },
      {
        id: 9,
        text: "What does the regex pattern `\\b` match?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "A backspace character" },
          { id: 2, text: "A digit character" },
          { id: 3, text: "A whitespace character" },
          { id: 4, text: "A word boundary" },
        ],
        feedbackFalse: "Incorrect. `\\b` matches a word boundary.",
        feedbackTrue: "Correct! `\\b` matches a word boundary.",
      },
      {
        id: 10,
        text: "What does the regex pattern `a{3}` match?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "A single 'a' character" },
          { id: 2, text: "Exactly three 'a' characters" },
          { id: 3, text: "At least three 'a' characters" },
          { id: 4, text: "At most three 'a' characters" },
        ],
        feedbackFalse:
          "Incorrect. `a{3}` matches exactly three 'a' characters.",
        feedbackTrue: "Correct! `a{3}` matches exactly three 'a' characters.",
      },
    ],
  },
  {
    id: 2,
    title: "AWS S3 Basics",
    description: "An introductory quiz on the fundamentals of Amazon S3.",
    videoURL: "https://example.com/aws-s3-intro",
    created: 0,
    modified: 0,
    questions: [
      {
        id: 1,
        text: "What does S3 stand for in AWS?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "Simple Storage Service" },
          { id: 2, text: "Simple Secure Storage" },
          { id: 3, text: "Standard Storage Service" },
          { id: 4, text: "Secure Storage Service" },
        ],
        feedbackFalse: "Incorrect. S3 stands for Simple Storage Service.",
        feedbackTrue: "Correct! S3 stands for Simple Storage Service.",
      },
      {
        id: 2,
        text: "What is an S3 bucket?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "A type of EC2 instance" },
          { id: 2, text: "A container for databases" },
          { id: 3, text: "A container for storing objects" },
          { id: 4, text: "A type of IAM policy" },
        ],
        feedbackFalse:
          "Incorrect. An S3 bucket is a container for storing objects.",
        feedbackTrue:
          "Correct! An S3 bucket is a container for storing objects.",
      },
      {
        id: 3,
        text: "Which of the following is a valid use case for S3?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "Running SQL queries" },
          { id: 2, text: "Hosting a website" },
          { id: 3, text: "Running containerized applications" },
          { id: 4, text: "Storing backup data" },
        ],
        feedbackFalse:
          "Incorrect. Storing backup data is a valid use case for S3.",
        feedbackTrue:
          "Correct! Storing backup data is a valid use case for S3.",
      },
      {
        id: 4,
        text: "What is the maximum size of a single object in S3?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "1 TB" },
          { id: 2, text: "5 TB" },
          { id: 3, text: "10 TB" },
          { id: 4, text: "50 TB" },
        ],
        feedbackFalse:
          "Incorrect. The maximum size of a single object in S3 is 5 TB.",
        feedbackTrue:
          "Correct! The maximum size of a single object in S3 is 5 TB.",
      },
      {
        id: 5,
        text: "What feature in S3 allows you to store older versions of objects?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Cross-region replication" },
          { id: 2, text: "Lifecycle policies" },
          { id: 3, text: "Versioning" },
          { id: 4, text: "Glacier storage" },
        ],
        feedbackFalse:
          "Incorrect. Versioning in S3 allows you to store older versions of objects.",
        feedbackTrue:
          "Correct! Versioning in S3 allows you to store older versions of objects.",
      },
      {
        id: 6,
        text: "Which storage class is the most cost-effective for infrequently accessed data?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "S3 Glacier" },
          { id: 2, text: "S3 Standard" },
          { id: 3, text: "S3 Intelligent-Tiering" },
          { id: 4, text: "S3 One Zone-IA" },
        ],
        feedbackFalse:
          "Incorrect. S3 Glacier is the most cost-effective for infrequently accessed data.",
        feedbackTrue:
          "Correct! S3 Glacier is the most cost-effective for infrequently accessed data.",
      },
      {
        id: 7,
        text: "What is the primary purpose of S3 Access Control Lists (ACLs)?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "To encrypt data at rest" },
          { id: 2, text: "To manage lifecycle policies" },
          { id: 3, text: "To replicate data across regions" },
          { id: 4, text: "To control access to buckets and objects" },
        ],
        feedbackFalse:
          "Incorrect. The primary purpose of S3 ACLs is to control access to buckets and objects.",
        feedbackTrue:
          "Correct! The primary purpose of S3 ACLs is to control access to buckets and objects.",
      },
      {
        id: 8,
        text: "What is the default data consistency model for S3?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "Eventually consistent for all operations" },
          {
            id: 2,
            text: "Read-after-write consistency for PUTs of new objects",
          },
          { id: 3, text: "Strongly consistent for all operations" },
          { id: 4, text: "Eventually consistent for reads" },
        ],
        feedbackFalse:
          "Incorrect. S3 provides read-after-write consistency for PUTs of new objects.",
        feedbackTrue:
          "Correct! S3 provides read-after-write consistency for PUTs of new objects.",
      },
      {
        id: 9,
        text: "Which S3 feature allows you to automatically transfer objects to different storage classes based on predefined rules?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Versioning" },
          { id: 2, text: "Replication" },
          { id: 3, text: "Lifecycle policies" },
          { id: 4, text: "Object tagging" },
        ],
        feedbackFalse:
          "Incorrect. Lifecycle policies allow you to automatically transfer objects to different storage classes based on predefined rules.",
        feedbackTrue:
          "Correct! Lifecycle policies allow you to automatically transfer objects to different storage classes based on predefined rules.",
      },
      {
        id: 10,
        text: "Which of the following is NOT a storage class offered by S3?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "S3 Standard" },
          { id: 2, text: "S3 Intelligent-Tiering" },
          { id: 3, text: "S3 Glacier" },
          { id: 4, text: "S3 Archive" },
        ],
        feedbackFalse:
          "Incorrect. S3 Archive is not a storage class offered by S3.",
        feedbackTrue:
          "Correct! S3 Archive is not a storage class offered by S3.",
      },
    ],
  },
  {
    id: 3,
    title: "Minecraft Trivia",
    description: "Test your knowledge of Minecraft with this trivia quiz.",
    videoURL: "https://example.com/minecraft-trivia",
    created: 0,
    modified: 0,
    questions: [
      {
        id: 1,
        text: "What is the name of the default player character in Minecraft?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "Steve" },
          { id: 2, text: "Alex" },
          { id: 3, text: "John" },
          { id: 4, text: "Notch" },
        ],
        feedbackFalse:
          "Incorrect. The default player character in Minecraft is Steve.",
        feedbackTrue:
          "Correct! The default player character in Minecraft is Steve.",
      },
      {
        id: 2,
        text: "What material do you need to create a nether portal?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "Obsidian" },
          { id: 2, text: "Iron" },
          { id: 3, text: "Diamond" },
          { id: 4, text: "Gold" },
        ],
        feedbackFalse:
          "Incorrect. You need obsidian to create a nether portal.",
        feedbackTrue: "Correct! You need obsidian to create a nether portal.",
      },
      {
        id: 3,
        text: "What is the main antagonist mob in Minecraft?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Zombie" },
          { id: 2, text: "Skeleton" },
          { id: 3, text: "Ender Dragon" },
          { id: 4, text: "Creeper" },
        ],
        feedbackFalse:
          "Incorrect. The main antagonist mob in Minecraft is the Ender Dragon.",
        feedbackTrue:
          "Correct! The main antagonist mob in Minecraft is the Ender Dragon.",
      },
      {
        id: 4,
        text: "Which of these items can NOT be used to tame a horse in Minecraft?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "Bone" },
          { id: 2, text: "Apple" },
          { id: 3, text: "Wheat" },
          { id: 4, text: "Carrot" },
        ],
        feedbackFalse:
          "Incorrect. You can not use a bone to tame a horse in Minecraft.",
        feedbackTrue:
          "Correct! You can not use a bone to tame a horse in Minecraft.",
      },
      {
        id: 5,
        text: "What do you need to mine to obtain diamonds in Minecraft?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "Iron pickaxe" },
          { id: 2, text: "Wooden pickaxe" },
          { id: 3, text: "Stone pickaxe" },
          { id: 4, text: "Diamond pickaxe" },
        ],
        feedbackFalse:
          "Incorrect. You need an iron pickaxe to mine diamonds in Minecraft.",
        feedbackTrue:
          "Correct! You need an iron pickaxe to mine diamonds in Minecraft.",
      },
      {
        id: 6,
        text: "Which block in Minecraft is known to explode when ignited?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Obsidian" },
          { id: 2, text: "Redstone" },
          { id: 3, text: "TNT" },
          { id: 4, text: "Sand" },
        ],
        feedbackFalse: "Incorrect. TNT is known to explode when ignited.",
        feedbackTrue: "Correct! TNT is known to explode when ignited.",
      },
      {
        id: 7,
        text: "What can you use to change the color of wool in Minecraft?",
        correctAnswerId: 4,
        answers: [
          { id: 1, text: "Water" },
          { id: 2, text: "Lava" },
          { id: 3, text: "Stone" },
          { id: 4, text: "Dye" },
        ],
        feedbackFalse:
          "Incorrect. You can use dye to change the color of wool in Minecraft.",
        feedbackTrue:
          "Correct! You can use dye to change the color of wool in Minecraft.",
      },
      {
        id: 8,
        text: "Which dimension is known as the 'end' in Minecraft?",
        correctAnswerId: 1,
        answers: [
          { id: 1, text: "The End" },
          { id: 2, text: "The Nether" },
          { id: 3, text: "The Overworld" },
          { id: 4, text: "The Void" },
        ],
        feedbackFalse:
          "Incorrect. The dimension known as the 'end' in Minecraft is The End.",
        feedbackTrue:
          "Correct! The dimension known as the 'end' in Minecraft is The End.",
      },
      {
        id: 9,
        text: "What is required to craft a bed in Minecraft?",
        correctAnswerId: 2,
        answers: [
          { id: 1, text: "Three sticks and three wool" },
          { id: 2, text: "Three wood planks and three wool" },
          { id: 3, text: "Three wood planks and three stone" },
          { id: 4, text: "Three wood planks and three iron ingots" },
        ],
        feedbackFalse:
          "Incorrect. You need three wood planks and three wool to craft a bed in Minecraft.",
        feedbackTrue:
          "Correct! You need three wood planks and three wool to craft a bed in Minecraft.",
      },
      {
        id: 10,
        text: "What is the in-game currency used in Minecraft?",
        correctAnswerId: 3,
        answers: [
          { id: 1, text: "Gold coins" },
          { id: 2, text: "Silver coins" },
          { id: 3, text: "Emeralds" },
          { id: 4, text: "Diamonds" },
        ],
        feedbackFalse:
          "Incorrect. The in-game currency used in Minecraft is emeralds.",
        feedbackTrue:
          "Correct! The in-game currency used in Minecraft is emeralds.",
      },
    ],
  },
];
