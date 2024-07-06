const PROCCESS_TO_GENERATE = 2000;

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
  }, PROCCESS_TO_GENERATE);
}

function resetForm() {
  document.getElementById('name').innerHTML = '';
  document.getElementById('meaning').innerHTML = '';
  document.getElementById('result').style.display = 'none';
  document.getElementById('generate').disabled = false;
}

window.onload = function() {
  // Set date to current year
  const year = new Date().getFullYear();
  const date = document.getElementById('date');
  date.innerHTML = year;
}
