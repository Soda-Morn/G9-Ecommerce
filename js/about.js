
const counters = document.querySelectorAll('.total');

counters.forEach(counter => {
    const updateCount = () => {
        // Extract numeric value from data-target using regex
        const targetString = counter.getAttribute('data-target');
        const target = parseFloat(targetString.replace(/[^\d.-]/g, '')); // Extract numeric part
        const current = parseFloat(counter.innerText.replace(/[^\d.-]/g, '')) || 0; // Handle empty innerText
        const increment = target / 200; 

        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment)}${targetString.replace(/[\d.-]/g, '')}`; // Add the original unit or symbol
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = targetString; // Preserve original format (e.g., "100M", "90%")
        }
    };

    updateCount();
});

