const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();
    const image = document.querySelector('#post-image').files[0];
    const titleInput = document.getElementById('post-title');
    const postTitleContent = titleInput.value.trim();
    const postTitleCharLimit = 50;

    if (!postTitleContent) {
        alert('Error: Title cannot be empty.');
        return;
    }

    if (postTitleContent.length > postTitleCharLimit) {
        alert('Error: Title cannot exceed ' + postTitleCharLimit + ' characters.');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            const imageUrl = responseData.imageUrl;
            document.location.replace('/dashboard');
        }
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler)

// Hide "create new post" container until user clicks on the "New Post" button
document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const formAdjustCreate = document.getElementById('form-adjust-create');

    if (newPostBtn && formAdjustCreate) {
        newPostBtn.addEventListener('click', (event) => {
            event.preventDefault();
            formAdjustCreate.classList.toggle('hidden');
        });
    }
});