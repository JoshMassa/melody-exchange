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
    const cloudName = 'dgdoaiyz6';

    if (!postTitleContent) {
        alert('Error: Title cannot be empty.');
        return;
    }

    if (postTitleContent.length > postTitleCharLimit) {
        alert('Error: Title cannot exceed ' + postTitleCharLimit + ' characters.');
        return;
    }

    if (!image) {
        alert('Please select an image file to upload.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');

        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
    
        if(!cloudinaryResponse.ok) {
            throw new Error('Failed to upload image to Cloudinary.');
        }

        const imageData = await cloudinaryResponse.json();
        const imageUrl = imageData.secure_url;

        const postResponse = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                content,
                category,
                imageUrl
            }),
        });

        if (postResponse.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorData = await postResponse.json();
            throw new Error(errorData.message || 'Failed to create post.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Please try again.');
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);