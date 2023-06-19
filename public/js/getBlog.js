const handleClick = async (event) => {
  event.preventDefault();

  const selectedCard = event.currentTarget;
  const span = selectedCard.querySelectorAll('#id')[0];
  const id = span.getAttribute('data-id');

  if (id) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/comment');
    }
  } else {
    alert(response.statusText);
  }
};

const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', handleClick);
}
