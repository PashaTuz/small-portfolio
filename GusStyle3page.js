document.querySelectorAll('.discount-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.id === "show-wheel-btn") return; // не відкривати зображення для колеса

        const img = button.nextElementSibling;
        if (!img || !img.getAttribute('src')) return;

        const imgSrc = img.getAttribute('src');
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.setAttribute('src', imgSrc);
        modal.style.display = 'block';
    });
});
