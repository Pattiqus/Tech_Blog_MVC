const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-input').value.trim();
    const description = document.querySelector('#description-input').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (title && description) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};

document
  .querySelector('.edit-form')
  .addEventListener('submit', editPostHandler);