const updateBtn = document.querySelector('#update');
const deleteBtn = document.querySelector('#delete');

const handleUpdate = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const span = document.querySelector('#id');
  const id = span.getAttribute('data-id');

  const response = await fetch('/' + id, {
    method: 'PUT',
    body: JSON.stringify({ title: title, content: content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const handleDelete = async (event) => {
  event.preventDefault();

  const span = document.querySelector('#id');
  const id = span.getAttribute('data-id');

  const response = await fetch('/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

updateBtn.addEventListener('click', handleUpdate);
deleteBtn.addEventListener('click', handleDelete);
