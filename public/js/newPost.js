const createBtn = document.querySelector('#create');
const cards = document.querySelectorAll('.card');

const handleCreate = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/post');

  if (response.ok) {
    document.location.replace('/api/post');
  } else {
    alert(response.statusText);
  }
};

const handleClick = async (event) => {
  event.preventDefault();

  const selectedCard = event.currentTarget;
  const span = selectedCard.querySelectorAll('#id')[0];
  const id = span.getAttribute('data-id');

  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/edit');
  } else {
    alert(response.statusText);
  }
};

createBtn.addEventListener('click', handleCreate);

for (let card of cards) {
  card.addEventListener('click', handleClick);
}
