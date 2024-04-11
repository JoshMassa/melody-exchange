const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const price = document.querySelector('#post-price').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();
    const image = document.querySelector('#post-image').files[0];
    const titleInput = document.getElementById('post-title');
    const category = document.querySelector('#category-select').value;
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
    formData.append('price', price);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('category', category);

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);