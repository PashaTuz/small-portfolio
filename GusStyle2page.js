// Дані користувача (приклад — у майбутньому можна брати з сервера або localStorage)
const user = {
    name: "Pasha Tuz",
    email: "ptuztuz2@gmail.com",
    points: 999,
    avatar: "zaglushka.jpg"  // тепер основний аватар - zaglushka.jpg
};

// Вставка даних користувача у DOM
function populateUserProfile() {
    const nameEl = document.getElementById("user-name");
    const emailEl = document.getElementById("user-email");
    const pointsEl = document.getElementById("user-points");
    const avatarEl = document.getElementById("user-avatar");

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (pointsEl) pointsEl.textContent = user.points;
    if (avatarEl) avatarEl.src = user.avatar;
}

// Зміна кольору інтерактивних елементів при кліку
function setupInteractiveElements() {
    document.querySelectorAll('.interactive').forEach(item => {
        item.addEventListener('click', () => {
            const style = window.getComputedStyle(item);
            const bg = style.backgroundColor;
            const activeBg = 'rgb(255, 171, 61)'; // #ffab3d
            const defaultBg = 'rgb(255, 242, 229)'; // #fff2e5

            if (bg === defaultBg) {
                item.style.backgroundColor = activeBg;
                item.style.color = '#333';
            } else {
                item.style.backgroundColor = defaultBg;
                item.style.color = '#ffab3d';
            }
        });
    });
}

// Анімація масштабування центрального зображення при наведенні
function setupCenterImageAnimation() {
    const centerImage = document.querySelector('.center-image');
    if (centerImage) {
        centerImage.style.transition = 'transform 0.3s ease-in-out';
        centerImage.addEventListener('mouseenter', () => {
            centerImage.style.transform = 'scale(1.1)';
        });
        centerImage.addEventListener('mouseleave', () => {
            centerImage.style.transform = 'scale(1)';
        });
    }
}

// Керування боковою панеллю і overlay
function setupSidebar() {
    const sidebar = document.getElementById('user-sidebar');
    const openBtn = document.querySelector('.user-link');
    const closeBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar && openBtn && closeBtn && overlay) {
        const openSidebar = (e) => {
            e.preventDefault();
            sidebar.classList.add('visible');
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden'; // блокування скролу фону
        };

        const closeSidebar = () => {
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
            document.body.style.overflow = ''; // відновлення скролу
        };

        openBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Закриття панелі по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('visible')) {
                closeSidebar();
            }
        });
    }
}

// Відкриття/закриття панелі вибору аватарів при кліку на головний аватар
function setupAvatarSelection() {
    const avatarSelection = document.getElementById('avatar-selection');
    const userAvatar = document.getElementById('user-avatar');

    if (userAvatar && avatarSelection) {
        userAvatar.addEventListener('click', () => {
            avatarSelection.classList.toggle('hidden');
        });
    }

    // Вибір пресетів аватарів
    document.querySelectorAll('.avatar-option').forEach(img => {
        img.addEventListener('click', () => {
            if (userAvatar) {
                userAvatar.src = img.src;
                user.avatar = img.src; // оновлюємо об'єкт користувача
                avatarSelection.classList.add('hidden'); // закриваємо панель після вибору
            }
        });
    });
}

// Завантаження власного аватара з файлу
function setupAvatarUpload() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarSelection = document.getElementById('avatar-selection');
    const userAvatar = document.getElementById('user-avatar');
    const uploadTrigger = document.querySelector('.upload-trigger'); // Додано

    // Додано: відкриває діалог вибору файлу при кліку на камеру
    if (uploadTrigger && avatarUpload) {
        uploadTrigger.addEventListener('click', () => {
            avatarUpload.click();
        });
    }
    document.querySelectorAll('.discount-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const largeSrc = btn.getAttribute('data-large-src');
            const modal = document.getElementById('modal');
            const modalImg = document.getElementById('modal-img');
            modalImg.src = largeSrc;  // Відкриваємо інше фото
            modal.style.display = 'flex';
        });
    });

    if (avatarUpload && userAvatar) {
        avatarUpload.addEventListener('change', event => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    userAvatar.src = e.target.result;
                    user.avatar = e.target.result; // оновлюємо об'єкт користувача
                    if (avatarSelection) {
                        avatarSelection.classList.add('hidden'); // закриваємо панель після завантаження
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    populateUserProfile();
    setupInteractiveElements();
    setupCenterImageAnimation();
    setupSidebar();
    setupAvatarSelection();
    setupAvatarUpload();
});
