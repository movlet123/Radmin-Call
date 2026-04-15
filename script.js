const USER = "movlet123";
const REPO = "Radmin-Call";

let allReleases = [];
let expanded = false;
let expandedDescriptions = new Set();
let currentlyOpenDescription = null;

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    const light = theme === "light";

    document.body.classList.toggle("light", light);
    themeToggle.classList.toggle("light", light);

    document.getElementById("ytIcon").src = light ? "img/youtubebl.png" : "img/youtube.png";
    document.getElementById("ghIcon").src = light ? "img/githubbl.png" : "img/github.png";
    document.getElementById("ttIcon").src = light ? "img/tiktokbl.png" : "img/tiktok.png";
    document.getElementById("donIcon").src = light ? "img/donatebl.png" : "img/donate.png";

    localStorage.setItem("theme", theme);
}

themeToggle.onclick = () => {
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
            prevBtn.innerHTML = 'more details ▼';
        }
        
        expandedDescriptions.delete(currentlyOpenDescription);
    }
}

function toggleDescription(releaseId) {
    const descriptionElement = document.querySelector(`.description[data-id="${releaseId}"]`);
    const detailsBtn = document.querySelector(`.details-btn[data-id="${releaseId}"]`);
    
    if (!descriptionElement) return;
    
    if (currentlyOpenDescription === releaseId) {
        closeCurrentlyOpenDescription();
        currentlyOpenDescription = null;
        return;
    }
    
    closeCurrentlyOpenDescription();
    
    descriptionElement.classList.add('expanded');
    if (detailsBtn) {
        detailsBtn.innerHTML = 'hide ▲';
    }
    expandedDescriptions.add(releaseId);
    currentlyOpenDescription = releaseId;
}

function render() {
    const app = document.getElementById("app");
    const visible = expanded ? allReleases : allReleases.slice(0, 4);
    let html = "";

    visible.forEach((r, i) => {
        const zip = r.assets?.find(a => a.name.endsWith(".zip"));
        const releaseId = r.id;
        const isDescriptionExpanded = expandedDescriptions.has(releaseId);
        
        const description = r.body || "";
        let displayDescription = (!description || description.trim() === "") 
            ? "Description is empty" 
            : description.replace(/\n/g, '<br>');

        const isLastHidden = !expanded && i === visible.length - 1 && allReleases.length > 4;
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
                        ? `<a href="${zip.browser_download_url}" class="download-btn">DOWNLOAD</a>` 
                        : `<div class="no-file">No File</div>`
                    }
                </div>
                
                <div class="details-btn" data-id="${releaseId}" onclick="toggleDescription(${releaseId})">
                    ${isDescriptionExpanded ? 'hide ▲' : 'more details ▼'}
                </div>
                
                <div class="description ${isDescriptionExpanded ? 'expanded' : ''}" data-id="${releaseId}">
                    ${displayDescription}
                </div>
            </div>
        </div>
        `;
    });

    if (allReleases.length > 4) {
        html += `
        <div class="toggle-btn" onclick="toggle()">
            ${expanded ? "close ▲" : "expand ▼"}
        </div>
        `;
    }

    app.innerHTML = html;
    
    if (currentlyOpenDescription !== null) {
        const openDescription = document.querySelector(`.description[data-id="${currentlyOpenDescription}"]`);
        if (openDescription) {
            openDescription.classList.add('expanded');
        }
    }
}

function toggle() {
    expanded = !expanded;
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
        
        // Добавляем обработчик клика на логотип для обновления страницы
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                location.reload();
            });
        }
        
    } catch (e) {
        console.error(e);
        document.getElementById("app").innerHTML = "Loading error";
    }
}

window.toggleDescription = toggleDescription;
window.toggle = toggle;

setTheme(localStorage.getItem("theme") || "dark");
setTimeout(load, 300);