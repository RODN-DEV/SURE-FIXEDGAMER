// Helper function to render a single game card
const renderGameCard = (game, category) => {
    const statusClass = game.status === 'won' ? 'bg-green-600' : 
                        game.status === 'lost' ? 'bg-red-600' : 
                        'bg-yellow-600';
    const statusText = game.status === 'won' ? 'WON' : 
                       game.status === 'lost' ? 'LOST' : 
                       'PENDING';
    const scoreDisplay = game.score ? `<div class="text-sm font-bold text-gray-500 mt-1">FT Score: ${game.score}</div>` : '';
    const liveIndicator = game.isLive ? '<span class="ml-2 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">LIVE</span>' : '';
    
    // Determine the gradient class based on category
    let cardGradientClass;
    switch (category) {
        case 'free': cardGradientClass = 'card-gradient-free'; break;
        case 'topSecret': cardGradientClass = 'card-gradient-ts'; break;
        case 'ultimate': cardGradientClass = 'card-gradient-uv'; break;
        case 'overUnder': cardGradientClass = 'card-gradient-ou'; break;
        case 'btts': cardGradientClass = 'card-gradient-btts'; break;
        default: cardGradientClass = 'bg-white shadow-xl';
    }

    return `
        <div class="p-4 rounded-2xl ${cardGradientClass} text-white shadow-xl menu-btn fade-in">
            <div class="flex justify-between items-center mb-2 pb-2 border-b border-white border-opacity-30">
                <div class="text-xs font-semibold uppercase tracking-wider">${game.league}</div>
                <div class="text-xs font-bold">${game.time}</div>
            </div>
            <div class="text-center my-3">
                <div class="text-xl font-extrabold mb-1">${game.teamA}</div>
                <div class="text-xs font-semibold text-white opacity-80">VS</div>
                <div class="text-xl font-extrabold mt-1">${game.teamB}</div>
            </div>
            <div class="bg-white bg-opacity-10 p-2 rounded-xl mt-3 text-center">
                <div class="text-xs font-semibold uppercase opacity-80">Prediction</div>
                <div class="text-lg font-extrabold tracking-wide">${game.prediction}</div>
            </div>
            <div class="flex justify-between items-center mt-3">
                <div class="flex items-center">
                    <span class="text-xs font-semibold mr-1">Odds:</span>
                    <span class="text-lg font-extrabold text-yellow-300">${game.odds}</span>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-bold px-3 py-1 rounded-full ${statusClass}">${statusText}</span>
                    ${liveIndicator}
                </div>
            </div>
            ${scoreDisplay}
        </div>
    `;
};

// Helper function to render a full view with a title and game list
const renderGameList = (title, subtitle, gameList, category) => {
    headerTitle.textContent = title;
    return `
        <div class="p-4 sm:p-6 lg:p-8">
            <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">${title}</h2>
            <p class="mt-1 text-slate-600 mb-6">${subtitle}</p>
            <div class="space-y-6">
                ${gameList.map(game => renderGameCard(game, category)).join('')}
            </div>
        </div>
    `;
};

// --- View Functions ---

const renderHome = () => {
    headerTitle.textContent = 'FOOTBALL SIMPLE GAMES';
    return `
        <div class="p-4 sm:p-6 lg:p-8">
            <div class="bg-yellow-500 p-5 rounded-2xl shadow-xl mb-8 fade-in">
                <h2 class="text-2xl font-extrabold text-white">Welcome!</h2>
                <p class="text-white mt-1 opacity-90">Your daily source for reliable football predictions and VIP access.</p>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <a href="#" class="menu-btn bg-green-500 hover:bg-green-600 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('free-tips'); return false;">
                    <i class="fas fa-bullhorn text-3xl mb-2"></i>
                    <span class="font-bold text-sm">Daily Free Tips</span>
                </a>
                <a href="#" class="menu-btn bg-purple-600 hover:bg-purple-700 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('ultimate'); return false;">
                    <i class="fas fa-trophy text-3xl mb-2"></i>
                    <span class="font-bold text-sm">Ultimate VIP</span>
                </a>
                <a href="#" class="menu-btn bg-red-600 hover:bg-red-700 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('top-secret'); return false;">
                    <i class="fas fa-lock text-3xl mb-2"></i>
                    <span class="font-bold text-sm">Top Special VIP</span>
                </a>
                <a href="#" class="menu-btn bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('over-under'); return false;">
                    <i class="fas fa-chart-line text-3xl mb-2"></i>
                    <span class="font-bold text-sm">VIP O/U Tips</span>
                </a>
                <a href="#" class="menu-btn bg-pink-600 hover:bg-pink-700 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('btts'); return false;">
                    <i class="fas fa-handshake text-3xl mb-2"></i>
                    <span class="font-bold text-sm">VIP BTTS Tips</span>
                </a>
                <a href="#" class="menu-btn bg-slate-600 hover:bg-slate-700 p-4 rounded-xl text-white text-center shadow-lg flex flex-col items-center justify-center fade-in" onclick="navigate('support'); return false;">
                    <i class="fas fa-headset text-3xl mb-2"></i>
                    <span class="font-bold text-sm">Contact Support</span>
                </a>
            </div>
            
            <div class="mt-8 p-5 bg-white rounded-2xl shadow-xl fade-in">
                <h3 class="text-xl font-bold text-slate-800 mb-3">Today's Highlight</h3>
                <p class="text-slate-600 text-sm mb-4">Check out our Daily Free Tips, updated every day with high-probability predictions.</p>
                <a href="#" class="inline-block py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition" onclick="navigate('free-tips'); return false;">View Free Tips</a>
            </div>
        </div>
    `;
};

