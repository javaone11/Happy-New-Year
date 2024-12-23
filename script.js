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

            const audio = document.getElementById("backgroundAudio");
            audio.currentTime = 104;

            audio.play();
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
            fallingText.style.opacity = "0"; 
            setTimeout(() => fallingText.remove(), 1000); 
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
        }, initialImages.length * 2000 + 1000); 
    };

    const clearImages = (images, callback) => {
        images.forEach(img => {
            img.style.opacity = 0;
            setTimeout(() => img.remove(), 1000); 
        });

        setTimeout(() => {
            if (callback) callback();
        }, 1500); 
    };

    const startCollisionEffect = () => {
        const leftImage = document.createElement('img');
        const rightImage = document.createElement('img');
    
        leftImage.src = "last1.jpg"; 
        rightImage.src = "last.jpg"; 
    
        leftImage.style.position = 'absolute';
        leftImage.style.width = '600px';
        leftImage.style.height = '600px';
        leftImage.style.left = '-900px'; 
        leftImage.style.top = '50%';
        leftImage.style.transform = 'translateY(-50%)';
        leftImage.style.transition = 'left 5s ease-in-out';
    
        rightImage.style.position = 'absolute';
        rightImage.style.width = '600px';
        rightImage.style.height = '600px';
        rightImage.style.right = '-900px'; 
        rightImage.style.top = '50%';
        rightImage.style.transform = 'translateY(-50%)';
        rightImage.style.transition = 'right 5s ease-in-out';
    
        document.body.appendChild(leftImage);
        document.body.appendChild(rightImage);
    
        setTimeout(() => {
            leftImage.style.left = 'calc(50% - 400px)'; 
            rightImage.style.right = 'calc(50% - 400px)'; 
        }, 50); 
    
        const handleTransitionEnd = (event) => {
            if (
                leftImage.style.left === 'calc(50% - 400px)' &&
                rightImage.style.right === 'calc(50% - 400px)'
            ) {
                leftImage.remove();
                rightImage.remove();
    
                const finalImage = document.createElement('img');
                finalImage.src = "a31.jpg"; 
                finalImage.style.position = 'absolute';
                finalImage.style.width = '80vw'; 
                finalImage.style.height = 'auto'; 
                finalImage.style.maxHeight = '70vh'; 
                finalImage.style.left = '50%';
                finalImage.style.top = '50%';
                finalImage.style.transform = 'translate(-50%, -50%)';
                finalImage.style.opacity = 0;
                finalImage.style.transition = 'opacity 1s ease-in-out';
                finalImage.style.border = '5px solid grey'; 
                finalImage.style.borderRadius = '20px'; 
    
                document.body.appendChild(finalImage);
    
                setTimeout(() => {
                    finalImage.style.opacity = 1; 
                }, 0);
    
                leftImage.removeEventListener('transitionend', handleTransitionEnd);
                rightImage.removeEventListener('transitionend', handleTransitionEnd);
    
      
                displayHappyNewYearMessage();
            }
        };
    
        leftImage.addEventListener('transitionend', handleTransitionEnd);
        rightImage.addEventListener('transitionend', handleTransitionEnd);
    };
    
    

    addImagesDynamically();
}
