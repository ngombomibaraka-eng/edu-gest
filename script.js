// ============================================================
// EDUGEST - APPLICATION COMPLÈTE
// ============================================================

// ============================================================
// 0. SYSTÈME DE SYNCHRONISATION - NOYAU
// ============================================================

// ===== SYSTÈME D'ÉVÉNEMENTS =====
const EventSystem = {
    listeners: {},
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    },
    
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
};

// ===== NOTIFICATIONS EN TEMPS RÉEL =====
const NotificationSystem = {
    send(userId, message, type = 'info') {
        const notification = {
            id: DB.notifications.length + 1,
            text: message,
            time: 'À l\'instant',
            read: false,
            user_id: userId,
            type: type
        };
        DB.notifications.push(notification);
        EventSystem.emit('notification', notification);
        return notification;
    },
    
    sendToAll(message, type = 'info') {
        this.send('admin', message, type);
        DB.parentAccounts.forEach(p => {
            this.send(p.id, message, type);
        });
        DB.teachers.forEach(t => {
            this.send(t.id, message, type);
        });
        DB.schoolAccounts.forEach(s => {
            this.send(s.id, message, type);
        });
    },
    
    sendToGroup(group, message, type = 'info') {
        if (group === 'parents') {
            DB.parentAccounts.forEach(p => this.send(p.id, message, type));
        } else if (group === 'teachers') {
            DB.teachers.forEach(t => this.send(t.id, message, type));
        } else if (group === 'schools') {
            DB.schoolAccounts.forEach(s => this.send(s.id, message, type));
        } else if (group === 'admin') {
            this.send('admin', message, type);
        }
    }
};

// ===== SYNCHRONISATION DES DONNÉES =====
const SyncSystem = {
    sync() {
        try {
            localStorage.setItem('edugest_db', JSON.stringify(DB));
        } catch(e) {}
        EventSystem.emit('dataChanged', DB);
        EventSystem.emit('refreshUI');
    },
    
    init() {
        try {
            const saved = localStorage.getItem('edugest_db');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(DB, parsed);
            }
        } catch(e) {}
        
        EventSystem.on('dataChanged', () => {
            try {
                localStorage.setItem('edugest_db', JSON.stringify(DB));
            } catch(e) {}
        });
    }
};

// ============================================================
// 1. BASE DE DONNÉES
// ============================================================
const DB = {
    // Comptes écoles
    schoolAccounts: [
        { id: 1, school_id: 1, school_name: 'Lycée International', code: 'SCH-001', password: 'lycee2025', email: 'contact@lycee.sn', phone: '77 123 45 67' },
        { id: 2, school_id: 2, school_name: 'École des Étoiles', code: 'SCH-002', password: 'etoiles2025', email: 'info@etoiles.sn', phone: '77 987 65 43' },
        { id: 3, school_id: 3, school_name: 'Collège Moderne', code: 'SCH-003', password: 'college2025', email: 'contact@college.sn', phone: '76 234 56 78' },
        { id: 4, school_id: 4, school_name: 'École Primaire Saint-Joseph', code: 'SCH-004', password: 'saintjoseph2025', email: 'stjoseph@edugest.com', phone: '78 345 67 89' },
        { id: 5, school_id: 5, school_name: 'Institut Polytechnique', code: 'SCH-005', password: 'polytech2025', email: 'contact@polytech.sn', phone: '76 456 78 90' },
    ],

    // Écoles
    schools: [
        { id: 1, name: 'Lycée International', code: 'SCH-001', phone: '77 123 45 67', email: 'contact@lycee.sn', address: 'Dakar, Sénégal', status: 'Actif' },
        { id: 2, name: 'École des Étoiles', code: 'SCH-002', phone: '77 987 65 43', email: 'info@etoiles.sn', address: 'Guédiawaye, Sénégal', status: 'Actif' },
        { id: 3, name: 'Collège Moderne', code: 'SCH-003', phone: '76 234 56 78', email: 'contact@college.sn', address: 'Pikine, Sénégal', status: 'Actif' },
        { id: 4, name: 'École Primaire Saint-Joseph', code: 'SCH-004', phone: '78 345 67 89', email: 'stjoseph@edugest.com', address: 'Rufisque, Sénégal', status: 'Actif' },
        { id: 5, name: 'Institut Polytechnique', code: 'SCH-005', phone: '76 456 78 90', email: 'contact@polytech.sn', address: 'Thiès, Sénégal', status: 'Actif' },
    ],

    // Comptes parents
    parentAccounts: [
        { id: 1, code: 'PAR-001', password: 'parent123', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '77 123 45 67', children_ids: [1] },
        { id: 2, code: 'PAR-002', password: 'parent123', name: 'Marie Ndiaye', email: 'marie.ndiaye@email.com', phone: '77 987 65 43', children_ids: [2, 7] },
        { id: 3, code: 'PAR-003', password: 'parent123', name: 'Papa Fall', email: 'papa.fall@email.com', phone: '76 234 56 78', children_ids: [3, 6] },
        { id: 4, code: 'PAR-004', password: 'parent123', name: 'Fatou Sow', email: 'fatou.sow@email.com', phone: '78 345 67 89', children_ids: [4] },
        { id: 5, code: 'PAR-005', password: 'parent123', name: 'Amadou Diallo', email: 'amadou.diallo@email.com', phone: '70 456 78 90', children_ids: [5] },
        { id: 6, code: 'PAR-006', password: 'parent123', name: 'Aïcha Ba', email: 'aicha.ba@email.com', phone: '77 567 89 01', children_ids: [8] },
    ],

    // Étudiants
    students: [
        { id: 1, matricule: 'STU-001', first_name: 'Jean', last_name: 'Dupont', class: 'Terminale A', school: 'Lycée International', school_id: 1, status: 'Actif', parent_id: 1 },
        { id: 2, matricule: 'STU-002', first_name: 'Marie', last_name: 'Ndiaye', class: 'Seconde C', school: 'École des Étoiles', school_id: 2, status: 'Actif', parent_id: 2 },
        { id: 3, matricule: 'STU-003', first_name: 'Papa', last_name: 'Fall', class: 'Première D', school: 'Collège Moderne', school_id: 3, status: 'Actif', parent_id: 3 },
        { id: 4, matricule: 'STU-004', first_name: 'Fatou', last_name: 'Sow', class: 'CM2', school: 'École Primaire Saint-Joseph', school_id: 4, status: 'Actif', parent_id: 4 },
        { id: 5, matricule: 'STU-005', first_name: 'Amadou', last_name: 'Diallo', class: 'Terminale C', school: 'Lycée International', school_id: 1, status: 'Actif', parent_id: 5 },
        { id: 6, matricule: 'STU-006', first_name: 'Aïcha', last_name: 'Ba', class: '4ème', school: 'Collège Moderne', school_id: 3, status: 'Actif', parent_id: 3 },
        { id: 7, matricule: 'STU-007', first_name: 'Moussa', last_name: 'Diop', class: '6ème', school: 'École des Étoiles', school_id: 2, status: 'Actif', parent_id: 2 },
        { id: 8, matricule: 'STU-008', first_name: 'Khady', last_name: 'Gueye', class: 'CE2', school: 'École Primaire Saint-Joseph', school_id: 4, status: 'Actif', parent_id: 6 },
    ],

    // Paiements
    payments: [
        { id: 1, invoice: 'INV-001', student: 'Marie Ndiaye', student_id: 2, amount: 50000, method: 'M-Pesa', type: 'Scolarité', status: 'completed', date: '2025-03-25', school: 'École des Étoiles', school_id: 2 },
        { id: 2, invoice: 'INV-002', student: 'Jean Dupont', student_id: 1, amount: 25000, method: 'Espèces', type: 'Inscription', status: 'pending', date: '2025-03-25', school: 'Lycée International', school_id: 1 },
        { id: 3, invoice: 'INV-003', student: 'Papa Fall', student_id: 3, amount: 35000, method: 'Orange Money', type: 'Scolarité', status: 'completed', date: '2025-03-24', school: 'Collège Moderne', school_id: 3 },
        { id: 4, invoice: 'INV-004', student: 'Fatou Sow', student_id: 4, amount: 20000, method: 'M-Pesa', type: 'Cantine', status: 'pending', date: '2025-03-24', school: 'École Primaire Saint-Joseph', school_id: 4 },
        { id: 5, invoice: 'INV-005', student: 'Amadou Diallo', student_id: 5, amount: 40000, method: 'Banque', type: 'Scolarité', status: 'completed', date: '2025-03-23', school: 'Lycée International', school_id: 1 },
    ],

    // Enseignants
    teachers: [
        { id: 1, first_name: 'Papa', last_name: 'Fall', subject: 'Mathématiques', school: 'Lycée International', school_id: 1, email: 'papa.fall@lycee.sn', phone: '77 111 11 11' },
        { id: 2, first_name: 'Mariama', last_name: 'Diallo', subject: 'Français', school: 'École des Étoiles', school_id: 2, email: 'mariama.diallo@etoiles.sn', phone: '77 222 22 22' },
        { id: 3, first_name: 'Amadou', last_name: 'Sarr', subject: 'Anglais', school: 'Collège Moderne', school_id: 3, email: 'amadou.sarr@college.sn', phone: '76 333 33 33' },
        { id: 4, first_name: 'Fatou', last_name: 'Diagne', subject: 'Sciences', school: 'Lycée International', school_id: 1, email: 'fatou.diagne@lycee.sn', phone: '77 444 44 44' },
    ],

    // Classes
    classes: [
        { id: 1, name: 'Terminale A', school_id: 1, level: 'Terminale', teacher_id: 1, student_count: 25 },
        { id: 2, name: 'Seconde C', school_id: 2, level: 'Seconde', teacher_id: 2, student_count: 20 },
        { id: 3, name: 'Première D', school_id: 3, level: 'Première', teacher_id: 3, student_count: 18 },
        { id: 4, name: 'CM2', school_id: 4, level: 'CM2', teacher_id: 4, student_count: 15 },
        { id: 5, name: 'Terminale C', school_id: 1, level: 'Terminale', teacher_id: 1, student_count: 22 },
    ],

    // Messages
    messages: [
        { id: 1, sender: 'Enseignant', sender_id: 1, receiver: 'Parent', receiver_id: 1, subject: 'Progrès de l\'élève', content: 'Votre enfant a fait de bons progrès ce trimestre.', date: '2025-03-25', read: false },
        { id: 2, sender: 'Parent', sender_id: 1, receiver: 'Enseignant', receiver_id: 1, subject: 'Réunion', content: 'Je confirme ma présence à la réunion de demain.', date: '2025-03-24', read: true },
        { id: 3, sender: 'Administration', sender_id: 0, receiver: 'Tous', receiver_id: 0, subject: 'Information importante', content: 'Les inscriptions pour la rentrée prochaine sont ouvertes.', date: '2025-03-23', read: false },
    ],

    // Notifications
    notifications: [
        { id: 1, text: '<strong>Marie Ndiaye</strong> a effectué un paiement de 50 000 FCFA', time: 'Il y a 5 min', read: false },
        { id: 2, text: '<strong>Jean Dupont</strong> a demandé un reçu pour le paiement #INV-002', time: 'Il y a 15 min', read: false },
        { id: 3, text: 'Nouvelle école <strong>Institut Polytechnique</strong> a rejoint la plateforme', time: 'Il y a 2h', read: true },
    ],
};

// ============================================================
// 2. ÉTAT GLOBAL
// ============================================================
let currentUser = null;
let currentPage = 'dashboard';
let userRole = 'admin';
let userSchoolId = null;
let modalCallback = null;

// ============================================================
// 3. FONCTIONS D'AUTHENTIFICATION
// ============================================================

function selectRole(role) {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === role);
    });

    document.getElementById('adminTeacherFields').style.display = 'none';
    document.getElementById('schoolFields').style.display = 'none';
    document.getElementById('parentFields').style.display = 'none';

    const btn = document.getElementById('loginBtn');
    if (role === 'admin' || role === 'teacher') {
        document.getElementById('adminTeacherFields').style.display = 'block';
        btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i> Se connecter';
        document.getElementById('loginEmail').value = role === 'admin' ? 'admin@edugest.com' : 'prof@edugest.com';
        document.getElementById('loginPassword').value = 'password123';
    } else if (role === 'school') {
        document.getElementById('schoolFields').style.display = 'block';
        btn.innerHTML = '<i class="bi bi-building me-2"></i> Accéder à mon école';
    } else if (role === 'parent') {
        document.getElementById('parentFields').style.display = 'block';
        btn.innerHTML = '<i class="bi bi-person-heart me-2"></i> Accéder à mon espace parent';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const role = document.querySelector('.role-btn.active')?.dataset.role || 'admin';
    const errorEl = document.getElementById('loginError');
    errorEl.style.display = 'none';

    if (role === 'admin') {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (email === 'admin@edugest.com' && password === 'password123') {
            userRole = 'admin';
            userSchoolId = null;
            initApp('Administrateur', 'Admin', 'A', '#4F46E5');
            showToast('Bienvenue Admin !', 'success');
        } else {
            errorEl.textContent = 'Identifiants administrateur incorrects';
            errorEl.style.display = 'block';
        }
    } else if (role === 'teacher') {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (email === 'prof@edugest.com' && password === 'password123') {
            userRole = 'teacher';
            userSchoolId = null;
            initApp('Enseignant', 'Prof.', 'P', '#3B82F6');
            showToast('Bienvenue Professeur !', 'success');
        } else {
            errorEl.textContent = 'Identifiants enseignant incorrects';
            errorEl.style.display = 'block';
        }
    } else if (role === 'school') {
        const code = document.getElementById('schoolCode').value.toUpperCase().trim();
        const password = document.getElementById('schoolPassword').value;
        const account = DB.schoolAccounts.find(s => s.code === code);
        if (account && account.password === password) {
            const school = DB.schools.find(s => s.id === account.school_id);
            if (school) {
                userRole = 'school';
                userSchoolId = school.id;
                initApp(school.name, school.code, school.name.charAt(0), '#10B981');
                showToast(`Bienvenue à ${school.name} !`, 'success');
            }
        } else {
            errorEl.textContent = 'Code école ou mot de passe incorrect';
            errorEl.style.display = 'block';
        }
    } else if (role === 'parent') {
        const code = document.getElementById('parentCode').value.toUpperCase().trim();
        const password = document.getElementById('parentPassword').value;
        const account = DB.parentAccounts.find(p => p.code === code);
        if (account && account.password === password) {
            userRole = 'parent';
            userSchoolId = null;
            currentUser = account;
            initApp(account.name, 'Parent', account.name.charAt(0), '#EC4899');
            showToast(`Bienvenue ${account.name} !`, 'pink');
        } else {
            errorEl.textContent = 'Code parent ou mot de passe incorrect';
            errorEl.style.display = 'block';
        }
    }
}

function showSchoolCodes() {
    showModal('📋 Codes d\'accès des écoles', `
        <div class="table-responsive">
            <table class="table table-edugest">
                <thead><tr><th>École</th><th>Code</th><th>Mot de passe</th></tr></thead>
                <tbody>
                    ${DB.schoolAccounts.map(s => `
                        <tr>
                            <td><strong>${s.school_name}</strong></td>
                            <td><code style="background:#eef2ff;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--primary);">${s.code}</code></td>
                            <td><code style="background:#fef3c7;padding:2px 8px;border-radius:4px;font-weight:700;color:#92400e;">${s.password}</code></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `, null);
}

function showParentCodes() {
    showModal('👨‍👩‍👧‍👦 Codes d\'accès des parents', `
        <div class="table-responsive">
            <table class="table table-edugest">
                <thead><tr><th>Parent</th><th>Code</th><th>Mot de passe</th><th>Enfants</th></tr></thead>
                <tbody>
                    ${DB.parentAccounts.map(p => `
                        <tr>
                            <td><strong>${p.name}</strong></td>
                            <td><code style="background:#fdf2f8;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--parent-color);">${p.code}</code></td>
                            <td><code style="background:#fef3c7;padding:2px 8px;border-radius:4px;font-weight:700;color:#92400e;">${p.password}</code></td>
                            <td>${p.children_ids.map(id => {
                                const child = DB.students.find(s => s.id === id);
                                return child ? `${child.first_name} ${child.last_name}` : 'N/A';
                            }).join(', ')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `, null);
}

// ============================================================
// 4. INITIALISATION ET NAVIGATION
// ============================================================

function initApp(name, role, avatar, color = '#4F46E5') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('userName').textContent = name;
    document.getElementById('userRole').textContent = role;
    document.getElementById('userAvatar').textContent = avatar;
    document.getElementById('userAvatar').style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;

    const isAdmin = role === 'Admin';
    const isParent = role === 'Parent';

    document.getElementById('menuSchools').style.display = isAdmin ? 'flex' : 'none';
    document.getElementById('menuParents').style.display = isAdmin ? 'flex' : 'none';
    document.getElementById('menuMyChildren').style.display = isParent ? 'flex' : 'none';
    document.getElementById('adminMenuLabel').style.display = isAdmin ? 'block' : 'none';

    navigateTo('dashboard');
}

function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('section-' + page);
    if (target) target.classList.add('active');
    
    const titles = {
        dashboard: 'Tableau de bord <small>Aperçu général</small>',
        students: 'Étudiants <small>Gestion des étudiants</small>',
        myChildren: 'Mes Enfants <small>Suivi de mes enfants</small>',
        payments: 'Paiements <small>Gestion des paiements</small>',
        messages: 'Messages <small>Messagerie scolaire</small>',
        schools: 'Écoles <small>Gestion des écoles</small>',
        parents: 'Parents <small>Gestion des parents</small>',
        teachers: 'Enseignants <small>Gestion des enseignants</small>',
        classes: 'Classes <small>Gestion des classes</small>',
        reports: 'Rapports <small>Génération de rapports statistiques</small>',
        settings: 'Paramètres <small>Configuration du système</small>'
    };
    document.getElementById('pageTitle').innerHTML = titles[page] || page;
    
    document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    
    if (window.innerWidth <= 992) {
        document.getElementById('sidebar').classList.remove('show');
    }
    
    loadPageData(page);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
}

function logout() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        document.getElementById('app').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        currentUser = null;
        userRole = 'admin';
        userSchoolId = null;
        showToast('Déconnecté avec succès', 'info');
    }
}
// ============================================================
// 5. CHARGEMENT DES DONNÉES PAR PAGE
// ============================================================

function loadPageData(page) {
    const filterBySchool = (data, field = 'school_id') => {
        if (userRole === 'admin') return data;
        if (userRole === 'school') return data.filter(item => item[field] === userSchoolId);
        if (userRole === 'parent') {
            const childIds = currentUser?.children_ids || [];
            if (field === 'student_id') return data.filter(item => childIds.includes(item.student_id));
            if (field === 'parent_id') return data.filter(item => childIds.includes(item.id));
            return data;
        }
        return data;
    };

    switch(page) {
        case 'dashboard': loadDashboard(); break;
        case 'students': loadStudents(filterBySchool); break;
        case 'myChildren': loadMyChildren(); break;
        case 'payments': loadPayments(filterBySchool); break;
        case 'messages': loadMessages(); break;
        case 'schools': loadSchools(); break;
        case 'parents': loadParents(); break;
        case 'teachers': loadTeachers(filterBySchool); break;
        case 'classes': loadClasses(filterBySchool); break;
        default: break;
    }
}

// ============================================================
// 6. TABLEAU DE BORD
// ============================================================

function loadDashboard() {
    let students = DB.students;
    let payments = DB.payments;
    let schools = DB.schools;

    if (userRole === 'school') {
        students = students.filter(s => s.school_id === userSchoolId);
        payments = payments.filter(p => p.school_id === userSchoolId);
        schools = schools.filter(s => s.id === userSchoolId);
    } else if (userRole === 'parent') {
        const childIds = currentUser?.children_ids || [];
        students = students.filter(s => childIds.includes(s.id));
        payments = payments.filter(p => childIds.includes(p.student_id));
        loadParentDashboard();
        return;
    }

    document.getElementById('statSchools').textContent = schools.length;
    document.getElementById('statStudents').textContent = students.length;
    document.getElementById('statParents').textContent = DB.parentAccounts.length;
    document.getElementById('studentCount').textContent = students.length;

    const pending = payments.filter(p => p.status === 'pending').length;
    const completed = payments.filter(p => p.status === 'completed').length;
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;

    const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
    document.getElementById('statRevenue').textContent = totalRevenue.toLocaleString();

    // Activités récentes
    const activities = document.getElementById('recentActivities');
    const recentPayments = payments.slice(-5).reverse();
    if (recentPayments.length === 0) {
        activities.innerHTML = '<div class="text-center text-secondary py-4"><i class="bi bi-inbox" style="font-size:2rem;display:block;margin-bottom:10px;"></i>Aucune activite recente</div>';
    } else {
        activities.innerHTML = recentPayments.map(p => `
            <div class="transaction-item d-flex align-items-center gap-3 py-2 border-bottom">
                <div class="tx-icon ${p.status === 'completed' ? 'success' : 'pending'}" style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;${p.status === 'completed' ? 'background:#d1fae5;color:#065f46;' : 'background:#fef3c7;color:#92400e;'}">
                    <i class="bi ${p.status === 'completed' ? 'bi-check-lg' : 'bi-clock'}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-semibold">${p.student}</div>
                    <div class="small text-secondary">${p.invoice} • ${p.date}</div>
                </div>
                <div class="fw-bold text-success">${p.amount.toLocaleString()} FCFA</div>
                <span class="badge badge-custom ${p.status === 'completed' ? 'bg-success-light' : 'bg-warning-light'}">${p.status === 'completed' ? 'Paye' : 'En attente'}</span>
            </div>
        `).join('');
    }

    // Notifications
    const notifList = document.getElementById('notificationsList');
    if (DB.notifications.length === 0) {
        notifList.innerHTML = '<div class="text-center text-secondary py-3"><i class="bi bi-check-circle" style="font-size:1.5rem;display:block;margin-bottom:8px;color:var(--success);"></i><small>Aucune notification</small></div>';
    } else {
        notifList.innerHTML = DB.notifications.slice(0, 5).map(n => `
            <div class="notification-item d-flex gap-3 py-2 border-bottom">
                <span class="notif-dot" style="width:8px;height:8px;border-radius:50%;background:${n.read ? '#cbd5e1' : 'var(--primary)'};margin-top:6px;flex-shrink:0;"></span>
                <div>
                    <div class="notif-text">${n.text}</div>
                    <div class="notif-time small text-secondary">${n.time}</div>
                </div>
            </div>
        `).join('');
    }

    DB.notifications.forEach(n => n.read = true);
}





