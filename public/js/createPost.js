const submitBtn = document.querySelector('#submit');

const handleClick = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  const response = await fetch('/', {
    method: 'POST',
    body: JSON.stringify({ title: title, content: content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

submitBtn.addEventListener('click', handleClick);
