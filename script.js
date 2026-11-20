/**
 * MAKE ME GLOW - Salón de Maquillaje y Peinados
 * Puerto Iguazú, Misiones, Argentina
 * Script interactivo: Animaciones suaves, Drawer móvil, Filtros, Modal, Reservas y Calculadora de Costos
 */

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------------
    // 1. ANIMACIONES SUAVES AL HACER SCROLL (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------------------
    // 2. MENÚ MÓVIL (DRAWER INDEPENDIENTE & OVERLAY)
    // -------------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer && mobileDrawer.classList.contains('active');
            if (isOpen) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        });
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeMobileDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    // Cerrar automáticamente el drawer si se agranda la ventana a tamaño escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileDrawer();
        }
    });

    // -------------------------------------------------------------------------
    // 3. CAMBIO DE ESTADO DEL HEADER AL SCROLLEAR & BACK TO TOP
    // -------------------------------------------------------------------------
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sombrado sutil en header al bajar
        if (scrollPos > 35) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        // Mostrar u ocultar botón de volver arriba
        if (scrollPos > 400) {
            if (backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('show');
        }

        // Resaltar link activo en menú según la sección visible
        highlightActiveNavLink();
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. RESALTADO AUTOMÁTICO DE LINKS DE NAVEGACIÓN
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id], header[id]');

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 130;
            const sectionId = current.getAttribute('id');
            const matchingLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);

            if (matchingLinks.length > 0) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    matchingLinks.forEach(link => link.classList.add('active'));
                } else {
                    matchingLinks.forEach(link => link.classList.remove('active'));
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. FILTRADO DE SERVICIOS
    // -------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 6. CONTROL DEL CAMPO DE DIRECCIÓN SEGÚN MODALIDAD
    // -------------------------------------------------------------------------
    const serviceLocationSelect = document.getElementById('service-location');
    const addressGroup = document.getElementById('address-group');
    const addressInput = document.getElementById('client-address');

    if (serviceLocationSelect && addressGroup) {
        serviceLocationSelect.addEventListener('change', (e) => {
            if (e.target.value.includes('Domicilio')) {
                addressGroup.style.display = 'block';
                if (addressInput) addressInput.setAttribute('required', 'required');
            } else {
                addressGroup.style.display = 'none';
                if (addressInput) {
                    addressInput.removeAttribute('required');
                    addressInput.value = '';
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 7. ENVÍO DE FORMULARIO A WHATSAPP
    // -------------------------------------------------------------------------
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('client-name').value.trim();
            const service = document.getElementById('service-select').value;
            const location = document.getElementById('service-location').value;
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const address = document.getElementById('client-address') ? document.getElementById('client-address').value.trim() : '';
            const notes = document.getElementById('client-notes').value.trim();

            const whatsappNumber = '5493757215209';

            let message = `¡Hola *Make Me Glow*! ✨ Me gustaría agendar una cita:\n\n`;
            message += `👤 *Nombre:* ${name}\n`;
            message += `💄 *Servicio:* ${service}\n`;
            message += `📍 *Modalidad:* ${location}\n`;
            if (address && location.includes('Domicilio')) {
                message += `🏨 *Dirección / Hotel en Iguazú:* ${address}\n`;
            }
            message += `📅 *Fecha:* ${date}\n`;
            message += `⏰ *Hora aproximada:* ${time} hs\n`;
            if (notes) {
                message += `📝 *Detalles:* ${notes}\n`;
            }
            message += `\n¿Tienen disponibilidad para esa fecha? ¡Muchas gracias!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // -------------------------------------------------------------------------
    // 8. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    // -------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // -------------------------------------------------------------------------
    // 9. CONFIGURAR FECHA MÍNIMA EN CALENDARIO (DESDE HOY EN ADELANTE)
    // -------------------------------------------------------------------------
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // -------------------------------------------------------------------------
    // 10. INICIALIZACIÓN DE LA CALCULADORA DE COSTOS & SESIÓN ADMIN
    // -------------------------------------------------------------------------
    initCalculatorSection();
});

// =============================================================================
// GESTIÓN DE ACCESO PROTEGIDO Y CALCULADORA FINANCIERA
// =============================================================================

// CONTRASEÑA DEFINIDA PARA EL ACCESO PROTEGIDO
const ADMIN_PASSWORD = 'micro2026';

/**
 * Inicializa el estado de la calculadora y carga datos guardados
 */
function initCalculatorSection() {
    const isAuth = sessionStorage.getItem('mmg_admin_auth') === 'true';
    const authBox = document.getElementById('calc-auth-box');
    const dashWrapper = document.getElementById('calc-dashboard-wrapper');

    if (isAuth && authBox && dashWrapper) {
        authBox.style.display = 'none';
        dashWrapper.style.display = 'block';
    }

    // Listeners para recálculo en vivo al modificar cualquier input
    const calcTriggers = document.querySelectorAll('.calc-trigger');
    calcTriggers.forEach(input => {
        input.addEventListener('input', updateCalculations);
    });

    const calcTriggerText = document.querySelectorAll('.calc-trigger-text');
    calcTriggerText.forEach(input => {
        input.addEventListener('input', () => {
            const titleEl = document.getElementById('res-item-title');
            if (titleEl) titleEl.textContent = input.value || 'Servicio Personalizado';
        });
    });

    // Slider de margen de ganancia
    const profitSlider = document.getElementById('profit-margin');
    const marginBadge = document.getElementById('lbl-margin-val');
    if (profitSlider && marginBadge) {
        profitSlider.addEventListener('input', () => {
            marginBadge.textContent = `${profitSlider.value}%`;
            updateCalculations();
        });
    }

    // Renderizar la tabla de precios guardados desde localStorage
    renderSavedPricesTable();

    // Ejecutar primer cálculo inicial
    updateCalculations();
}

/**
 * Procesa el envío del formulario de contraseña
 */
function handleAuthSubmit() {
    const pwdInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('auth-error-msg');
    const authBox = document.getElementById('calc-auth-box');
    const dashWrapper = document.getElementById('calc-dashboard-wrapper');

    if (!pwdInput) return;

    if (pwdInput.value.trim() === ADMIN_PASSWORD) {
        if (errorMsg) errorMsg.style.display = 'none';
        sessionStorage.setItem('mmg_admin_auth', 'true');

        if (authBox) authBox.style.display = 'none';
        if (dashWrapper) {
            dashWrapper.style.display = 'block';
            updateCalculations();
        }

        const section = document.getElementById('costos');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
        if (errorMsg) {
            errorMsg.style.display = 'flex';
            pwdInput.classList.add('input-error');
            setTimeout(() => pwdInput.classList.remove('input-error'), 800);
        }
    }
}

/**
 * Alterna entre ver y ocultar la contraseña escrita
 */
function togglePasswordVisibility() {
    const pwdInput = document.getElementById('admin-password');
    const eyeIcon = document.getElementById('password-eye-icon');

    if (pwdInput && eyeIcon) {
        if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            pwdInput.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    }
}

/**
 * Bloquea la sesión del panel y vuelve a pedir la clave
 */
function lockCalculator() {
    sessionStorage.removeItem('mmg_admin_auth');
    const authBox = document.getElementById('calc-auth-box');
    const dashWrapper = document.getElementById('calc-dashboard-wrapper');
    const pwdInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('auth-error-msg');

    if (dashWrapper) dashWrapper.style.display = 'none';
    if (authBox) authBox.style.display = 'block';
    if (pwdInput) pwdInput.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    const section = document.getElementById('costos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Formatea un número a moneda argentina ($ 12.345)
 * @param {number} num 
 * @returns {string}
 */
function formatCurrency(num) {
    if (isNaN(num)) return '$ 0';
    return '$ ' + Math.round(num).toLocaleString('es-AR');
}

/**
 * Realiza el cálculo matemático completo de Costo Fijo, Costo Variable, Costo Total y Precio
 */
function updateCalculations() {
    // 1. Identificación y Clientes Mensuales
    const monthlyClients = Math.max(1, parseFloat(document.getElementById('monthly-clients')?.value) || 40);

    // 2. Costos Fijos Mensuales
    const rent = parseFloat(document.getElementById('fixed-rent')?.value) || 0;
    const services = parseFloat(document.getElementById('fixed-services')?.value) || 0;
    const salary = parseFloat(document.getElementById('fixed-salary')?.value) || 0;
    const marketing = parseFloat(document.getElementById('fixed-marketing')?.value) || 0;
    const otherFixed = parseFloat(document.getElementById('fixed-other')?.value) || 0;

    const totalFixedMonthly = rent + services + salary + marketing + otherFixed;
    const fixedPerTurn = totalFixedMonthly / monthlyClients;

    // 3. Costos Variables Unitarios
    const cosmetics = parseFloat(document.getElementById('var-cosmetics')?.value) || 0;
    const lashes = parseFloat(document.getElementById('var-lashes')?.value) || 0;
    const disposables = parseFloat(document.getElementById('var-disposables')?.value) || 0;
    const transport = parseFloat(document.getElementById('var-transport')?.value) || 0;
    const otherVar = parseFloat(document.getElementById('var-other')?.value) || 0;

    const totalVariablePerTurn = cosmetics + lashes + disposables + transport + otherVar;

    // 4. Margen y Comisiones
    const profitMargin = parseFloat(document.getElementById('profit-margin')?.value) || 60;
    const feeCard = parseFloat(document.getElementById('fee-card')?.value) || 0;

    // 5. Cálculos Finales
    // Costo Total = Costo Fijo por Turno + Costo Variable por Turno
    const totalCost = fixedPerTurn + totalVariablePerTurn;

    // Precio sugerido considerando el margen sobre costo y comisión bancaria opcional
    const marginFactor = 1 + (profitMargin / 100);
    const cardFeeFactor = feeCard > 0 ? (1 - (feeCard / 100)) : 1;
    let suggestedPrice = (totalCost * marginFactor) / Math.max(0.5, cardFeeFactor);

    // Redondear a múltiplos de 50 para precios comerciales limpios
    suggestedPrice = Math.round(suggestedPrice / 50) * 50;

    // Ganancia Neta Limpia por Turno
    const cardFeeAmount = suggestedPrice * (feeCard / 100);
    const netProfit = suggestedPrice - totalCost - cardFeeAmount;

    // Punto de equilibrio (Cantidad de turnos necesarios para pagar los costos fijos)
    const unitContribution = suggestedPrice - totalVariablePerTurn - cardFeeAmount;
    const breakEvenClients = unitContribution > 0 ? Math.ceil(totalFixedMonthly / unitContribution) : 0;

    // Margen sobre el precio de venta (%)
    const marginOnSales = suggestedPrice > 0 ? ((netProfit / suggestedPrice) * 100) : 0;

    // Actualización de etiquetas en pantalla
    const lblTotalFixedMonthly = document.getElementById('lbl-total-fixed-monthly');
    const lblFixedPerUnit = document.getElementById('lbl-fixed-per-unit');
    const lblTotalVarUnit = document.getElementById('lbl-total-variable-unit');
    const resFixedCost = document.getElementById('res-fixed-cost');
    const resVarCost = document.getElementById('res-var-cost');
    const resTotalCost = document.getElementById('res-total-cost');
    const resSalePrice = document.getElementById('res-sale-price');
    const resMarginApplied = document.getElementById('res-margin-applied');
    const resNetProfit = document.getElementById('res-net-profit');
    const resBreakEven = document.getElementById('res-break-even');
    const resMarginSales = document.getElementById('res-margin-on-sales');

    if (lblTotalFixedMonthly) lblTotalFixedMonthly.textContent = formatCurrency(totalFixedMonthly);
    if (lblFixedPerUnit) lblFixedPerUnit.textContent = formatCurrency(fixedPerTurn);
    if (lblTotalVarUnit) lblTotalVarUnit.textContent = formatCurrency(totalVariablePerTurn);

    if (resFixedCost) resFixedCost.textContent = formatCurrency(fixedPerTurn);
    if (resVarCost) resVarCost.textContent = formatCurrency(totalVariablePerTurn);
    if (resTotalCost) resTotalCost.textContent = formatCurrency(totalCost);
    if (resSalePrice) resSalePrice.textContent = Math.round(suggestedPrice).toLocaleString('es-AR');
    if (resMarginApplied) resMarginApplied.textContent = `${profitMargin}%`;
    if (resNetProfit) resNetProfit.textContent = `+ ${formatCurrency(netProfit)}`;
    if (resBreakEven) resBreakEven.textContent = `${breakEvenClients} turnos al mes`;
    if (resMarginSales) resMarginSales.textContent = `${marginOnSales.toFixed(1)}%`;
}

/**
 * Carga plantillas preestablecidas de los servicios y productos del salón
 * @param {string} presetKey 
 */
function loadServicePreset(presetKey) {
    const presets = {
        'maquillaje-social': {
            name: 'Maquillaje Social Glam (En Salón)',
            cosmetics: 4500,
            lashes: 3000,
            disposables: 1800,
            transport: 0,
            other: 1200,
            margin: 60
        },
        'peinado-ondas': {
            name: 'Peinados de Vanguardia & Ondas',
            cosmetics: 2500,
            lashes: 0,
            disposables: 1500,
            transport: 0,
            other: 3500,
            margin: 70
        },
        'pack-novia': {
            name: 'Pack Novias & Quinces (Integral a Domicilio)',
            cosmetics: 18000,
            lashes: 6000,
            disposables: 4000,
            transport: 8000,
            other: 9000,
            margin: 120
        },
        'glow-express': {
            name: 'Piel Glow & No-Makeup Look',
            cosmetics: 3000,
            lashes: 0,
            disposables: 1000,
            transport: 0,
            other: 1000,
            margin: 50
        },
        'glow-vip-domicilio': {
            name: 'Pack Glow VIP a Domicilio / Hotel',
            cosmetics: 7000,
            lashes: 3500,
            disposables: 2500,
            transport: 8500,
            other: 3500,
            margin: 90
        },
        'servicio-grupal': {
            name: 'Servicio Grupal & Madrinas',
            cosmetics: 12000,
            lashes: 8000,
            disposables: 5000,
            transport: 0,
            other: 4000,
            margin: 65
        },
        'producto-skincare': {
            name: 'Producto: Kit Glow de Retoque / Skincare',
            cosmetics: 11000,
            lashes: 0,
            disposables: 0,
            transport: 0,
            other: 1500,
            margin: 80
        }
    };

    if (presets[presetKey]) {
        const p = presets[presetKey];
        const itemName = document.getElementById('item-name');
        const itemTitle = document.getElementById('res-item-title');
        const cosmetics = document.getElementById('var-cosmetics');
        const lashes = document.getElementById('var-lashes');
        const disposables = document.getElementById('var-disposables');
        const transport = document.getElementById('var-transport');
        const other = document.getElementById('var-other');
        const marginSlider = document.getElementById('profit-margin');
        const marginBadge = document.getElementById('lbl-margin-val');

        if (itemName) itemName.value = p.name;
        if (itemTitle) itemTitle.textContent = p.name;
        if (cosmetics) cosmetics.value = p.cosmetics;
        if (lashes) lashes.value = p.lashes;
        if (disposables) disposables.value = p.disposables;
        if (transport) transport.value = p.transport;
        if (other) other.value = p.other;
        if (marginSlider) marginSlider.value = p.margin;
        if (marginBadge) marginBadge.textContent = `${p.margin}%`;

        updateCalculations();
    }
}

/**
 * Restablece los valores del formulario a los predeterminados
 */
function resetCalculatorForm() {
    loadServicePreset('maquillaje-social');
    const presetSelect = document.getElementById('service-preset-select');
    if (presetSelect) presetSelect.value = 'maquillaje-social';
}

/**
 * Guarda el cálculo actual en la lista de precios almacenada en localStorage
 */
function saveCurrentCalculation() {
    const itemName = document.getElementById('item-name')?.value || 'Servicio Sin Título';
    const fixedCost = document.getElementById('res-fixed-cost')?.textContent || '$ 0';
    const varCost = document.getElementById('res-var-cost')?.textContent || '$ 0';
    const totalCost = document.getElementById('res-total-cost')?.textContent || '$ 0';
    const margin = document.getElementById('res-margin-applied')?.textContent || '0%';
    const salePrice = `$ ${document.getElementById('res-sale-price')?.textContent || '0'}`;
    const netProfit = document.getElementById('res-net-profit')?.textContent || '$ 0';

    const newItem = {
        name: itemName,
        fixed: fixedCost,
        variable: varCost,
        total: totalCost,
        margin: margin,
        price: salePrice,
        profit: netProfit,
        date: new Date().toLocaleDateString('es-AR')
    };

    let savedList = [];
    try {
        savedList = JSON.parse(localStorage.getItem('mmg_saved_prices')) || [];
    } catch (e) {
        savedList = [];
    }

    savedList.push(newItem);
    localStorage.setItem('mmg_saved_prices', JSON.stringify(savedList));

    renderSavedPricesTable();

    // Feedback visual
    alert(`¡"${itemName}" fue guardado con éxito en tu Lista de Precios!`);
}

/**
 * Renderiza los precios guardados en la tabla HTML
 */
function renderSavedPricesTable() {
    const tbody = document.getElementById('saved-prices-body');
    if (!tbody) return;

    let savedList = [];
    try {
        savedList = JSON.parse(localStorage.getItem('mmg_saved_prices')) || [];
    } catch (e) {
        savedList = [];
    }

    if (savedList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
                    No tenés servicios guardados todavía. Calculá un servicio y pulsá <strong>"Guardar en Mi Lista de Precios"</strong>.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = savedList.map((item, index) => `
        <tr>
            <td><strong>${item.name}</strong> <small style="display:block; color:var(--text-muted);">${item.date || ''}</small></td>
            <td>${item.fixed}</td>
            <td>${item.variable}</td>
            <td><strong>${item.total}</strong></td>
            <td><span class="badge-pill" style="margin:0; padding:2px 8px; font-size:0.8rem;">${item.margin}</span></td>
            <td><strong style="color:var(--pastel-dark); font-size:1.05rem;">${item.price}</strong></td>
            <td style="color:#27AE60; font-weight:700;">${item.profit}</td>
            <td>
                <button type="button" class="btn-delete-row" title="Eliminar servicio" onclick="deleteSavedPrice(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Elimina un servicio específico de la lista guardada
 * @param {number} index 
 */
function deleteSavedPrice(index) {
    let savedList = [];
    try {
        savedList = JSON.parse(localStorage.getItem('mmg_saved_prices')) || [];
    } catch (e) {
        savedList = [];
    }

    if (index >= 0 && index < savedList.length) {
        savedList.splice(index, 1);
        localStorage.setItem('mmg_saved_prices', JSON.stringify(savedList));
        renderSavedPricesTable();
    }
}

/**
 * Limpia toda la lista guardada con confirmación previa
 */
function clearSavedPrices() {
    if (confirm('¿Estás segura de que deseás borrar toda la lista de precios guardada?')) {
        localStorage.removeItem('mmg_saved_prices');
        renderSavedPricesTable();
    }
}

/**
 * Imprime o exporta a PDF la lista de precios
 */
function exportPricesToPrint() {
    window.print();
}

// =============================================================================
// FUNCIONES GLOBALES PREEXISTENTES (ACCESIBLES DESDE EL HTML)
// =============================================================================

/**
 * Preselecciona un servicio en el formulario y scrollea suavemente hasta él
 * @param {string} serviceName 
 */
function preselectService(serviceName) {
    const serviceSelect = document.getElementById('service-select');
    const bookingSection = document.getElementById('reservas');

    if (serviceSelect) {
        let found = false;
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
                serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
                serviceSelect.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            serviceSelect.value = serviceName;
        }

        const serviceLocation = document.getElementById('service-location');
        const addressGroup = document.getElementById('address-group');
        const addressInput = document.getElementById('client-address');

        if (serviceName.toLowerCase().includes('domicilio') && serviceLocation) {
            serviceLocation.value = "A Domicilio / Hotel en Iguazú";
            if (addressGroup) {
                addressGroup.style.display = 'block';
                if (addressInput) addressInput.setAttribute('required', 'required');
            }
        }
    }

    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Abre el modal con la vista previa del trabajo seleccionado y su foto real
 * @param {string} title 
 * @param {string} desc 
 * @param {string} imgSrc
 */
function openModal(title, desc, imgSrc) {
    const modal = document.getElementById('image-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalCaptionTitle = document.getElementById('modal-caption-title');
    const modalCaptionDesc = document.getElementById('modal-caption-desc');
    const modalImg = document.getElementById('modal-img');

    if (modal) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalCaptionTitle) modalCaptionTitle.textContent = title;
        if (modalCaptionDesc) modalCaptionDesc.textContent = desc;
        if (modalImg && imgSrc) {
            modalImg.src = imgSrc;
            modalImg.alt = title;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra el modal de previsualización
 */
function closeModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    if (modal) {
        modal.classList.remove('active');
        if (modalImg) modalImg.src = '';
        document.body.style.overflow = '';
    }
}

// Cerrar modal o drawer al presionar tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        const mobileDrawer = document.getElementById('mobile-drawer');
        const drawerOverlay = document.getElementById('drawer-overlay');
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
            mobileDrawer.classList.remove('active');
            if (drawerOverlay) drawerOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
