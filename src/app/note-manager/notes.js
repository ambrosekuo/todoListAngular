class Note {
  constructor(title, txt, id) {
    this.div = document.createElement('div');
    this.div.classList.add('modules', 'notes');
    this.div.id = `note${id}`;
    this.div.style.order = 

    this.timeStamp = document.createElement('div');
    this.timeStamp.innerHTML  = (new Date().toLocaleDateString("en-US"));

    this.title = document.createElement('h3');
    this.title.innerHTML = title;

    this.body = document.createElement('p');
    this.body.innerHTML = txt;    
    
    this.div.appendChild(this.timeStamp);
    this.div.appendChild(this.title);
    this.div.appendChild(this.body);
    this.txt = txt;

    //this.addCSS();
    //this.id = id;
  }

  addCSS() {
      this.div.style.border = '1px black solid';
  }

  writeTitle() {

  }

  clearNote() {
    this.txt = '';
    this.updateNote();
  }

  updateNote() {
      
  }
}

let noteCounter = 1;

function addNewNote() {
    noteCounter++;
    let title = document.getElementById('template-title').value;
    let paragraph = document.getElementById('template-paragraph').value;
    let a = new Note(title,paragraph, noteCounter);
    document.getElementById('main-dashboard').appendChild(a.div);
}

window.addEventListener('load', draw);

function clearNotes() {
    while (noteCounter > 1) {
      let note = document.getElementById(`note${noteCounter}`);
      note.parentNode.removeChild(note);
      noteCounter--;
    }
}

function draw() {
  console.log(document.getElementById('container'));
}

