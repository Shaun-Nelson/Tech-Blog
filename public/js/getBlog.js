const handleClick = async (event) => {
  event.preventDefault();

  const id = document.querySelector('.id').innerHTML;

  if (id) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // const blog = response.json();
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
