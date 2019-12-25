const setTagAsDone = async (element, id) => {
  event.preventDefault();
  try {
    let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded' });
    let body = `done=${element.checked}`;
    let response = await fetch(`/tasks/${id}?_method=put`, { method: 'PUT', body: body, headers: headers });
    let data = await response.json();
    let task = data.task;
    let parent = element.parentNode;

    element.checked = task.done;
    if (task.done) {
      parent.classList.add('has-text-success');
      parent.classList.add('is-italic');
    } else {
      parent.classList.remove('has-text-success');
      parent.classList.remove('is-italic');
    }
  } catch (e) {
    alert('erro ao atualizar');
  }
}