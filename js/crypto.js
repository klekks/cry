var words_crypt = [];
var words_encrypt = [];

var letters = {};
var letters_count = {};

var crypt_stat = [];

var text_crypt = ``;
var text_encrypt = ``;
var count_of_letters = 0;


function parseText (text) {
  text_crypt = text.slice(0);
  $(`textarea[name="crypto"]`).val(text_crypt);
  text_encrypt = text.slice(0);
  $(`textarea[name="encrypto"]`).val(text_encrypt);
  let word = "";
  for (i = 0; i < text.length; i++) {
    if (alphabet.indexOf(text[i]) >= 0) {
      word += text[i];
      count_of_letters += 1;
      if (crypt_stat[text[i]] != undefined) crypt_stat[text[i]] += 1;
      else crypt_stat[text[i]] = 1;
    }
    else {
      if (word != "") words_crypt.push(word);
      word = "";
    }
  }
  for (i in alphabet)
      if (crypt_stat[alphabet[i]] == undefined) crypt_stat[alphabet[i]] = 0;
  for (j in crypt_stat) crypt_stat[j] = crypt_stat[j] / count_of_letters * 100;
  let sortable = [];
  for (i in crypt_stat) sortable.push([i, crypt_stat[i]]);

  crypt_stat = sortable;
  crypt_stat.sort(function(a, b) {return a[1] - b[1];});


  for (i in text_encrypt)
    if (letters_count[text_encrypt[i]] != undefined) letters_count[text_encrypt[i]] += 1;
    else letters_count[text_encrypt[i]] = 1;


  UpdateStats();
  WordsGenerate();
}

function UpdateStats() {

  let labels= [];
  for (i in russian_stat) {
    labels.push(russian_stat[i][0] + '&' + crypt_stat[i][0]);
  }
  labels_r = [];
  labels_c = [];
  perc_r = [];
  perc_c = [];

  for (i in russian_stat) {
    perc_r.push(russian_stat[i][1]);
    perc_c.push(crypt_stat[i][1]);
  }

  console.log(perc_r);

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'in Russian',
              data: perc_r,
              backgroundColor: '#0b81e2',
              borderColor: '#0b81e2',
              borderWidth: 1
          },
        {
          label: 'in Crypto',
          data: perc_c,
          backgroundColor: 'rgba(255, 255, 255, 1.0)',
          borderColor: 'rgba(255, 255, 255, 1.0)',
          borderWidth: 1,
          fontSize: 32,
        }]
      },
      options: {
                scales: {
                  yAxes: [{
                    gridLines: {
                      display: true
                    },
                    ticks: {
                      stepSize: 3,
                    },
                  }],
                  xAxes: [{
                    gridLines: {
                      display: true,
                    },
                    ticks: {
                      stepSize: 3,
                    },
                  }]
                },
                legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
              }

  });
};

function WordsGenerate() {
  let temp2 = {};
  for (i in words_crypt) {
    if (temp2[words_crypt[i]] != undefined) temp2[words_crypt[i]] += 1;
    else temp2[words_crypt[i]] = 1;
  }
  words_crypt = [];
  for (i in temp2){
    let _count = 0;
    for (j in i) {
      if (alphabet.indexOf(i[j]) >= 0) _count+=1;
    }
    words_crypt.push({word: i, count: temp2[i], length: i.length, lengthU: _count});
  }
  fillTable();
};

function fillTable() {
  tbody = $("#tbody");
  tbody.empty();
  for (i in words_crypt) {
    let count = 0;
    let word = words_crypt[i].word;
    for (j in letters)
      while (alphabet.indexOf(j) >= 0 && letters[j] != undefined && word.indexOf(j) >= 0) {
        word = word.replace(j, letters[j]);
        count +=1;
      }
    tbody.append(`<tr><td>${word}</td><td>${words_crypt[i].count}</td><td>${words_crypt[i].length}</td><td>${words_crypt[i].length - count}</td></tr>`);
    words_crypt[i].lengthU = words_crypt[i].length - count;
  }
};

function sortTable (param, invert) {
  words_crypt.sort(function (a, b) { return a[param] > b[param] ? 1: -1;});
  if (invert) words_crypt.reverse();
  fillTable();
}

function ReplaceLetter(from, to) {
  let question = `Буква ${from} уже заменена на ${letters[from]}. Отменить старую версию и использовать новую?`;
  let question2 = `Буква ${letters[to]} уже заменена на ${to}. Отменить старую версию и использовать новую?`;


  if ((letters[from] != undefined ^ letters[to] != undefined)) {
    let conf;
    if (letters[from] != undefined) conf = confirm(question);
    else conf = confirm(question2);

    if (conf) {
      old_to = letters[from] || to;
      new_to = to;
      old_from = letters[to] || from;
      new_from = from;

      text_encrypt = text_encrypt.replaceAll(old_to, old_from);
      text_encrypt = text_encrypt.replaceAll(new_from, new_to);

      letters[old_from] = undefined;
      letters[old_to] = undefined;

      letters[new_from] = to;
      letters[new_to] = from;
    } else return;
  }
  else if (letters[from] == undefined && letters[to] == undefined) {
    letters[from] = to;
    letters[to] = from;
    text_encrypt = text_encrypt.replaceAll(from, to);
  } else {alert("ERROR!")}
  UpdateLetters();
}

function UpdateLetters() {
  $("#letters-history tbody").empty();
  for (i in letters) {
    if (alphabet.indexOf(i) >= 0 && letters[i] != undefined) {
      $("#letters-history tbody").append(`<tr class="removeable" chip='${i}'><td>${i}</td><td>${letters_count[i]}</td><td>${letters[i]}</td></tr>`);
      $(`tr[chip=${i}]`).on("click", RemoveReplace_);
    }
  }
  UpdateText();
}

function UpdateText() {
  $(`textarea[name="encrypto"]`).val(text_encrypt);
}

function RemoveReplace_ (event) {
  let from = $(event.currentTarget).attr("chip");
  RemoveReplace(from, letters[from]);
}

function RemoveReplace(from, to) {
  if (confirm(`Delete replace ${from} to ${to}`)) {
    letters[from] = undefined;
    letters[to] = undefined;
    text_encrypt = text_encrypt.replaceAll(to, from);
    UpdateLetters();
  }
}

function AutoUpdate() {
  for (i in russian_stat) {
    ReplaceLetter(crypt_stat[i][0], russian_stat[i][0].toLowerCase());
  }
}
