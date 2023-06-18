const commentField = document.querySelector('#comment');

const submitBtn = document.querySelector('#submit');

const handleClick = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/comment', {
    method: 'PUT',
    body: JSON.stringify({ comment: commentField.value }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    //Reset the comment textarea field
    commentField.value = '';
    // document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

submitBtn.addEventListener('click', handleClick);
