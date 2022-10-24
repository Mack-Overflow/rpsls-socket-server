let currentTheme = null;

async function fetchCourses() {
  let url =
    'http://localhost:3000/api/v1/courses';
  axios.get(url).then((res) => {
    loadOptions(res.data);
    // console.log(res);
  });
}

function loadOptions(responseData) {
  // console.log('loading options');
  let courses = document.getElementById('course');
  for (let i = 0; i < responseData.length; i++) {
    courses.options[courses.options.length] = new Option(
      responseData[i].display,
      responseData[i].id
    );
  }
  // console.log(courses.options);
}

function fetchLogs(courseId, uvuId) {
  // Retrieve Logs using Fetch API

  let url = `http://localhost:3000/logs?courseId=${courseId}&uvuId=${uvuId}`;

  axios.get(url).then((res) => {
    // Set <li> tags for each log in response
    // console.log(res);
    let liTags = '';
    let ul = $('[data-cy=logs]')[0];

    for (let i = 0; i < res.data.length; i++) {
      // Creating list items, styling, appending to ul. Make responsive
      let li = document.createElement('li');
      li.classList.add('my-2');
      li.classList.add('flex');
      let div = document.createElement('div');
      div.setAttribute('id', `log${i}`);
      div.classList.add('logContainers');

      let p = document.createElement('p');
      p.innerHTML = res.data[i].date;
      p.classList.add('font-serif');
      p.classList.add('text-sm');
      // p.add

      let pText = document.createElement('p');
      pText.innerHTML = res.data[i].text;
      // pText.classList.add('hidden'); // Not yet working
      pText.classList.add('text-md');
      pText.setAttribute('id', `logText${i}`);

      // A D D  E V E N T  L I S T E N E R S
      div.addEventListener('click', function (e, i) {
        let logText = $(`#logText${i}`);
        console.log(logText);
        if (logText.hasClass('hidden')) {
          logText.removeClass('hidden');
        } else {
          logText.addClass('hidden');
        }
      });

      // $(`#log${i}`).on('click', (e) => {
      //   console.log('iin function');
      //   if (e.hasClass('hidden')) {
      //     console.log('hidden class on tag');
      //     e.removeClass('hidden');
      //   } else {
      //     $(`#logText${i}`).addClass('hidden');
      //   }
      // });
      div.appendChild(p);
      div.appendChild(pText);
      li.appendChild(div);
      ul.appendChild(li);
    }
  });

  // let divs = $('.logContainers');
  // let divs = [document.getElementsByClassName('logContainers')];
  // let i = 0;
  // divs.forEach((el) => {
  //   console.log(el);
  //   el.addEventListener('click', function () {
  //     if ($(`#logText${i}`).hasClass('hidden')) {
  //       $(`#logText${i}`).removeClass('hidden');
  //     } else {
  //       $(`#logText${i}`).addClass('hidden');
  //     }
  //   });
  //   i++;
  // });
  // console.log(divs);
}

/**
 * Submits a log when #submitLogBtn is clicked
 */
function submitLog(formData) {
  let url = `serverName/logs?courseId=${courseId}`;

  axios.post(url, formData);
}

function displayUvuId() {
  $('#uvuIdDisplay').innerHtml = 'Student Logs for ' + $('#uvuId_input');
}

function pageLoaded() {
  setColorScheme();
  fetchCourses();
  eventListeners();
}

function eventListeners() {
  let course = $('#course')[0];
  let idContainer = $('#idContainer');
  let uvuId = $('#uvuId')[0];

  course.addEventListener('input', function (e) {
    !course.value
      ? idContainer.addClass('hidden')
      : idContainer.removeClass('hidden');
  });

  uvuId.addEventListener('input', function (e) {
    let lengthOf = uvuId.value.length;
    if (lengthOf === 8) {
      if ($('.logContainers').length === 0)
        fetchLogs(course.value, uvuId.value);
      displayUvuId();
      $('#submitBtnContainer').removeClass('hidden');
    } else {
      $('#submitBtnContainer').addClass('hidden');
    }
  });
}

// UVU & DARK MODE
function setColorSchemeOnPageLoad() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches; // W O R K I N G

  if (prefersDarkMode) {
    currentTheme = 'dark';
    $('#pageBody').addClass('bgGray800');
  } else {
    currentTheme = 'light';
  }
}

function darkColorTheme() {
  currentTheme = 'dark';
  console.log('setting dark theme');
  $('#pageBody').addClass('bgGray800');
}

function lightColorTheme() {
  currentTheme = 'light';
  console.log('setting light theme');
  // $('#pageBody').removeClass('bgGray800');
  $('#pageBody').addClass('bgWhite');
}

function uvuColorTheme() {
  currentTheme = 'uvu';
  console.log('setting uvu theme');
  // Sets different areas to UVU colors and sets favicon to UVU logo
  // UVU COLORS:

  $('#pageBody').addClass('primaryGreen');
}
