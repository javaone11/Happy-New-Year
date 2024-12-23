function displayHappyNewYearMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.innerHTML = "Happy New Year!";
    messageContainer.style.position = 'absolute';
    messageContainer.style.top = '85%';
    messageContainer.style.left = '55%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.fontSize = '8em'; // Big font size
    messageContainer.style.color = 'cyan';
    messageContainer.style.width = '60vw'; // Big font size
    messageContainer.style.fontFamily = 'Arial, sans-serif';
    messageContainer.style.fontWeight = 'bold';
    messageContainer.style.textShadow = '2px 2px 10px rgba(0, 0, 0, 0.7)';
    messageContainer.style.opacity = 0; // Initially hidden for fade-in effect
    messageContainer.style.transition = 'opacity 2s ease-in-out';
    document.body.appendChild(messageContainer);

    // Fade in the message
    setTimeout(() => {
        messageContainer.style.opacity = 1;
    }, 0);
    
    // Optional: Add an animation to make the text sparkle or grow
    messageContainer.style.animation = 'scaleUp 2s ease-in-out, sparkle 1s infinite alternate';

    // CSS for sparkle and scale-up animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scaleUp {
            0% { transform: translate(-50%, -50%) scale(1); }
            100% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes sparkle {
            0% { text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.7); }
            100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);
}





document.addEventListener("DOMContentLoaded", () => {
    const correctPattern = "0723"; // Set your pattern here
    const verificationContainer = document.getElementById("verification-container");
    const contentContainer = document.getElementById("content");
    const verifyButton = document.getElementById("verify-button");
    const patternInput = document.getElementById("pattern-input");
    const errorMessage = document.getElementById("error-message");

    verifyButton.addEventListener("click", () => {
        const userInput = patternInput.value;

        if (userInput === correctPattern) {
            verificationContainer.style.display = "none";
            contentContainer.style.display = "block";

            // Start animations and image display
            startAnimations();
        } else {
            errorMessage.style.display = "block";
        }
    });
});

