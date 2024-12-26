/* Background */
class Star {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.init();
    }

    init() {
        this.x = Math.random() * this.width;
        this.y = Math.random() * this.height;
        this.z = Math.random() * this.width;
        this.opacity = Math.random();
    }

    update() {
        this.z -= 1;
        if (this.z <= 0) {
            this.init();
        }
    }

    draw(ctx) {
        const x = (this.x - this.width / 2) * (this.width / this.z) + this.width / 2;
        const y = (this.y - this.height / 2) * (this.width / this.z) + this.height / 2;
        const radius = this.width / this.z * 0.2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.stars = [];
        this.numStars = 3000;
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.initStars();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(new Star(this.canvas.width, this.canvas.height));
        }
    }

    /**
     * Animate the starfield.
     */
    animate() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars.forEach(star => {
            star.update();
            star.draw(this.ctx);
        });
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');
    const result = document.getElementById('result');
    const button = document.getElementById('starbutton');

    if (!result) {
        console.error('Не може да се намери елемент с id="result".');
        return;
    }

    let step = 1; 

    button.addEventListener('click', function(event) {
        event.preventDefault();

        if (step === 1) {
            if (nameInput.value === '') {
                alert('Please enter your name.');
                return;
            }
            
            nameInput.style.display = 'none';
            birthdateInput.style.display = 'block';
            step = 2;
        } else if (step === 2) {
            if (birthdateInput.value === '') {
                alert('Please enter your birthdate.');
                return;
            }

            const birthdate = birthdateInput.value.split('.');
            if (birthdate.length !== 3) {
                alert('Please enter your birthdate in the format dd.mm.yyyy.');
                return;
            }

            const day = parseInt(birthdate[0], 10);
            const month = parseInt(birthdate[1], 10);

            if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 1 || month > 12) {
                alert('Invalid date. Please enter a valid date.');
                return;
            }

            const zodiacSign = getZodiacSign(day, month);
            const fortune = getFortune(zodiacSign);

            birthdateInput.style.display = 'none';
            button.style.display = 'none';
            result.style.display = 'block';

            
            result.innerHTML = `
                <div class="luck-card">
                    <h1>Your celestial compass points to ${zodiacSign}, ${nameInput.value}!</h1>
                    <div class="luck-content">
                        <p>${fortune}</p>
                    </div>
                </div>
            `;
        }
    });

    new Starfield("starfield");
});

function getZodiacSign(day, month) {

    switch(month) {
        case 1:
            if (day <= 20) {
                return "Capricorn";
            } else {
                return "Aquarius";
            }
        case 2:
            if (day <= 18) {
                return "Aquarius";
            } else {
                return "Pisces";
            }
        case 3:
            if (day <= 20) {
                return "Pisces";
            } else {
                return "Aries";
            }
        case 4:
            if (day <= 20) {
                return "Aries";
            } else {
                return "Taurus";
            }
        case 5:
            if (day <= 20) {
                return "Taurus";
            } else {
                return "Gemini";
            }
        case 6:
            if (day <= 20) {
                return "Gemini";
            } else {
                return "Cancer";
            }
        case 7:
            if (day <= 22) {
                return "Cancer";
            } else {
                return "Leo";
            }
        case 8:
            if (day <= 22) {
                return "Leo";
            } else {
                return "Virgo";
            }
        case 9:
            if (day <= 22) {
                return "Virgo";
            } else {
                return "Libra";
            }
        case 10:
            if (day <= 22) {
                return "Libra";
            } else {
                return "Scorpio";
            }
        case 11:
            if (day <= 21) {
                return "Scorpio";
            } else {
                return "Sagittarius";
            }
        case 12:
            if (day <= 21) {
                return "Sagittarius";
            } else {
                return "Capricorn";
            } 
        default:
            return null;
    }

    // if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    //     return "Capricorn";
    // } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    //     return "Aquarius";
    // } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    //     return "Pisces";
    // } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    //     return "Aries";
    // } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    //     return "Taurus";
    // } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    //     return "Gemini";
    // } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
    //     return "Cancer";
    // } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    //     return "Leo";
    // } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    //     return "Virgo";
    // } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
    //     return "Libra";
    // } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
    //     return "Scorpio";
    // } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    //     return "Sagittarius";
    // } else {
    //     return null; 
    // }
}

function getFortune(zodiacSign) {
    const fortunes = {
        "Capricorn": "Today is a perfect day for new beginnings.",
        "Aquarius": "Your ability to perceive the needs of others is at its peak today.",
        "Pisces": "If you've been feeling a bit down lately, things are about to change.",
        "Aries": "Your willingness to please others can lead to unexpected happiness.",
        "Taurus": "Trust your instincts today. Your intuitive sense is heightened.",
        "Gemini": "You may find yourself in a place of introspection today.",
        "Cancer": "Your positive outlook on life is contagious.",
        "Leo": "Your strong sense of responsibility will provide a sense of security and comfort.",
        "Virgo": "Your ability to compromise can be a real asset to you today.",
        "Libra": "Your creativity is at its peak today. Express yourself!",
        "Scorpio": "Your energy is high today. It's a great day to start new projects.",
        "Sagittarius": "Your love of music may be triggered today by a certain event."
    };
    return fortunes[zodiacSign] || "No fortune available.";
}

