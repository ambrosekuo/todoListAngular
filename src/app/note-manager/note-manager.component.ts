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
  public completdList;
  public cancelledList;
  public mainNote;
  public completedNote;
  public cancelledNote;

  constructor() {
    this.noteCounter = 1;
  this.newNote = false;
  this.noteList = [];
  this.completdList = [];
  this.cancelledList = [];
   }

  ngOnInit() {
    this.mainNote = document.getElementById("main-note-container");
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
    this.noteCounter++;
    a = new Note(task, complete, description, this.noteCounter);
    document.getElementById("main-note-container").appendChild(a.div);
  }

  addNewNote() {
    const templateTitle = document.getElementById(
      "template-title"
    ) as HTMLInputElement;
    const templateParagraph = document.getElementById(
      "template-paragraph"
    ) as HTMLInputElement;
    let a: Note;
    this.noteCounter++;
    let title = templateTitle.value;
    let paragraph = templateParagraph.value;
    let completed = false;
    this.noteList.push(new Note(title, completed, paragraph, this.noteCounter));
    console.log(this.noteList);
    console.log(this.noteList.length);
    this.noteList[this.noteList.length-1].checkmarkButton.addEventListener('click', (e) => this.checkmarkButton(e));
    this.noteList[this.noteList.length-1].nocheckmarkButton.addEventListener('click', (e) => this.nocheckmarkButton(e));
    document.getElementById("templateNote").after(this.noteList[this.noteList.length-1].div);
    this.cancelNewNote();
  }

  checkmarkButton(e) {
    let noteIndex = this.noteList.findIndex((element) => {
      return element.id == e.target.id;
    });
    let noteMove = this.noteList[noteIndex];
    this.noteList.splice(noteIndex, 1);
    document.getElementById('main-note-container').removeChild(noteMove.div);
    this.completdList.push(noteMove);
    document.getElementById('completedContainer').after(noteMove.div);
  }

  nocheckmarkButton(e) {
    console.log(this.noteList);
    console.log(this.noteList.length);
    let noteIndex = this.noteList.findIndex((element) => {
      return element.id == e.target.id;
    });
    let noteMove = this.noteList[noteIndex];
    this.noteList.splice(noteIndex, 1);
    document.getElementById('main-note-container').removeChild(noteMove.div);
    this.cancelledList.push(noteMove);
    document.getElementById('completedContainer').after(noteMove.div);
  }

  mainTab(e) {
    this.mainNote.style.display = 'block';
    this.completedNote.style.display = 'none';
    this.cancelledNote.style.display = 'none';
  }

  completedNoteTab(e) {
    this.mainNote.style.display = 'none';
    this.completedNote.style.display = 'block';
    this.cancelledNote.style.display = 'none';
  }

  cancelledNoteTab(e) {
    this.mainNote.style.display = 'none';
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
