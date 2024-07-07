const PROCCESS_TO_GENERATE = 2000;

function readGeneratedWord() {
  // Setup text-to-speech
  const name = document.getElementById('name').innerHTML;
  const meaning = document.getElementById('meaning').innerHTML;

  const speech = new SpeechSynthesisUtterance();
  speech.lang = 'id-ID';
  speech.rate = 1;
  speech.text = `Khodam kamu adalah ${name}. Artinya ${meaning}`;

  window.speechSynthesis.speak(speech);
}

function generate() {
  const input = document.getElementById('input-name')?.value;

  if (!input) {
    Swal.fire({
      title: 'Silahkan inputkan nama kamu!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Disable button to prevent multiple click
  document.getElementById('generate').disabled = true;

  document.getElementById('loading').style.display = 'block';

  const randomizer = Math.floor(Math.random() * words.length);
  const word = words[randomizer];

  setTimeout(() => {
    document.getElementById('name').innerHTML = word.name;
    document.getElementById('meaning').innerHTML = word.meaning;
    document.getElementById('loading').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    readGeneratedWord();
  }, PROCCESS_TO_GENERATE);
}

function resetForm() {
  document.getElementById('name').innerHTML = '';
  document.getElementById('meaning').innerHTML = '';
  document.getElementById('result').style.display = 'none';
  document.getElementById('generate').disabled = false;
}

window.addEventListener('load', function() {
  // Set date to current year
  const year = new Date().getFullYear();
  const date = document.getElementById('date');
  date.innerHTML = year;
})
