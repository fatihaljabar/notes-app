import '../css/style.css';
import { customValidationHeadingHandler } from './form-custom-validation.js';
import './components/MyFooter.js';
import './components/MyHeader.js';
import './components/FromAddNotes.js';
import './components/ProfilNotes.js';
import Swal from 'sweetalert2';

const form = document.querySelector('form.formAddNotes');
const headingInput = form.elements['heading'];
const bodyInput = form.elements['body'];
const notesContainer = document.getElementById('notesContainer');

const loadNotesFromAPI = async () => {
  Swal.fire({
    title: 'Loading...',
    text: 'Fetching notes from the server...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    data.data.forEach((note) => addNoteToDOM(note));
    updateTotalNotesCount(data.data);

    setTimeout(() => {
      Swal.close();
    }, 500);
  } catch (error) {
    console.error('Error loading notes:', error);
    Swal.fire({
      title: 'Error',
      text: 'Failed to load notes from server!',
      icon: 'error',
    });
  }
};

const saveNoteToAPI = async (note) => {
  Swal.fire({
    title: 'Saving...',
    text: 'Please wait while your note is being saved',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        body: note.body,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setTimeout(() => {
      addNoteToDOM(data.data);
      updateTotalNotesCount();

      Swal.fire({
        title: 'Success',
        text: 'Note added successfully to the server!',
        icon: 'success',
      });
    }, 1000);
  } catch (error) {
    console.error('Error adding note:', error);
    Swal.fire({
      title: 'Error',
      text: 'Failed to add note to the server!',
      icon: 'error',
    });
  }
};

const getNoteFromAPI = async (noteId) => {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Return the note data
  } catch (error) {
    console.error('Error fetching note details:', error);
    Swal.fire({
      title: 'Error',
      text: 'Failed to fetch note details!',
      icon: 'error',
    });
  }
};

const deleteNoteFromAPI = async (noteId) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (confirmation.isConfirmed) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const noteCard = document.getElementById(noteId);
      if (noteCard) {
        notesContainer.removeChild(noteCard);
      }

      updateTotalNotesCount();

      Swal.fire({
        title: 'Deleted!',
        text: 'Your note has been deleted.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete note from the server!',
        icon: 'error',
      });
    }
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newNote = {
    title: headingInput.value,
    body: bodyInput.value,
    createdAt: new Date().toISOString(),
  };

  await saveNoteToAPI(newNote);
  form.reset();
});

const addNoteToDOM = (note) => {
  const noteCard = document.createElement('div');
  noteCard.className = 'cardNotes';
  noteCard.id = note.id;

  noteCard.innerHTML = `
        <div class="imgH2Card">
            <img src="./cardNotes.png" alt="">
            <h4>${truncateTitle(note.title, 17)}</h4>
        </div>
        <hr class="hrCardNotes">
        <p>${truncateText(note.body, 10)}</p>
        <p>Created: ${formatDate(note.createdAt)}</p>
        <div class="buttonCardNotes">
            <button id="btnDetail">Detail</button>
            <button id="btnDelete" data-note-id="${note.id}">Delete</button>
        </div>
    `;

  if (notesContainer.firstChild) {
    notesContainer.insertBefore(noteCard, notesContainer.firstChild);
  } else {
    notesContainer.appendChild(noteCard);
  }

  updateTotalNotesCount();

  const deleteButton = noteCard.querySelector('#btnDelete');
  deleteButton.addEventListener('click', () => {
    deleteNoteFromAPI(note.id);
  });

  const detailButton = noteCard.querySelector('#btnDetail');
  detailButton.addEventListener('click', async () => {
    const noteId = note.id;
    const noteDetail = await getNoteFromAPI(noteId);

    if (noteDetail) {
      Swal.fire({
        title: noteDetail.title,
        html: `
                <p style="text-align: justify;">${noteDetail.body}</p>
                <br>
                <p style="text-align: left;"><strong>Created:</strong> ${formatDate(noteDetail.createdAt)}</p>`,
        icon: 'info',
        confirmButtonText: 'Close',
      });
    }
  });
};

const updateTotalNotesCount = (notes = null) => {
  const totalNotesCount = document.getElementById('totalNotesCount');
  if (notes) {
    totalNotesCount.innerText = notes.length;
  } else {
    const currentNotes = notesContainer.children;
    totalNotesCount.innerText = currentNotes.length;
  }
};

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const truncateText = (text, maxWords) => {
  const words = text.split(' ');
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(' ') + '...';
};

const truncateTitle = (title, maxChars) => {
  if (title.length <= maxChars) {
    return title;
  }
  return title.slice(0, maxChars) + '...';
};

headingInput.addEventListener('input', (event) => {
  customValidationHeadingHandler(event);
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;
  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});

headingInput.addEventListener('blur', (event) => {
  customValidationHeadingHandler(event);
});

headingInput.addEventListener('invalid', customValidationHeadingHandler);

bodyInput.addEventListener('input', (event) => {
  customValidationHeadingHandler(event);

  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;
  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});

bodyInput.addEventListener('blur', (event) => {
  customValidationHeadingHandler(event);
});

bodyInput.addEventListener('invalid', customValidationHeadingHandler);

loadNotesFromAPI();
