


const btn = document.querySelector('button');
const input = document.querySelector('#hymn');
const output = document.querySelectorAll('.text');
const subtitle = document.querySelectorAll('.subtitle')
const loading = document.querySelector('.loading');
const title = document.querySelector('.title')
const prevBTN = document.querySelectorAll('.prev');
const nextBTN = document.querySelectorAll('.next');
const navs = document.querySelectorAll('nav');
const fontBtn = document.querySelectorAll('.font-btn');
const fontBall = document.querySelector('.font-ball');
const fontNav = document.querySelector('.font-section');

let fontBallPos = 40;
let titleSize = 2;
let textSize = 1.4;
let subSize = 1.3;

let songIndex;



btn.addEventListener('click', (e) => {
  e.preventDefault();

  subtitle.forEach(title => title.style.visibility = 'hidden');

  fontNav.style.visibility = 'visible';
  fontNav.style.opacity = '1';

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

            let twiTitle = data[i].title.replace(/q|Q/g, 'ε');
            title.innerText = twiTitle.replace(/x|X/g, 'ɔ');
            hymnID.innerText = data[i].number;
            // A B D E ε F H I J K L M N Ŋ O ɔ P R S T U V W Y Z
            // a b d e ε f g h i j k l m n ŋ o ɔ p r s t u v w y z

            let twiHymn = data[i].songEN.replace(/q|Q/g, 'ε')
            output[0].innerText = twiHymn.replace(/x|X/g, 'ɔ')
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

            let twiTitle = data[songIndex].title.replace(/q|Q/g, 'ε');
            title.innerText = twiTitle.replace(/x|X/g, 'ɔ');
            let twiHymn = data[songIndex].songEN.replace(/q|Q/g, 'ε')
            output[0].innerText = twiHymn.replace(/x|X/g, 'ɔ')
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

            let twiTitle = data[songIndex].title.replace(/q|Q/g, 'ε');
            title.innerText = twiTitle.replace(/x|X/g, 'ɔ');

            let twiHymn = data[songIndex].songEN.replace(/q|Q/g, 'ε')
            output[0].innerText = twiHymn.replace(/x|X/g, 'ɔ')
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


fontBtn[0].addEventListener('click', () => {
  console.log('Clicked on minus button!');
  if (fontBallPos > 0) {
    titleSize = titleSize - 0.3;
    title.style.fontSize = `${titleSize}rem`;

    textSize = textSize - 0.3;
    output.forEach((text) => {
      text.style.fontSize = `${textSize}rem`;
    })

    subSize = subSize - 0.3;
    subtitle.forEach((sub) => {
      sub.style.fontSize = `${subSize}rem`;
    })

    fontBtn[1].style.background = '#B83280';
    fontBallPos = fontBallPos - 20;
    fontBall.style.left = `${fontBallPos}%`;
    console.log(fontBallPos)

  }

  if (fontBallPos === 0) {
    fontBtn[0].style.background = '#E2E8F0';

  }

})

fontBtn[1].addEventListener('click', () => {
  if (fontBallPos < 80) {
    titleSize = titleSize + 0.3;
    title.style.fontSize = `${titleSize}rem`;

    textSize = textSize + 0.3;
    output.forEach((text) => {
      text.style.fontSize = `${textSize}rem`;
    })

    subSize = subSize + 0.3;
    subtitle.forEach((sub) => {
      sub.style.fontSize = `${subSize}rem`;
    })

    fontBtn[0].style.background = '#B83280';
    fontBallPos = fontBallPos + 20;
    fontBall.style.left = `${fontBallPos}%`;
    console.log(fontBallPos)
  }

  if (fontBallPos === 80) {
    fontBtn[1].style.background = '#E2E8F0';
  }
  console.log('Clicked on plus button')
})

function checkEng(arr, index) {
  if (arr[index].songTWI === undefined) {
    navs[1].style.visibility = 'hidden';
    navs[1].style.visibility = '0';
    subtitle[1].style.visibility = 'hidden'
    output[1].innerText = '';

  }
}