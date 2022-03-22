
const editCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-input').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment && id) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace(document.referrer);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.edit-form')
    .addEventListener('submit', editCommentHandler);