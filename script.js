// MAIN JAVASCRIPT FILE - Controls all the flashcard behavior

// VARIABLES TO TRACK STATE
let currentCategory = null; // Which category is selected
let currentCards = []; // Array of cards in current category
let currentCardIndex = 0; // Which card we're on (starts at 0)
let isFlipped = false; // Is the card showing the back?
let isMultiSelectMode = false; // Is multi-select mode active?
let selectedCategories = []; // Array of selected category names

    const memorizedCategories = [
        // "Words from Module (Animals)",
        // "Words from Module (Food)",
        // "Words from Module (Objects)",
        // "Words from Module (Furniture)",
        // "Words from Module (Places)",
        // "Classifiers (Native)",
        // "Classifiers (Sino)",
        // "Additional Words (Daily Life 1)",
        // "Additional Words (Daily Life 2)",
        // "Additional Words (Work Life 1)",
        // "Prefixes & Suffixes",
        // "Linking Words & Expressions",
        "Chapter 1.1",
        "Chapter 1.2",
        "Chapter 2",
        "Chapter 3",
        "Chapter 4",
        "Chapter 5",
        "Chapter 6",
        "Chapter 7",
        "Chapter 8.1",
        "Chapter 8.2",
        "Chapter 9.1",
        "Chapter 9.2",
        "Chapter 10.1",
        "Chapter 10.2",
        "Chapter 11.1",
        "Chapter 11.2",
        "Chapter 12.1",
        "Chapter 12.2",
        "Chapter 13.1",
        "Chapter 13.2",
        "Chapter 14.1",
        "Chapter 14.2",
        "Chapter 15.1",
        "Chapter 15.2",
        "Chapter 16.1",
        "Chapter 16.2",
        "Chapter 17.1",
        "Chapter 17.2",
        "Chapter 18.1",
        "Chapter 18.2",
        "Chapter 19.1",
        "Chapter 19.2",
        "Chapter 20.1",
        "Chapter 20.2",
        "Chapter 21.1",
        "Chapter 21.2",
        "Chapter 22.1",
        "Chapter 22.2",
        "Chapter 23.1",
        "Chapter 23.2",
        "Chapter 24.1",
        "Chapter 24.2",
        "Chapter 25.1",
        "Chapter 25.2",
        "Chapter 26.1",
        "Chapter 26.2",
        "Chapter 27.1",
        "Chapter 27.2",
        "Chapter 28.1",
        "Chapter 28.2",
        "Chapter 29.1",
        "Chapter 29.2",
        "Chapter 30.1",
        "Chapter 30.2",
        "Chapter 31.1 (Attire)",
        "Chapter 31.2 (Attitude)",
        "Chapter 32.1 (Dormitory)",
        "Chapter 32.2 (Cafeteria)",
        "Chapter 33.1 (Workplace Atmosphere)",
        "Chapter 33.2 (Colleague Relationships)",
        "Chapter 34.1 (Sexual Harassment)",
        "Chapter 34.2 (Prevention & Handling of Sexual Harassment)",
        "Chapter 35.1 (Workplace Environment Maintenance)",
        "Chapter 35.2 (Warehouse Management)",
        "Chapter 36.1 (Packaging and Loading Work)",
        "Chapter 36.2 (Shipment Management)",
        "Chapter 37.1 (Operating Machines)",
        "Chapter 37.2 (Tools and their Uses)",
        "Chapter 38.1 (Assembly Tools and Parts)",
        "Chapter 38.2 (Assembly and Disassembly Process)",
        "Chapter 39.1 (Workplace Tools)",
        "Chapter 39.2 (Cutting and Welding)",
        "Chapter 40.1 (Mixing and Measuring)",
        "Chapter 40.2 (Product Defects)",
        "Chapter 41.1 (Yarn Storage and Management)",
        "Chapter 41.2 (Dyeing Process)",
        "Chapter 42.1 (Furniture Making Preparations)",
        "Chapter 42.2 (Furniture Sanding and Painting)",
        "Chapter 43.1 (Rebar Reinforcement)",
        "Chapter 43.2 (Formwork Assembly)",
        "Chapter 44.1 (Dredging)",
        "Chapter 44.2 (Water Supply and Sewage Systems Construction)",
        "Chapter 45.1 (Field Crops)",
        "Chapter 45.2 (Orchard Cultivation)",
        "Chapter 46.1 (Feeding Livestock)",
        "Chapter 46.2 (Barn Cleaning)",
        "Chapter 47.1 (Fishery Tools and Activities)",
        "Chapter 47.2 (Aquaculture)",
        "Chapter 48.1 (Ship Painting)",
        "Chapter 48.2 (Steel Pipe Scaffold Installation)",
        "Chapter 49.1 (Tunnel Facilities)",
        "Chapter 49.2 (Mining and Ore Transport Operations)",
        "Chapter 50.1 (Trenching and Root Ball Wrapping)",
        "Chapter 50.2 (Logging Work)",
        "Chapter 51.1 (Hotel Supplies Room Items)",
        "Chapter 51.2 (Room Cleaning)",
        "Chapter 52.1 (Managing Ingredients)",
        "Chapter 52.2 (Food Safety Management)",
        "Chapter 53.1 (Industrial Safety and Health Signs)",
        "Chapter 53.2 (Prohibition Signs 1)",
        "Chapter 53.3 (Prohibition Signs 2)",
        "Chapter 54.1 (Safety and Health Preservation Regulations)",
        "Chapter 54.2 (Terms of Compliance for Industrial Accident Prevention)",
        "Chapter 54.3 (Evacuation Route Signs)",
        "Chapter 55.1 (Safety Equipment)",
        "Chapter 55.2 (Safety and Hygiene Equipment)",
        "Chapter 55.3 (Directive Signs / Mandatory Action Signs)",
        "Chapter 56.1 (Fire Safety Equipment Signs)",
        "Chapter 56.2 (Emergency Response Guidelines)",
        "Chapter 56.3 (Emergency Situation Signs)",
        "Chapter 57.1 (Employment Permit System Industries)",
        "Chapter 57.2 (Procedures to Gain Employment through the Employment Permit System)",
        "Chapter 58.1 (Working Conditions)",
        "Chapter 58.2 (Pay Stubs)",
        "Chapter 59.1 (Foreigner Registration)",
        "Chapter 59.2 (Extension of Stay)",
        "Chapter 60.1 (Insurance and Insurance Benefits)",
        "Chapter 60.2 (Insurance Exclusive to Foreign Workers)"


        
    ];

