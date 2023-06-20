const createBtn = document.querySelector('#create');

const handleClick = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/post');

  if (response.ok) {
    document.location.replace('/api/post');
  } else {
    alert(response.statusText);
  }
};

createBtn.addEventListener('click', handleClick);
