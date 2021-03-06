const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'applicationn/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', newPostHandler)