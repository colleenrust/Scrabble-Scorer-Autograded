// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   return word;
};

// let newPointStructure;

function simpleScorer(word){
   return word.length;
}

function vowelBonusScorer(word){
   let score = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++){
      if ('AEIOU'.includes(word[i])){
         score += 3;
      } else{
         score += 1;
      }
   }
return score;
};

function scrabbleScorer(word){
   word = word.toLowerCase();
   let score = 0;
   for(let i = 0; i < word.length; i++){
      score += newPointStructure[word[i]];
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: simpleScorer
   },
   {
      name: "Bonus Vowels", 
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The tradish scoring algorithm",
      scoringFunction: scrabbleScorer
   }

];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let scorerPromptAnswer = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[scorerPromptAnswer];

}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for(let pointValue in oldPointStructure){
      oldPointStructure[pointValue].forEach(letter => {
         newPointStructure[letter.toLowerCase()] = Number(pointValue);

      });
   }
   return newPointStructure;
}
 const newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringAnswer = scorerPrompt();
   let score = scoringAnswer.scoringFunction(word);
   console.log(`Score for '${word}': ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
