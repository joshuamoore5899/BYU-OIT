document.querySelector('button').addEventListener('click', apiRequest)
const presentation = document.querySelector('#presentation')



async function apiRequest(){
  presentation.innerHTML = "";
    const name = document.querySelector('input').value
    try{
        const response = await fetch(`/api/:${name}`)
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
          presentation.appendChild(createSection(data[i].title, data[i].poster_image_url, data[i].popularity_summary));
        }
    }catch(error){
        console.log(error)
    }
}

function createSection(name, url, text) {
  let section = document.createElement('section');
  section.appendChild(createHeader(name));
  section.appendChild(createImg(url));
  section.appendChild(createSpan(text));
  return section;
}

function createHeader(name) {
  let header = document.createElement('h2');
  header.textContent = 'Title: ' + name;
  return header;
}

function createID(id) {
  let idElement = document.createElement('h3');
  idElement.textContent = 'Movie ID: ' + id;
  return idElement;
}

function createImg(url) {
  let img = document.createElement('img');
  img.src = url;
  return img;
}

function createSpan(text) {
  let span = document.createElement('span');
  span.textContent = 'Popularity: ' + text;
  return span;
}
