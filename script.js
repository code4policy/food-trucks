document.addEventListener('DOMContentLoaded', () => {
  const stepCards = document.querySelectorAll('.step-card');
  const expandableContent = document.getElementById('expandable-content');
  const expandedContentContainer = document.getElementById('expanded-content-container');
  const closeBtn = document.querySelector('.expandable-content .close-btn');

  // Function to load card content dynamically
  const loadCardContent = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load content from ${url}`);
      const content = await response.text();
      expandedContentContainer.innerHTML = content;
    } catch (error) {
      console.error('Error loading content:', error);
      expandedContentContainer.innerHTML = `<p style="color: red;">Failed to load content. Please try again later.</p>`;
    }
  };

  // Show expandable content
  const showExpandableContent = (cardSrc) => {
    loadCardContent(cardSrc);
    expandableContent.style.display = 'block';
  };

  // Hide expandable content
  const hideExpandableContent = () => {
    expandableContent.style.display = 'none';
    expandedContentContainer.innerHTML = ''; // Clear loaded content
  };

  // Add event listeners to step cards
  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      const cardSrc = card.getAttribute('data-card-src'); // Get the HTML file to load
      showExpandableContent(cardSrc);
    });
  });

  // Add event listener to close button
  closeBtn.addEventListener('click', hideExpandableContent);

  // Hide expandable content when clicking outside the expanded box
  document.addEventListener('click', (e) => {
    if (
      !expandableContent.contains(e.target) && // Click is outside the expanded box
      !Array.from(stepCards).some(card => card.contains(e.target)) // Click is not on a card
    ) {
      hideExpandableContent();
    }
  });
});