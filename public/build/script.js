const draggables = document.querySelectorAll('.draggable')
const dropzones = document.querySelectorAll('.dropzone')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    // run api at this point instead of log to update id sprint
    console.log ("Item Moved")
  })
})

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(dropzone, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        dropzone.appendChild(draggable)
    } else {
        dropzone.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(dropzone, y) {
  const draggableElements = [...dropzone.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}