// FRIENDLY DISPLAY NAMES FOR CATEGORY KEYS THAT AREN'T ALREADY HUMAN-READABLE
// (the button will show the mapped label, but everything else still keys off the
// real property name in flashcardData)
const categoryDisplayNames = {
    "grammarRules": "Grammar Rules (Ch. 1-60)"
};

function getCategoryLabel(categoryName) {
    return categoryDisplayNames[categoryName] || categoryName;
}

// GET REFERENCES TO HTML ELEMENTS
const categoryContainer = document.getElementById('category-container');
const categoryButtonsDiv = document.getElementById('category-buttons');
const flashcardArea = document.getElementById('flashcard-area');
const flashcard = document.getElementById('flashcard');
const cardContent = flashcard.querySelector('.card-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cardCounter = document.getElementById('card-counter');
const backToCategoriesBtn = document.getElementById('back-to-categories');
const shuffleBtn = document.getElementById('shuffle-btn');
const multiSelectToggle = document.getElementById('multi-select-toggle');
const selectAllBtn = document.getElementById('select-all-btn');
const startMultiBtn = document.getElementById('start-multi-btn');
const currentCategoryDisplay = document.getElementById('current-category-display');

// SHUFFLE FUNCTION - Randomizes an array
function shuffleArray(array) {
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

// STEP 1: CREATE CATEGORY BUTTONS WHEN PAGE LOADS
function createCategoryButtons() {

    // Check if flashcardData exists
    if (typeof flashcardData === 'undefined') {
        categoryButtonsDiv.innerHTML = '<p class="no-results">No flashcard data loaded. Please check your data file.</p>';
        return;
    }

    for (let categoryName in flashcardData) {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = getCategoryLabel(categoryName);
        button.dataset.category = categoryName;

        if (memorizedCategories.includes(categoryName)) {
            button.classList.add('memorized');
        }

        button.addEventListener('click', function() {
            if (isMultiSelectMode) {
                toggleCategorySelection(button, categoryName);
            } else {
                loadCategory(categoryName);
            }
        });

        categoryButtonsDiv.appendChild(button);
    }
    renderHardWords(); // Show hard words on load
}

// TOGGLE CATEGORY SELECTION IN MULTI-SELECT MODE
function toggleCategorySelection(button, categoryName) {
    const index = selectedCategories.indexOf(categoryName);
    
    if (index > -1) {
        // Remove from selection
        selectedCategories.splice(index, 1);
        button.classList.remove('selected');
    } else {
        // Add to selection
        selectedCategories.push(categoryName);
        button.classList.add('selected');
    }
    
    // Update start button visibility
    if (selectedCategories.length > 0) {
        startMultiBtn.classList.remove('hidden');
        startMultiBtn.textContent = `Start Selected Categories (${selectedCategories.length}) →`;
    } else {
        startMultiBtn.classList.add('hidden');
    }
}

// MULTI-SELECT MODE TOGGLE
multiSelectToggle.addEventListener('click', function() {
    isMultiSelectMode = !isMultiSelectMode;
    
    if (isMultiSelectMode) {
        multiSelectToggle.textContent = '📖 Single Select Mode';
        multiSelectToggle.classList.add('active');
        selectAllBtn.classList.remove('hidden');
        
        // Clear any existing selections
        selectedCategories = [];
        const allButtons = categoryButtonsDiv.querySelectorAll('.category-btn');
        allButtons.forEach(btn => btn.classList.remove('selected'));
    } else {
        multiSelectToggle.textContent = '📚 Multi-Select Mode';
        multiSelectToggle.classList.remove('active');
        selectAllBtn.classList.add('hidden');
        startMultiBtn.classList.add('hidden');
        
        // Clear selections
        selectedCategories = [];
        const allButtons = categoryButtonsDiv.querySelectorAll('.category-btn');
        allButtons.forEach(btn => btn.classList.remove('selected'));
    }
});

// SELECT ALL BUTTON
selectAllBtn.addEventListener('click', function() {
    const allButtons = categoryButtonsDiv.querySelectorAll('.category-btn');
    const memorizedSelected = selectedCategories.filter(c => memorizedCategories.includes(c));
    const allMemorizedSelected = memorizedSelected.length === memorizedCategories.length;

    if (allMemorizedSelected) {
        // Deselect all
        selectedCategories = [];
        allButtons.forEach(btn => btn.classList.remove('selected'));
        startMultiBtn.classList.add('hidden');
        selectAllBtn.textContent = '✓ Select All';
    } else {
        // Select only memorized categories
        selectedCategories = [];
        allButtons.forEach(btn => {
            const categoryName = btn.dataset.category;
            if (memorizedCategories.includes(categoryName) && btn.style.display !== 'none') {
                selectedCategories.push(categoryName);
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        startMultiBtn.classList.remove('hidden');
        startMultiBtn.textContent = `Start Selected Categories (${selectedCategories.length}) →`;
        selectAllBtn.textContent = '✗ Deselect All';
    }
});

// START MULTI-CATEGORY SESSION
startMultiBtn.addEventListener('click', function() {
    if (selectedCategories.length === 0) return;
    
    loadMultipleCategories(selectedCategories);
});

// STEP 2: LOAD A CATEGORY
function loadCategory(categoryName) {
    currentCategory = categoryName;
    
    // Check if this is a number practice category
    if (categoryName === "Numbers Practice - Prices (Sino-Korean)") {
        currentCards = generatePriceCards();
    } else if (categoryName === "Numbers Practice - Dates (Sino-Korean)") {
        currentCards = generateDateCards();
    } else if (categoryName === "Numbers Practice - Native Korean (1-20)") {
        currentCards = generateNativeNumberCards();
    } else if (categoryName === "Numbers Practice - Phone Numbers") {
        currentCards = generatePhoneNumberCards();
    } else if (categoryName === "Telling Time (12hr)") {
        currentCards = generateTellingTimeCards();
    } else if (categoryName === "Counter Units (Native)" || categoryName === "Counter Units (Sino)") {
        // Regular category - shuffle the cards
        currentCards = shuffleArray(flashcardData[categoryName]);
    } else {
        // Regular category - shuffle the cards
        currentCards = shuffleArray(flashcardData[categoryName]);
    }
    
    currentCardIndex = 0;
    isFlipped = false;
    
    // Display current category
    currentCategoryDisplay.innerHTML = `<div class="category-label">Category: ${getCategoryLabel(categoryName)}</div>`;
    
    categoryContainer.classList.add('hidden');
    flashcardArea.classList.remove('hidden');
    
    displayCard();
}

// LOAD MULTIPLE CATEGORIES
function loadMultipleCategories(categories) {
    currentCategory = "Multiple Categories";
    currentCards = [];
    
    // Combine all cards from selected categories
    categories.forEach(categoryName => {
        if (flashcardData[categoryName]) {
            const categorizedCards = flashcardData[categoryName].map(card => ({
                ...card,
                sourceCategory: getCategoryLabel(categoryName)
            }));
            currentCards = currentCards.concat(categorizedCards);
        }
    });
    
    // Shuffle combined cards
    currentCards = shuffleArray(currentCards);
    
    currentCardIndex = 0;
    isFlipped = false;
    
    // Display selected categories
    const categoryList = categories.map(getCategoryLabel).join(', ');
    currentCategoryDisplay.innerHTML = `
        <div class="category-label">
            <strong>Combined Categories (${categories.length}):</strong><br>
            <small>${categoryList}</small>
        </div>
    `;
    
    categoryContainer.classList.add('hidden');
    flashcardArea.classList.remove('hidden');
    
    displayCard();
}

// STEP 3: DISPLAY A CARD
function displayCard() {
    const card = currentCards[currentCardIndex];
    
    if (isFlipped) {
        // Show BACK of card
        const spokenText = card.spokenKorean || card.korean;
        
        // Check if card has breakdown data (Reading Practice category)
        let breakdownHTML = '';
        if (card.breakdown && card.breakdown.length > 0) {
            breakdownHTML = '<div class="breakdown-section">';
            breakdownHTML += '<h3>Vocabulary Breakdown:</h3>';
            breakdownHTML += '<div class="breakdown-list">';
            
            card.breakdown.forEach(item => {
                breakdownHTML += '<div class="breakdown-item">';
                breakdownHTML += `<div class="breakdown-word"><strong>${item.word}</strong></div>`;
                
                if (item.dictForm !== item.word) {
                    breakdownHTML += `<div class="breakdown-dict">Dictionary form: ${item.dictForm}</div>`;
                }
                
                breakdownHTML += `<div class="breakdown-role">${item.role}</div>`;
                breakdownHTML += `<div class="breakdown-meaning">${item.meaning}</div>`;
                
                if (item.conjugation) {
                    breakdownHTML += `<div class="breakdown-conjugation">${item.conjugation}</div>`;
                }
                
                if (item.explanation) {
                    breakdownHTML += `<div class="breakdown-explanation">${item.explanation}</div>`;
                }
                
                breakdownHTML += '</div>';
            });
            
            breakdownHTML += '</div></div>';
        }

        // Grammar-rule cards (from the "grammarRules" category) carry a "usage" field
        // that spells out which allomorph/form to use and when (patchim, vowel
        // harmony, etc.) — show it as its own labeled section on the card back.
        let usageHTML = '';
        if (card.usage) {
            usageHTML = `
                <div class="usage-section">
                    <h3>Usage:</h3>
                    <div class="usage-text">${card.usage}</div>
                </div>
            `;
        }

        // Grammar-rule cards also carry chapter/title metadata - show it as a small
        // badge above the Korean text, the same way multi-category mode shows
        // "From: <category>".
        let chapterBadgeHTML = '';
        if (card.chapter !== undefined && card.title) {
            chapterBadgeHTML = `<div class="source-category">Ch. ${card.chapter} — ${card.title}</div>`;
        }

        // Show source category if from multi-category mode
        let sourceCategoryHTML = '';
        if (card.sourceCategory) {
            sourceCategoryHTML = `<div class="source-category">From: ${card.sourceCategory}</div>`;
        }

        // Replace the cardContent.innerHTML in the isFlipped branch with:
        cardContent.innerHTML = `
            <div class="card-back">
                ${sourceCategoryHTML}
                ${chapterBadgeHTML}
                <div class="korean">${spokenText}</div>
                <div class="romanization">${card.romanization}</div>
                <div class="meaning">${card.meaning}</div>
                ${usageHTML}
                ${breakdownHTML}
                <button class="mark-hard-btn" id="mark-hard-btn">🔴 Mark as Hard</button>
            </div>
        `;

        // Attach the event right after setting innerHTML
        const markHardBtn = document.getElementById('mark-hard-btn');
        if (markHardBtn) {
            const hardWords = getHardWords();
            const alreadyHard = hardWords.some(w => w.korean === spokenText || w.korean === card.korean);
            if (alreadyHard) {
                markHardBtn.textContent = '✓ Marked as Hard';
                markHardBtn.disabled = true;
            }
            markHardBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Don't flip the card
                markAsHard(card);
                this.textContent = '✓ Marked as Hard';
                this.disabled = true;
            });
        }
        
        // Speak the Korean text
        speakKorean(spokenText);
    } else {
        // Show FRONT of card
        cardContent.innerHTML = `
            <div class="card-front">${card.korean}</div>
        `;
    }
    
    cardCounter.textContent = `${currentCardIndex + 1} / ${currentCards.length}`;
    updateNavigationButtons();
}

// SPEECH SYNTHESIS FUNCTION
function speakKorean(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.8; // Slightly slower for learning
    
    window.speechSynthesis.speak(utterance);
}

// HARD WORDS SYSTEM
function getHardWords() {
    const stored = localStorage.getItem('hardWords');
    return stored ? JSON.parse(stored) : [];
}

function saveHardWords(words) {
    localStorage.setItem('hardWords', JSON.stringify(words));
}

function markAsHard(card) {
    const hardWords = getHardWords();
    // Avoid duplicates based on korean text
    const alreadyAdded = hardWords.some(w => w.korean === card.korean);
    if (!alreadyAdded) {
        // Store only the core fields
        hardWords.push({
            korean: card.korean,
            romanization: card.romanization,
            meaning: card.meaning
        });
        saveHardWords(hardWords);
    }
    renderHardWords();
}

function removeFromHard(korean) {
    let hardWords = getHardWords();
    hardWords = hardWords.filter(w => w.korean !== korean);
    saveHardWords(hardWords);
    renderHardWords();
}

function renderHardWords() {
    const hardWords = getHardWords();
    const container = document.getElementById('hard-words-section');
    const list = document.getElementById('hard-words-list');
    const copyBtn = document.getElementById('copy-hard-words-btn');
    const clearBtn = document.getElementById('clear-hard-words-btn');

    if (hardWords.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    list.innerHTML = '';

    hardWords.forEach(word => {
        const item = document.createElement('div');
        item.className = 'hard-word-item';
        item.innerHTML = `
            <span class="hard-word-korean">${word.korean}</span>
            <span class="hard-word-details">${word.romanization} — ${word.meaning}</span>
            <button class="remove-hard-btn" data-korean="${word.korean}" title="Remove">✕</button>
        `;
        item.querySelector('.remove-hard-btn').addEventListener('click', function() {
            removeFromHard(this.dataset.korean);
        });
        list.appendChild(item);
    });

    // Build the copyable JS format
    const jsLines = hardWords.map(w =>
        `        { korean: "${w.korean}", romanization: "${w.romanization}", meaning: "${w.meaning}" },`
    ).join('\n');
    document.getElementById('hard-words-code').textContent = jsLines;
}

// Copy to clipboard
document.getElementById('copy-hard-words-btn').addEventListener('click', function() {
    const code = document.getElementById('hard-words-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        this.textContent = '✓ Copied!';
        setTimeout(() => this.textContent = '📋 Copy JS', 2000);
    });
});

document.getElementById('clear-hard-words-btn').addEventListener('click', function() {
    if (confirm('Clear all hard words?')) {
        localStorage.removeItem('hardWords');
        renderHardWords();
    }
});

// STEP 4: UPDATE NAVIGATION BUTTONS
function updateNavigationButtons() {
    if (currentCardIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    if (currentCardIndex === currentCards.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

// STEP 5: FLIP CARD (when clicked)
flashcard.addEventListener('click', function() {
    isFlipped = !isFlipped;
    displayCard();
});

// STEP 6: PREVIOUS BUTTON
prevBtn.addEventListener('click', function() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        isFlipped = false;
        displayCard();
    }
});

// STEP 7: NEXT BUTTON
nextBtn.addEventListener('click', function() {
    if (currentCardIndex < currentCards.length - 1) {
        currentCardIndex++;
        isFlipped = false;
        displayCard();
    }
});

// STEP 8: BACK TO CATEGORIES BUTTON
backToCategoriesBtn.addEventListener('click', function() {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    flashcardArea.classList.add('hidden');
    categoryContainer.classList.remove('hidden');
    
    currentCategory = null;
    currentCards = [];
    currentCardIndex = 0;
    isFlipped = false;
});

// STEP 9: SHUFFLE BUTTON
shuffleBtn.addEventListener('click', function() {
    currentCards = shuffleArray(currentCards);
    currentCardIndex = 0;
    isFlipped = false;
    displayCard();
});

// RUN THIS WHEN PAGE LOADS
createCategoryButtons();

// SEARCH FEATURE
const categorySearch = document.getElementById('category-search');

categorySearch.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const buttons = categoryButtonsDiv.querySelectorAll('.category-btn');
    let visibleCount = 0;

    buttons.forEach(function(btn) {
        if (btn.textContent.toLowerCase().includes(query)) {
            btn.style.display = '';
            visibleCount++;
        } else {
            btn.style.display = 'none';
        }
    });

    // Remove old no-results message if any
    const existing = categoryButtonsDiv.querySelector('.no-results');
    if (existing) existing.remove();

    if (visibleCount === 0) {
        const msg = document.createElement('p');
        msg.className = 'no-results';
        msg.textContent = 'No categories found.';
        categoryButtonsDiv.appendChild(msg);
    }
});

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if user has a saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light Mode';
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', function(e) {
    // Only respond when the flashcard area is actually showing
    if (flashcardArea.classList.contains('hidden')) return;

    // Don't hijack arrow keys while typing in the search box
    if (document.activeElement.tagName === 'INPUT') return;

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextBtn.click(); // same action as clicking Next
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevBtn.click(); // same action as clicking Previous
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        flashcard.click(); // same action as clicking the card to flip it
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        shuffleBtn.click(); // same action as clicking Shuffle
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // stop page from scrolling

        const markHardBtn = document.getElementById('mark-hard-btn');
        if (markHardBtn && !markHardBtn.disabled) {
            markHardBtn.click(); // same action as clicking "Mark as Hard"
        }
    }
});