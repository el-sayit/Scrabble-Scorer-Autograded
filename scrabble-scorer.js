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
   // console.log("Let's play some scrabble! Enter a word:");
   let userInput =input.question("Let's play some scrabble! Enter a word:"); 
   console.log(userInput);
   return userInput;
};

let simpleScorer = function(word){
   word = word.toUpperCase();
   let points = 0;
   for (i = 0; i <word.length; i++) {
     points =1;
     console.log(`Points for ${word[i]} : ${points}`);
      
   };
   return points * word.length;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let points = 0;
   let vowels = ["A", "E", "I", "O", "U"];
   for (i = 0; i< word.length; i++){
      if (vowels.includes(word[i])){
         points = points + 3;
      }
      else {
         points = points +1;
      }

   }
   return points;
};

let scrabbleScorer =function(word){
         let pointLetters = 0;
         for (let i=0; i< word.length; i++){
            for(keys in newPointStructure){
               if (word[i].toLowerCase() === keys) {
                  
                  pointLetters= pointLetters + newPointStructure[keys];
               }
            }
         }
   return pointLetters;
   
};

const scoringAlgorithms = [
   
 {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point',
   scorerFunction: simpleScorer
},
{
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
},
{
   name: "Scrabber",
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
}
];
function scorerPrompt(number) {
   number= Number(input.question('Which scoring algorithm would you like to use ? \n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: '));

   if(number ===0) {
   console.log("algorithm name : " + simpleScorer.name + ", given score: " + simpleScorer(initialPrompt()));
   return simpleScorer;
} else if (number ===1) {
   console.log("algorithm name : " + vowelBonusScorer.name + ", given score: " + vowelBonusScorer(initialPrompt()));
   return vowelBonusScorer;
} else if (number ===2) {
   console.log(`the algorithm is: ${scrabbleScorer.name}, given score: ${scrabbleScorer(initialPrompt())}` );
   return scrabbleScorer;
};
};

function transform(obj) {
   let output = {};
   for (keys in obj){
      
      for (let i =0; i< obj[keys].length; i++){
      output[obj[keys][i].toLowerCase()] = Number(keys);
         
   }
   
}
return output;

};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  
   console.log(scorerPrompt());
   
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
