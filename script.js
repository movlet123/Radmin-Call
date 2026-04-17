const USER = "movlet123";
const REPO = "Radmin-Call";

let allReleases = [];
let expanded = false;
let expandedDescriptions = new Set();
let currentlyOpenDescription = null;

const themeToggle = document.getElementById("themeToggle");

// ============================================
// ФУНКЦИЯ ДОБАВЛЕНИЯ SVG-ИКОНОК
// ============================================
function addIconsToLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.toLowerCase();
        let iconSVG = '';
        
        // Определяем тип ссылки и выбираем соответствующую иконку
        if (href.includes('youtube.com') || href.includes('youtu.be')) {
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.11-2.118C19.565 3.5 12 3.5 12 3.5s-7.565 0-9.388.568a2.99 2.99 0 0 0-2.11 2.118C0 8.015 0 12 0 12s0 3.985.502 5.814a2.99 2.99 0 0 0 2.11 2.118C4.435 20.5 12 20.5 12 20.5s7.565 0 9.388-.568a2.99 2.99 0 0 0 2.11-2.118C24 15.985 24 12 24 12s0-3.985-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
            </svg>`;
        } else if (href.includes('t.me') || href.includes('telegram')) {
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.428-.01-1.252-.243-1.864-.443-.751-.244-1.348-.373-1.296-.787.027-.216.324-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.476-1.635.099-.002.32.023.464.14.119.097.152.228.169.32.017.092.039.303.023.466z"/>
            </svg>`;
        } else if (href.includes('discord')) {
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.164-.386-.398-.875-.609-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.947 2.418-2.157 2.418z"/>
            </svg>`;
        } else if (href.includes('github')) {
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>`;
        } else if (href.includes('tiktok')) {
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>`;
        } else if (href.includes('donationalerts') || href.includes('donate') || text.includes('donate') || text.includes('донат')) {
            // Иконка кошелька для доната
            iconSVG = `<svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>`;
        }
        
        if (iconSVG) {
            const existingIcon = link.querySelector('.link-icon');
            if (!existingIcon) {
                link.insertAdjacentHTML('afterbegin', iconSVG);
            }
        }
    });
}

// ============================================
// ФУНКЦИЯ ДОБАВЛЕНИЯ ИКОНКИ ДЛЯ КНОПКИ DOWNLOAD
// ============================================
function addIconToDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        const existingIcon = btn.querySelector('.download-icon');
        if (!existingIcon) {
            const iconSVG = `<svg class="download-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 6px;">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>`;
            btn.insertAdjacentHTML('afterbegin', iconSVG);
        }
    });
}

// ============================================
// ФУНКЦИЯ ДОБАВЛЕНИЯ ИКОНКИ ДЛЯ КНОПКИ "ПОДРОБНЕЕ"
// ============================================
function addIconToDetailsButtons() {
    const detailsBtns = document.querySelectorAll('.details-btn');
    
    detailsBtns.forEach(btn => {
        const existingIcon = btn.querySelector('.details-icon');
        if (!existingIcon) {
            const iconSVG = `<svg class="details-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-right: 4px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>`;
            btn.insertAdjacentHTML('afterbegin', iconSVG);
        }
    });
}

// ============================================
// ФУНКЦИЯ ОБНОВЛЕНИЯ ВСЕХ ИКОНОК
// ============================================
function updateAllIcons() {
    addIconsToLinks();
    addIconToDownloadButtons();
    addIconToDetailsButtons();
}

function setTheme(theme) {
    const light = theme === "light";
    document.body.classList.toggle("light", light);
    if (themeToggle) {
        themeToggle.classList.toggle("light", light);
    }
    localStorage.setItem("theme", theme);
}

if (themeToggle) {
    themeToggle.onclick = () => {
        const isLight = document.body.classList.contains("light");
        setTheme(isLight ? "dark" : "light");
    };
}

function closeCurrentlyOpenDescription() {
    if (currentlyOpenDescription !== null) {
        const prevDescription = document.querySelector(`.description[data-id="${currentlyOpenDescription}"]`);
        const prevBtn = document.querySelector(`.details-btn[data-id="${currentlyOpenDescription}"]`);
        
        if (prevDescription) {
            prevDescription.classList.remove('expanded');
        }
        if (prevBtn) {
            prevBtn.innerHTML = '';
            const iconSVG = `<svg class="details-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-right: 4px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>`;
            prevBtn.innerHTML = iconSVG + 'more details ▼';
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
        detailsBtn.innerHTML = '';
        const iconSVG = `<svg class="details-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-right: 4px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>`;
        detailsBtn.innerHTML = iconSVG + 'hide ▲';
    }
    expandedDescriptions.add(releaseId);
    currentlyOpenDescription = releaseId;
}

function render() {
    const app = document.getElementById("app");
    if (!app) return;
    
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

        const downloadIconSVG = `<svg class="download-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 6px;">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>`;

        const detailsIconSVG = `<svg class="details-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-right: 4px;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`;

        html += `
        <div class="${cls}">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <div class="card-date">${new Date(r.published_at).toLocaleDateString()}</div>
                        <div class="card-title">${r.tag_name}</div>
                    </div>
                    ${zip 
                        ? `<a href="${zip.browser_download_url}" class="download-btn">${downloadIconSVG}DOWNLOAD</a>` 
                        : `<div class="no-file">No File</div>`
                    }
                </div>
                
                <div class="details-btn" data-id="${releaseId}" onclick="toggleDescription(${releaseId})">
                    ${detailsIconSVG}${isDescriptionExpanded ? 'hide ▲' : 'more details ▼'}
                </div>
                
                <div class="description ${isDescriptionExpanded ? 'expanded' : ''}" data-id="${releaseId}">
                    ${displayDescription}
                </div>
            </div>
        </div>
        `;
    });

    if (allReleases.length > 4) {
        const expandIconSVG = expanded ? 
            `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 6px;">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>` :
            `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 6px;">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>`;
            
        html += `
        <div class="toggle-btn" onclick="toggle()">
            ${expandIconSVG}${expanded ? "close" : "expand"}
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
    
    setTimeout(() => {
        updateAllIcons();
    }, 10);
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
        
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                location.reload();
            });
        }
        
    } catch (e) {
        console.error(e);
        const app = document.getElementById("app");
        if (app) {
            app.innerHTML = "Loading error";
        }
    }
}

// Добавляем стили для иконок
const style = document.createElement('style');
style.textContent = `
    .link-icon, .download-icon, .details-icon {
        transition: fill 0.3s ease;
    }
    
    body.light .social-link:hover .link-icon {
        fill: #5900ff !important;
    }
    
    body.light .download-btn:hover .download-icon {
        fill: #ffffff !important;
    }
    
    body.light .details-btn:hover .details-icon {
        fill: #5900ff !important;
    }
`;
document.head.appendChild(style);

window.toggleDescription = toggleDescription;
window.toggle = toggle;

setTheme(localStorage.getItem("theme") || "dark");
setTimeout(load, 300);

window.addEventListener('load', () => {
    updateAllIcons();
});
