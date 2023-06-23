const commentField = document.querySelector('#comment');
const submitBtn = document.querySelector('#submit');

const handleClick = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify({ comment: commentField.value }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      const data = await response.json();
      //redirect user to the login page
      window.location.href = data.redirectTo;
    } else if (response.ok) {
      const data = await response.json();
      // Reset the comment textarea field
      commentField.value = '';
      // Refresh the page to see the new comment
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

if (submitBtn) submitBtn.addEventListener('click', handleClick);
