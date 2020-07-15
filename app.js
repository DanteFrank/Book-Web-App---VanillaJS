//Create Music Class
class Music {
    constructor(title, artist, year){
        this.title = title;
        this.artist = artist;
        this.year = year;
    }
}

// Create UI Class
class UI {
    static displayMusic() {
      
      const songs = Store.getMusic();
  
      songs.forEach((song) => UI.addMusicToList(song));
    }
  
    static addMusicToList(song) {
      const list = document.querySelector("#music-list");
  
      const row = document.createElement("tr");
  
      row.innerHTML = `
              <td>${song.title}</td>
              <td>${song.artist}</td>
              <td>${song.year}</td>
              <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
          `;
  
      list.appendChild(row);
    }

    //Delete Music Instance
    static deleteMusic(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
    };
   

    static showAlert(message, className){
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#music-form');
      container.insertBefore(div, form);

      //Set timeout
      setTimeout(() => document.querySelector('.alert').remove(), 1000);
    };

    //Clear Fields
    static clearFields(){
      document.querySelector('#title').value = '';
      document.querySelector('#artist').value = '';
      document.querySelector('#year').value = '';
    }
  };



/*Storage Class:  Handles local storage in cache; 

You can't store objects to local cache so before you store it, you have to stringfy it and parse it when you pull it out

*/
// MR SAIDI please, this is the new Store class I created.
class Store {

  static getMusic() {
   let music;

   if(localStorage.getItem('music') === null) {
     music = [];
   } else {
     music = Json.parse(localStorage.getItem('music'));
   }

   return music;
  }

  static addMusic(song) {
    const music = Store.getMusic();

    music.push(song);

    localStorage.setItem('music', JSON.stringify(music));
  };

  static removeMusic(title) {
    const music = Store.getMusic();

    music.forEach((song, index) => {
      if(song.title === title) {
        music.splice(index,  1);
      }
    });

    localStorage.setItem('song', JSON.stringify(song))
  }
}



//Event Listner: Display Music
document.addEventListener('DOMContentLoaded', UI.displayMusic);



// Event Listner: Add Music
document.querySelector('#music-form').addEventListener('submit', (e) => {
  //Prevent default
  e.preventDefault();

  //Grab Form details
  const title = document.querySelector('#title').value;
  const artist = document.querySelector('#artist').value;
  const year = document.querySelector('#year').value;

  if(title === '' || artist === '' || year === '' ){
    UI.showAlert('Please fill in all Fields', 'danger');
  } else {

    //Instantiate New Music
    const music = new Music(title, artist, year);

    //Add Music to UI
    UI.addMusicToList(music);

    //Add Music to local storage
    Store.addMusic(song); //MR. SAIDI attention please. This is were I try to add data to local cache storage by calling the addMusic method from the Store class.

    //Success Message Prompt
    UI.showAlert('Music Added', 'success');

    //Clear Fields after insertion
    UI.clearFields();
  }
  
});

// Event Listener: Delete Music
document.querySelector('#music-list').addEventListener('click', (e) => {
  UI.deleteMusic(e.target);

  //Message prompt
  UI.showAlert('Book Removed', 'info');
})
