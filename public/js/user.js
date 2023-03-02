const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
        console.log(id);
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('#delete_button')
  .addEventListener('click', delButtonHandler);
