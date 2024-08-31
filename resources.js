// JavaScript for loading resources dynamically
document.addEventListener('DOMContentLoaded', () => {
    const resources = [
        {
            title: 'Water Footprint Network',
            description: 'A comprehensive guide on water footprint assessment and reduction strategies.',
            url: 'https://waterfootprint.org/en/'
        },
        {
            title: 'United Nations: Water and Sustainable Development',
            description: 'Information about global water resources and sustainable water management.',
            url: 'https://www.unwater.org/'
        },
        {
            title: 'World Wildlife Fund (WWF) - Water Stewardship',
            description: 'Explore how businesses and industries can manage water sustainably.',
            url: 'https://www.worldwildlife.org/initiatives/water'
        },
        {
            title: 'Global Footprint Network',
            description: 'Learn more about ecological footprints, including water and carbon footprints.',
            url: 'https://www.footprintnetwork.org/'
        }
    ];

    const resourceList = document.querySelector('.resource-list');

    // Dynamically create resource items and append them to the resource list
    resources.forEach((resource, index) => {
        const resourceItem = document.createElement('div');
        resourceItem.classList.add('resource-item');
        resourceItem.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.url}" target="_blank">Visit Website</a>
        `;
        resourceList.appendChild(resourceItem);

        // Add a delay for each item to animate sequentially
        setTimeout(() => {
            resourceItem.style.opacity = '1';
            resourceItem.style.transform = 'translateY(0)';
        }, index * 200); // Delay animation based on the index
    });
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show the "Back to Top" button when scrolling down
window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
