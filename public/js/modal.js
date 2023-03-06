const avatarCards = document.querySelectorAll('.agent-selection-card');
const selectProfileIcon = document.getElementById("select-profile-icon");
let selectedCard; 
const modal = document.getElementById("avatar");
const id = document.querySelector("#btn-submit").value;
// get the close buttons
const closeButton = document.querySelector('#avatar .btn-secondary');
const dismissButton = document.querySelector('#avatar .btn-close');

// add event listener to submit button
// const btnSubmit = document.getElementById('btn-submit');
// btnSubmit.addEventListener('click', async (event) => {
//     event.stopPropagation();

//   // find selected card
//   const selectedCard = document.querySelector('.agent-selection.selected');

//   // get data attributes set to card
//   const avatarName = selectedCard.dataset.displayname;
//   const avatarImage = selectedCard.dataset.image;
//   const id = document.querySelector("#btn-submit").value;

//   try {
//     const response = await fetch(`/api/profiles/${id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         avatar_name: avatarName,
//         avatar_image: avatarImage
//       })
//     });

//     if (response.ok) {
//         // Save the response data to a variable
//         const savedData = await response.json();
      
//         // Get the avatar image URL from the saved data
//         const avatarImageUrl = savedData.avatar_image;
      
//         // Set the avatar image URL as the source of the image element on the profile page
//         const avatarImageElement = document.getElementById('avatar-image');
//         avatarImageElement.src = avatarImageUrl;
      
//         // Close the modal
//         closeModal();
//     } else {
//       throw new Error('Failed to save avatar.');
//     }
//   } catch (err) {
//     console.error(err);
//     // Show an error message to the user
//     alert('Failed to save avatar.');
//   }
// });

// Loop through the cards and add a click listener to each one
avatarCards.forEach(card => {
  card.addEventListener('click', function() {
    // Do something when the card is clicked
    if (selectedCard) {
      selectedCard.classList.remove('selected');
    }

    card.classList.add('selected');
    selectedCard = card;
  });
});

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

selectProfileIcon.addEventListener('click', openModal);

// add event listener to close modal when clicking outside of it
window.addEventListener('click', function(event) {
    event.stopPropagation();
  if (event.target == modal) {
    closeModal();
  }
});

// add event listener to close modal when clicking on the close button
closeButton.addEventListener('click', closeModal);
dismissButton.addEventListener('click', closeModal);

// add event listener to close modal when pressing escape key
window.addEventListener('keydown', function(event) {
    event.stopPropagation();
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
