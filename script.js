document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content-container');
  const stepCards = document.querySelectorAll('.step-card');
  const closeModal = document.querySelector('.close-modal');

  // Add modal styles
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
      .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
      }

      .modal-content {
          background-color: #FFFAF5;
          margin: 5% auto;
          padding: 20px;
          width: 90%;
          max-width: 1200px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 10px;
      }

      .close-modal {
          position: absolute;
          right: 20px;
          top: 10px;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
      }
  `;
  document.head.appendChild(modalStyle);

  // Add click handlers to all cards
  stepCards.forEach(card => {
      card.addEventListener('click', () => {
          console.log('Card clicked');
          const cardSrc = card.getAttribute('data-card-src');
          console.log('Card src:', cardSrc);
          
          fetch(cardSrc)
              .then(response => response.text())
              .then(content => {
                  modalContent.innerHTML = content;
                  modal.style.display = 'block';
              })
              .catch(error => {
                  console.error('Error loading content:', error);
                  modalContent.innerHTML = 'Error loading content';
              });
      });
  });

  // Close modal when clicking X
  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});