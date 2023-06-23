const commentField = document.querySelector('#comment');
const submitBtn = document.querySelector('#submit');

const handleClick = async (event) => {
  event.preventDefault();
  console.log('Before fetch:', commentField.value);

  const response = await fetch('/api/comment/new', {
    method: 'POST',
    body: JSON.stringify({ comment: commentField.value }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('Response:', response);

  if (response.ok) {
    console.log('Response OK');

    //Reset the comment textarea field
    commentField.value = '';
    //Refresh the page to see the new comment
    document.location.reload();
  } else {
    console.log('Error:', response.statusText);

    alert(response.statusText);
  }
};

if (submitBtn) submitBtn.addEventListener('click', handleClick);
