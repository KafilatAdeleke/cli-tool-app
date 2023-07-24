import chalk from "chalk"
import inquirer from "inquirer"
import figlet from "figlet"

// Sample trivia questions
const triviaQuestions = [
  {
    question: 'Which planet is known as the "Red Planet"?',
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest organ in the human body?",
    choices: ["Liver", "Brain", "Skin", "Heart"],
    correctAnswer: "Skin",
  },
  {
    question: "How many players are there on a standard soccer team?",
    choices: ["9", "11", "7", "10"],
    correctAnswer: "11",
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Which is the largest ocean on Earth?",
    choices: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
]

let playerName = "Player"
let score = 0

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

// Function to display the cool welcome message with ASCII art
function displayWelcomeMessage() {
  console.clear()
  console.log(
    chalk.yellow(
      figlet.textSync("Trivial Pursuit", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  )

  console.log(chalk.blue("Welcome to the Trivia Challenge!\n"))
  console.log(
    chalk.green("You will be asked a series of fun trivia questions.")
  )
  console.log(chalk.green("Answer as many as you can.\n"))
  console.log(chalk.cyan("Let the games begin!\n"))
}

// Function to display a colorful ASCII art for correct answer feedback
function displayCorrectFeedback() {
  console.log(
    chalk.green(
      figlet.textSync("Correct!", {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  )
  console.log(chalk.green("Great job, keep it up!\n"))
}

// Function to display a colorful ASCII art for incorrect answer feedback
function displayIncorrectFeedback() {
  console.log(
    chalk.red(
      figlet.textSync("Wrong!", {
        font: "Graffiti",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  )
  console.log(chalk.red("Oops, that was not the correct answer.\n"))
}

// Function to ask a trivia question
async function askQuestion(question) {
  console.log(chalk.blue(`\n${question.question}`))

  const answers = await inquirer.prompt({
    name: "player_answer",
    type: "list",
    message: "Choose your answer:",
    choices: question.choices,
  })

  return answers.player_answer === question.correctAnswer
}

// Main function to run the trivia game
async function runTriviaGame() {
  displayWelcomeMessage()
  await askPlayerName()

  for (const question of triviaQuestions) {
    console.log(chalk.cyan(`\n${playerName}, here's your next question:`))
    const isAnswerCorrect = await askQuestion(question)

    if (isAnswerCorrect) {
      displayCorrectFeedback()
      score++
    } else {
      displayIncorrectFeedback()
    }

    await sleep(2000) // Pause for a moment before showing the next question
  }

  displayGameResult()
}

// Function to ask the player's name
async function askPlayerName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Enter your name:",
    default() {
      return playerName
    },
  })

  playerName = answers.player_name
}

function displayGameResult() {
  console.clear()
  if (score === triviaQuestions.length) {
    console.log(
      chalk.yellow(
        figlet.textSync(`CONGRATS , ${playerName} !`, {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    )
    console.log(chalk.green("\nYou are a Trivial Pursuit Champion! 🏆"))
  } else {
    console.log(
      chalk.cyan(
        `${playerName}, your final score is: ${score}/${triviaQuestions.length}`
      )
    )
    console.log(
      chalk.yellow(
        figlet.textSync("Game Over!", {
          font: "Big",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    )
    console.log(
      chalk.red("\nKeep learning and try again for a perfect score next time!")
    )
  }
}

// Run the trivia game with top-level await
runTriviaGame()