export class CountdownTimer {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupCountdowns();
        this.initialized = true;
    }

    setupCountdowns() {
        const countdownElements = document.querySelectorAll('[data-countdown]');

        countdownElements.forEach(element => {
            const deadline = new Date(element.getAttribute('data-countdown') || '').getTime();
            const daysElement = element.querySelector('[data-days]');
            const hoursElement = element.querySelector('[data-hours]');
            const minutesElement = element.querySelector('[data-minutes]');
            const secondsElement = element.querySelector('[data-seconds]');

            const updateCountdown = () => {
                const now = new Date().getTime();
                const timeLeft = deadline - now;

                if (timeLeft <= 0) {
                    // Timer expired
                    if (daysElement) daysElement.innerHTML = "00 <span>D</span>";
                    if (hoursElement) hoursElement.innerHTML = "00 <span>H</span>";
                    if (minutesElement) minutesElement.innerHTML = "00 <span>M</span>";
                    if (secondsElement) secondsElement.innerHTML = "00 <span>S</span>";
                    return;
                }

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                if (daysElement) daysElement.innerHTML = `${days} <span>D</span>`;
                if (hoursElement) hoursElement.innerHTML = `${hours} <span>H</span>`;
                if (minutesElement) minutesElement.innerHTML = `${minutes} <span>M</span>`;
                if (secondsElement) secondsElement.innerHTML = `${seconds} <span>S</span>`;
            };

            // Update immediately and then every second
            updateCountdown();
            setInterval(updateCountdown, 1000);
        });
    }
}