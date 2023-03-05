const createProfileFormHandler = async (event) => {
  event.preventDefault();
  console.log("hi");
    const id = document.querySelector("#create-profile-btn").value
    const user_username = document.querySelector('#profile-username').value.trim();
    const bio = document.querySelector('#profile-bio').value.trim();
    console.log(id);
    console.log(user_username);
    console.log(bio);
    if (id && user_username && bio) {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({ id, user_username, bio }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create profile.');
      }
    }
  };
  
  const updateProfileFormHandler = async (event) => {
    event.preventDefault();
    const id = document.querySelector("#update-profile-btn").value
    const user_username = document.querySelector('#new-username').value.trim();
    const bio = document.querySelector('#new-bio').value.trim();
  console.log(id, user_username, bio);
    if (id, user_username && bio) {
      const response = await fetch(`/api/profiles/${id}`, {
        method: 'PUT',
        body: JSON.stringify({id, user_username, bio }),
        headers: { 'Content-Type': 'application/json' },
      });
  
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.create-profile-form')
    .addEventListener('submit', createProfileFormHandler);
  
  document
    .querySelector('.update-profile-form')
    .addEventListener('submit', updateProfileFormHandler);