const renderFreeTips = () => {
    return renderGameList(
        'Daily Free Tips', 
        "Our high-confidence predictions, available to everyone.", 
        gamesData.free, 
        'free'
    );
};

const renderUltimate = () => {
    return renderGameList(
        'Ultimate VIP Tips', 
        "The highest-rated selections for serious bettors. Requires VIP Access.", 
        gamesData.ultimate, 
        'ultimate'
    );
};

const renderTopSecret = () => {
    return renderGameList(
        'Top Special VIP', 
        "Exclusive and highly accurate single predictions. Requires VIP Access.", 
        gamesData.topSecret, 
        'topSecret'
    );
};

const renderOverUnder = () => {
    return renderGameList(
        'VIP Over/Under Tips', 
        "Expert predictions focusing on total goals (Over/Under). Requires VIP Access.", 
        gamesData.overUnder, 
        'overUnder'
    );
};

const renderBTTS = () => {
    return renderGameList(
        'VIP BTTS Tips', 
        "Expert predictions focusing on Both Teams To Score (BTTS). Requires VIP Access.", 
        gamesData.btts, 
        'btts'
    );
};

const renderSupport = () => {
    headerTitle.textContent = 'Contact Support';
    return `
        <div class="p-4 sm:p-6 lg:p-8">
            <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Contact Support</h2>
            <p class="mt-2 text-slate-600 mb-6">We're here to help you with any questions or issues regarding our tips and VIP services.</p>

            <div class="space-y-4">
                
                <div class="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 fade-in">
                    <div class="text-3xl text-blue-600">
                        <i class="fab fa-telegram-plane"></i>
                    </div>
                    <div>
                        <div class="text-xs text-blue-600 font-bold uppercase tracking-wider">Telegram</div>
                        <div class="font-bold text-gray-800 text-base">@MasterBetSupport</div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 fade-in">
                    <div class="text-3xl text-green-600">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div>
                        <div class="text-xs text-green-600 font-bold uppercase tracking-wider">WhatsApp</div>
                        <div class="font-bold text-gray-800 text-base">+1 123-456-7890 (Example)</div>
                    </div>
                </div>
                
                <div class="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 fade-in">
                    <div class="text-3xl text-red-600">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                        <div class="text-xs text-red-600 font-bold uppercase tracking-wider">Email</div>
                        <div class="font-bold text-gray-800 text-base">masterbetrealfixed@gmail.com</div>
                    </div>
                </div>

            </div>
        </div>
    `;
};

const renderPrivacyPolicy = () => {
    headerTitle.textContent = 'Privacy Policy';
    return `
        <div class="p-4 sm:p-6 lg:p-8">
            <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Privacy Policy</h2>
            <p class="mt-2 text-slate-600 mb-6">Your privacy is important to us. This policy outlines how we handle your information.</p>

            <div class="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-gray-700">
                <h3 class="text-xl font-bold text-slate-800">1. Information We Collect</h3>
                <p class="text-sm">We collect minimal information required for service delivery, such as anonymous usage data to improve application performance and contact details when you reach out for support.</p>

                <h3 class="text-xl font-bold text-slate-800">2. Use of Information</h3>
                <p class="text-sm">The information collected is used solely to provide and improve our prediction services, process VIP access, and communicate with you regarding your support inquiries.</p>

                <h3 class="text-xl font-bold text-slate-800">3. Data Security</h3>
                <p class="text-sm">We implement a variety of security measures to maintain the safety of your personal information. All VIP access is protected by password authentication.</p>

                <h3 class="text-xl font-bold text-slate-800">4. Third-Party Disclosure</h3>
                <p class="text-sm">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>

                <h3 class="text-xl font-bold text-slate-800">5. Changes to this Policy</h3>
                <p class="text-sm">We may update this privacy policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                
                <p class="text-xs text-gray-500 pt-4">Last Updated: November 2025</p>
            </div>
        </div>
    `;
};