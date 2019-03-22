import { Component, OnInit } from "@angular/core";
import { Note } from "./notes";
import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-note-manager",
  templateUrl: "./note-manager.component.html",
  styleUrls: ["./note-manager.component.css"],
  encapsulation: ViewEncapsulation.None
  // So it doesn't wrap component view in separate scope and css can be applied to dynamically created divs.
})
export class NoteManagerComponent implements OnInit {
  public noteCounter;
  public newNote;
  public noteList;
  public completedList;
  public cancelledList;
  public currentNote;
  public completedNote;
  public cancelledNote;

  constructor() {
    this.noteCounter = 1;
  this.newNote = false;
  this.noteList = [];
  this.completedList = [];
  this.cancelledList = [];
   }

  ngOnInit() {
    this.currentNote = document.getElementById("main-note-container");
    this.completedNote = document.getElementById("completedContainer");
    this.cancelledNote = document.getElementById("cancelledContainer");
  }

  importNote(event) {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      let { result } = myReader;
      if (typeof result === "string") {
        let notesObject = JSON.parse(result);
        this.objectToNotes(notesObject);
      }
    };
    myReader.readAsText(file);
  }

  objectToNotes(noteObj) {
    for (let i = 0; i < noteObj["todo"].length; i++) {
      this.addObjectNote(
        noteObj["todo"][i]["task"],
        noteObj["todo"][i]["complete"],
        noteObj["todo"][i]["description"]
      );
    }
  }

  addObjectNote(task: string, complete: boolean, description: string) {
    let a: Note;
    this.addNewNote(task, complete, description);
  }

  addInputNote() {
    const templateTitle = document.getElementById(
      "template-title"
    ) as HTMLInputElement;
    const templateParagraph = document.getElementById(
      "template-paragraph"
    ) as HTMLInputElement;
    let title = templateTitle.value;
    let paragraph = templateParagraph.value;

    this.addNewNote(title, false, paragraph);
  }

  addNewNote(title, completed, paragraph) {
    this.noteCounter++;
    let newNote = new Note(title, completed, paragraph, this.noteCounter);
    let pushedArray;
    if (!completed) {
      pushedArray = this.noteList;
    }
    else {
      pushedArray = this.completedList;
    }
    pushedArray.push(newNote);
    pushedArray[pushedArray.length-1].checkmarkButton.addEventListener('click', (e) => this.checkmarkButton(e));
    pushedArray[pushedArray.length-1].nocheckmarkButton.addEventListener('click', (e) => this.nocheckmarkButton(e));
    if (!completed) {
      document.getElementById("templateNote").after(pushedArray[pushedArray.length-1].div);
    }
    else {
      document.querySelector("#completedTitle").after(pushedArray[pushedArray.length-1].div);
      this.removeButtons(pushedArray[pushedArray.length-1]);
    }
    this.cancelNewNote();
  }

  checkmarkButton(e) {
    let parentDiv = e.target.closest(".notes");
    let parentDivId = parentDiv.id.slice((parentDiv.id.search("note")+"note".length));
    let noteIndex = this.noteList.findIndex((element) => {
      return element.id == parentDivId;
    });
    let noteMove = this.noteList[noteIndex];
    this.noteList.splice(noteIndex, 1);
    this.currentNote.removeChild(noteMove.div);
    this.completedList.push(noteMove);
    this.removeButtons(noteMove);
    this.completedNote.after(noteMove.div); 
    document.querySelector("#completedTitle").after(noteMove.div);
  }

  nocheckmarkButton(e) {
    let parentDiv = e.target.closest(".notes");
    let parentDivId = parentDiv.id.slice((parentDiv.id.search("note")+"note".length));
    let noteIndex = this.noteList.findIndex((element) => {
      return element.id == parentDivId;
    });
    let noteMove = this.noteList[noteIndex];
    this.noteList.splice(noteIndex, 1);
    this.currentNote.removeChild(noteMove.div);
    this.removeButtons(noteMove);
    this.cancelledList.push(noteMove);
    document.querySelector("#cancelledTitle").after(noteMove.div);
  }

  removeButtons(note) {
    let checkmark = note.div.querySelector(".title-completed-wrapper > .completed > .checkmark");
    let nocheckmark = note.div.querySelector(".title-completed-wrapper > .completed > .nocheckmark");
    let noteCompleted = note.div.querySelector(".title-completed-wrapper > .completed");
    console.log(checkmark);
    noteCompleted.removeChild(checkmark);
    noteCompleted.removeChild(nocheckmark);

    let undoButton = document.createElement('button');
    undoButton.classList.add('undo');
    undoButton.innerHTML = "UNDO";
    noteCompleted.appendChild(undoButton);
  }

  mainTab(e) {
    this.currentNote.style.display = 'block';
    this.completedNote.style.display = 'none';
    this.cancelledNote.style.display = 'none';
  }

  completedNoteTab(e) {
    this.currentNote.style.display = 'none';
    this.completedNote.style.display = 'block';
    this.cancelledNote.style.display = 'none';
  }

  cancelledNoteTab(e) {
    this.currentNote.style.display = 'none';
    this.completedNote.style.display = 'none';
    this.cancelledNote.style.display = 'block';
  }


  newNoteWindow() {
    document.getElementById('templateNote').style.display = "block";
    document.getElementById('pageDim').style.display = "block";
  }

  cancelNewNote() {
    document.getElementById('templateNote').style.display = "none";
    document.getElementById('pageDim').style.display = "none";
  }

  deleteNote() {
    let note = document.getElementById(`note${this.noteCounter}`);
    note.parentNode.removeChild(note);
    //this.archiveList.push(noteList[this.noteList.length-1].div
  }

  //window.addEventListener('load', draw);

  clearNotes() {
    while (this.noteCounter > 1) {
      let note = document.getElementById(`note${this.noteCounter}`);
      note.parentNode.removeChild(note);
      this.noteCounter--;
    }
  }

  draw() {
    console.log(document.getElementById("container"));
  }
}
