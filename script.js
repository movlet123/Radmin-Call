const USER = "movlet123";
const REPO = "Radmin-Call";

let allReleases = [];
let expanded = false;
let expandedDescriptions = new Set(); // отслеживаем раскрытые описания
let currentlyOpenDescription = null; // отслеживаем текущее открытое описание

const toggleBtn = document.getElementById("themeToggle");

function setTheme(theme) {
    const light = theme === "light";

    document.body.classList.toggle("light", light);
    toggleBtn.src = light ? "img/moon.png" : "img/sun.png";

    document.getElementById("ytIcon").src = light ? "img/youtubebl.png" : "img/youtube.png";
    document.getElementById("ghIcon").src = light ? "img/githubbl.png" : "img/github.png";
    document.getElementById("ttIcon").src = light ? "img/tiktokbl.png" : "img/tiktok.png";
    document.getElementById("donIcon").src = light ? "img/donatebl.png" : "img/donate.png";

    localStorage.setItem("theme", theme);
}

toggleBtn.onclick = () => {
    const isLight = document.body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
};

function closeCurrentlyOpenDescription() {
    if (currentlyOpenDescription !== null) {
        const prevDescription = document.querySelector(`.description[data-id="${currentlyOpenDescription}"]`);
        const prevBtn = document.querySelector(`.details-btn[data-id="${currentlyOpenDescription}"]`);
        
        if (prevDescription) {
            prevDescription.classList.remove('expanded');
        }
        if (prevBtn) {
            prevBtn.innerHTML = 'подробнее ▼';
        }
        
        expandedDescriptions.delete(currentlyOpenDescription);
    }
}

function toggleDescription(releaseId) {
    const descriptionElement = document.querySelector(`.description[data-id="${releaseId}"]`);
    const detailsBtn = document.querySelector(`.details-btn[data-id="${releaseId}"]`);
    
    if (!descriptionElement) return;
    
    // Если кликаем на уже открытое описание - просто закрываем его
    if (currentlyOpenDescription === releaseId) {
        closeCurrentlyOpenDescription();
        currentlyOpenDescription = null;
        return;
    }
    
    // Закрываем предыдущее открытое описание
    closeCurrentlyOpenDescription();
    
    // Открываем новое описание
    descriptionElement.classList.add('expanded');
    if (detailsBtn) {
        detailsBtn.innerHTML = 'скрыть ▲';
    }
    expandedDescriptions.add(releaseId);
    currentlyOpenDescription = releaseId;
}

function render() {
    const app = document.getElementById("app");

    // ВАЖНО: 4 по умолчанию
    const visible = expanded ? allReleases : allReleases.slice(0, 4);

    let html = "";

    visible.forEach((r, i) => {
        const zip = r.assets?.find(a => a.name.endsWith(".zip"));
        const releaseId = r.id;
        const isDescriptionExpanded = expandedDescriptions.has(releaseId);
        
        // Получаем описание из поля "Describe this release" в GitHub
        const description = r.body || "";
        
        // Если описание пустое или только пробелы
        let displayDescription;
        if (!description || description.trim() === "") {
            displayDescription = "Описание пустое";
        } else {
            // Заменяем переносы строк на <br> для HTML
            displayDescription = description.replace(/\n/g, '<br>');
        }

        const isLastHidden =
            !expanded &&
            i === visible.length - 1 &&
            allReleases.length > 4;

        const cls = isLastHidden ? "card fade" : "card";

        html += `
        <div class="${cls}">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <div class="card-date">${new Date(r.published_at).toLocaleDateString()}</div>
                        <div class="card-title">${r.tag_name}</div>
                    </div>
                    ${zip 
                        ? `<a href="${zip.browser_download_url}" class="download-btn">СКАЧАТЬ</a>` 
                        : `<div class="no-file">Нет файла</div>`
                    }
                </div>
                
                <div class="details-btn" data-id="${releaseId}" onclick="toggleDescription(${releaseId})">
                    ${isDescriptionExpanded ? 'скрыть ▲' : 'подробнее ▼'}
                </div>
                
                <div class="description ${isDescriptionExpanded ? 'expanded' : ''}" data-id="${releaseId}">
                    ${displayDescription}
                </div>
            </div>
        </div>
        `;
    });

    // КНОПКА РАЗВЕРНУТЬ / ЗАКРЫТЬ
    if (allReleases.length > 4) {
        html += `
        <div class="toggle-btn" onclick="toggle()">
            ${expanded ? "закрыть ↑" : "развернуть ↓"}
        </div>
        `;
    }

    app.innerHTML = html;
    
    // Восстанавливаем состояние currentlyOpenDescription после перерисовки
    if (currentlyOpenDescription !== null) {
        const openDescription = document.querySelector(`.description[data-id="${currentlyOpenDescription}"]`);
        if (openDescription) {
            openDescription.classList.add('expanded');
        }
    }
}

function toggle() {
    expanded = !expanded;
    // Сбрасываем открытое описание при сворачивании/разворачивании списка
    currentlyOpenDescription = null;
    expandedDescriptions.clear();
    render();
}

async function load() {
    try {
        const res = await fetch(`https://api.github.com/repos/${USER}/${REPO}/releases?per_page=100`);
        const data = await res.json();

        if (!Array.isArray(data)) return;

        allReleases = data;
        render();
    } catch (e) {
        console.error(e);
        document.getElementById("app").innerHTML = "Ошибка загрузки";
    }
}

// Делаем функции глобально доступными для onclick
window.toggleDescription = toggleDescription;
window.toggle = toggle;

setTheme(localStorage.getItem("theme") || "dark");
setTimeout(load, 300);
