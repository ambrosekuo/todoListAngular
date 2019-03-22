export class Note {
    checkmarkImgSrc = '../../assets/images/checkmark.png';
    nocheckmarkImgSrc = '../../assets/images/notcheckmark.png';
    div: HTMLDivElement;
    timeStamp: HTMLDivElement;
    title: HTMLDivElement;
    completedInfo: HTMLDivElement;
    body: HTMLDivElement;
    checkmarkButton:HTMLButtonElement;
    nocheckmarkButton:HTMLButtonElement;
    txt: string;
    complete: boolean;
    id: number;
    
  constructor(public titleName:string, public completed:boolean, public bodytxt:string, public idNumb:number) {
    this.div = document.createElement('div');
    this.div.classList.add('modules', 'notes');
    this.id =idNumb;
    this.div.id = `note${this.id}`;

    this.complete = completed;

    this.timeStamp = document.createElement('div');
    this.timeStamp.classList.add('timestamp');
    this.timeStamp.innerHTML  = (new Date().toLocaleDateString("en-US"));

    /* Create checkmark area */
    this.completedInfo = document.createElement('div');
    this.completedInfo.classList.add('completed');
    this.checkmarkButton = document.createElement('button');
   // checkmarkButton.addEventListener('click',this.checkmarkNote);
    this.checkmarkButton.classList.add('checkmark');

    this.nocheckmarkButton = document.createElement('button');
   // nocheckmarkButton.addEventListener('click',this.nocheckmarkNote);
    this.nocheckmarkButton.classList.add('nocheckmark');
    
    this.completedInfo.appendChild(this.checkmarkButton);
    this.completedInfo.appendChild(this.nocheckmarkButton);

    this.title = document.createElement('div');
    this.title.classList.add('title');
    this.title.innerHTML = titleName;

    let titleCompletedWrapper = document.createElement('div');
    titleCompletedWrapper.classList.add('title-completed-wrapper');
    titleCompletedWrapper.appendChild(this.title);
    titleCompletedWrapper.appendChild(this.completedInfo);

    this.body = document.createElement('p');
    this.body.innerHTML = bodytxt;    
    
    this.div.appendChild(this.timeStamp);
    this.div.appendChild(titleCompletedWrapper);
    this.div.appendChild(this.body);
    this.txt = bodytxt;

    //this.addCSS();
    //this.id = id;
  }

  addCSS() {
      this.div.style.border = '1px black solid';
  }

  writeTitle() {

  }

  

  completeNote() {
    if (this.complete) { this.completedInfo.innerHTML = 'checked'} //replace with some sort of image/animation later
    else {this.completedInfo.innerHTML = 'not done'}
  }

  clearNote() {
    this.txt = '';
    this.updateNote();
  }

  updateNote() {
      
  }
}
