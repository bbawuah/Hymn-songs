


const btn = document.querySelector('button');
const input = document.querySelector('#hymn');
const output = document.querySelectorAll('.text');
const subtitle = document.querySelectorAll('.subtitle')
const loading = document.querySelector('.loading');
const title = document.querySelector('.title')
const prevBTN = document.querySelectorAll('.prev');
const nextBTN = document.querySelectorAll('.next');
const navs = document.querySelectorAll('nav');

let songIndex;



btn.addEventListener('click', (e) => {
  e.preventDefault();

  subtitle.forEach(title => title.style.visibility = 'hidden');

  title.textContent = ''
  loading.style.visibility = 'visible';
  loading.style.opacity = 1;
  output.forEach((text) => text.innerText = '')
  navs.forEach((nav) => {
    nav.style.visibility = 'hidden'
    nav.style.opacity = '0'
  });

  let hymnID = input.value.toUpperCase().replace(/ /g, "");


  let hymnal = [];

  setTimeout(() => {


    fetch('/json/hymns.json')
      .then(response => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].number === hymnID) {

            songIndex = i;

  
            navs.forEach((nav) => {
              nav.style.visibility = 'visible'
              nav.style.opacity = '1'
            });

            subtitle.forEach(title => title.style.visibility = 'visible');
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
            title.innerText = data[i].title;
            hymnID.innerText = data[i].number;
            output[0].innerText = data[i].songEN;
            output[1].innerText = data[i].songTWI;
            checkEng(data, i);

            hymnal.push(data[i])
          }
        }
        if (hymnal.length === 0) {
          subtitle.forEach(title => title.style.visibility = 'hidden');
          loading.style.visibility = 'hidden';
          loading.style.opacity = 0;
          title.innerText = '';
          hymnID.innerText = '';
          output[1].innerText = '';
          output[0].innerText = 'No hymnal found..';
        }
      })
      .catch(error => console.error(error));

  }, 300);
})

nextBTN.forEach((btn) => {

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    title.textContent = ''
    loading.style.visibility = 'visible';
    loading.style.opacity = 1;
    output.forEach((text) => text.innerText = '')
    subtitle.forEach(title => title.style.visibility = 'hidden');
    navs.forEach((nav) => {
      nav.style.visibility = 'hidden'
      nav.style.opacity = '0'
    });
    let hymnID = input.value.toUpperCase().replace(/ /g, "");


    setTimeout(() => {


      fetch('/json/hymns.json')
        .then(response => response.json())
        .then((data) => {

          songIndex++;

          if (data[songIndex]) {

            navs.forEach((nav) => {
              nav.style.visibility = 'visible'
              nav.style.opacity = '1'
            });

            input.value = data[songIndex].number;
            subtitle.forEach(title => title.style.visibility = 'visible');
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
            title.innerText = data[songIndex].title;
            output[0].innerText = data[songIndex].songEN;
            output[1].innerText = data[songIndex].songTWI;
            checkEng(data, songIndex);


          } else {
            subtitle.forEach(title => title.style.visibility = 'hidden');
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
            title.innerText = '';
            hymnID.innerText = '';
            output[1].innerText = '';
            output[0].innerText = 'No hymnal found..';
          }



        })
        .catch(error => console.error(error));

    }, 300);
  })

})



prevBTN.forEach((btn) => {

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    title.textContent = ''
    loading.style.visibility = 'visible';
    loading.style.opacity = 1;
    output.forEach((text) => text.innerText = '')
    subtitle.forEach(title => title.style.visibility = 'hidden');
    navs.forEach((nav) => {
      nav.style.visibility = 'hidden'
      nav.style.opacity = '0'
    });


    let hymnID = input.value.toUpperCase().replace(/ /g, "");


  

    setTimeout(() => {


      fetch('/json/hymns.json')
        .then(response => response.json())
        .then((data) => {

          songIndex--;

          if (data[songIndex]) {

            navs.forEach((nav) => {
              nav.style.visibility = 'visible'
              nav.style.opacity = '1'
            });


            input.value = data[songIndex].number;
            subtitle.forEach(title => title.style.visibility = 'visible');
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
            title.innerText = data[songIndex].title;
            output[0].innerText = data[songIndex].songEN;
            output[1].innerText = data[songIndex].songTWI;
            checkEng(data, songIndex);


          } else {
            subtitle.forEach(title => title.style.visibility = 'hidden');
            loading.style.visibility = 'hidden';
            loading.style.opacity = 0;
            title.innerText = '';
            hymnID.innerText = '';
            output[1].innerText = '';
            output[0].innerText = 'No hymnal found..';
          }



        })
        .catch(error => console.error(error));

    }, 300);
  })

})


function checkEng(arr, index) {
  if (arr[index].songTWI === undefined) {
    navs[1].style.visibility = 'hidden';
    navs[1].style.visibility = '0';
    subtitle[1].style.visibility = 'hidden'
    output[1].innerText = '';

  }
}