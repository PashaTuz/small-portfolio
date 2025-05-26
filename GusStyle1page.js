// Ініціалізація EmailJS
emailjs.init("C-SxRISb4p760IV0A");
document.getElementById("go-to-form-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const submitBtn = document.querySelector('.form-button');
  submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  submitBtn.focus();
});

// Знаходимо елементи форми
const form = document.querySelector('.form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = form.querySelector('.form-button');
const gooseAnimBtn = submitBtn.querySelector('.gus-anim-btn'); // Додано: анімація в кнопці

// Функція перевірки полів, щоб активувати кнопку
function checkInputs() {
  const isFilled = nameInput.value.trim() !== '' && emailInput.value.trim() !== '';
  submitBtn.disabled = !isFilled;
  submitBtn.style.opacity = isFilled ? '1' : '0.7';
  submitBtn.style.cursor = isFilled ? 'pointer' : 'not-allowed';
}

// Показати анімацію
function showGooseAnimation() {
  if (gooseAnimBtn) {
    gooseAnimBtn.style.display = 'block';
  }
}

// Сховати анімацію
function hideGooseAnimation() {
  if (gooseAnimBtn) {
    gooseAnimBtn.style.display = 'none';
  }
}

// Очищення форми після відправки
function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  checkInputs();
  hideGooseAnimation();
}

// Слухаємо поля на введення
nameInput.addEventListener('input', checkInputs);
emailInput.addEventListener('input', checkInputs);

// Обробка відправки форми
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (submitBtn.disabled) return; // не даємо відправити, якщо кнопка не активна

  showGooseAnimation();

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  submitBtn.style.cursor = 'not-allowed';

  emailjs.send('service_5ijr7aa', 'template_bydrkx8', {
    user_name: nameInput.value.trim(),
    user_email: emailInput.value.trim()
  }).then(() => {
    alert('Гусь летить до тебе! Перевір пошту 🕊️');
    clearForm();
  }).catch(() => {
    alert('Щось пішло не так. Спробуй пізніше.');
    hideGooseAnimation();
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
  });
});

// Початкова перевірка для правильного стану кнопки
checkInputs();
