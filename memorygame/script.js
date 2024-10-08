// Initialize game variables
let gameActive = false;
let level = 1;
let loseTimeout; // Timeout for losing if the correct color isn't clicked
let sequence = []; // To store the correct color sequence
let playerInput = []; // Player's input
const sounds = {
    blue: new Audio('memorygame/sounds/blue.mp3'),
    red: new Audio('memorygame/sounds/red.mp3'),
    green: new Audio('memorygame/sounds/green.mp3'),
    yellow: new Audio('memorygame/sounds/yellow.mp3')
};
 

// Get DOM elements for buttons
const blue = document.getElementById("1");
const red = document.getElementById("2");
const green = document.getElementById("3");
const yellow = document.getElementById("4");

// Event listeners for button clicks
blue.addEventListener("click", handleButtonClick);
red.addEventListener("click", handleButtonClick);
green.addEventListener("click", handleButtonClick);
yellow.addEventListener("click", handleButtonClick);

// Function to handle button clicks
function handleButtonClick(event) {
    const clickedColor = event.target; // Get the clicked color element

    if (!gameActive) {
        // First click starts the game and random hover sequence
        gameActive = true;
        level = 1; // Start from level 1
        sequence = []; // Reset the sequence
        playerInput = []; // Reset the player input
        startNextLevel();  // Start the first level
       
       
    } else {
        // Game is active: Player must follow the sequence
        if (playerInput.length < sequence.length) {
            playerInput.push(clickedColor); // Add clicked color element to player's input
            playSound(clickedColor.id);

            // Check if the player pressed the correct sequence
            const currentIndex = playerInput.length - 1;
            if (playerInput[currentIndex].id !== sequence[currentIndex].id) {
                // Player clicked the wrong color
                console.log("Game Over! You pressed the wrong color.");
                resetGame();
            } else {
                // Clear the lose timeout as they clicked the correct color
                clearTimeout(loseTimeout);

                if (playerInput.length === sequence.length) {
                    // Player completed the sequence for this level
                    console.log("Correct sequence! Moving to the next level.");
                    level++;
                    playerInput = []; // Clear input for the next round
                    startNextLevel();
                }
            }
        }
    }
}

// Function to play the sound for a specific color
function playSound(colorId) {
    try {
      console.log(`Playing sound for color ${colorId}`);
      sounds[colorId].play(); // Play the sound based on the color ID
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
// Function to get a random color element
function getRandomColor() {
    const colors = [blue, red, green, yellow];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Function to display the sequence to the player
function showSequence() {
    if (sequence.length === 0) {
        console.error("The sequence is empty.");
        return; // Exit the function if the sequence is empty
    }

    let i = 0;
    const interval = setInterval(() => {
        const color = sequence[i]; // Get the current color
        color.classList.add("hovered");

        setTimeout(() => {
            color.classList.remove("hovered");
        }, 500); // Duration of hover

        i++;
        if (i >= sequence.length) {
            clearInterval(interval); // Stop after showing the full sequence
        }
    }, 1000); // Delay between showing each color
}


// Function to start the next level
function startNextLevel() {
    const randomColor = getRandomColor();
    sequence.push(randomColor); // Add a new random color to the sequence
    showSequence(); // Display the updated sequence

    document.getElementById("level").innerText = `Level: ${level}`; // Update level display
    loseTimeout = setTimeout(() => {
        console.log("Game Over! Time ran out.");
        resetGame();
    }, 10000); // Example timeout of 10 seconds to respond
}

// Function to reset the game
function resetGame() {
    gameActive = false;
    alert("You lost!"); // Provide feedback to the player
    level = 1; // Reset level
    sequence = []; // Clear the sequence
    playerInput = []; // Clear the player input
    clearTimeout(loseTimeout); // Clear the lose timeout
    document.getElementById("level").innerText = `Level: ${level}`; // Reset level display
    console.log("Game has been reset.");
}

