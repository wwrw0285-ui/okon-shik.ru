// Управление модальным окном
function openModal(sourceText) {
    document.getElementById('modal').style.display = 'flex';
    if (sourceText) {
        document.getElementById('modal-subtitle').innerText = sourceText;
        document.getElementById('modal-source').value = sourceText;
    }
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
}

// Мобильное меню
function toggleMenu() {
    const nav = document.getElementById('nav');
    if(nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '75px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#fff';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
}

// ВАЖНО: Получите ключ на web3forms.com и вставьте сюда
const WEB3FORMS_ACCESS_KEY = "459e9da0-3554-4d73-957f-7b980a3cc6f4"; 

async function submitForm(event, defaultSource) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    const formData = new FormData(form);
    
    if (WEB3FORMS_ACCESS_KEY === "ВАШ_ACCESS_KEY_СЮДА") {
        alert("Внимание! В файле js/script.js не указан Access Key от Web3Forms. Форма не будет отправлять письма.");
    }

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Новая заявка с сайта Оконщик");
    formData.append("from_name", "Сайт Оконщик");
    
    let sourceVal = defaultSource;
    if (form.querySelector('input[name="source"]')) {
        sourceVal = form.querySelector('input[name="source"]').value;
    }
    formData.append("Источник", sourceVal);

    btn.textContent = "Отправка...";
    btn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            alert("Спасибо! Заявка отправлена. Мы перезвоним вам в течение 5 минут.");
            form.reset();
            closeModal();
        } else {
            alert("Ошибка: " + data.message + ". Позвоните нам: +7 (981) 024-21-77");
        }
    } catch (error) {
        alert("Не удалось отправить заявку. Проверьте интернет или позвоните нам: +7 (981) 024-21-77");
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}
