const logout = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      console.log('Logout successful, redirecting to homepage.');
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error('Error during logout:', error.message);
    alert('An unexpected error occured.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
