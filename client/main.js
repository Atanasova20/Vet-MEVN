import "./global.css";
const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('mobileMenu');

        menuButton.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });     