function startAnimations() {
    const fallingText = document.querySelector(".falling-text");

    if (fallingText) {
        const letters = fallingText.querySelectorAll("span");
        const lastLetter = letters[letters.length - 1];
        lastLetter.addEventListener("animationend", () => {
            fallingText.style.opacity = "0"; // Fade out
            setTimeout(() => fallingText.remove(), 1000); // Remove after fade-out
        });
    }

    const initialImages = [
        "a30.jpg", "a29.jpg", "a28.jpg", "a27.jpg", "a26.jpg", "a25.jpg",
        "a24.jpg", "a23.jpg", "a22.jpg", "a21.jpg", "a20.jpg", "a19.jpg",
        "a18.jpg", "a17.jpg", "a16.jpg", "a15.jpg", "a14.jpg", "a13.jpg",
        "a12.jpg", "a11.jpg", "a10.jpg", "a9.jpg", "a8.jpg", "a7.jpg",
        "a6.jpg", "a5.jpg", "a4.jpg", "a3.jpg", "a2.jpg", "a1.jpg",
    ];

    const showImages = (images) => {
        images.forEach((img, index) => {
            setTimeout(() => {
                const imgWidth = 300;
                const imgHeight = 300;
                const randomLeft = Math.random() * (window.innerWidth - imgWidth);
                const randomTop = Math.random() * (window.innerHeight - imgHeight);

                img.style.position = 'absolute';
                img.style.opacity = 0;
                img.style.transition = 'opacity 1s ease-out';
                img.style.width = `${imgWidth}px`;
                img.style.height = `${imgHeight}px`;
                img.style.left = `${randomLeft}px`;
                img.style.top = `${randomTop}px`;
                img.style.objectFit = 'cover';
                img.style.borderRadius = '10px';
                img.style.border = '3px solid grey';

                document.body.appendChild(img);

                setTimeout(() => {
                    img.style.opacity = 1;
                }, 0);
            }, index * 2000);
        });
    };

    const addImagesDynamically = () => {
        initialImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${index + 1}`;
            img.classList.add('random-direction-image');
            img.style.opacity = 0;
            document.body.appendChild(img);
        });

        const images = document.querySelectorAll('.random-direction-image');
        showImages(images);

        setTimeout(() => {
            clearImages(images, () => startCollisionEffect());
        }, initialImages.length * 2000 + 1000); // Wait for all images to be displayed
    };

    const clearImages = (images, callback) => {
        images.forEach(img => {
            img.style.opacity = 0;
            setTimeout(() => img.remove(), 1000); // Fade out and remove images
        });

        setTimeout(() => {
            if (callback) callback();
        }, 1500); // Delay before starting the collision effect
    };

    const startCollisionEffect = () => {
        const leftImage = document.createElement('img');
        const rightImage = document.createElement('img');
    
        leftImage.src = "last1.jpg"; // Replace with actual image source
        rightImage.src = "last.jpg"; // Replace with actual image source
    
        // Initial styles for the left image
        leftImage.style.position = 'absolute';
        leftImage.style.width = '600px';
        leftImage.style.height = '600px';
        leftImage.style.left = '-900px'; // Start off-screen
        leftImage.style.top = '50%';
        leftImage.style.transform = 'translateY(-50%)';
        leftImage.style.transition = 'left 5s ease-in-out';
    
        // Initial styles for the right image
        rightImage.style.position = 'absolute';
        rightImage.style.width = '600px';
        rightImage.style.height = '600px';
        rightImage.style.right = '-900px'; // Start off-screen
        rightImage.style.top = '50%';
        rightImage.style.transform = 'translateY(-50%)';
        rightImage.style.transition = 'right 5s ease-in-out';
    
        document.body.appendChild(leftImage);
        document.body.appendChild(rightImage);
    
        // Wait for the images to be fully appended before triggering transition
        setTimeout(() => {
            leftImage.style.left = 'calc(50% - 400px)'; // Move to the center (left image)
            rightImage.style.right = 'calc(50% - 400px)'; // Move to the center (right image)
        }, 50); // Small delay to ensure the images are added to the DOM
    
        // Wait for both images to finish transitioning
        const handleTransitionEnd = (event) => {
            // Check if both images have finished moving towards the center
            if (
                leftImage.style.left === 'calc(50% - 400px)' &&
                rightImage.style.right === 'calc(50% - 400px)'
            ) {
                // Remove both images after the collision
                leftImage.remove();
                rightImage.remove();
    
                // Add the final image
                const finalImage = document.createElement('img');
                finalImage.src = "a31.jpg"; // Replace with actual final image source
                finalImage.style.position = 'absolute';
                finalImage.style.width = '80vw'; // Adjust width as needed
                finalImage.style.height = 'auto'; // Adjust height if necessary
                finalImage.style.maxHeight = '70vh'; // Set max height to ensure responsiveness
                finalImage.style.left = '50%';
                finalImage.style.top = '50%';
                finalImage.style.transform = 'translate(-50%, -50%)';
                finalImage.style.opacity = 0;
                finalImage.style.transition = 'opacity 1s ease-in-out';
                finalImage.style.border = '5px solid grey'; // Add border
                finalImage.style.borderRadius = '20px'; // Add border radius
    
                document.body.appendChild(finalImage);
    
                setTimeout(() => {
                    finalImage.style.opacity = 1; // Fade in the final image
                }, 0);
    
                // Clean up event listeners
                leftImage.removeEventListener('transitionend', handleTransitionEnd);
                rightImage.removeEventListener('transitionend', handleTransitionEnd);
    
                // Call the function to display the "Happy New Year" message at the end
                displayHappyNewYearMessage();
            }
        };
    
        // Add event listeners to both images
        leftImage.addEventListener('transitionend', handleTransitionEnd);
        rightImage.addEventListener('transitionend', handleTransitionEnd);
    };
    
    

    addImagesDynamically();
}