// ============================================================
// 6.1 TABLEAU DE BORD SPÉCIFIQUE POUR LES PARENTS
// ============================================================

function loadParentDashboard() {
    const childIds = currentUser?.children_ids || [];
    const children = DB.students.filter(s => childIds.includes(s.id));
    let allPayments = DB.payments.filter(p => childIds.includes(p.student_id));
    
    const pending = allPayments.filter(p => p.status === 'pending').length;
    const completed = allPayments.filter(p => p.status === 'completed').length;
    const totalRevenue = allPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    
    document.getElementById('statSchools').textContent = children.length > 0 ? 1 : 0;
    document.getElementById('statStudents').textContent = children.length;
    document.getElementById('statParents').textContent = 1;
    document.getElementById('studentCount').textContent = children.length;
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statRevenue').textContent = totalRevenue.toLocaleString();
    document.getElementById('pendingCount').textContent = pending;

    const activities = document.getElementById('recentActivities');
    if (children.length === 0) {
        activities.innerHTML = `
            <div class="text-center text-secondary py-4">
                <i class="bi bi-heart" style="font-size:2.5rem;display:block;margin-bottom:10px;color:var(--parent-color);"></i>
                <h6>Aucun enfant associe</h6>
                <small>Contactez l'administration de l'ecole</small>
            </div>
        `;
        return;
    }

    activities.innerHTML = children.map(child => {
        const childPayments = DB.payments.filter(p => p.student_id === child.id);
        const totalPaid = childPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
        const pendingCount = childPayments.filter(p => p.status === 'pending').length;
        const colors = ['#EC4899', '#db2777', '#be185d', '#9d174d'];
        const colorIndex = child.id % colors.length;
        
        return `
            <div class="d-flex align-items-center gap-3 py-3 border-bottom">
                <div style="width:45px;height:45px;border-radius:50%;background:linear-gradient(135deg,${colors[colorIndex]},${colors[(colorIndex+1) % colors.length]});display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:1rem;flex-shrink:0;">
                    ${child.first_name.charAt(0)}${child.last_name.charAt(0)}
                </div>
                <div class="flex-grow-1">
                    <div class="fw-semibold">${child.first_name} ${child.last_name}</div>
                    <div class="small text-secondary">
                        <span class="badge badge-custom bg-info-light">${child.class}</span>
                        <span class="badge badge-custom bg-primary-light">${child.school}</span>
                    </div>
                </div>
                <div class="text-end">
                    <div class="small">Total paye</div>
                    <div class="fw-bold text-success">${totalPaid.toLocaleString()} FCFA</div>
                    ${pendingCount > 0 ? `<span class="badge badge-custom bg-warning-light"><i class="bi bi-clock"></i> ${pendingCount} en attente</span>` : ''}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewChildDetails(${child.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const notifList = document.getElementById('notificationsList');
    const parentName = currentUser?.name?.split(' ')[0] || '';
    const childNames = children.map(c => `${c.first_name} ${c.last_name}`);
    const parentNotifs = DB.notifications.filter(n => {
        const text = n.text;
        return text.includes(parentName) || childNames.some(name => text.includes(name));
    });
    
    if (parentNotifs.length === 0) {
        notifList.innerHTML = '<div class="text-center text-secondary py-3"><i class="bi bi-check-circle" style="font-size:1.5rem;display:block;margin-bottom:8px;color:var(--success);"></i><small>Aucune notification</small></div>';
    } else {
        notifList.innerHTML = parentNotifs.slice(0, 5).map(n => `
            <div class="notification-item d-flex gap-3 py-2 border-bottom">
                <span class="notif-dot" style="width:8px;height:8px;border-radius:50%;background:${n.read ? '#cbd5e1' : 'var(--parent-color)'};margin-top:6px;flex-shrink:0;"></span>
                <div>
                    <div class="notif-text">${n.text}</div>
                    <div class="notif-time small text-secondary">${n.time}</div>
                </div>
            </div>
        `).join('');
    }
    parentNotifs.forEach(n => n.read = true);
}

// ============================================================
// 6.2 FONCTION D'INITIALISATION DU TABLEAU DE BORD
// ============================================================

function initDashboard() {
    // Cette fonction peut être appelée pour forcer le rechargement du tableau de bord
    loadDashboard();
}

// ============================================================

// ============================================================
// 7. GESTION DES ÉTUDIANTS - AVEC SYNC
// ============================================================

function showStudentForm() {
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    showModal('Ajouter un etudiant', `
        <form id="studentForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom</label>
                    <input type="text" class="form-control" id="studentLastName" placeholder="Nom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Prenom</label>
                    <input type="text" class="form-control" id="studentFirstName" placeholder="Prenom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Classe</label>
                    <input type="text" class="form-control" id="studentClass" placeholder="Ex: Terminale A" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Ecole</label>
                    <select class="form-select" id="studentSchool">
                        ${schools.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="fw-bold"><i class="bi bi-person-heart" style="color:var(--parent-color);"></i> Parent ou tuteur</h6>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Option</label>
                                    <select class="form-select" id="parentOption" onchange="toggleParentFields()">
                                        <option value="existing">Selectionner un parent existant</option>
                                        <option value="new">Creer un nouveau parent</option>
                                    </select>
                                </div>
                                <div class="col-md-12" id="existingParentDiv">
                                    <label class="form-label fw-semibold">Parent existant</label>
                                    <select class="form-select" id="studentParent">
                                        <option value="">Aucun</option>
                                        ${DB.parentAccounts.map(p => `<option value="${p.id}">${p.name} (${p.code})</option>`).join('')}
                                    </select>
                                </div>
                                <div class="col-md-12" id="newParentDiv" style="display:none;">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Nom complet</label>
                                            <input type="text" class="form-control" id="newParentName" placeholder="Nom et prenom">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Email</label>
                                            <input type="email" class="form-control" id="newParentEmail" placeholder="email@exemple.com">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Telephone</label>
                                            <input type="text" class="form-control" id="newParentPhone" placeholder="77 123 45 67">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Code parent</label>
                                            <input type="text" class="form-control" id="newParentCode" value="PAR-${String(DB.parentAccounts.length + 1).padStart(3, '0')}" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `, () => {
        const lastName = document.getElementById('studentLastName').value;
        const firstName = document.getElementById('studentFirstName').value;
        const className = document.getElementById('studentClass').value;
        const schoolId = parseInt(document.getElementById('studentSchool').value);
        const parentOption = document.getElementById('parentOption').value;
        
        if (!lastName || !firstName || !className) {
            showToast('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        const school = DB.schools.find(s => s.id === schoolId);
        let parentId = null;
        let parentName = '';
        let isNewParent = false;
        
        if (parentOption === 'existing') {
            parentId = parseInt(document.getElementById('studentParent').value) || null;
            if (parentId) {
                const parent = DB.parentAccounts.find(p => p.id === parentId);
                parentName = parent ? parent.name : '';
            }
        } else {
            const newName = document.getElementById('newParentName').value;
            const newEmail = document.getElementById('newParentEmail').value;
            const newPhone = document.getElementById('newParentPhone').value;
            
            if (!newName) {
                showToast('Veuillez entrer le nom du parent', 'error');
                return;
            }
            
            const newParent = {
                id: DB.parentAccounts.length + 1,
                code: document.getElementById('newParentCode').value || `PAR-${String(DB.parentAccounts.length + 1).padStart(3, '0')}`,
                password: 'parent123',
                name: newName,
                email: newEmail || 'Non renseigne',
                phone: newPhone || 'Non renseigne',
                children_ids: []
            };
            
            DB.parentAccounts.push(newParent);
            parentId = newParent.id;
            parentName = newParent.name;
            isNewParent = true;
        }
        
        const newStudent = {
            id: DB.students.length + 1,
            matricule: `STU-${String(DB.students.length + 1).padStart(3, '0')}`,
            first_name: firstName,
            last_name: lastName,
            class: className,
            school: school ? school.name : 'Non assigne',
            school_id: schoolId,
            status: 'Actif',
            parent_id: parentId
        };
        
        DB.students.push(newStudent);
        
        if (parentId) {
            const parent = DB.parentAccounts.find(p => p.id === parentId);
            if (parent && !parent.children_ids.includes(newStudent.id)) {
                parent.children_ids.push(newStudent.id);
            }
        }
        
        closeModal();
        
        const schoolName = school ? school.name : 'l\'ecole';
        
        if (parentId) {
            NotificationSystem.send(parentId, 
                `<strong>${firstName} ${lastName}</strong> a ete enregistre dans ${schoolName} en classe ${className}`,
                'pink'
            );
        }
        
        NotificationSystem.send(`school_${schoolId}`, 
            `<strong>${firstName} ${lastName}</strong> a ete enregistre avec succès`,
            'success'
        );
        
        NotificationSystem.send('admin', 
            `<strong>${firstName} ${lastName}</strong> a ete enregistre dans ${schoolName}${isNewParent ? ' avec nouveau parent ' + parentName : ''}`,
            'info'
        );
        
        const teachers = DB.teachers.filter(t => t.school_id === schoolId);
        teachers.forEach(t => {
            NotificationSystem.send(t.id, 
                `<strong>${firstName} ${lastName}</strong> a rejoint la classe ${className}`,
                'info'
            );
        });
        
        SyncSystem.sync();
        
        showToast(`Etudiant ${firstName} ${lastName} ajoute avec succès !`, 'success');
        if (isNewParent) {
            showToast(`👤 Nouveau parent ${parentName} cree avec le code ${document.getElementById('newParentCode').value}`, 'success');
        }
        
        loadPageData('students');
        loadPageData('dashboard');
        if (userRole === 'parent') loadPageData('myChildren');
    });
}

// ===== TOGGLE DES CHAMPS PARENT =====
function toggleParentFields() {
    const option = document.getElementById('parentOption').value;
    document.getElementById('existingParentDiv').style.display = option === 'existing' ? 'block' : 'none';
    document.getElementById('newParentDiv').style.display = option === 'new' ? 'block' : 'none';
}

function showStudentForm() {
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    showModal('➕ Ajouter un étudiant', `
        <form id="studentForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom</label>
                    <input type="text" class="form-control" id="studentLastName" placeholder="Nom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Prénom</label>
                    <input type="text" class="form-control" id="studentFirstName" placeholder="Prénom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Classe</label>
                    <input type="text" class="form-control" id="studentClass" placeholder="Ex: Terminale A" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">École</label>
                    <select class="form-select" id="studentSchool">
                        ${schools.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Parent</label>
                    <select class="form-select" id="studentParent">
                        <option value="">Aucun</option>
                        ${DB.parentAccounts.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                </div>
            </div>
        </form>
    `, () => {
        const lastName = document.getElementById('studentLastName').value;
        const firstName = document.getElementById('studentFirstName').value;
        const className = document.getElementById('studentClass').value;
        const schoolId = parseInt(document.getElementById('studentSchool').value);
        const parentId = parseInt(document.getElementById('studentParent').value) || null;
        
        if (!lastName || !firstName || !className) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        const school = DB.schools.find(s => s.id === schoolId);
        const newStudent = {
            id: DB.students.length + 1,
            matricule: `STU-${String(DB.students.length + 1).padStart(3, '0')}`,
            first_name: firstName,
            last_name: lastName,
            class: className,
            school: school ? school.name : 'Non assigné',
            school_id: schoolId,
            status: 'Actif',
            parent_id: parentId
        };
        
        DB.students.push(newStudent);
        if (parentId) {
            const parent = DB.parentAccounts.find(p => p.id === parentId);
            if (parent && !parent.children_ids.includes(newStudent.id)) {
                parent.children_ids.push(newStudent.id);
            }
        }
        
        closeModal();
        showToast(`Étudiant ${firstName} ${lastName} ajouté avec succès !`, 'success');
        loadPageData('students');
        loadPageData('dashboard');
    });
}

function viewStudent(id) {
    const student = DB.students.find(s => s.id === id);
    if (!student) return;
    const parent = DB.parentAccounts.find(p => p.children_ids.includes(id));
    const payments = DB.payments.filter(p => p.student_id === id);
    const totalPaid = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

    showModal(`📘 ${student.first_name} ${student.last_name}`, `
        <div class="row g-3">
            <div class="col-md-6"><strong>Matricule :</strong> ${student.matricule}</div>
            <div class="col-md-6"><strong>Classe :</strong> ${student.class}</div>
            <div class="col-md-6"><strong>École :</strong> ${student.school}</div>
            <div class="col-md-6"><strong>Parent :</strong> ${parent ? parent.name : 'Non assigné'}</div>
            <div class="col-md-6"><strong>Statut :</strong> <span class="badge bg-success">${student.status}</span></div>
            <div class="col-md-6"><strong>Total payé :</strong> ${totalPaid.toLocaleString()} FCFA</div>
        </div>
        <hr>
        <h6>Historique des paiements</h6>
        ${payments.length === 0 ? '<p class="text-secondary">Aucun paiement</p>' : 
            payments.map(p => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                        <div class="fw-semibold">${p.invoice} - ${p.type}</div>
                        <div class="small text-secondary">${p.date} • ${p.method}</div>
                    </div>
                    <div class="fw-bold text-success">${p.amount.toLocaleString()} FCFA</div>
                </div>
            `).join('')
        }
    `, null);
}

function editStudent(id) {
    const student = DB.students.find(s => s.id === id);
    if (!student) return;
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    showModal(`✏️ Modifier ${student.first_name} ${student.last_name}`, `
        <form id="editStudentForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom</label>
                    <input type="text" class="form-control" id="editStudentLastName" value="${student.last_name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Prénom</label>
                    <input type="text" class="form-control" id="editStudentFirstName" value="${student.first_name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Classe</label>
                    <input type="text" class="form-control" id="editStudentClass" value="${student.class}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">École</label>
                    <select class="form-select" id="editStudentSchool">
                        ${schools.map(s => `<option value="${s.id}" ${s.id === student.school_id ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Parent</label>
                    <select class="form-select" id="editStudentParent">
                        <option value="">Aucun</option>
                        ${DB.parentAccounts.map(p => `<option value="${p.id}" ${p.id === student.parent_id ? 'selected' : ''}>${p.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="editStudentStatus">
                        <option value="Actif" ${student.status === 'Actif' ? 'selected' : ''}>Actif</option>
                        <option value="Inactif" ${student.status === 'Inactif' ? 'selected' : ''}>Inactif</option>
                        <option value="Diplômé" ${student.status === 'Diplômé' ? 'selected' : ''}>Diplômé</option>
                    </select>
                </div>
            </div>
        </form>
    `, () => {
        const lastName = document.getElementById('editStudentLastName').value;
        const firstName = document.getElementById('editStudentFirstName').value;
        const className = document.getElementById('editStudentClass').value;
        const schoolId = parseInt(document.getElementById('editStudentSchool').value);
        const parentId = parseInt(document.getElementById('editStudentParent').value) || null;
        const status = document.getElementById('editStudentStatus').value;
        
        if (!lastName || !firstName || !className) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        const school = DB.schools.find(s => s.id === schoolId);
        
        // Retirer l'étudiant de l'ancien parent
        if (student.parent_id) {
            const oldParent = DB.parentAccounts.find(p => p.id === student.parent_id);
            if (oldParent) {
                oldParent.children_ids = oldParent.children_ids.filter(cid => cid !== student.id);
            }
        }
        
        // Ajouter au nouveau parent
        if (parentId) {
            const newParent = DB.parentAccounts.find(p => p.id === parentId);
            if (newParent && !newParent.children_ids.includes(student.id)) {
                newParent.children_ids.push(student.id);
            }
        }
        
        student.last_name = lastName;
        student.first_name = firstName;
        student.class = className;
        student.school = school ? school.name : 'Non assigné';
        student.school_id = schoolId;
        student.parent_id = parentId;
        student.status = status;
        
        closeModal();
        showToast(`Étudiant ${firstName} ${lastName} modifié avec succès !`, 'success');
        loadPageData('students');
        loadPageData('dashboard');
    });
}

function deleteStudent(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet etudiant ?')) return;
    const student = DB.students.find(s => s.id === id);
    if (!student) return;
    
    if (student.parent_id) {
        const parent = DB.parentAccounts.find(p => p.id === student.parent_id);
        if (parent) {
            parent.children_ids = parent.children_ids.filter(cid => cid !== student.id);
        }
    }
    
    const studentName = `${student.first_name} ${student.last_name}`;
    DB.students = DB.students.filter(s => s.id !== id);
    
    NotificationSystem.send(`school_${student.school_id}`, 
        `<strong>${studentName}</strong> a ete supprime de l'ecole`,
        'warning'
    );
    
    if (student.parent_id) {
        NotificationSystem.send(student.parent_id, 
            `<strong>${studentName}</strong> a ete supprime de l'ecole`,
            'warning'
        );
    }
    
    NotificationSystem.send('admin', 
        `<strong>${studentName}</strong> a ete supprime du systeme`,
        'info'
    );
    
    SyncSystem.sync();
    
    showToast(`Etudiant supprime avec succès !`, 'success');
    loadPageData('students');
    loadPageData('dashboard');
    if (userRole === 'parent') loadPageData('myChildren');
}

// ============================================================
// 8. MES ENFANTS (PARENT) - VERSION SIMPLIFIÉE
// ============================================================

function loadMyChildren() {
    const childIds = currentUser?.children_ids || [];
    const children = DB.students.filter(s => childIds.includes(s.id));
    
    const container = document.getElementById('childrenList');
    if (children.length === 0) {
        container.innerHTML = `
            <div class="text-center text-secondary py-5">
                <i class="bi bi-heart" style="font-size:3rem;display:block;margin-bottom:15px;color:var(--parent-color);"></i>
                <h5>Aucun enfant enregistré</h5>
                <p class="small">Contactez l'administration de l'école pour associer vos enfants à votre compte.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = children.map(child => {
        const childPayments = DB.payments.filter(p => p.student_id === child.id);
        const totalPaid = childPayments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const pendingPayments = childPayments.filter(p => p.status === 'pending').length;
        const recentPayment = childPayments.length > 0 ? childPayments[childPayments.length - 1] : null;

        return `
            <div class="child-card p-4 border rounded-3 mb-4" style="background:white;border-left:4px solid var(--parent-color);box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div class="row align-items-center">
                    <!-- Photo/Avatar de l'enfant -->
                    <div class="col-md-2 col-3 text-center">
                        <div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,var(--parent-color),#db2777);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:1.8rem;font-weight:700;box-shadow:0 4px 15px rgba(236,72,153,0.3);">
                            ${child.first_name.charAt(0)}${child.last_name.charAt(0)}
                        </div>
                    </div>
                    
                    <!-- Informations de l'enfant -->
                    <div class="col-md-7 col-9">
                        <h5 class="fw-bold mb-1" style="color:#1e293b;">${child.first_name} ${child.last_name}</h5>
                        <div class="d-flex flex-wrap gap-2 mb-1">
                            <span class="badge badge-custom bg-info-light"><i class="bi bi-mortarboard"></i> ${child.class}</span>
                            <span class="badge badge-custom bg-primary-light"><i class="bi bi-building"></i> ${child.school}</span>
                            <span class="badge badge-custom ${child.status === 'Actif' ? 'bg-success-light' : 'bg-warning-light'}">
                                <i class="bi ${child.status === 'Actif' ? 'bi-check-circle' : 'bi-clock'}"></i> ${child.status}
                            </span>
                        </div>
                        <div class="text-secondary small">
                            <i class="bi bi-credit-card"></i> Total payé : <strong class="text-success">${totalPaid.toLocaleString()} FCFA</strong>
                            ${pendingPayments > 0 ? `<span class="badge badge-custom bg-warning-light ms-2"><i class="bi bi-clock"></i> ${pendingPayments} en attente</span>` : ''}
                        </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="col-md-3 col-12 mt-3 mt-md-0 text-end">
                        <button class="btn btn-outline-primary btn-sm me-1" onclick="viewChildDetails(${child.id})">
                            <i class="bi bi-eye"></i> Voir
                        </button>
                        <button class="btn btn-success btn-sm" onclick="showPaymentFormForStudent(${child.id})">
                            <i class="bi bi-credit-card"></i> Payer
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// VOIR LES DÉTAILS D'UN ENFANT (PARENT)
// ============================================================

function viewChildDetails(childId) {
    const child = DB.students.find(s => s.id === childId);
    if (!child) return;
    
    const payments = DB.payments.filter(p => p.student_id === childId);
    const totalPaid = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = payments.filter(p => p.status === 'pending');
    
    // Trouver l'enseignant de la classe
    const classInfo = DB.classes.find(c => c.name === child.class && c.school_id === child.school_id);
    const teacher = classInfo ? DB.teachers.find(t => t.id === classInfo.teacher_id) : null;

    showModal(`📘 ${child.first_name} ${child.last_name}`, `
        <div class="row g-3">
            <!-- En-tête avec photo -->
            <div class="col-md-12 text-center mb-3">
                <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--parent-color),#db2777);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:2rem;font-weight:700;box-shadow:0 4px 15px rgba(236,72,153,0.3);">
                    ${child.first_name.charAt(0)}${child.last_name.charAt(0)}
                </div>
                <h5 class="mt-2 fw-bold">${child.first_name} ${child.last_name}</h5>
                <p class="text-secondary small mb-0">${child.class} • ${child.school}</p>
            </div>

            <!-- Informations générales -->
            <div class="col-md-12">
                <div class="p-3 bg-light rounded-3">
                    <h6 class="fw-bold"><i class="bi bi-info-circle" style="color:var(--info);"></i> Informations générales</h6>
                    <div class="row mt-2">
                        <div class="col-md-4"><strong>Matricule :</strong> ${child.matricule}</div>
                        <div class="col-md-4"><strong>Classe :</strong> ${child.class}</div>
                        <div class="col-md-4"><strong>Statut :</strong> <span class="badge ${child.status === 'Actif' ? 'bg-success' : 'bg-warning'}">${child.status}</span></div>
                        <div class="col-md-6 mt-2"><strong>École :</strong> ${child.school}</div>
                        <div class="col-md-6 mt-2"><strong>Enseignant :</strong> ${teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Non assigné'}</div>
                        <div class="col-md-6 mt-2"><strong>Total payé :</strong> <span class="text-success fw-bold">${totalPaid.toLocaleString()} FCFA</span></div>
                        <div class="col-md-6 mt-2"><strong>Paiements en attente :</strong> <span class="text-warning fw-bold">${pendingPayments.length}</span></div>
                    </div>
                </div>
            </div>

            <!-- Historique des paiements -->
            <div class="col-md-12">
                <h6><i class="bi bi-credit-card" style="color:var(--success);"></i> Historique des paiements</h6>
                ${payments.length === 0 ? 
                    '<p class="text-secondary small">Aucun paiement enregistré</p>' :
                    `<div class="table-responsive">
                        <table class="table table-sm table-edugest">
                            <thead>
                                <tr>
                                    <th>Facture</th>
                                    <th>Type</th>
                                    <th>Montant</th>
                                    <th>Méthode</th>
                                    <th>Statut</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${payments.sort((a,b) => new Date(b.date) - new Date(a.date)).map(p => `
                                    <tr>
                                        <td><small>${p.invoice}</small></td>
                                        <td><small>${p.type}</small></td>
                                        <td><strong>${p.amount.toLocaleString()} FCFA</strong></td>
                                        <td><small>${p.method}</small></td>
                                        <td>
                                            <span class="badge badge-custom ${p.status === 'completed' ? 'bg-success-light' : 'bg-warning-light'}">
                                                ${p.status === 'completed' ? 'Payé' : 'En attente'}
                                            </span>
                                        </td>
                                        <td><small>${p.date}</small></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr class="fw-bold">
                                    <td colspan="2">Total</td>
                                    <td>${totalPaid.toLocaleString()} FCFA</td>
                                    <td colspan="3"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>`
                }
            </div>

            <!-- Actions -->
            <div class="col-md-12">
                <div class="d-flex gap-2 flex-wrap justify-content-center">
                    <button class="btn btn-success" onclick="closeModal();showPaymentFormForStudent(${child.id});">
                        <i class="bi bi-credit-card"></i> Effectuer un paiement
                    </button>
                    <button class="btn btn-outline-primary" onclick="showToast('Contacter l\'enseignant','info')">
                        <i class="bi bi-envelope"></i> Contacter l'enseignant
                    </button>
                    <button class="btn btn-outline-secondary" onclick="showToast('Télécharger le relevé','info')">
                        <i class="bi bi-download"></i> Télécharger le relevé
                    </button>
                </div>
            </div>
        </div>
    `, null);
}

// ============================================================
// FORMULAIRE DE PAIEMENT POUR UN ENFANT (PARENT)
// ============================================================

function showPaymentFormForStudent(studentId) {
    const student = DB.students.find(s => s.id === studentId);
    if (!student) return;
    
    showModal('💰 Effectuer un paiement', `
        <div class="text-center mb-3">
            <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--parent-color),#db2777);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:1.5rem;font-weight:700;">
                ${student.first_name.charAt(0)}${student.last_name.charAt(0)}
            </div>
            <h6 class="mt-2">${student.first_name} ${student.last_name}</h6>
            <p class="text-secondary small">${student.class} • ${student.school}</p>
        </div>
        <form id="paymentForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Montant (FCFA)</label>
                    <input type="number" class="form-control" id="paymentAmount" placeholder="Ex: 50000" required min="100">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Type de paiement</label>
                    <select class="form-select" id="paymentType">
                        <option value="Scolarite">Scolarite</option>
                        <option value="Inscription">Inscription</option>
                        <option value="Cantine">Cantine</option>
                        <option value="Transport">Transport</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Methode</label>
                    <select class="form-select" id="paymentMethod">
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Orange Money">Orange Money</option>
                        <option value="Especes">Especes</option>
                        <option value="Banque">Banque</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Date</label>
                    <input type="date" class="form-control" id="paymentDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="col-md-12">
                    <div class="alert alert-info small">
                        <i class="bi bi-info-circle"></i> Apres validation par l'ecole, vous recevrez une confirmation de paiement.
                    </div>
                </div>
            </div>
        </form>
    `, () => {
        const amount = parseFloat(document.getElementById('paymentAmount').value);
        const type = document.getElementById('paymentType').value;
        const method = document.getElementById('paymentMethod').value;
        const date = document.getElementById('paymentDate').value;
        
        if (!amount || amount <= 0) {
            showToast('Veuillez entrer un montant valide', 'error');
            return;
        }

        const newPayment = {
            id: DB.payments.length + 1,
            invoice: `INV-${String(DB.payments.length + 1).padStart(3, '0')}`,
            student: `${student.first_name} ${student.last_name}`,
            student_id: student.id,
            amount: amount,
            method: method,
            type: type,
            status: 'pending',
            date: date || new Date().toISOString().split('T')[0],
            school: student.school,
            school_id: student.school_id
        };
        
        DB.payments.push(newPayment);
        
        const parent = DB.parentAccounts.find(p => p.children_ids.includes(student.id));
        
        if (parent) {
            NotificationSystem.send(parent.id, 
                `<strong>${student.first_name} ${student.last_name}</strong> - Paiement de ${amount.toLocaleString()} FCFA en attente de validation`,
                'pink'
            );
        }
        
        NotificationSystem.send(`school_${student.school_id}`, 
            `<strong>${student.first_name} ${student.last_name}</strong> - Paiement de ${amount.toLocaleString()} FCFA en attente de validation`,
            'warning'
        );
        
        NotificationSystem.send('admin', 
            `<strong>${student.first_name} ${student.last_name}</strong> - Paiement de ${amount.toLocaleString()} FCFA en attente`,
            'info'
        );
        
        const classInfo = DB.classes.find(c => c.name === student.class && c.school_id === student.school_id);
        if (classInfo && classInfo.teacher_id) {
            NotificationSystem.send(classInfo.teacher_id, 
                `<strong>${student.first_name} ${student.last_name}</strong> a effectue un paiement de ${amount.toLocaleString()} FCFA`,
                'info'
            );
        }
        
        SyncSystem.sync();
        
        closeModal();
        showToast(`✅ Paiement de ${amount.toLocaleString()} FCFA enregistre avec succes !`, 'success');
        showToast(`📱 Un SMS de confirmation vous sera envoye apres validation par l'ecole.`, 'info');
        
        loadPageData('myChildren');
        loadPageData('payments');
        loadPageData('dashboard');
    });
}
// ============================================================
// ACCÈS RAPIDE DEPUIS LE TABLEAU DE BORD PARENT
// ============================================================

function loadParentDashboard() {
    const childIds = currentUser?.children_ids || [];
    const children = DB.students.filter(s => childIds.includes(s.id));
    
    // Mettre à jour les stats
    document.getElementById('statStudents').textContent = children.length;
    
    // Afficher un résumé rapide
    const activities = document.getElementById('recentActivities');
    if (children.length === 0) {
        activities.innerHTML = `
            <div class="text-center text-secondary py-4">
                <i class="bi bi-heart" style="font-size:2rem;display:block;margin-bottom:10px;color:var(--parent-color);"></i>
                <p>Aucun enfant associé à votre compte.</p>
                <small>Contactez l'administration de l'école.</small>
            </div>
        `;
        return;
    }
    
    // Afficher les enfants sur le tableau de bord
    activities.innerHTML = children.map(child => {
        const childPayments = DB.payments.filter(p => p.student_id === child.id);
        const totalPaid = childPayments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const pending = childPayments.filter(p => p.status === 'pending').length;
        
        return `
            <div class="d-flex align-items-center gap-3 py-3 border-bottom">
                <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--parent-color),#db2777);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.9rem;">
                    ${child.first_name.charAt(0)}${child.last_name.charAt(0)}
                </div>
                <div class="flex-grow-1">
                    <div class="fw-semibold">${child.first_name} ${child.last_name}</div>
                    <div class="small text-secondary">${child.class} • ${child.school}</div>
                </div>
                <div class="text-end">
                    <div class="small">Total payé</div>
                    <div class="fw-bold text-success">${totalPaid.toLocaleString()} FCFA</div>
                    ${pending > 0 ? `<span class="badge badge-custom bg-warning-light">${pending} en attente</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Notifications personnalisées pour le parent
    const notifList = document.getElementById('notificationsList');
    const parentNotifs = DB.notifications.filter(n => 
        n.text.includes(currentUser?.name?.split(' ')[0] || '')
    );
    
    if (parentNotifs.length === 0) {
        notifList.innerHTML = `
            <div class="text-center text-secondary py-3">
                <i class="bi bi-check-circle" style="font-size:1.5rem;display:block;margin-bottom:8px;color:var(--success);"></i>
                <small>Aucune notification</small>
            </div>
        `;
    } else {
        notifList.innerHTML = parentNotifs.slice(0, 5).map(n => `
            <div class="d-flex gap-3 py-2 border-bottom">
                <span style="width:8px;height:8px;border-radius:50%;background:${n.read ? '#cbd5e1' : 'var(--parent-color)'};margin-top:6px;flex-shrink:0;"></span>
                <div>
                    <div class="notif-text">${n.text}</div>
                    <div class="notif-time small text-secondary">${n.time}</div>
                </div>
            </div>
        `).join('');
    }
}
function showPaymentFormForStudent(studentId) {
    const student = DB.students.find(s => s.id === studentId);
    if (!student) return;
    
    showModal('💰 Paiement', `
        <form id="paymentForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Étudiant</label>
                    <input type="text" class="form-control" value="${student.first_name} ${student.last_name}" disabled>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Montant (FCFA)</label>
                    <input type="number" class="form-control" id="paymentAmount" placeholder="Ex: 50000" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Type</label>
                    <select class="form-select" id="paymentType">
                        <option value="Scolarité">Scolarité</option>
                        <option value="Inscription">Inscription</option>
                        <option value="Cantine">Cantine</option>
                        <option value="Transport">Transport</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Méthode</label>
                    <select class="form-select" id="paymentMethod">
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Orange Money">Orange Money</option>
                        <option value="Espèces">Espèces</option>
                        <option value="Banque">Banque</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Date</label>
                    <input type="date" class="form-control" id="paymentDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
        </form>
    `, () => {
        const amount = parseFloat(document.getElementById('paymentAmount').value);
        const type = document.getElementById('paymentType').value;
        const method = document.getElementById('paymentMethod').value;
        const date = document.getElementById('paymentDate').value;
        
        if (!amount || amount <= 0) {
            showToast('Veuillez entrer un montant valide', 'error');
            return;
        }

        const newPayment = {
            id: DB.payments.length + 1,
            invoice: `INV-${String(DB.payments.length + 1).padStart(3, '0')}`,
            student: `${student.first_name} ${student.last_name}`,
            student_id: student.id,
            amount: amount,
            method: method,
            type: type,
            status: 'pending',
            date: date || new Date().toISOString().split('T')[0],
            school: student.school,
            school_id: student.school_id
        };
        
        DB.payments.push(newPayment);
        
        // Ajouter une notification
        DB.notifications.push({
            id: DB.notifications.length + 1,
            text: `<strong>${student.first_name} ${student.last_name}</strong> - Paiement de ${amount.toLocaleString()} FCFA en attente`,
            time: 'À l\'instant',
            read: false
        });
        
        closeModal();
        showToast(`Paiement de ${amount.toLocaleString()} FCFA enregistré avec succès !`, 'success');
        loadPageData('dashboard');
        loadPageData('payments');
        if (userRole === 'parent') loadMyChildren();
    });
}

// ============================================================
// 9. PAIEMENTS
// ============================================================

function loadPayments(filterFn) {
    const payments = filterFn ? filterFn(DB.payments, 'student_id') : DB.payments;
    const tbody = document.getElementById('paymentsList');
    
    if (payments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-secondary py-4">Aucun paiement</td></tr>`;
        return;
    }
    
    tbody.innerHTML = payments.map(p => {
        const statusClass = p.status === 'completed' ? 'bg-success-light' : 'bg-warning-light';
        return `
            <tr>
                <td><strong>${p.invoice}</strong></td>
                <td>${p.student}</td>
                <td><strong>${p.amount.toLocaleString()} FCFA</strong></td>
                <td>${p.method}</td>
                <td>${p.type}</td>
                <td><span class="badge badge-custom ${statusClass}">${p.status === 'completed' ? 'Payé' : 'En attente'}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewPayment(${p.id})"><i class="bi bi-eye"></i></button>
                    ${p.status === 'pending' ? 
                        `<button class="btn btn-sm btn-success" onclick="validatePayment(${p.id})"><i class="bi bi-check-lg"></i></button>` : ''}
                    <button class="btn btn-sm btn-outline-danger" onclick="deletePayment(${p.id})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function showPaymentForm() {
    const students = userRole === 'admin' ? DB.students : 
                     userRole === 'school' ? DB.students.filter(s => s.school_id === userSchoolId) :
                     DB.students.filter(s => (currentUser?.children_ids || []).includes(s.id));
    
    showModal('💰 Nouveau paiement', `
        <form id="paymentForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Étudiant</label>
                    <select class="form-select" id="paymentStudent" required>
                        <option value="">Sélectionner un étudiant</option>
                        ${students.map(s => `<option value="${s.id}">${s.first_name} ${s.last_name} - ${s.class}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Montant (FCFA)</label>
                    <input type="number" class="form-control" id="paymentAmount" placeholder="Ex: 50000" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Type</label>
                    <select class="form-select" id="paymentType">
                        <option value="Scolarité">Scolarité</option>
                        <option value="Inscription">Inscription</option>
                        <option value="Cantine">Cantine</option>
                        <option value="Transport">Transport</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Méthode</label>
                    <select class="form-select" id="paymentMethod">
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Orange Money">Orange Money</option>
                        <option value="Espèces">Espèces</option>
                        <option value="Banque">Banque</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Date</label>
                    <input type="date" class="form-control" id="paymentDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="paymentStatus">
                        <option value="pending">En attente</option>
                        <option value="completed">Payé</option>
                    </select>
                </div>
            </div>
        </form>
    `, () => {
        const studentId = parseInt(document.getElementById('paymentStudent').value);
        const amount = parseFloat(document.getElementById('paymentAmount').value);
        const type = document.getElementById('paymentType').value;
        const method = document.getElementById('paymentMethod').value;
        const date = document.getElementById('paymentDate').value;
        const status = document.getElementById('paymentStatus').value;
        
        if (!studentId || !amount || amount <= 0) {
            showToast('Veuillez sélectionner un étudiant et entrer un montant valide', 'error');
            return;
        }

        const student = DB.students.find(s => s.id === studentId);
        if (!student) return;

        const newPayment = {
            id: DB.payments.length + 1,
            invoice: `INV-${String(DB.payments.length + 1).padStart(3, '0')}`,
            student: `${student.first_name} ${student.last_name}`,
            student_id: student.id,
            amount: amount,
            method: method,
            type: type,
            status: status,
            date: date || new Date().toISOString().split('T')[0],
            school: student.school,
            school_id: student.school_id
        };
        
        DB.payments.push(newPayment);
        
        // Ajouter une notification
        DB.notifications.push({
            id: DB.notifications.length + 1,
            text: `<strong>${student.first_name} ${student.last_name}</strong> - Paiement de ${amount.toLocaleString()} FCFA ${status === 'completed' ? 'effectué' : 'en attente'}`,
            time: 'À l\'instant',
            read: false
        });
        
        closeModal();
        showToast(`Paiement de ${amount.toLocaleString()} FCFA enregistré avec succès !`, 'success');
        loadPageData('payments');
        loadPageData('dashboard');
    });
}

function viewPayment(id) {
    const payment = DB.payments.find(p => p.id === id);
    if (!payment) return;
    
    showModal(`🧾 ${payment.invoice}`, `
        <div class="row g-3">
            <div class="col-md-6"><strong>Étudiant :</strong> ${payment.student}</div>
            <div class="col-md-6"><strong>Montant :</strong> ${payment.amount.toLocaleString()} FCFA</div>
            <div class="col-md-6"><strong>Type :</strong> ${payment.type}</div>
            <div class="col-md-6"><strong>Méthode :</strong> ${payment.method}</div>
            <div class="col-md-6"><strong>Date :</strong> ${payment.date}</div>
            <div class="col-md-6"><strong>Statut :</strong> <span class="badge badge-custom ${payment.status === 'completed' ? 'bg-success-light' : 'bg-warning-light'}">${payment.status === 'completed' ? 'Payé' : 'En attente'}</span></div>
            <div class="col-md-12"><strong>École :</strong> ${payment.school}</div>
        </div>
    `, null);
}

function validatePayment(id) {
    if (!confirm('Confirmer la validation de ce paiement ?')) return;
    const payment = DB.payments.find(p => p.id === id);
    if (!payment) return;
    
    payment.status = 'completed';
    
    const student = DB.students.find(s => s.id === payment.student_id);
    const parent = student ? DB.parentAccounts.find(p => p.children_ids.includes(student.id)) : null;
    
    if (parent) {
        NotificationSystem.send(parent.id, 
            `<strong>${payment.student}</strong> - Paiement de ${payment.amount.toLocaleString()} FCFA valide avec succès !`,
            'success'
        );
    }
    
    NotificationSystem.send(`school_${payment.school_id}`, 
        `<strong>${payment.student}</strong> - Paiement de ${payment.amount.toLocaleString()} FCFA valide`,
        'success'
    );
    
    NotificationSystem.send('admin', 
        `<strong>${payment.student}</strong> - Paiement de ${payment.amount.toLocaleString()} FCFA valide par l'ecole`,
        'success'
    );
    
    SyncSystem.sync();
    
    showToast('Paiement valide avec succès !', 'success');
    loadPageData('payments');
    loadPageData('dashboard');
    if (userRole === 'parent') loadPageData('myChildren');
}

function deletePayment(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce paiement ?')) return;
    DB.payments = DB.payments.filter(p => p.id !== id);
    showToast('Paiement supprimé', 'info');
    loadPageData('payments');
    loadPageData('dashboard');
}

// ============================================================
// 9.5 GÉNÉRATION DE REÇUS POUR PAIEMENTS
// ============================================================

// ===== GÉNÉRER UN REÇU POUR UN PAIEMENT =====
function generateReceipt(paymentId) {
    const payment = DB.payments.find(p => p.id === paymentId);
    if (!payment) {
        showToast('Paiement non trouvé', 'error');
        return;
    }
    
    // Vérifier que le paiement est validé
    if (payment.status !== 'completed') {
        showToast('Ce paiement est encore en attente. Veuillez le valider d\'abord.', 'warning');
        return;
    }
    
    const student = DB.students.find(s => s.id === payment.student_id);
    const school = DB.schools.find(s => s.id === payment.school_id);
    const parent = student ? DB.parentAccounts.find(p => p.children_ids.includes(student.id)) : null;
    
    // Créer la fenêtre d'impression
    const receiptWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reçu de paiement - ${payment.invoice}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Times New Roman', serif;
                background: #f0f0f0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            
            .receipt-container {
                background: white;
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                position: relative;
            }
            
            /* ===== EN-TÊTE ===== */
            .header {
                text-align: center;
                border-bottom: 3px double #1a1a2e;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            
            .header .country {
                font-size: 11px;
                letter-spacing: 3px;
                color: #666;
                text-transform: uppercase;
                font-weight: bold;
            }
            
            .header .school-name {
                font-size: 22px;
                font-weight: bold;
                color: #1a1a2e;
                margin: 5px 0;
                text-transform: uppercase;
            }
            
            .header .school-info {
                font-size: 11px;
                color: #555;
                line-height: 1.6;
            }
            
            .header .receipt-title {
                font-size: 18px;
                font-weight: bold;
                color: #1a1a2e;
                margin-top: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                border: 2px solid #1a1a2e;
                display: inline-block;
                padding: 5px 30px;
                border-radius: 4px;
            }
            
            /* ===== NUMÉRO DE REÇU ===== */
            .receipt-number {
                text-align: right;
                font-size: 12px;
                color: #666;
                margin-bottom: 15px;
            }
            
            .receipt-number strong {
                color: #1a1a2e;
            }
            
            /* ===== INFORMATIONS ===== */
            .info-section {
                margin: 15px 0;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 4px;
                border-left: 4px solid #4F46E5;
            }
            
            .info-section .info-row {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
                font-size: 13px;
                border-bottom: 1px dotted #e9ecef;
            }
            
            .info-section .info-row:last-child {
                border-bottom: none;
            }
            
            .info-section .label {
                font-weight: 600;
                color: #495057;
            }
            
            .info-section .value {
                color: #212529;
            }
            
            /* ===== TABLEAU DES PAIEMENTS ===== */
            .payment-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 13px;
            }
            
            .payment-table thead th {
                background: #1a1a2e;
                color: white;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #1a1a2e;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .payment-table tbody td {
                padding: 10px 8px;
                border: 1px solid #dee2e6;
            }
            
            .payment-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .payment-table .text-right {
                text-align: right;
            }
            
            .payment-table .text-center {
                text-align: center;
            }
            
            .payment-table .total-row {
                background: #1a1a2e !important;
                color: white;
                font-weight: bold;
            }
            
            .payment-table .total-row td {
                border-color: #1a1a2e;
            }
            
            /* ===== RÉSUMÉ FINANCIER ===== */
            .summary {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 4px;
                border: 2px solid #dee2e6;
            }
            
            .summary .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                font-size: 14px;
            }
            
            .summary .summary-row.total {
                font-size: 16px;
                font-weight: bold;
                border-top: 2px solid #1a1a2e;
                padding-top: 10px;
                margin-top: 5px;
                color: #1a1a2e;
            }
            
            /* ===== MENTIONS LÉGALES ===== */
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 2px solid #dee2e6;
                text-align: center;
                font-size: 10px;
                color: #888;
                line-height: 1.8;
            }
            
            .footer .signature {
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
                font-size: 12px;
                color: #555;
            }
            
            .footer .signature .line {
                width: 150px;
                border-top: 1px solid #333;
                margin-top: 30px;
                padding-top: 5px;
            }
            
            /* ===== BOUTON IMPRIMER ===== */
            .print-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #4F46E5;
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(79,70,229,0.4);
                transition: all 0.3s;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .print-btn:hover {
                background: #4338CA;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(79,70,229,0.5);
            }
            
            .print-btn i {
                font-size: 20px;
            }
            
            @media print {
                body {
                    background: white;
                    padding: 0;
                }
                .receipt-container {
                    box-shadow: none;
                    padding: 15mm;
                    width: 100%;
                    min-height: auto;
                }
                .print-btn {
                    display: none !important;
                }
                .no-print {
                    display: none !important;
                }
            }
            
            /* ===== BANDE COLORÉE ===== */
            .color-bar {
                height: 6px;
                background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899, #10B981);
                margin: -20mm -20mm 20px -20mm;
                border-radius: 4px 4px 0 0;
            }
            
            /* ===== VERSION MOBILE ===== */
            @media (max-width: 600px) {
                .receipt-container {
                    padding: 10mm;
                    width: 100%;
                }
                .color-bar {
                    margin: -10mm -10mm 15px -10mm;
                }
                .header .school-name {
                    font-size: 18px;
                }
                .payment-table {
                    font-size: 11px;
                }
                .payment-table thead th,
                .payment-table tbody td {
                    padding: 6px 4px;
                }
                .info-section .info-row {
                    font-size: 12px;
                    flex-direction: column;
                    gap: 2px;
                }
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <!-- Bande colorée -->
            <div class="color-bar"></div>
            
            <!-- EN-TÊTE -->
            <div class="header">
                <div class="country">RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</div>
                <div class="school-name">${school ? school.name : 'École'}</div>
                <div class="school-info">
                    ${school ? school.address || '' : ''} 
                    ${school ? '• Tél: ' + school.phone || '' : ''}
                    ${school ? '• Email: ' + school.email || '' : ''}
                </div>
                <div class="school-info" style="margin-top:2px;font-weight:bold;color:#4F46E5;">
                    Système EduGest - Gestion Scolaire
                </div>
                <div class="receipt-title">Reçu de paiement</div>
            </div>
            
            <!-- NUMÉRO DE REÇU -->
            <div class="receipt-number">
                <strong>N° Facture:</strong> ${payment.invoice} &nbsp;|&nbsp;
                <strong>Date:</strong> ${payment.date || new Date().toLocaleDateString('fr-FR')}
            </div>
            
            <!-- INFORMATIONS -->
            <div class="info-section">
                <div class="info-row">
                    <span class="label">Étudiant:</span>
                    <span class="value">${student ? `${student.first_name} ${student.last_name}` : payment.student}</span>
                </div>
                <div class="info-row">
                    <span class="label">Classe:</span>
                    <span class="value">${student ? student.class : 'N/A'}</span>
                </div>
                ${parent ? `
                <div class="info-row">
                    <span class="label">Parent / Tuteur:</span>
                    <span class="value">${parent.name}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="label">Type de paiement:</span>
                    <span class="value">${payment.type}</span>
                </div>
                <div class="info-row">
                    <span class="label">Méthode:</span>
                    <span class="value">${payment.method}</span>
                </div>
                <div class="info-row">
                    <span class="label">Statut:</span>
                    <span class="value" style="color:#10B981;font-weight:bold;">✓ Payé</span>
                </div>
            </div>
            
            <!-- TABLEAU -->
            <table class="payment-table">
                <thead>
                    <tr>
                        <th style="width:50%;">Désignation</th>
                        <th style="width:25%;" class="text-center">Montant</th>
                        <th style="width:25%;" class="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${payment.type} - ${payment.month || payment.date || 'Paiement'}</td>
                        <td class="text-right">${payment.amount.toLocaleString()} FCFA</td>
                        <td class="text-right">${payment.amount.toLocaleString()} FCFA</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2" class="text-right"><strong>TOTAL</strong></td>
                        <td class="text-right"><strong>${payment.amount.toLocaleString()} FCFA</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <!-- RÉSUMÉ -->
            <div class="summary">
                <div class="summary-row">
                    <span>Montant payé:</span>
                    <span>${payment.amount.toLocaleString()} FCFA</span>
                </div>
                <div class="summary-row">
                    <span>Méthode de paiement:</span>
                    <span>${payment.method}</span>
                </div>
                <div class="summary-row total">
                    <span>Total réglé:</span>
                    <span>${payment.amount.toLocaleString()} FCFA</span>
                </div>
            </div>
            
            <!-- MENTIONS LÉGALES -->
            <div class="footer">
                <div style="font-size:11px;font-weight:bold;color:#1a1a2e;">
                    Reçu valable comme justificatif de paiement
                </div>
                <div>
                    ${school ? school.name : 'École'} - EduGest ${new Date().getFullYear()}
                </div>
                <div style="font-size:9px;color:#aaa;">
                    Document généré automatiquement par le système EduGest le ${new Date().toLocaleString('fr-FR')}
                </div>
                
                <div class="signature">
                    <div>
                        <div class="line">Signature du parent</div>
                    </div>
                    <div>
                        <div class="line">Signature de l'école</div>
                    </div>
                    <div>
                        <div class="line">Cachet de l'école</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- BOUTON IMPRIMER -->
        <button class="print-btn" onclick="window.print()">
            <i class="bi bi-printer"></i> Imprimer le reçu
        </button>
        
        <script>
            // Auto-impression après chargement
            // Décommentez la ligne ci-dessous pour imprimer automatiquement
            // window.onload = function() { setTimeout(window.print, 1000); }
        </script>
    </body>
    </html>
    `;
    
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    showToast('📄 Reçu généré avec succès !', 'success');
}

// ===== GÉNÉRER UN REÇU POUR UN ÉTUDIANT =====
function generateStudentReceipt(studentId) {
    const student = DB.students.find(s => s.id === studentId);
    if (!student) {
        showToast('Étudiant non trouvé', 'error');
        return;
    }
    
    // Récupérer tous les paiements validés de l'étudiant
    const payments = DB.payments.filter(p => 
        p.student_id === studentId && 
        p.status === 'completed'
    );
    
    if (payments.length === 0) {
        showToast('Aucun paiement validé pour cet étudiant', 'warning');
        return;
    }
    
    const school = DB.schools.find(s => s.id === student.school_id);
    const parent = DB.parentAccounts.find(p => p.children_ids.includes(student.id));
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    
    // Créer la fenêtre d'impression
    const receiptWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reçu global - ${student.first_name} ${student.last_name}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Times New Roman', serif;
                background: #f0f0f0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            
            .receipt-container {
                background: white;
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                position: relative;
            }
            
            .header {
                text-align: center;
                border-bottom: 3px double #1a1a2e;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            
            .header .country {
                font-size: 11px;
                letter-spacing: 3px;
                color: #666;
                text-transform: uppercase;
                font-weight: bold;
            }
            
            .header .school-name {
                font-size: 22px;
                font-weight: bold;
                color: #1a1a2e;
                margin: 5px 0;
                text-transform: uppercase;
            }
            
            .header .school-info {
                font-size: 11px;
                color: #555;
                line-height: 1.6;
            }
            
            .header .receipt-title {
                font-size: 18px;
                font-weight: bold;
                color: #1a1a2e;
                margin-top: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                border: 2px solid #1a1a2e;
                display: inline-block;
                padding: 5px 30px;
                border-radius: 4px;
            }
            
            .info-section {
                margin: 15px 0;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 4px;
                border-left: 4px solid #4F46E5;
            }
            
            .info-section .info-row {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
                font-size: 13px;
                border-bottom: 1px dotted #e9ecef;
            }
            
            .info-section .info-row:last-child {
                border-bottom: none;
            }
            
            .info-section .label {
                font-weight: 600;
                color: #495057;
            }
            
            .info-section .value {
                color: #212529;
            }
            
            .payment-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 12px;
            }
            
            .payment-table thead th {
                background: #1a1a2e;
                color: white;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #1a1a2e;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .payment-table tbody td {
                padding: 8px 8px;
                border: 1px solid #dee2e6;
            }
            
            .payment-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .payment-table .text-right {
                text-align: right;
            }
            
            .payment-table .text-center {
                text-align: center;
            }
            
            .payment-table .total-row {
                background: #1a1a2e !important;
                color: white;
                font-weight: bold;
            }
            
            .payment-table .total-row td {
                border-color: #1a1a2e;
            }
            
            .summary {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 4px;
                border: 2px solid #dee2e6;
            }
            
            .summary .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                font-size: 14px;
            }
            
            .summary .summary-row.total {
                font-size: 16px;
                font-weight: bold;
                border-top: 2px solid #1a1a2e;
                padding-top: 10px;
                margin-top: 5px;
                color: #1a1a2e;
            }
            
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 2px solid #dee2e6;
                text-align: center;
                font-size: 10px;
                color: #888;
                line-height: 1.8;
            }
            
            .footer .signature {
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
                font-size: 12px;
                color: #555;
            }
            
            .footer .signature .line {
                width: 150px;
                border-top: 1px solid #333;
                margin-top: 30px;
                padding-top: 5px;
            }
            
            .print-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #4F46E5;
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(79,70,229,0.4);
                transition: all 0.3s;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .print-btn:hover {
                background: #4338CA;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(79,70,229,0.5);
            }
            
            .print-btn i {
                font-size: 20px;
            }
            
            @media print {
                body {
                    background: white;
                    padding: 0;
                }
                .receipt-container {
                    box-shadow: none;
                    padding: 15mm;
                    width: 100%;
                    min-height: auto;
                }
                .print-btn {
                    display: none !important;
                }
                .no-print {
                    display: none !important;
                }
            }
            
            .color-bar {
                height: 6px;
                background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899, #10B981);
                margin: -20mm -20mm 20px -20mm;
                border-radius: 4px 4px 0 0;
            }
            
            @media (max-width: 600px) {
                .receipt-container {
                    padding: 10mm;
                    width: 100%;
                }
                .color-bar {
                    margin: -10mm -10mm 15px -10mm;
                }
                .header .school-name {
                    font-size: 18px;
                }
                .payment-table {
                    font-size: 10px;
                }
                .payment-table thead th,
                .payment-table tbody td {
                    padding: 4px 3px;
                }
                .info-section .info-row {
                    font-size: 11px;
                    flex-direction: column;
                    gap: 2px;
                }
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="color-bar"></div>
            
            <div class="header">
                <div class="country">RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</div>
                <div class="school-name">${school ? school.name : 'École'}</div>
                <div class="school-info">
                    ${school ? school.address || '' : ''} 
                    ${school ? '• Tél: ' + school.phone || '' : ''}
                    ${school ? '• Email: ' + school.email || '' : ''}
                </div>
                <div class="school-info" style="margin-top:2px;font-weight:bold;color:#4F46E5;">
                    Système EduGest - Gestion Scolaire
                </div>
                <div class="receipt-title">Reçu global de paiement</div>
            </div>
            
            <div class="receipt-number">
                <strong>Étudiant:</strong> ${student.first_name} ${student.last_name} &nbsp;|&nbsp;
                <strong>Classe:</strong> ${student.class} &nbsp;|&nbsp;
                <strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}
            </div>
            
            <div class="info-section">
                <div class="info-row">
                    <span class="label">Étudiant:</span>
                    <span class="value">${student.first_name} ${student.last_name}</span>
                </div>
                <div class="info-row">
                    <span class="label">Classe:</span>
                    <span class="value">${student.class}</span>
                </div>
                <div class="info-row">
                    <span class="label">Matricule:</span>
                    <span class="value">${student.matricule}</span>
                </div>
                ${parent ? `
                <div class="info-row">
                    <span class="label">Parent / Tuteur:</span>
                    <span class="value">${parent.name}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="label">École:</span>
                    <span class="value">${student.school}</span>
                </div>
            </div>
            
            <table class="payment-table">
                <thead>
                    <tr>
                        <th style="width:20%;">Facture</th>
                        <th style="width:25%;">Type</th>
                        <th style="width:20%;" class="text-center">Méthode</th>
                        <th style="width:20%;" class="text-right">Montant</th>
                        <th style="width:15%;" class="text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(p => `
                        <tr>
                            <td>${p.invoice}</td>
                            <td>${p.type}</td>
                            <td class="text-center">${p.method}</td>
                            <td class="text-right">${p.amount.toLocaleString()} FCFA</td>
                            <td class="text-center">${p.date || 'N/A'}</td>
                        </tr>
                    `).join('')}
                    <tr class="total-row">
                        <td colspan="3" class="text-right"><strong>TOTAL</strong></td>
                        <td class="text-right"><strong>${totalAmount.toLocaleString()} FCFA</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="summary">
                <div class="summary-row">
                    <span>Nombre de paiements:</span>
                    <span>${payments.length}</span>
                </div>
                <div class="summary-row">
                    <span>Montant total payé:</span>
                    <span>${totalAmount.toLocaleString()} FCFA</span>
                </div>
                <div class="summary-row total">
                    <span>Total général:</span>
                    <span>${totalAmount.toLocaleString()} FCFA</span>
                </div>
            </div>
            
            <div class="footer">
                <div style="font-size:11px;font-weight:bold;color:#1a1a2e;">
                    Reçu valable comme justificatif de paiement
                </div>
                <div>
                    ${school ? school.name : 'École'} - EduGest ${new Date().getFullYear()}
                </div>
                <div style="font-size:9px;color:#aaa;">
                    Document généré automatiquement par le système EduGest le ${new Date().toLocaleString('fr-FR')}
                </div>
                
                <div class="signature">
                    <div>
                        <div class="line">Signature du parent</div>
                    </div>
                    <div>
                        <div class="line">Signature de l'école</div>
                    </div>
                    <div>
                        <div class="line">Cachet de l'école</div>
                    </div>
                </div>
            </div>
        </div>
        
        <button class="print-btn" onclick="window.print()">
            <i class="bi bi-printer"></i> Imprimer le reçu
        </button>
    </body>
    </html>
    `;
    
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    showToast('📄 Reçu global généré avec succès !', 'success');
}

// ===== AJOUTER DES BOUTONS DANS LA LISTE DES PAIEMENTS =====
// Modifier la fonction loadPayments pour ajouter le bouton "Reçu"

function loadPayments(filterFn) {
    const payments = filterFn ? filterFn(DB.payments, 'student_id') : DB.payments;
    const tbody = document.getElementById('paymentsList');
    
    if (payments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center text-secondary py-4">Aucun paiement</td></tr>`;
        return;
    }
    
    tbody.innerHTML = payments.map(p => {
        const statusClass = p.status === 'completed' ? 'bg-success-light' : 'bg-warning-light';
        return `
            <tr>
                <td><strong>${p.invoice}</strong></td>
                <td>${p.student}</td>
                <td><strong>${p.amount.toLocaleString()} FCFA</strong></td>
                <td>${p.method}</td>
                <td>${p.type}</td>
                <td><span class="badge badge-custom ${statusClass}">${p.status === 'completed' ? 'Payé' : 'En attente'}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewPayment(${p.id})"><i class="bi bi-eye"></i></button>
                    ${p.status === 'pending' ? 
                        `<button class="btn btn-sm btn-success" onclick="validatePayment(${p.id})"><i class="bi bi-check-lg"></i></button>` : 
                        `<button class="btn btn-sm btn-success" onclick="generateReceipt(${p.id})"><i class="bi bi-receipt"></i></button>`
                    }
                    <button class="btn btn-sm btn-outline-danger" onclick="deletePayment(${p.id})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}
// ============================================================
// 10. MESSAGES
// ============================================================

function loadMessages() {
    const container = document.getElementById('messagesList');
    const messages = DB.messages;
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="text-center text-secondary py-4">Aucun message</div>';
        return;
    }
    
    container.innerHTML = messages.map(m => `
        <div class="d-flex justify-content-between align-items-center py-3 border-bottom ${m.read ? '' : 'bg-light'}">
            <div class="flex-grow-1">
                <div class="fw-semibold">${m.sender} → ${m.receiver}</div>
                <div class="small fw-medium">${m.subject}</div>
                <div class="text-secondary small">${m.content}</div>
            </div>
            <div class="text-end ms-3" style="min-width:80px;">
                <div class="small text-secondary">${m.date}</div>
                ${!m.read ? '<span class="badge bg-primary">Nouveau</span>' : ''}
                <button class="btn btn-sm btn-outline-primary d-block mt-1" onclick="markMessageRead(${m.id})"><i class="bi bi-check"></i></button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('messageCount').textContent = messages.filter(m => !m.read).length;
}

function showMessageForm() {
    showModal('✉️ Nouveau message', `
        <form id="messageForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Destinataire</label>
                    <select class="form-select" id="messageReceiver">
                        <option value="Tous">Tous</option>
                        ${DB.parentAccounts.map(p => `<option value="Parent">Parent - ${p.name}</option>`).join('')}
                        ${DB.teachers.map(t => `<option value="Enseignant">Enseignant - ${t.first_name} ${t.last_name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Sujet</label>
                    <input type="text" class="form-control" id="messageSubject" placeholder="Sujet du message" required>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Contenu</label>
                    <textarea class="form-control" id="messageContent" rows="4" placeholder="Écrivez votre message..." required></textarea>
                </div>
            </div>
        </form>
    `, () => {
        const receiver = document.getElementById('messageReceiver').value;
        const subject = document.getElementById('messageSubject').value;
        const content = document.getElementById('messageContent').value;
        
        if (!subject || !content) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        DB.messages.push({
            id: DB.messages.length + 1,
            sender: userRole === 'admin' ? 'Administration' : userRole === 'parent' ? 'Parent' : 'Enseignant',
            sender_id: currentUser?.id || 0,
            receiver: receiver,
            receiver_id: 0,
            subject: subject,
            content: content,
            date: new Date().toISOString().split('T')[0],
            read: false
        });
        
        closeModal();
        showToast('Message envoyé avec succès !', 'success');
        loadPageData('messages');
    });
}

function markMessageRead(id) {
    const message = DB.messages.find(m => m.id === id);
    if (message) {
        message.read = true;
        loadPageData('messages');
    }
}
// ============================================================
// 10. MESSAGES
// ============================================================

function loadMessages() {
    const container = document.getElementById('messagesList');
    const messages = DB.messages;
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="text-center text-secondary py-4">Aucun message</div>';
        return;
    }
    
    container.innerHTML = messages.map(m => `
        <div class="d-flex justify-content-between align-items-center py-3 border-bottom ${m.read ? '' : 'bg-light'}">
            <div class="flex-grow-1">
                <div class="fw-semibold">${m.sender} → ${m.receiver}</div>
                <div class="small fw-medium">${m.subject}</div>
                <div class="text-secondary small">${m.content}</div>
            </div>
            <div class="text-end ms-3" style="min-width:80px;">
                <div class="small text-secondary">${m.date}</div>
                ${!m.read ? '<span class="badge bg-primary">Nouveau</span>' : ''}
                <button class="btn btn-sm btn-outline-primary d-block mt-1" onclick="markMessageRead(${m.id})"><i class="bi bi-check"></i></button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('messageCount').textContent = messages.filter(m => !m.read).length;
}

function showMessageForm() {
    showModal('✉️ Nouveau message', `
        <form id="messageForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Destinataire</label>
                    <select class="form-select" id="messageReceiver">
                        <option value="Tous">Tous</option>
                        ${DB.parentAccounts.map(p => `<option value="Parent">Parent - ${p.name}</option>`).join('')}
                        ${DB.teachers.map(t => `<option value="Enseignant">Enseignant - ${t.first_name} ${t.last_name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Sujet</label>
                    <input type="text" class="form-control" id="messageSubject" placeholder="Sujet du message" required>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Contenu</label>
                    <textarea class="form-control" id="messageContent" rows="4" placeholder="Écrivez votre message..." required></textarea>
                </div>
            </div>
        </form>
    `, () => {
        const receiver = document.getElementById('messageReceiver').value;
        const subject = document.getElementById('messageSubject').value;
        const content = document.getElementById('messageContent').value;
        
        if (!subject || !content) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        DB.messages.push({
            id: DB.messages.length + 1,
            sender: userRole === 'admin' ? 'Administration' : userRole === 'parent' ? 'Parent' : 'Enseignant',
            sender_id: currentUser?.id || 0,
            receiver: receiver,
            receiver_id: 0,
            subject: subject,
            content: content,
            date: new Date().toISOString().split('T')[0],
            read: false
        });
        
        closeModal();
        showToast('Message envoyé avec succès !', 'success');
        loadPageData('messages');
    });
}

function markMessageRead(id) {
    const message = DB.messages.find(m => m.id === id);
    if (message) {
        message.read = true;
        loadPageData('messages');
    }
}

// ============================================================
// 11. ÉCOLES
// ============================================================

function loadSchools() {
    const container = document.getElementById('schoolsList');
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    container.innerHTML = schools.map(s => {
        const account = DB.schoolAccounts.find(a => a.school_id === s.id);
        const studentsCount = DB.students.filter(st => st.school_id === s.id).length;
        const paymentsCount = DB.payments.filter(p => p.school_id === s.id).length;
        const totalRevenue = DB.payments
            .filter(p => p.school_id === s.id && p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
            
        return `
            <div class="col-md-6">
                <div class="p-3 border rounded-3 mb-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><strong class="fs-5">${s.name}</strong><div class="text-secondary small">${s.code}</div></div>
                        <span class="badge badge-custom ${s.status === 'Actif' ? 'bg-success-light' : 'bg-warning-light'}">${s.status}</span>
                    </div>
                    <div class="mt-2 text-secondary small">
                        <div><i class="bi bi-telephone me-2"></i> ${s.phone}</div>
                        <div><i class="bi bi-envelope me-2"></i> ${s.email}</div>
                        <div><i class="bi bi-people me-2"></i> ${studentsCount} étudiants</div>
                        <div><i class="bi bi-credit-card me-2"></i> ${paymentsCount} paiements - ${totalRevenue.toLocaleString()} FCFA</div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-secondary small">Code :</span>
                            <code style="background:#eef2ff;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--primary);">${account?.code || 'N/A'}</code>
                        </div>
                        <div>
                            ${userRole === 'admin' ? `
                                <button class="btn btn-sm btn-outline-warning" onclick="editSchool(${s.id})"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteSchool(${s.id})"><i class="bi bi-trash"></i></button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
function showSchoolForm() {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut ajouter une ecole', 'error');
        return;
    }
    
    showModal('Ajouter une ecole', `
        <form id="schoolForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Nom de l'ecole</label>
                    <input type="text" class="form-control" id="schoolName" placeholder="Nom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Telephone</label>
                    <input type="text" class="form-control" id="schoolPhone" placeholder="77 123 45 67">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="schoolEmail" placeholder="email@exemple.com">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Adresse</label>
                    <input type="text" class="form-control" id="schoolAddress" placeholder="Adresse">
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('schoolName').value;
        const phone = document.getElementById('schoolPhone').value;
        const email = document.getElementById('schoolEmail').value;
        const address = document.getElementById('schoolAddress').value;
        
        if (!name) {
            showToast('Veuillez entrer le nom de l\'ecole', 'error');
            return;
        }

        const newSchool = {
            id: DB.schools.length + 1,
            name: name,
            code: `SCH-${String(DB.schools.length + 1).padStart(3, '0')}`,
            phone: phone || 'Non renseigne',
            email: email || 'Non renseigne',
            address: address || 'Non renseigne',
            status: 'Actif'
        };
        
        DB.schools.push(newSchool);
        
        const newAccount = {
            id: DB.schoolAccounts.length + 1,
            school_id: newSchool.id,
            school_name: name,
            code: newSchool.code,
            password: `${name.toLowerCase().replace(/\s/g, '')}2025`,
            email: email || `contact@${name.toLowerCase().replace(/\s/g, '')}.sn`,
            phone: phone || 'Non renseigne'
        };
        DB.schoolAccounts.push(newAccount);
        
        NotificationSystem.sendToAll(
            `<strong>${name}</strong> a rejoint la plateforme EduGest`,
            'success'
        );
        
        NotificationSystem.send('admin', 
            `<strong>${name}</strong> a ete ajoutee avec le code d'acces <strong>${newSchool.code}</strong>`,
            'info'
        );
        
        SyncSystem.sync();
        
        closeModal();
        showToast(`Ecole ${name} ajoutee avec succès !`, 'success');
        showToast(`📋 Code d'acces : ${newSchool.code} - Mot de passe : ${newAccount.password}`, 'info');
        loadPageData('schools');
        loadPageData('dashboard');
    });
}

function editSchool(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut modifier une école', 'error');
        return;
    }
    
    const school = DB.schools.find(s => s.id === id);
    if (!school) return;
    
    showModal(`✏️ Modifier ${school.name}`, `
        <form id="editSchoolForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Nom de l'école</label>
                    <input type="text" class="form-control" id="editSchoolName" value="${school.name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Téléphone</label>
                    <input type="text" class="form-control" id="editSchoolPhone" value="${school.phone}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="editSchoolEmail" value="${school.email}">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Adresse</label>
                    <input type="text" class="form-control" id="editSchoolAddress" value="${school.address}">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="editSchoolStatus">
                        <option value="Actif" ${school.status === 'Actif' ? 'selected' : ''}>Actif</option>
                        <option value="Inactif" ${school.status === 'Inactif' ? 'selected' : ''}>Inactif</option>
                    </select>
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('editSchoolName').value;
        const phone = document.getElementById('editSchoolPhone').value;
        const email = document.getElementById('editSchoolEmail').value;
        const address = document.getElementById('editSchoolAddress').value;
        const status = document.getElementById('editSchoolStatus').value;
        
        if (!name) {
            showToast('Veuillez entrer le nom de l\'école', 'error');
            return;
        }

        school.name = name;
        school.phone = phone || 'Non renseigné';
        school.email = email || 'Non renseigné';
        school.address = address || 'Non renseigné';
        school.status = status;
        
        // Mettre à jour le compte
        const account = DB.schoolAccounts.find(a => a.school_id === id);
        if (account) {
            account.school_name = name;
            account.email = email || account.email;
            account.phone = phone || account.phone;
        }
        
        closeModal();
        showToast(`École ${name} modifiée avec succès !`, 'success');
        loadPageData('schools');
        loadPageData('dashboard');
    });
}

function deleteSchool(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut supprimer une école', 'error');
        return;
    }
    
    if (!confirm('Voulez-vous vraiment supprimer cette école ?')) return;
    const school = DB.schools.find(s => s.id === id);
    if (!school) return;
    
    // Supprimer les étudiants liés
    DB.students = DB.students.filter(s => s.school_id !== id);
    // Supprimer les paiements liés
    DB.payments = DB.payments.filter(p => p.school_id !== id);
    // Supprimer le compte
    DB.schoolAccounts = DB.schoolAccounts.filter(a => a.school_id !== id);
    // Supprimer l'école
    DB.schools = DB.schools.filter(s => s.id !== id);
    
    showToast(`École ${school.name} supprimée avec succès !`, 'success');
    loadPageData('schools');
    loadPageData('dashboard');
}

// ============================================================
// 12. PARENTS
// ============================================================

function loadParents() {
    const container = document.getElementById('parentsList');
    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-edugest">
                <thead>
                    <tr><th>Nom</th><th>Code</th><th>Email</th><th>Téléphone</th><th>Enfants</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    ${DB.parentAccounts.map(p => `
                        <tr>
                            <td><strong>${p.name}</strong></td>
                            <td><code style="background:#fdf2f8;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--parent-color);">${p.code}</code></td>
                            <td>${p.email}</td>
                            <td>${p.phone}</td>
                            <td>${p.children_ids.map(id => {
                                const child = DB.students.find(s => s.id === id);
                                return child ? `${child.first_name} ${child.last_name}` : 'N/A';
                            }).join(', ')}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="viewParent(${p.id})"><i class="bi bi-eye"></i></button>
                                ${userRole === 'admin' ? `
                                    <button class="btn btn-sm btn-outline-warning" onclick="editParent(${p.id})"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="deleteParent(${p.id})"><i class="bi bi-trash"></i></button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function showParentForm() {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut ajouter un parent', 'error');
        return;
    }
    
    showModal('👨‍👩‍👧 Ajouter un parent', `
        <form id="parentForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Nom complet</label>
                    <input type="text" class="form-control" id="parentName" placeholder="Nom et prénom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="parentEmail" placeholder="email@exemple.com">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Téléphone</label>
                    <input type="text" class="form-control" id="parentPhone" placeholder="77 123 45 67">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Enfants</label>
                    <select class="form-select" id="parentChildren" multiple style="height:100px;">
                        ${DB.students.map(s => `<option value="${s.id}">${s.first_name} ${s.last_name} - ${s.class}</option>`).join('')}
                    </select>
                    <small class="text-secondary">Maintenez Ctrl pour sélectionner plusieurs enfants</small>
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('parentName').value;
        const email = document.getElementById('parentEmail').value;
        const phone = document.getElementById('parentPhone').value;
        const childrenSelect = document.getElementById('parentChildren');
        const childrenIds = Array.from(childrenSelect.selectedOptions).map(opt => parseInt(opt.value));
        
        if (!name) {
            showToast('Veuillez entrer le nom du parent', 'error');
            return;
        }

        const newParent = {
            id: DB.parentAccounts.length + 1,
            code: `PAR-${String(DB.parentAccounts.length + 1).padStart(3, '0')}`,
            password: 'parent123',
            name: name,
            email: email || 'Non renseigné',
            phone: phone || 'Non renseigné',
            children_ids: childrenIds
        };
        
        DB.parentAccounts.push(newParent);
        
        // Mettre à jour les étudiants avec le parent
        childrenIds.forEach(childId => {
            const student = DB.students.find(s => s.id === childId);
            if (student) student.parent_id = newParent.id;
        });
        
        closeModal();
        showToast(`Parent ${name} ajouté avec succès !`, 'success');
        loadPageData('parents');
        loadPageData('dashboard');
    });
}

function viewParent(id) {
    const parent = DB.parentAccounts.find(p => p.id === id);
    if (!parent) return;
    const children = DB.students.filter(s => parent.children_ids.includes(s.id));
    
    showModal(`👤 ${parent.name}`, `
        <div class="row g-3">
            <div class="col-md-6"><strong>Code :</strong> <code style="background:#fdf2f8;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--parent-color);">${parent.code}</code></div>
            <div class="col-md-6"><strong>Email :</strong> ${parent.email}</div>
            <div class="col-md-6"><strong>Téléphone :</strong> ${parent.phone}</div>
            <div class="col-md-6"><strong>Enfants :</strong> ${children.length}</div>
        </div>
        <hr>
        <h6>Liste des enfants</h6>
        ${children.length === 0 ? '<p class="text-secondary">Aucun enfant</p>' :
            children.map(c => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                        <div class="fw-semibold">${c.first_name} ${c.last_name}</div>
                        <div class="small text-secondary">${c.class} - ${c.school}</div>
                    </div>
                    <span class="badge badge-custom ${c.status === 'Actif' ? 'bg-success-light' : 'bg-warning-light'}">${c.status}</span>
                </div>
            `).join('')
        }
    `, null);
}

function editParent(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut modifier un parent', 'error');
        return;
    }
    
    const parent = DB.parentAccounts.find(p => p.id === id);
    if (!parent) return;
    
    showModal(`✏️ Modifier ${parent.name}`, `
        <form id="editParentForm">
            <div class="row g-3">
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Nom complet</label>
                    <input type="text" class="form-control" id="editParentName" value="${parent.name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="editParentEmail" value="${parent.email}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Téléphone</label>
                    <input type="text" class="form-control" id="editParentPhone" value="${parent.phone}">
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Enfants</label>
                    <select class="form-select" id="editParentChildren" multiple style="height:100px;">
                        ${DB.students.map(s => `<option value="${s.id}" ${parent.children_ids.includes(s.id) ? 'selected' : ''}>${s.first_name} ${s.last_name} - ${s.class}</option>`).join('')}
                    </select>
                    <small class="text-secondary">Maintenez Ctrl pour sélectionner plusieurs enfants</small>
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('editParentName').value;
        const email = document.getElementById('editParentEmail').value;
        const phone = document.getElementById('editParentPhone').value;
        const childrenSelect = document.getElementById('editParentChildren');
        const childrenIds = Array.from(childrenSelect.selectedOptions).map(opt => parseInt(opt.value));
        
        if (!name) {
            showToast('Veuillez entrer le nom du parent', 'error');
            return;
        }

        // Retirer les anciens enfants
        parent.children_ids.forEach(childId => {
            const student = DB.students.find(s => s.id === childId);
            if (student && student.parent_id === parent.id) student.parent_id = null;
        });
        
        // Mettre à jour
        parent.name = name;
        parent.email = email || 'Non renseigné';
        parent.phone = phone || 'Non renseigné';
        parent.children_ids = childrenIds;
        
        // Mettre à jour les étudiants
        childrenIds.forEach(childId => {
            const student = DB.students.find(s => s.id === childId);
            if (student) student.parent_id = parent.id;
        });
        
        closeModal();
        showToast(`Parent ${name} modifié avec succès !`, 'success');
        loadPageData('parents');
        loadPageData('dashboard');
    });
}

function deleteParent(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut supprimer un parent', 'error');
        return;
    }
    
    if (!confirm('Voulez-vous vraiment supprimer ce parent ?')) return;
    const parent = DB.parentAccounts.find(p => p.id === id);
    if (!parent) return;
    
    // Retirer l'association avec les étudiants
    parent.children_ids.forEach(childId => {
        const student = DB.students.find(s => s.id === childId);
        if (student) student.parent_id = null;
    });
    
    DB.parentAccounts = DB.parentAccounts.filter(p => p.id !== id);
    showToast(`Parent supprimé avec succès !`, 'success');
    loadPageData('parents');
    loadPageData('dashboard');
}

// ============================================================
// 13. ENSEIGNANTS
// ============================================================


function loadTeachers(filterFn) {
    const container = document.getElementById('teachersList');
    const teachers = filterFn ? filterFn(DB.teachers, 'school_id') : DB.teachers;
    
    if (teachers.length === 0) {
        container.innerHTML = '<div class="text-center text-secondary py-4">Aucun enseignant</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-edugest">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>École</th>
                        <th>Cours</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${teachers.map(t => `
                        <tr>
                            <td>
                                <div class="avatar-mini" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,${getTeacherColor(t.id)},#7C3AED);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.9rem;">
                                    ${t.first_name.charAt(0)}${t.last_name.charAt(0)}
                                </div>
                            </td>
                            <td><strong>${t.matricule || 'TCH-' + String(t.id).padStart(3, '0')}</strong></td>
                            <td>${t.last_name}</td>
                            <td>${t.first_name}</td>
                            <td>${t.school}</td>
                            <td><span class="badge badge-custom bg-info-light">${t.subject}</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="viewTeacher(${t.id})"><i class="bi bi-eye"></i></button>
                                ${userRole === 'admin' ? `
                                    <button class="btn btn-sm btn-outline-warning" onclick="editTeacher(${t.id})"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTeacher(${t.id})"><i class="bi bi-trash"></i></button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ===== GÉNÉRER UNE COULEUR POUR L'AVATAR =====
function getTeacherColor(id) {
    const colors = ['#4F46E5', '#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'];
    return colors[id % colors.length];
}

// ===== VOIR LES DÉTAILS D'UN ENSEIGNANT (VERSION SIMPLIFIÉE) =====
function viewTeacher(id) {
    const teacher = DB.teachers.find(t => t.id === id);
    if (!teacher) {
        showToast('Enseignant non trouvé', 'error');
        return;
    }

    // Récupérer les cours de l'enseignant (matières)
    const subjects = teacher.subject.split(',').map(s => s.trim());
    
    // Récupérer les classes de l'enseignant
    const classes = DB.classes.filter(c => c.teacher_id === id);
    
    // Récupérer le nombre d'étudiants
    const classNames = classes.map(c => c.name);
    const studentsCount = DB.students.filter(s => classNames.includes(s.class) && s.school_id === teacher.school_id).length;

    // Générer une couleur pour l'avatar
    const avatarColor = getTeacherColor(teacher.id);
    const initials = teacher.first_name.charAt(0) + teacher.last_name.charAt(0);

    showModal(`👨‍🏫 ${teacher.first_name} ${teacher.last_name}`, `
        <div class="row g-4">
            <!-- Photo / Avatar -->
            <div class="col-md-4 text-center">
                <div style="width:150px;height:150px;border-radius:50%;background:linear-gradient(135deg,${avatarColor},${avatarColor}dd);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:4rem;font-weight:700;box-shadow:0 8px 25px rgba(0,0,0,0.15);margin-bottom:10px;">
                    ${initials}
                </div>
                <div class="mt-2">
                    <span class="badge badge-custom bg-primary-light">${teacher.subject}</span>
                </div>
                <div class="mt-1">
                    <small class="text-secondary">Matricule: ${teacher.matricule || 'TCH-' + String(teacher.id).padStart(3, '0')}</small>
                </div>
            </div>

            <!-- Informations personnelles -->
            <div class="col-md-8">
                <div class="p-3 bg-light rounded-3">
                    <h6 class="fw-bold"><i class="bi bi-person-badge" style="color:var(--info);"></i> Informations personnelles</h6>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <strong>Nom complet :</strong> 
                            <span class="d-block">${teacher.first_name} ${teacher.last_name}</span>
                        </div>
                        <div class="col-md-6">
                            <strong>Matricule :</strong>
                            <span class="d-block"><code style="background:#eef2ff;padding:2px 8px;border-radius:4px;font-weight:700;color:var(--primary);">${teacher.matricule || 'TCH-' + String(teacher.id).padStart(3, '0')}</code></span>
                        </div>
                        <div class="col-md-6 mt-2">
                            <strong>École :</strong>
                            <span class="d-block"><i class="bi bi-building" style="color:var(--primary);"></i> ${teacher.school}</span>
                        </div>
                        <div class="col-md-6 mt-2">
                            <strong>Email :</strong>
                            <span class="d-block"><i class="bi bi-envelope" style="color:var(--info);"></i> ${teacher.email || 'Non renseigné'}</span>
                        </div>
                        <div class="col-md-6 mt-2">
                            <strong>Téléphone :</strong>
                            <span class="d-block"><i class="bi bi-telephone" style="color:var(--success);"></i> ${teacher.phone || 'Non renseigné'}</span>
                        </div>
                        <div class="col-md-6 mt-2">
                            <strong>Statut :</strong>
                            <span class="d-block"><span class="badge bg-success">Actif</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cours enseignés -->
            <div class="col-12">
                <div class="p-3 bg-light rounded-3">
                    <h6 class="fw-bold"><i class="bi bi-book" style="color:var(--warning);"></i> Cours enseignés</h6>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                        ${subjects.map(s => `
                            <span class="badge badge-custom bg-primary-light" style="font-size:0.9rem;padding:6px 14px;">
                                <i class="bi bi-journal-text"></i> ${s}
                            </span>
                        `).join('')}
                        ${subjects.length === 0 ? '<span class="text-secondary">Aucun cours assigné</span>' : ''}
                    </div>
                </div>
            </div>

            <!-- Classes et étudiants -->
            <div class="col-12">
                <div class="p-3 bg-light rounded-3">
                    <h6 class="fw-bold"><i class="bi bi-easel" style="color:var(--secondary);"></i> Classes et étudiants</h6>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <strong>Classes :</strong>
                            <div class="mt-1">
                                ${classes.length === 0 ? '<span class="text-secondary">Aucune classe assignée</span>' :
                                    classes.map(c => `
                                        <span class="badge badge-custom bg-info-light me-1">${c.name} (${c.level})</span>
                                    `).join('')
                                }
                            </div>
                        </div>
                        <div class="col-md-6">
                            <strong>Total étudiants :</strong>
                            <div class="mt-1">
                                <span class="badge badge-custom bg-success-light" style="font-size:1rem;padding:6px 14px;">
                                    <i class="bi bi-people"></i> ${studentsCount} étudiants
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions rapides -->
            <div class="col-12">
                <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-outline-primary" onclick="showToast('Envoi de message à ${teacher.first_name}','info')">
                        <i class="bi bi-envelope"></i> Envoyer un message
                    </button>
                    <button class="btn btn-outline-success" onclick="showToast('Appel à ${teacher.first_name}','info')">
                        <i class="bi bi-telephone"></i> Appeler
                    </button>
                    <button class="btn btn-outline-warning" onclick="editTeacher(${teacher.id})">
                        <i class="bi bi-pencil"></i> Modifier
                    </button>
                </div>
            </div>
        </div>
    `, null);
}

// ===== MODIFIER UN ENSEIGNANT =====
function editTeacher(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut modifier un enseignant', 'error');
        return;
    }
    
    const teacher = DB.teachers.find(t => t.id === id);
    if (!teacher) return;
    
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    showModal(`✏️ Modifier ${teacher.first_name} ${teacher.last_name}`, `
        <form id="editTeacherForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Matricule</label>
                    <input type="text" class="form-control" id="editTeacherMatricule" value="${teacher.matricule || 'TCH-' + String(teacher.id).padStart(3, '0')}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="editTeacherStatus">
                        <option value="Actif" ${teacher.status === 'Actif' ? 'selected' : ''}>Actif</option>
                        <option value="Inactif" ${teacher.status === 'Inactif' ? 'selected' : ''}>Inactif</option>
                        <option value="En congé" ${teacher.status === 'En congé' ? 'selected' : ''}>En congé</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom</label>
                    <input type="text" class="form-control" id="editTeacherLastName" value="${teacher.last_name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Prénom</label>
                    <input type="text" class="form-control" id="editTeacherFirstName" value="${teacher.first_name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Cours (séparés par des virgules)</label>
                    <input type="text" class="form-control" id="editTeacherSubject" value="${teacher.subject}" required>
                    <small class="text-secondary">Ex: Mathématiques, Physique, Chimie</small>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">École</label>
                    <select class="form-select" id="editTeacherSchool">
                        ${schools.map(s => `<option value="${s.id}" ${s.id === teacher.school_id ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="editTeacherEmail" value="${teacher.email || ''}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Téléphone</label>
                    <input type="text" class="form-control" id="editTeacherPhone" value="${teacher.phone || ''}">
                </div>
            </div>
        </form>
    `, () => {
        const matricule = document.getElementById('editTeacherMatricule').value;
        const lastName = document.getElementById('editTeacherLastName').value;
        const firstName = document.getElementById('editTeacherFirstName').value;
        const subject = document.getElementById('editTeacherSubject').value;
        const schoolId = parseInt(document.getElementById('editTeacherSchool').value);
        const email = document.getElementById('editTeacherEmail').value;
        const phone = document.getElementById('editTeacherPhone').value;
        const status = document.getElementById('editTeacherStatus').value;
        
        if (!lastName || !firstName || !subject) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        const school = DB.schools.find(s => s.id === schoolId);
        teacher.matricule = matricule || teacher.matricule;
        teacher.last_name = lastName;
        teacher.first_name = firstName;
        teacher.subject = subject;
        teacher.school = school ? school.name : 'Non assigné';
        teacher.school_id = schoolId;
        teacher.email = email || 'Non renseigné';
        teacher.phone = phone || 'Non renseigné';
        teacher.status = status;
        
        closeModal();
        showToast(`Enseignant ${firstName} ${lastName} modifié avec succès !`, 'success');
        loadPageData('teachers');
    });
}

// ===== SUPPRIMER UN ENSEIGNANT =====
function deleteTeacher(id) {
    if (userRole !== 'admin') {
        showToast('Seul l\'administrateur peut supprimer un enseignant', 'error');
        return;
    }
    
    if (!confirm('Voulez-vous vraiment supprimer cet enseignant ?')) return;
    const teacher = DB.teachers.find(t => t.id === id);
    if (!teacher) return;
    
    // Vérifier si l'enseignant est assigné à des classes
    const classes = DB.classes.filter(c => c.teacher_id === id);
    if (classes.length > 0) {
        if (!confirm(`Cet enseignant est assigné à ${classes.length} classe(s). Voulez-vous continuer ?`)) return;
        classes.forEach(c => c.teacher_id = null);
    }
    
    DB.teachers = DB.teachers.filter(t => t.id !== id);
    showToast(`Enseignant ${teacher.first_name} ${teacher.last_name} supprimé avec succès !`, 'success');
    loadPageData('teachers');
}

// ===== AJOUTER UN ENSEIGNANT =====
function showTeacherForm() {
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    showModal('Ajouter un enseignant', `
        <form id="teacherForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Matricule</label>
                    <input type="text" class="form-control" id="teacherMatricule" placeholder="TCH-001" value="TCH-${String(DB.teachers.length + 1).padStart(3, '0')}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="teacherStatus">
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                        <option value="En conge">En conge</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom</label>
                    <input type="text" class="form-control" id="teacherLastName" placeholder="Nom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Prenom</label>
                    <input type="text" class="form-control" id="teacherFirstName" placeholder="Prenom" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Cours enseignes</label>
                    <input type="text" class="form-control" id="teacherSubject" placeholder="Ex: Mathematiques, Physique" required>
                    <small class="text-secondary">Separez les cours par des virgules</small>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Ecole</label>
                    <select class="form-select" id="teacherSchool">
                        ${schools.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control" id="teacherEmail" placeholder="email@exemple.com">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Telephone</label>
                    <input type="text" class="form-control" id="teacherPhone" placeholder="77 123 45 67">
                </div>
            </div>
        </form>
    `, () => {
        const matricule = document.getElementById('teacherMatricule').value;
        const lastName = document.getElementById('teacherLastName').value;
        const firstName = document.getElementById('teacherFirstName').value;
        const subject = document.getElementById('teacherSubject').value;
        const schoolId = parseInt(document.getElementById('teacherSchool').value);
        const email = document.getElementById('teacherEmail').value;
        const phone = document.getElementById('teacherPhone').value;
        const status = document.getElementById('teacherStatus').value;
        
        if (!lastName || !firstName || !subject) {
            showToast('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        const school = DB.schools.find(s => s.id === schoolId);
        const newTeacher = {
            id: DB.teachers.length + 1,
            matricule: matricule || `TCH-${String(DB.teachers.length + 1).padStart(3, '0')}`,
            first_name: firstName,
            last_name: lastName,
            subject: subject,
            school: school ? school.name : 'Non assigne',
            school_id: schoolId,
            email: email || 'Non renseigne',
            phone: phone || 'Non renseigne',
            status: status || 'Actif'
        };
        
        DB.teachers.push(newTeacher);
        
        NotificationSystem.send(`school_${schoolId}`, 
            `<strong>${firstName} ${lastName}</strong> a rejoint l'equipe enseignante en ${subject}`,
            'success'
        );
        
        NotificationSystem.send('admin', 
            `<strong>${firstName} ${lastName}</strong> a ete ajoute comme enseignant en ${subject} dans ${school ? school.name : 'une ecole'}`,
            'info'
        );
        
        SyncSystem.sync();
        
        closeModal();
        showToast(`Enseignant ${firstName} ${lastName} ajoute avec succès !`, 'success');
        loadPageData('teachers');
        loadPageData('dashboard');
    });
}


// ============================================================
// ENVOI DE MESSAGE À UN ENSEIGNANT DEPUIS LE DÉTAIL
// ============================================================

function sendMessageToTeacher(teacherId) {
    const teacher = DB.teachers.find(t => t.id === teacherId);
    if (!teacher) {
        showToast('Enseignant non trouvé', 'error');
        return;
    }

    // Récupérer les parents et autres enseignants pour le destinataire
    const recipients = [
        { id: 'all', name: 'Tous' },
        { id: 'parents', name: 'Tous les parents' },
        { id: 'teachers', name: 'Tous les enseignants' },
        ...DB.parentAccounts.map(p => ({ id: `parent_${p.id}`, name: `Parent: ${p.name}` })),
        ...DB.teachers.filter(t => t.id !== teacherId).map(t => ({ id: `teacher_${t.id}`, name: `Enseignant: ${t.first_name} ${t.last_name}` }))
    ];

    // Récupérer les classes de l'enseignant
    const teacherClasses = DB.classes.filter(c => c.teacher_id === teacherId);
    const classNames = teacherClasses.map(c => c.name);
    const students = DB.students.filter(s => classNames.includes(s.class) && s.school_id === teacher.school_id);
    const studentIds = students.map(s => s.id);
    
    // Récupérer les parents des étudiants
    const parentIds = [];
    students.forEach(s => {
        if (s.parent_id) {
            const parent = DB.parentAccounts.find(p => p.id === s.parent_id);
            if (parent && !parentIds.includes(parent.id)) {
                parentIds.push(parent.id);
            }
        }
    });

    showModal(`✉️ Envoyer un message à ${teacher.first_name} ${teacher.last_name}`, `
        <div class="mb-3">
            <div class="p-3 bg-light rounded-3 mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,${getTeacherColor(teacher.id)},#7C3AED);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:1.2rem;">
                        ${teacher.first_name.charAt(0)}${teacher.last_name.charAt(0)}
                    </div>
                    <div>
                        <h6 class="mb-0">${teacher.first_name} ${teacher.last_name}</h6>
                        <small class="text-secondary">${teacher.subject} • ${teacher.school}</small>
                    </div>
                </div>
            </div>
            
            <form id="messageToTeacherForm">
                <div class="mb-3">
                    <label class="form-label fw-semibold">Destinataire</label>
                    <select class="form-select" id="messageRecipient">
                        <option value="teacher_${teacher.id}" selected>👨‍🏫 ${teacher.first_name} ${teacher.last_name}</option>
                        ${parentIds.length > 0 ? `
                            <optgroup label="👨‍👩‍👧 Parents des étudiants">
                                ${parentIds.map(id => {
                                    const parent = DB.parentAccounts.find(p => p.id === id);
                                    return parent ? `<option value="parent_${id}">👤 ${parent.name}</option>` : '';
                                }).join('')}
                            </optgroup>
                            <option value="all_parents">👨‍👩‍👧 Tous les parents</option>
                        ` : ''}
                        ${teacherClasses.length > 0 ? `
                            <optgroup label="📚 Classes">
                                ${teacherClasses.map(c => `<option value="class_${c.id}">📚 ${c.name} (${c.level || 'N/A'})</option>`).join('')}
                            </optgroup>
                        ` : ''}
                        <option value="admin">👤 Administration</option>
                        <option value="all">🌐 Tous</option>
                    </select>
                    <small class="text-secondary">Sélectionnez le destinataire du message</small>
                </div>
                
                <div class="mb-3">
                    <label class="form-label fw-semibold">Sujet</label>
                    <input type="text" class="form-control" id="messageSubject" 
                           placeholder="Sujet du message" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label fw-semibold">Message</label>
                    <textarea class="form-control" id="messageContent" rows="5" 
                              placeholder="Écrivez votre message..." required></textarea>
                </div>
                
                <div class="mb-3">
                    <label class="form-label fw-semibold">Type de message</label>
                    <select class="form-select" id="messageType">
                        <option value="info">ℹ️ Information</option>
                        <option value="important">⚠️ Important</option>
                        <option value="urgent">🔴 Urgent</option>
                        <option value="confidential">🔒 Confidentiel</option>
                    </select>
                </div>
                
                <div class="alert alert-info small">
                    <i class="bi bi-info-circle"></i>
                    <strong>Note :</strong> Le message sera envoyé et notifié au(x) destinataire(s) sélectionné(s).
                </div>
            </form>
        </div>
    `, () => {
        // Récupérer les valeurs du formulaire
        const recipient = document.getElementById('messageRecipient').value;
        const subject = document.getElementById('messageSubject').value;
        const content = document.getElementById('messageContent').value;
        const type = document.getElementById('messageType').value;
        
        if (!subject || !content) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        // Envoyer le message en fonction du destinataire
        let recipientName = '';
        let sentCount = 0;
        let recipientList = [];

        if (recipient === `teacher_${teacher.id}`) {
            // Message à l'enseignant lui-même
            recipientName = `${teacher.first_name} ${teacher.last_name}`;
            addMessageToDB('admin', `Enseignant: ${teacher.first_name} ${teacher.last_name}`, subject, content, teacher.id);
            sendNotification(teacher.id, content, type);
            sentCount = 1;
            recipientList = [teacher.first_name];
            
        } else if (recipient.startsWith('parent_')) {
            // Message à un parent spécifique
            const parentId = parseInt(recipient.split('_')[1]);
            const parent = DB.parentAccounts.find(p => p.id === parentId);
            if (parent) {
                recipientName = parent.name;
                addMessageToDB('admin', `Parent: ${parent.name}`, subject, content, parentId);
                sendNotification(parentId, content, type);
                sentCount = 1;
                recipientList = [parent.name];
            }
            
        } else if (recipient === 'all_parents') {
            // Message à tous les parents des étudiants de l'enseignant
            const uniqueParents = [];
            students.forEach(s => {
                if (s.parent_id) {
                    const parent = DB.parentAccounts.find(p => p.id === s.parent_id);
                    if (parent && !uniqueParents.find(p => p.id === parent.id)) {
                        uniqueParents.push(parent);
                    }
                }
            });
            
            uniqueParents.forEach(p => {
                addMessageToDB('admin', `Parent: ${p.name}`, subject, content, p.id);
                sendNotification(p.id, content, type);
                sentCount++;
                recipientList.push(p.name);
            });
            recipientName = `${uniqueParents.length} parent(s)`;
            
        } else if (recipient.startsWith('class_')) {
            // Message à une classe spécifique
            const classId = parseInt(recipient.split('_')[1]);
            const classData = DB.classes.find(c => c.id === classId);
            if (classData) {
                const classStudents = DB.students.filter(s => s.class === classData.name && s.school_id === classData.school_id);
                const classParents = [];
                classStudents.forEach(s => {
                    if (s.parent_id) {
                        const parent = DB.parentAccounts.find(p => p.id === s.parent_id);
                        if (parent && !classParents.find(p => p.id === parent.id)) {
                            classParents.push(parent);
                        }
                    }
                });
                
                classParents.forEach(p => {
                    addMessageToDB('admin', `Parent: ${p.name}`, subject, content, p.id);
                    sendNotification(p.id, content, type);
                    sentCount++;
                    recipientList.push(p.name);
                });
                
                // Envoyer aussi à l'enseignant de la classe
                if (classData.teacher_id) {
                    const classTeacher = DB.teachers.find(t => t.id === classData.teacher_id);
                    if (classTeacher) {
                        addMessageToDB('admin', `Enseignant: ${classTeacher.first_name} ${classTeacher.last_name}`, subject, content, classTeacher.id);
                        sendNotification(classTeacher.id, content, type);
                        sentCount++;
                        recipientList.push(classTeacher.first_name);
                    }
                }
                
                recipientName = `Classe ${classData.name} (${classParents.length} parents)`;
            }
            
        } else if (recipient === 'admin') {
            // Message à l'administration
            recipientName = 'Administration';
            addMessageToDB('admin', 'Administration', subject, content, 0);
            sendNotification('admin', content, type);
            sentCount = 1;
            recipientList = ['Administration'];
            
        } else if (recipient === 'all') {
            // Message à tous
            recipientName = 'Tous';
            // Enseignant
            addMessageToDB('admin', `Enseignant: ${teacher.first_name} ${teacher.last_name}`, subject, content, teacher.id);
            sendNotification(teacher.id, content, type);
            sentCount++;
            recipientList.push(teacher.first_name);
            
            // Parents des étudiants
            const uniqueParents = [];
            students.forEach(s => {
                if (s.parent_id) {
                    const parent = DB.parentAccounts.find(p => p.id === s.parent_id);
                    if (parent && !uniqueParents.find(p => p.id === parent.id)) {
                        uniqueParents.push(parent);
                    }
                }
            });
            uniqueParents.forEach(p => {
                addMessageToDB('admin', `Parent: ${p.name}`, subject, content, p.id);
                sendNotification(p.id, content, type);
                sentCount++;
                recipientList.push(p.name);
            });
            
            // Administration
            addMessageToDB('admin', 'Administration', subject, content, 0);
            sendNotification('admin', content, type);
            sentCount++;
            recipientList.push('Administration');
        }

        // Ajouter le message dans la base de données pour l'enseignant
        const messageEntry = {
            id: DB.messages.length + 1,
            sender: 'Administration',
            sender_id: 0,
            receiver: `${teacher.first_name} ${teacher.last_name}`,
            receiver_id: teacher.id,
            subject: subject,
            content: content,
            date: new Date().toISOString().split('T')[0],
            read: false,
            type: type
        };
        DB.messages.push(messageEntry);

        // Notification de succès
        closeModal();
        
        const typeLabels = {
            info: 'ℹ️ Information',
            important: '⚠️ Important',
            urgent: '🔴 Urgent',
            confidential: '🔒 Confidentiel'
        };
        
        showToast(`✅ Message "${typeLabels[type] || 'Info'}" envoyé à ${recipientName} (${sentCount} destinataire(s))`, 'success');
        
        // Si c'était un message à l'enseignant lui-même, notification spécifique
        if (recipient === `teacher_${teacher.id}`) {
            showToast(`📩 Le message a été envoyé à ${teacher.first_name} ${teacher.last_name}`, 'success');
        }
        
        // Mettre à jour l'interface
        loadPageData('messages');
        loadPageData('dashboard');
        
        // Ajouter une notification pour le destinataire principal
        if (recipient === `teacher_${teacher.id}`) {
            NotificationSystem.send(teacher.id, 
                `<strong>Nouveau message</strong> de l'administration : ${subject}`,
                type
            );
        }
    });
}

// ============================================================
// FONCTIONS AIDES POUR L'ENVOI DE MESSAGES
// ============================================================

function addMessageToDB(sender, receiver, subject, content, receiverId) {
    DB.messages.push({
        id: DB.messages.length + 1,
        sender: sender,
        sender_id: 0,
        receiver: receiver,
        receiver_id: receiverId,
        subject: subject,
        content: content,
        date: new Date().toISOString().split('T')[0],
        read: false
    });
}

function sendNotification(userId, content, type = 'info') {
    const notification = {
        id: DB.notifications.length + 1,
        text: content.length > 100 ? content.substring(0, 100) + '...' : content,
        time: 'À l\'instant',
        read: false,
        user_id: userId,
        type: type
    };
    DB.notifications.push(notification);
    EventSystem.emit('notification', notification);
}

// ============================================================
// ENVOI DE MESSAGE RAPIDE DEPUIS LE TABLEAU DES ENSEIGNANTS
// ============================================================

function quickMessageToTeacher(teacherId) {
    const teacher = DB.teachers.find(t => t.id === teacherId);
    if (!teacher) return;
    
    // Ouvrir directement la boîte de dialogue d'envoi de message
    sendMessageToTeacher(teacherId);
}
/// ============================================================
// 14. CLASSES - GESTION PAR ÉCOLE
// ============================================================

function loadClasses(filterFn) {
    const container = document.getElementById('classesList');
    
    // Filtrer les classes selon le rôle
    let classes = DB.classes;
    
    if (userRole === 'school') {
        // Une école ne voit que ses propres classes
        classes = classes.filter(c => c.school_id === userSchoolId);
    } else if (userRole === 'teacher') {
        // Un enseignant voit les classes où il enseigne
        const teacher = DB.teachers.find(t => t.id === currentUser?.id || 0);
        if (teacher) {
            classes = classes.filter(c => c.teacher_id === teacher.id);
        }
    } else if (userRole === 'parent') {
        // Un parent voit les classes de ses enfants
        const childIds = currentUser?.children_ids || [];
        const children = DB.students.filter(s => childIds.includes(s.id));
        const classNames = children.map(c => c.class);
        classes = classes.filter(c => classNames.includes(c.name));
    }
    // Admin voit toutes les classes
    
    if (classes.length === 0) {
        container.innerHTML = `
            <div class="text-center text-secondary py-4">
                <i class="bi bi-easel" style="font-size:2rem;display:block;margin-bottom:10px;"></i>
                ${userRole === 'school' ? 'Aucune classe dans votre école' : 
                  userRole === 'teacher' ? 'Aucune classe assignée' :
                  userRole === 'parent' ? 'Aucune classe pour vos enfants' :
                  'Aucune classe enregistrée'}
                ${userRole === 'school' ? '<br><button class="btn btn-primary btn-sm mt-2" onclick="showClassForm()"><i class="bi bi-plus-lg"></i> Créer une classe</button>' : ''}
            </div>
        `;
        return;
    }
    
    // Grouper par école pour un meilleur affichage
    const groupedClasses = {};
    classes.forEach(c => {
        const schoolName = c.school_name || DB.schools.find(s => s.id === c.school_id)?.name || 'École non définie';
        if (!groupedClasses[schoolName]) {
            groupedClasses[schoolName] = [];
        }
        groupedClasses[schoolName].push(c);
    });
    
    let html = '';
    for (const [schoolName, schoolClasses] of Object.entries(groupedClasses)) {
        html += `
            <div class="mb-4">
                <h6 class="fw-bold text-secondary mb-2">
                    <i class="bi bi-building" style="color:var(--primary);"></i> ${schoolName}
                    <span class="badge badge-custom bg-primary-light ms-2">${schoolClasses.length} classe(s)</span>
                </h6>
                <div class="row">
                    ${schoolClasses.map(c => {
                        const teacher = DB.teachers.find(t => t.id === c.teacher_id);
                        const students = DB.students.filter(s => s.class === c.name && s.school_id === c.school_id);
                        const studentsCount = students.length;
                        const pendingPayments = DB.payments
                            .filter(p => p.student_id && students.some(s => s.id === p.student_id) && p.status === 'pending')
                            .length;
                        
                        return `
                            <div class="col-md-4 col-lg-3">
                                <div class="p-3 border rounded-3 mb-3 class-card" style="transition:all 0.3s;cursor:pointer;" onclick="viewClass(${c.id})">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong class="fs-5">${c.name}</strong>
                                            <div class="text-secondary small">${c.level || ''}</div>
                                        </div>
                                        <span class="badge badge-custom bg-primary-light">${studentsCount} élèves</span>
                                    </div>
                                    <div class="mt-2 text-secondary small">
                                        <div><i class="bi bi-person-video3 me-1"></i> ${teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Non assigné'}</div>
                                        <div><i class="bi bi-credit-card me-1"></i> ${pendingPayments} paiement(s) en attente</div>
                                    </div>
                                    <hr class="my-2">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="small text-secondary">
                                            <i class="bi bi-people"></i> ${studentsCount} élèves
                                        </span>
                                        <div>
                                            ${userRole === 'school' || userRole === 'admin' ? `
                                                <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();viewClass(${c.id})"><i class="bi bi-eye"></i></button>
                                                <button class="btn btn-sm btn-outline-warning" onclick="event.stopPropagation();editClass(${c.id})"><i class="bi bi-pencil"></i></button>
                                                <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation();deleteClass(${c.id})"><i class="bi bi-trash"></i></button>
                                            ` : userRole === 'parent' ? `
                                                <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation();viewClass(${c.id})"><i class="bi bi-eye"></i></button>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ===== VOIR LES DÉTAILS D'UNE CLASSE =====
function viewClass(id) {
    const classData = DB.classes.find(c => c.id === id);
    if (!classData) {
        showToast('Classe non trouvée', 'error');
        return;
    }

    const teacher = DB.teachers.find(t => t.id === classData.teacher_id);
    const school = DB.schools.find(s => s.id === classData.school_id);
    const students = DB.students.filter(s => s.class === classData.name && s.school_id === classData.school_id);
    const payments = DB.payments.filter(p => students.some(s => s.id === p.student_id));
    const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = payments.filter(p => p.status === 'pending').length;

    showModal(`📚 ${classData.name} - Détails`, `
        <div class="row g-3">
            <!-- Informations générales -->
            <div class="col-md-12">
                <div class="p-3 bg-light rounded-3">
                    <h6 class="fw-bold"><i class="bi bi-info-circle" style="color:var(--info);"></i> Informations générales</h6>
                    <div class="row mt-2">
                        <div class="col-md-4"><strong>Nom :</strong> ${classData.name}</div>
                        <div class="col-md-4"><strong>Niveau :</strong> ${classData.level || 'Non spécifié'}</div>
                        <div class="col-md-4"><strong>École :</strong> ${school ? school.name : 'Non définie'}</div>
                        <div class="col-md-6"><strong>Enseignant principal :</strong> ${teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Non assigné'}</div>
                        <div class="col-md-6"><strong>Nombre d'élèves :</strong> ${students.length}</div>
                    </div>
                </div>
            </div>

            <!-- Statistiques -->
            <div class="col-md-12">
                <div class="row g-2">
                    <div class="col-md-3">
                        <div class="p-2 text-center border rounded-3">
                            <div class="fs-4 fw-bold" style="color:var(--primary);">${students.length}</div>
                            <div class="small text-secondary">Élèves</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 text-center border rounded-3">
                            <div class="fs-4 fw-bold" style="color:var(--success);">${payments.length}</div>
                            <div class="small text-secondary">Paiements</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 text-center border rounded-3">
                            <div class="fs-4 fw-bold" style="color:var(--warning);">${pendingPayments}</div>
                            <div class="small text-secondary">En attente</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-2 text-center border rounded-3">
                            <div class="fs-4 fw-bold" style="color:var(--success);">${totalRevenue.toLocaleString()} FCFA</div>
                            <div class="small text-secondary">Total payé</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Liste des élèves -->
            <div class="col-md-12">
                <h6><i class="bi bi-people" style="color:var(--primary);"></i> Élèves de la classe</h6>
                ${students.length === 0 ? '<p class="text-secondary small">Aucun élève dans cette classe</p>' :
                    `<div class="table-responsive">
                        <table class="table table-sm table-edugest">
                            <thead>
                                <tr><th>Matricule</th><th>Nom</th><th>Prénom</th><th>Statut</th><th>Paiements</th></tr>
                            </thead>
                            <tbody>
                                ${students.map(s => {
                                    const studentPayments = DB.payments.filter(p => p.student_id === s.id);
                                    const paid = studentPayments.filter(p => p.status === 'completed').length;
                                    const total = studentPayments.length;
                                    return `
                                        <tr>
                                            <td>${s.matricule}</td>
                                            <td>${s.last_name}</td>
                                            <td>${s.first_name}</td>
                                            <td><span class="badge badge-custom ${s.status === 'Actif' ? 'bg-success-light' : 'bg-warning-light'}">${s.status}</span></td>
                                            <td>${paid}/${total}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>`
                }
            </div>

            <!-- Paiements récents -->
            <div class="col-md-12">
                <h6><i class="bi bi-credit-card" style="color:var(--success);"></i> Paiements récents</h6>
                ${payments.length === 0 ? '<p class="text-secondary small">Aucun paiement</p>' :
                    `<div class="table-responsive">
                        <table class="table table-sm table-edugest">
                            <thead>
                                <tr><th>Facture</th><th>Élève</th><th>Montant</th><th>Statut</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                ${payments.slice(0, 10).map(p => `
                                    <tr>
                                        <td>${p.invoice}</td>
                                        <td>${p.student}</td>
                                        <td><strong>${p.amount.toLocaleString()} FCFA</strong></td>
                                        <td><span class="badge badge-custom ${p.status === 'completed' ? 'bg-success-light' : 'bg-warning-light'}">${p.status === 'completed' ? 'Payé' : 'En attente'}</span></td>
                                        <td>${p.date}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>`
                }
            </div>

            <!-- Actions -->
            <div class="col-md-12">
                <div class="d-flex gap-2 flex-wrap">
                    ${userRole === 'school' || userRole === 'admin' ? `
                        <button class="btn btn-primary btn-sm" onclick="editClass(${classData.id})"><i class="bi bi-pencil"></i> Modifier</button>
                        <button class="btn btn-success btn-sm" onclick="showToast('Ajout d\'élèves à la classe','info')"><i class="bi bi-person-plus"></i> Ajouter des élèves</button>
                        <button class="btn btn-warning btn-sm" onclick="showToast('Génération du rapport de classe','info')"><i class="bi bi-file-earmark-text"></i> Rapport</button>
                    ` : ''}
                    ${userRole === 'parent' ? `
                        <button class="btn btn-info btn-sm" onclick="showToast('Contacter l\'enseignant','info')"><i class="bi bi-envelope"></i> Contacter l'enseignant</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `, null);
}

// ===== CRÉER UNE CLASSE (ÉCOLE UNIQUEMENT) =====
function showClassForm() {
    if (userRole !== 'school' && userRole !== 'admin') {
        showToast('Seul une ecole ou l\'administrateur peut creer une classe', 'error');
        return;
    }
    
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    const teachers = userRole === 'admin' ? DB.teachers : DB.teachers.filter(t => t.school_id === userSchoolId);
    
    showModal('Creer une nouvelle classe', `
        <form id="classForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom de la classe</label>
                    <input type="text" class="form-control" id="className" placeholder="Ex: Terminale A" required>
                    <small class="text-secondary">Ex: 6eme A, 5eme B, Terminale C...</small>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Niveau</label>
                    <select class="form-select" id="classLevel">
                        <option value="">Selectionner un niveau</option>
                        <option value="Maternelle">Maternelle</option>
                        <option value="CP">CP</option>
                        <option value="CE1">CE1</option>
                        <option value="CE2">CE2</option>
                        <option value="CM1">CM1</option>
                        <option value="CM2">CM2</option>
                        <option value="6eme">6eme</option>
                        <option value="5eme">5eme</option>
                        <option value="4eme">4eme</option>
                        <option value="3eme">3eme</option>
                        <option value="Seconde">Seconde</option>
                        <option value="Premiere">Premiere</option>
                        <option value="Terminale">Terminale</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Ecole</label>
                    <select class="form-select" id="classSchool">
                        ${schools.map(s => `<option value="${s.id}" ${s.id === userSchoolId ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Enseignant principal</label>
                    <select class="form-select" id="classTeacher">
                        <option value="">Non assigne</option>
                        ${teachers.map(t => `<option value="${t.id}">${t.first_name} ${t.last_name} (${t.subject})</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-semibold">Capacite maximale</label>
                    <input type="number" class="form-control" id="classCapacity" placeholder="Ex: 30" value="30">
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('className').value;
        const level = document.getElementById('classLevel').value;
        const schoolId = parseInt(document.getElementById('classSchool').value);
        const teacherId = parseInt(document.getElementById('classTeacher').value) || null;
        const capacity = parseInt(document.getElementById('classCapacity').value) || 30;
        
        if (!name || !level) {
            showToast('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        const existingClass = DB.classes.find(c => c.name === name && c.school_id === schoolId);
        if (existingClass) {
            showToast(`Une classe "${name}" existe deja dans cette ecole`, 'error');
            return;
        }

        const school = DB.schools.find(s => s.id === schoolId);
        const newClass = {
            id: DB.classes.length + 1,
            name: name,
            level: level,
            school_id: schoolId,
            school_name: school ? school.name : 'Non definie',
            teacher_id: teacherId,
            capacity: capacity,
            created_at: new Date().toISOString().split('T')[0],
            status: 'Actif'
        };
        
        DB.classes.push(newClass);
        
        NotificationSystem.send(`school_${schoolId}`, 
            `<strong>${name}</strong> a ete creee avec succès`,
            'success'
        );
        
        if (teacherId) {
            const teacher = DB.teachers.find(t => t.id === teacherId);
            if (teacher) {
                NotificationSystem.send(teacher.id, 
                    `Vous avez ete assigne comme enseignant principal de la classe <strong>${name}</strong>`,
                    'info'
                );
            }
        }
        
        NotificationSystem.send('admin', 
            `<strong>${name}</strong> a ete creee dans ${school ? school.name : 'une ecole'}`,
            'info'
        );
        
        SyncSystem.sync();
        
        closeModal();
        showToast(`Classe ${name} creee avec succès !`, 'success');
        loadPageData('classes');
        loadPageData('dashboard');
    });
}

// ===== MODIFIER UNE CLASSE =====
function editClass(id) {
    if (userRole !== 'school' && userRole !== 'admin') {
        showToast('Seul une école ou l\'administrateur peut modifier une classe', 'error');
        return;
    }
    
    const classData = DB.classes.find(c => c.id === id);
    if (!classData) return;
    
    // Vérifier que l'école a le droit de modifier
    if (userRole === 'school' && classData.school_id !== userSchoolId) {
        showToast('Vous ne pouvez pas modifier une classe d\'une autre école', 'error');
        return;
    }
    
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    const teachers = DB.teachers.filter(t => t.school_id === classData.school_id);
    
    showModal(`✏️ Modifier ${classData.name}`, `
        <form id="editClassForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Nom de la classe</label>
                    <input type="text" class="form-control" id="editClassName" value="${classData.name}" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Niveau</label>
                    <select class="form-select" id="editClassLevel">
                        <option value="Maternelle" ${classData.level === 'Maternelle' ? 'selected' : ''}>Maternelle</option>
                        <option value="CP" ${classData.level === 'CP' ? 'selected' : ''}>CP</option>
                        <option value="CE1" ${classData.level === 'CE1' ? 'selected' : ''}>CE1</option>
                        <option value="CE2" ${classData.level === 'CE2' ? 'selected' : ''}>CE2</option>
                        <option value="CM1" ${classData.level === 'CM1' ? 'selected' : ''}>CM1</option>
                        <option value="CM2" ${classData.level === 'CM2' ? 'selected' : ''}>CM2</option>
                        <option value="6ème" ${classData.level === '6ème' ? 'selected' : ''}>6ème</option>
                        <option value="5ème" ${classData.level === '5ème' ? 'selected' : ''}>5ème</option>
                        <option value="4ème" ${classData.level === '4ème' ? 'selected' : ''}>4ème</option>
                        <option value="3ème" ${classData.level === '3ème' ? 'selected' : ''}>3ème</option>
                        <option value="Seconde" ${classData.level === 'Seconde' ? 'selected' : ''}>Seconde</option>
                        <option value="Première" ${classData.level === 'Première' ? 'selected' : ''}>Première</option>
                        <option value="Terminale" ${classData.level === 'Terminale' ? 'selected' : ''}>Terminale</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">École</label>
                    <select class="form-select" id="editClassSchool" ${userRole === 'school' ? 'disabled' : ''}>
                        ${schools.map(s => `<option value="${s.id}" ${s.id === classData.school_id ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                    ${userRole === 'school' ? '<small class="text-secondary">Vous ne pouvez pas changer l\'école</small>' : ''}
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Enseignant principal</label>
                    <select class="form-select" id="editClassTeacher">
                        <option value="">Non assigné</option>
                        ${teachers.map(t => `<option value="${t.id}" ${t.id === classData.teacher_id ? 'selected' : ''}>${t.first_name} ${t.last_name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Capacité</label>
                    <input type="number" class="form-control" id="editClassCapacity" value="${classData.capacity || 30}">
                </div>
                <div class="col-md-6">
                    <label class="form-label fw-semibold">Statut</label>
                    <select class="form-select" id="editClassStatus">
                        <option value="Actif" ${classData.status === 'Actif' ? 'selected' : ''}>Actif</option>
                        <option value="Inactif" ${classData.status === 'Inactif' ? 'selected' : ''}>Inactif</option>
                        <option value="Fermée" ${classData.status === 'Fermée' ? 'selected' : ''}>Fermée</option>
                    </select>
                </div>
            </div>
        </form>
    `, () => {
        const name = document.getElementById('editClassName').value;
        const level = document.getElementById('editClassLevel').value;
        const teacherId = parseInt(document.getElementById('editClassTeacher').value) || null;
        const capacity = parseInt(document.getElementById('editClassCapacity').value) || 30;
        const status = document.getElementById('editClassStatus').value;
        
        if (!name || !level) {
            showToast('Veuillez remplir tous les champs', 'error');
            return;
        }

        classData.name = name;
        classData.level = level;
        classData.teacher_id = teacherId;
        classData.capacity = capacity;
        classData.status = status;
        
        if (userRole === 'admin') {
            const schoolId = parseInt(document.getElementById('editClassSchool').value);
            const school = DB.schools.find(s => s.id === schoolId);
            classData.school_id = schoolId;
            classData.school_name = school ? school.name : 'Non définie';
        }
        
        closeModal();
        showToast(`Classe ${name} modifiée avec succès !`, 'success');
        loadPageData('classes');
        loadPageData('dashboard');
    });
}

// ===== SUPPRIMER UNE CLASSE =====
function deleteClass(id) {
    if (userRole !== 'school' && userRole !== 'admin') {
        showToast('Seul une école ou l\'administrateur peut supprimer une classe', 'error');
        return;
    }
    
    const classData = DB.classes.find(c => c.id === id);
    if (!classData) return;
    
    // Vérifier que l'école a le droit de supprimer
    if (userRole === 'school' && classData.school_id !== userSchoolId) {
        showToast('Vous ne pouvez pas supprimer une classe d\'une autre école', 'error');
        return;
    }
    
    // Vérifier s'il y a des étudiants dans cette classe
    const students = DB.students.filter(s => s.class === classData.name && s.school_id === classData.school_id);
    if (students.length > 0) {
        if (!confirm(`⚠️ Cette classe contient ${students.length} étudiant(s). Voulez-vous vraiment la supprimer ?`)) return;
        // Option: réassigner les étudiants
        if (confirm('Voulez-vous réassigner les étudiants à une autre classe ?')) {
            showToast('Fonctionnalité de réassignation à venir', 'info');
        }
    }
    
    if (!confirm(`Voulez-vous vraiment supprimer la classe ${classData.name} ?`)) return;
    
    DB.classes = DB.classes.filter(c => c.id !== id);
    showToast(`Classe ${classData.name} supprimée avec succès !`, 'success');
    loadPageData('classes');
    loadPageData('dashboard');
}
// ============================================================
// 15. RAPPORTS - GÉNÉRATION PDF STYLE CONGOLAIS
// ============================================================

// Charger jsPDF et autoTable
// Ajouter dans index.html avant le script app.js :
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

function generateReport(type) {
    const container = document.getElementById('reportResult');
    
    // Afficher un indicateur de chargement
    container.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-2">Génération du rapport en cours...</p>
        </div>
    `;
    
    // Générer le rapport avec un léger délai pour l'effet visuel
    setTimeout(() => {
        switch(type) {
            case 'students': generateStudentsReport(); break;
            case 'payments': generatePaymentsReport(); break;
            case 'schools': generateSchoolsReport(); break;
            case 'parents': generateParentsReport(); break;
            case 'classes': generateClassesReport(); break;
            case 'teacher': generateTeacherReport(); break;
            default: showToast('Type de rapport non reconnu', 'error');
        }
    }, 500);
}

// ============================================================
// 15.1 RAPPORT DES ÉTUDIANTS
// ============================================================

function generateStudentsReport() {
    const students = userRole === 'school' ? 
        DB.students.filter(s => s.school_id === userSchoolId) : 
        DB.students;
    
    const schoolName = userRole === 'school' ? 
        DB.schools.find(s => s.id === userSchoolId)?.name || 'Mon Ecole' : 
        'REPUBLIQUE DEMOCRATIQUE DU CONGO';
    
    const doc = createPDFDocument('RAPPORT DES ETUDIANTS', schoolName);
    
    // Statistiques
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Actif').length;
    const inactiveStudents = students.filter(s => s.status === 'Inactif').length;
    const schoolsCount = [...new Set(students.map(s => s.school))].length;
    
    // Ajouter les statistiques
    doc.setFontSize(11);
    doc.text(`Total des etudiants : ${totalStudents}`, 14, 35);
    doc.text(`Etudiants actifs : ${activeStudents}`, 14, 42);
    doc.text(`Etudiants inactifs : ${inactiveStudents}`, 14, 49);
    doc.text(`Nombre d'ecoles : ${schoolsCount}`, 14, 56);
    
    // Tableau des étudiants
    const tableData = students.map(s => [
        s.matricule || 'N/A',
        s.last_name || '',
        s.first_name || '',
        s.class || 'N/A',
        s.school || 'N/A',
        s.status || 'N/A'
    ]);
    
    doc.autoTable({
        startY: 63,
        head: [['Matricule', 'Nom', 'Prenom', 'Classe', 'Ecole', 'Statut']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [79, 70, 229],
            textColor: [255, 255, 255],
            fontSize: 10,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 9
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto'
    });
    
    // Ajouter le pied de page
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    // Sauvegarder le PDF
    const filename = `rapport_etudiants_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    // Afficher dans l'interface
    showReportResult('students', students.length, filename);
    showToast('Rapport PDF genere avec succes', 'success');
}

// ============================================================
// 15.2 RAPPORT DES PAIEMENTS
// ============================================================

function generatePaymentsReport() {
    const payments = userRole === 'school' ? 
        DB.payments.filter(p => p.school_id === userSchoolId) : 
        DB.payments;
    
    const schoolName = userRole === 'school' ? 
        DB.schools.find(s => s.id === userSchoolId)?.name || 'Mon Ecole' : 
        'REPUBLIQUE DEMOCRATIQUE DU CONGO';
    
    const doc = createPDFDocument('RAPPORT DES PAIEMENTS', schoolName);
    
    // Statistiques
    const totalPayments = payments.length;
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const completedPayments = payments.filter(p => p.status === 'completed').length;
    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const completedAmount = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    
    // Ajouter les statistiques avec mise en forme
    doc.setFontSize(11);
    doc.text(`Total des paiements : ${totalPayments}`, 14, 35);
    doc.text(`Montant total : ${totalAmount.toLocaleString()} FCFA`, 14, 42);
    doc.text(`Paiements effectues : ${completedPayments} (${completedAmount.toLocaleString()} FCFA)`, 14, 49);
    doc.text(`Paiements en attente : ${pendingPayments}`, 14, 56);
    
    // Tableau des paiements
    const tableData = payments.map(p => [
        p.invoice || 'N/A',
        p.student || 'N/A',
        p.amount?.toLocaleString() + ' FCFA' || '0 FCFA',
        p.method || 'N/A',
        p.type || 'N/A',
        p.status === 'completed' ? 'Paye' : 'En attente',
        p.date || 'N/A'
    ]);
    
    doc.autoTable({
        startY: 63,
        head: [['Facture', 'Etudiant', 'Montant', 'Methode', 'Type', 'Statut', 'Date']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [79, 70, 229],
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 8
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        columnStyles: {
            2: { halign: 'right' },
            5: { 
                cellWidth: 20,
                halign: 'center'
            }
        },
        didParseCell: function(data) {
            if (data.section === 'body' && data.column.index === 5) {
                if (data.cell.raw === 'Paye') {
                    data.cell.styles.fillColor = [209, 250, 229];
                    data.cell.styles.textColor = [6, 95, 70];
                } else {
                    data.cell.styles.fillColor = [254, 243, 199];
                    data.cell.styles.textColor = [146, 64, 14];
                }
            }
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto'
    });
    
    // Ajouter le résumé
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text('Resume financier :', 14, finalY);
    doc.text(`Total encaisse : ${completedAmount.toLocaleString()} FCFA`, 14, finalY + 7);
    doc.text(`Total en attente : ${(totalAmount - completedAmount).toLocaleString()} FCFA`, 14, finalY + 14);
    
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    const filename = `rapport_paiements_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    showReportResult('payments', payments.length, filename);
    showToast('Rapport PDF genere avec succes', 'success');
}

// ============================================================
// 15.3 RAPPORT DES ÉCOLES
// ============================================================

function generateSchoolsReport() {
    const schools = userRole === 'admin' ? DB.schools : DB.schools.filter(s => s.id === userSchoolId);
    
    const doc = createPDFDocument('RAPPORT DES ECOLES', 'REPUBLIQUE DEMOCRATIQUE DU CONGO');
    
    // Statistiques
    const totalSchools = schools.length;
    const totalStudents = DB.students.length;
    const totalTeachers = DB.teachers.length;
    const totalClasses = DB.classes.length;
    
    doc.setFontSize(11);
    doc.text(`Total des ecoles : ${totalSchools}`, 14, 35);
    doc.text(`Total des etudiants : ${totalStudents}`, 14, 42);
    doc.text(`Total des enseignants : ${totalTeachers}`, 14, 49);
    doc.text(`Total des classes : ${totalClasses}`, 14, 56);
    
    // Tableau des écoles
    const tableData = schools.map(s => {
        const studentsCount = DB.students.filter(st => st.school_id === s.id).length;
        const teachersCount = DB.teachers.filter(t => t.school_id === s.id).length;
        const classesCount = DB.classes.filter(c => c.school_id === s.id).length;
        const payments = DB.payments.filter(p => p.school_id === s.id);
        const revenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
        
        return [
            s.code || 'N/A',
            s.name || 'N/A',
            studentsCount,
            teachersCount,
            classesCount,
            revenue.toLocaleString() + ' FCFA',
            s.status || 'N/A'
        ];
    });
    
    doc.autoTable({
        startY: 63,
        head: [['Code', 'Nom de l\'ecole', 'Etudiants', 'Enseignants', 'Classes', 'Revenus', 'Statut']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [79, 70, 229],
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 8
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        columnStyles: {
            5: { halign: 'right' }
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto'
    });
    
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    const filename = `rapport_ecoles_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    showReportResult('schools', schools.length, filename);
    showToast('Rapport PDF genere avec succes', 'success');
}

// ============================================================
// 15.4 RAPPORT DES PARENTS
// ============================================================

function generateParentsReport() {
    const parents = DB.parentAccounts;
    
    const doc = createPDFDocument('RAPPORT DES PARENTS', 'REPUBLIQUE DEMOCRATIQUE DU CONGO');
    
    // Statistiques
    const totalParents = parents.length;
    const totalChildren = parents.reduce((sum, p) => sum + p.children_ids.length, 0);
    const parentsWithChildren = parents.filter(p => p.children_ids.length > 0).length;
    
    doc.setFontSize(11);
    doc.text(`Total des parents : ${totalParents}`, 14, 35);
    doc.text(`Total des enfants : ${totalChildren}`, 14, 42);
    doc.text(`Parents avec enfants : ${parentsWithChildren}`, 14, 49);
    
    // Tableau des parents
    const tableData = parents.map(p => [
        p.code || 'N/A',
        p.name || 'N/A',
        p.email || 'N/A',
        p.phone || 'N/A',
        p.children_ids.length || 0,
        p.children_ids.map(id => {
            const child = DB.students.find(s => s.id === id);
            return child ? `${child.first_name} ${child.last_name}` : 'N/A';
        }).join(', ') || 'Aucun'
    ]);
    
    doc.autoTable({
        startY: 56,
        head: [['Code', 'Nom', 'Email', 'Telephone', 'Enfants', 'Noms des enfants']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [236, 72, 153],
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 8
        },
        alternateRowStyles: {
            fillColor: [252, 248, 250]
        },
        columnStyles: {
            5: { cellWidth: 50 }
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto'
    });
    
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    const filename = `rapport_parents_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    showReportResult('parents', parents.length, filename);
    showToast('Rapport PDF genere avec succes', 'success');
}

// ============================================================
// 15.5 RAPPORT DES CLASSES
// ============================================================

function generateClassesReport() {
    const classes = userRole === 'school' ? 
        DB.classes.filter(c => c.school_id === userSchoolId) : 
        DB.classes;
    
    const schoolName = userRole === 'school' ? 
        DB.schools.find(s => s.id === userSchoolId)?.name || 'Mon Ecole' : 
        'REPUBLIQUE DEMOCRATIQUE DU CONGO';
    
    const doc = createPDFDocument('RAPPORT DES CLASSES', schoolName);
    
    // Statistiques
    const totalClasses = classes.length;
    const totalStudents = DB.students.filter(s => 
        classes.some(c => c.name === s.class && c.school_id === s.school_id)
    ).length;
    const totalTeachers = [...new Set(classes.map(c => c.teacher_id))].filter(id => id).length;
    
    doc.setFontSize(11);
    doc.text(`Total des classes : ${totalClasses}`, 14, 35);
    doc.text(`Total des etudiants : ${totalStudents}`, 14, 42);
    doc.text(`Total des enseignants : ${totalTeachers}`, 14, 49);
    
    // Tableau des classes
    const tableData = classes.map(c => {
        const teacher = DB.teachers.find(t => t.id === c.teacher_id);
        const students = DB.students.filter(s => s.class === c.name && s.school_id === c.school_id);
        const payments = DB.payments.filter(p => students.some(s => s.id === p.student_id));
        const revenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
        
        return [
            c.name || 'N/A',
            c.level || 'N/A',
            students.length || 0,
            teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Non assigne',
            revenue.toLocaleString() + ' FCFA',
            c.status || 'N/A'
        ];
    });
    
    doc.autoTable({
        startY: 56,
        head: [['Nom', 'Niveau', 'Etudiants', 'Enseignant', 'Revenus', 'Statut']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [79, 70, 229],
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 8
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        columnStyles: {
            4: { halign: 'right' }
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto'
    });
    
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    const filename = `rapport_classes_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    showReportResult('classes', classes.length, filename);
    showToast('Rapport PDF genere avec succes', 'success');
}

// ============================================================
// 15.6 RAPPORT D'UN ENSEIGNANT SPÉCIFIQUE
// ============================================================

function generateTeacherReport() {
    // Si un enseignant est connecté, générer son rapport
    if (userRole === 'teacher') {
        const teacher = DB.teachers.find(t => t.id === currentUser?.id);
        if (teacher) {
            generateSingleTeacherReport(teacher.id);
            return;
        }
    }
    
    // Sinon, demander quel enseignant
    showModal('Rapport d\'un enseignant', `
        <div class="mb-3">
            <label class="form-label fw-semibold">Selectionner un enseignant</label>
            <select class="form-select" id="reportTeacherSelect">
                ${DB.teachers.map(t => 
                    `<option value="${t.id}">${t.first_name} ${t.last_name} - ${t.subject}</option>`
                ).join('')}
            </select>
        </div>
        <p class="text-secondary small">Le rapport contiendra : informations personnelles, classes, etudiants, paiements</p>
    `, () => {
        const teacherId = parseInt(document.getElementById('reportTeacherSelect').value);
        if (teacherId) {
            generateSingleTeacherReport(teacherId);
        }
    });
}

function generateSingleTeacherReport(teacherId) {
    const teacher = DB.teachers.find(t => t.id === teacherId);
    if (!teacher) {
        showToast('Enseignant non trouve', 'error');
        return;
    }
    
    const doc = createPDFDocument('RAPPORT ENSEIGNANT', teacher.school || 'REPUBLIQUE DEMOCRATIQUE DU CONGO');
    
    // Informations personnelles
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${teacher.first_name} ${teacher.last_name}`, 14, 35);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Matricule : ${teacher.matricule || 'N/A'}`, 14, 42);
    doc.text(`Matiere : ${teacher.subject || 'N/A'}`, 14, 49);
    doc.text(`Ecole : ${teacher.school || 'N/A'}`, 14, 56);
    doc.text(`Email : ${teacher.email || 'N/A'}`, 14, 63);
    doc.text(`Telephone : ${teacher.phone || 'N/A'}`, 14, 70);
    doc.text(`Statut : ${teacher.status || 'Actif'}`, 14, 77);
    
    let currentY = 84;
    
    // Classes enseignées
    const classes = DB.classes.filter(c => c.teacher_id === teacherId);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Classes enseignees :', 14, currentY);
    currentY += 7;
    
    if (classes.length === 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Aucune classe assignee', 14, currentY);
        currentY += 10;
    } else {
        const classData = classes.map(c => [
            c.name || 'N/A',
            c.level || 'N/A',
            DB.students.filter(s => s.class === c.name && s.school_id === c.school_id).length || 0
        ]);
        
        doc.autoTable({
            startY: currentY,
            head: [['Classe', 'Niveau', 'Etudiants']],
            body: classData,
            theme: 'grid',
            headStyles: {
                fillColor: [79, 70, 229],
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 8
            },
            alternateRowStyles: {
                fillColor: [245, 247, 250]
            },
            margin: { left: 14, right: 14 },
            pageBreak: 'auto'
        });
        
        currentY = doc.lastAutoTable.finalY + 10;
    }
    
    // Étudiants
    const classNames = classes.map(c => c.name);
    const students = DB.students.filter(s => classNames.includes(s.class) && s.school_id === teacher.school_id);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Etudiants (${students.length}) :`, 14, currentY);
    currentY += 7;
    
    if (students.length > 0) {
        const studentData = students.map(s => [
            s.matricule || 'N/A',
            s.last_name || '',
            s.first_name || '',
            s.class || 'N/A',
            s.status || 'N/A'
        ]);
        
        doc.autoTable({
            startY: currentY,
            head: [['Matricule', 'Nom', 'Prenom', 'Classe', 'Statut']],
            body: studentData.slice(0, 50),
            theme: 'grid',
            headStyles: {
                fillColor: [79, 70, 229],
                textColor: [255, 255, 255],
                fontSize: 8,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 7
            },
            alternateRowStyles: {
                fillColor: [245, 247, 250]
            },
            margin: { left: 14, right: 14 },
            pageBreak: 'auto'
        });
        
        if (students.length > 50) {
            const finalY = doc.lastAutoTable.finalY + 7;
            doc.setFontSize(8);
            doc.text(`... et ${students.length - 50} autres etudiants`, 14, finalY);
        }
    } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Aucun etudiant', 14, currentY);
    }
    
    addFooter(doc, 'Rapport genere le ' + new Date().toLocaleDateString('fr-FR'));
    
    const filename = `rapport_enseignant_${teacher.last_name}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    showToast(`Rapport de ${teacher.first_name} ${teacher.last_name} genere`, 'success');
}

// ============================================================
// 15.7 FONCTIONS UTILITAIRES POUR LES PDF
// ============================================================

function createPDFDocument(title, institution) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // En-tete officiel avec bande colorée
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    // Titre de l'institution
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(institution.toUpperCase(), pageWidth / 2, 20, { align: 'center' });
    
    // Sous-titre
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Systeme Integre de Gestion Scolaire - EduGest', pageWidth / 2, 26, { align: 'center' });
    
    // Ligne de separation
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.5);
    doc.line(14, 29, pageWidth - 14, 29);
    
    // Titre du rapport
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(title, pageWidth / 2, 35, { align: 'center' });
    
    return doc;
}

function addFooter(doc, text) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Pied de page
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 15, pageWidth - 14, pageHeight - 15);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text(text, pageWidth / 2, pageHeight - 8, { align: 'center' });
    
    // Numero de page
    const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
    const totalPages = doc.internal.getNumberOfPages();
    doc.text(`Page ${pageNumber} / ${totalPages}`, pageWidth - 14, pageHeight - 8, { align: 'right' });
}

function showReportResult(type, count, filename) {
    const container = document.getElementById('reportResult');
    const icons = {
        students: 'bi-people',
        payments: 'bi-credit-card',
        schools: 'bi-building',
        parents: 'bi-person-heart',
        classes: 'bi-easel',
        teacher: 'bi-person-video3'
    };
    
    const colors = {
        students: 'primary',
        payments: 'success',
        schools: 'secondary',
        parents: 'pink',
        classes: 'info',
        teacher: 'warning'
    };
    
    const titles = {
        students: 'Etudiants',
        payments: 'Paiements',
        schools: 'Ecoles',
        parents: 'Parents',
        classes: 'Classes',
        teacher: 'Enseignant'
    };
    
    const color = colors[type] || 'success';
    const icon = icons[type] || 'bi-file-earmark-pdf';
    
    container.innerHTML = `
        <div class="alert alert-${color} mt-3">
            <div class="d-flex align-items-center gap-3">
                <i class="bi ${icon}" style="font-size:2rem;"></i>
                <div>
                    <h6 class="mb-0">Rapport genere avec succes</h6>
                    <p class="mb-0 small text-muted">
                        ${count} ${titles[type] || 'elements'} • ${filename}
                    </p>
                </div>
                <div class="ms-auto">
                    <button class="btn btn-${color} btn-sm" onclick="window.open('${filename}')">
                        <i class="bi bi-download"></i> Telecharger
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="document.getElementById('reportResult').innerHTML = ''">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// 15.8 RAPPORT RAPIDE DEPUIS LE TABLEAU DE BORD
// ============================================================

function generateQuickReport() {
    showModal('Generer un rapport rapide', `
        <div class="row g-3">
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('students');closeModal();">
                    <i class="bi bi-people" style="font-size:2rem;color:var(--primary);"></i>
                    <h6 class="mt-2">Etudiants</h6>
                    <small class="text-muted">Liste complete des etudiants</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('payments');closeModal();">
                    <i class="bi bi-credit-card" style="font-size:2rem;color:var(--success);"></i>
                    <h6 class="mt-2">Paiements</h6>
                    <small class="text-muted">Historique des paiements</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('schools');closeModal();">
                    <i class="bi bi-building" style="font-size:2rem;color:var(--secondary);"></i>
                    <h6 class="mt-2">Ecoles</h6>
                    <small class="text-muted">Liste des ecoles</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('parents');closeModal();">
                    <i class="bi bi-person-heart" style="font-size:2rem;color:var(--parent-color);"></i>
                    <h6 class="mt-2">Parents</h6>
                    <small class="text-muted">Liste des parents</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('classes');closeModal();">
                    <i class="bi bi-easel" style="font-size:2rem;color:var(--info);"></i>
                    <h6 class="mt-2">Classes</h6>
                    <small class="text-muted">Liste des classes</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 border rounded-3 text-center report-card" style="cursor:pointer;" onclick="generateReport('teacher');closeModal();">
                    <i class="bi bi-person-video3" style="font-size:2rem;color:var(--warning);"></i>
                    <h6 class="mt-2">Enseignant</h6>
                    <small class="text-muted">Rapport d'un enseignant</small>
                </div>
            </div>
        </div>
    `, null);
}
// ============================================================
// 16. PARAMÈTRES
// ============================================================

function clearData() {
    if (!confirm('⚠️ Voulez-vous vraiment vider toutes les données ? Cette action est irréversible.')) return;
    DB.students = [];
    DB.payments = [];
    DB.messages = [];
    DB.notifications = [];
    showToast('Toutes les données ont été vidées', 'warning');
    loadPageData('dashboard');
}

function exportData() {
    const data = {
        schools: DB.schools,
        schoolAccounts: DB.schoolAccounts,
        parentAccounts: DB.parentAccounts,
        students: DB.students,
        payments: DB.payments,
        teachers: DB.teachers,
        classes: DB.classes,
        messages: DB.messages,
        notifications: DB.notifications,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edugest_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Données exportées avec succès !', 'success');
}

// ============================================================
// 17. MODAL
// ============================================================

function showModal(title, body, callback) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modalFooter').style.display = callback ? 'flex' : 'none';
    modalCallback = callback || null;
    const modal = new bootstrap.Modal(document.getElementById('appModal'));
    modal.show();
}

function closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('appModal'));
    if (modal) modal.hide();
}

function modalSave() {
    if (modalCallback) {
        modalCallback();
    }
}

// ============================================================
// 18. TOAST
// ============================================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast-custom ${type}`;
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-exclamation-circle-fill',
        info: 'bi-info-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        pink: 'bi-heart-fill'
    };
    toast.innerHTML = `<i class="bi ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// ============================================================
// 19. PROFIL
// ============================================================

function showProfile() {
    showModal('👤 Mon profil', `
        <div class="text-center mb-3">
            <div style="width:80px;height:80px;border-radius:50%;background:${userRole === 'parent' ? 'var(--parent-color)' : 'linear-gradient(135deg,var(--primary),var(--secondary))'};display:inline-flex;align-items:center;justify-content:center;color:white;font-size:2rem;font-weight:600;">${document.getElementById('userAvatar').textContent}</div>
            <h5 class="mt-2">${document.getElementById('userName').textContent}</h5>
            <p class="text-secondary small">${document.getElementById('userRole').textContent}</p>
        </div>
        <div class="row g-2">
            <div class="col-6"><strong>Rôle :</strong> ${userRole === 'admin' ? 'Administrateur' : userRole === 'school' ? 'École' : userRole === 'parent' ? 'Parent' : 'Enseignant'}</div>
            <div class="col-6"><strong>Statut :</strong> <span class="badge bg-success">Connecté</span></div>
            <div class="col-12"><strong>Dernière connexion :</strong> ${new Date().toLocaleString('fr-FR')}</div>
            ${currentUser ? `
                <div class="col-12"><strong>Code :</strong> ${currentUser.code || 'N/A'}</div>
            ` : ''}
        </div>
    `, null);
}



// ============================================================
// INITIALISATION DE LA SYNCHRONISATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    SyncSystem.init();
    
    EventSystem.on('refreshUI', function() {
        loadPageData(currentPage);
        if (currentPage === 'dashboard') {
            loadDashboard();
        }
    });
    
    EventSystem.on('notification', function(notification) {
        const type = notification.type || 'info';
        showToast(notification.text, type);
    });
});

// Exposer les fonctions globalement
window.selectRole = selectRole;
window.handleLogin = handleLogin;
window.navigateTo = navigateTo;
window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.showToast = showToast;
window.showProfile = showProfile;
window.showSchoolCodes = showSchoolCodes;
window.showParentCodes = showParentCodes;
window.showStudentForm = showStudentForm;
window.viewStudent = viewStudent;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.showPaymentForm = showPaymentForm;
window.showPaymentFormForStudent = showPaymentFormForStudent;
window.viewPayment = viewPayment;
window.validatePayment = validatePayment;
window.deletePayment = deletePayment;
window.showMessageForm = showMessageForm;
window.markMessageRead = markMessageRead;
window.showSchoolForm = showSchoolForm;
window.editSchool = editSchool;
window.deleteSchool = deleteSchool;
window.showParentForm = showParentForm;
window.viewParent = viewParent;
window.editParent = editParent;
window.deleteParent = deleteParent;
window.showTeacherForm = showTeacherForm;
window.showClassForm = showClassForm;
window.generateReport = generateReport;
window.clearData = clearData;
window.exportData = exportData;
window.closeModal = closeModal;
window.modalSave = modalSave;

window.toggleParentFields = toggleParentFields;
window.SyncSystem = SyncSystem;
window.NotificationSystem = NotificationSystem;
window.EventSystem = EventSystem;

window.generateReceipt = generateReceipt;
window.generateStudentReceipt = generateStudentReceipt;