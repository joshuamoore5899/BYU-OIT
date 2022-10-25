document.querySelector('button').addEventListener('click', apiRequest)
const presentation = document.querySelector('#presentation')



async function apiRequest(){
  presentation.innerHTML = "";
    const name = document.querySelector('input').value
    try{
        const response = await fetch(`/api/:${name}`)
        const data = await response.json()

        for (let i = 0; i < data.length; i++) {
          presentation.appendChild(createSection(data[i].title, data[i].poster_image_url, data[i].date, data[i].popularity_summary));
        }
    }catch(error){
        console.log(error)
    }
}

function createSection(name, url, date, popularity) {
  let section = document.createElement('section');
  section.appendChild(createHeader(name));
  section.appendChild(createImg(url));
  section.appendChild(createH4(date));
  section.appendChild(createSpan(popularity));
  section.classList.add('movie');
  return section;
}

function createHeader(name) {
  let header = document.createElement('h2');
  header.textContent = name;
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

function createH4(date) {
  let h4 = document.createElement('h4');
  h4.textContent = 'Released: ' + date;
  return h4;
}

function createSpan(popularity) {
  let span = document.createElement('span');
  span.textContent = 'Rating: ' + popularity;
  return span;
}
