/* Site estático: dados em configuracao.js, sem servidor e sem dependências. */
(() => {
  'use strict';
  const cfg = typeof configuracao === 'object' ? configuracao : { loja: {}, ligas: [] };
  const ligas = Array.isArray(cfg.ligas) ? cfg.ligas : [];
  const $ = (id) => document.getElementById(id);
  const safeText = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeUrl = (value) => { try { const url = new URL(String(value)); return ['http:', 'https:'].includes(url.protocol) ? String(value) : ''; } catch { return ''; } };
  const normal = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const icon = (name, cls = '') => `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const name = cfg.loja?.nome || 'Catálogos de futebol';
  const logo = cfg.loja?.logo || './assets/imagens/logo.webp';
  const whatsapp = safeUrl(cfg.loja?.whatsapp);
  const instagram = safeUrl(cfg.loja?.instagram);
  const allCarousels = [];

  document.title = `${name} | Catálogos de Futebol`;
  document.querySelectorAll('.js-logo').forEach(img => { img.src = logo; });
  $('header-shop-name').textContent = name;
  $('footer-shop-name').textContent = name;
  $('copyright').textContent = `© ${new Date().getFullYear()} ${name}. Todos os direitos reservados.`;

  const contactLinks = [];
  if (whatsapp) contactLinks.push(`<a href="${safeText(whatsapp)}" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">${icon('whatsapp')} WhatsApp ${safeText(cfg.loja?.whatsappExibicao || '')}</a>`);
  if (instagram) contactLinks.push(`<a href="${safeText(instagram)}" target="_blank" rel="noopener noreferrer">Instagram</a>`);
  $('footer-contacts').innerHTML = `<div class="footer-contacts">${contactLinks.join('')}</div>`;
  $('footer-leagues').innerHTML = `<div class="footer-quicklinks">${ligas.map(l => `<a href="#${safeText(l.id)}">${safeText(l.nome)}</a>`).join('')}</div>`;

  function monogram(label) {
    const words = String(label).split(/[\s-]+/).filter(Boolean);
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : String(label).slice(0, 2).toUpperCase();
  }
  function badgeCard(club, duplicate = false) {
    const label = safeText(club.nome);
    const img = safeUrl(club.imagem);
    const href = safeUrl(club.link);
    const content = `<span class="club-art${img ? '' : ' no-image'}">${img ? `<img src="${safeText(img)}" alt="Escudo de ${label}" width="102" height="102" loading="lazy" decoding="async" draggable="false">` : ''}<span class="club-monogram" aria-hidden="true">${safeText(monogram(club.nome))}</span></span><span class="club-name">${label}</span>`;
    if (href) return `<a class="club-card is-link" href="${safeText(href)}" target="_blank" rel="noopener noreferrer" ${duplicate ? 'tabindex="-1"' : ''} aria-label="Ver catálogo de ${label} (abre em nova aba)">${content}</a>`;
    return `<div class="club-card is-disabled" aria-label="${label}, catálogo indisponível">${content}</div>`;
  }
  function banner(liga, first) {
    const desktop = safeUrl(liga.bannerDesktop);
    const mobile = safeUrl(liga.bannerMobile);
    if (!desktop && !mobile) return `<div class="league-banner-empty">${safeText(liga.nome)}</div>`;
    const src = desktop || mobile;
    return `<picture>${mobile ? `<source media="(max-width: 560px)" srcset="${safeText(mobile)}">` : ''}<img src="${safeText(src)}" alt="Banner de ${safeText(liga.nome)}" width="1920" height="600" loading="${first ? 'eager' : 'lazy'}" ${first ? 'fetchpriority="high"' : ''} decoding="async"></picture>`;
  }
  function titleForType(tipo) { return tipo === 'selecao' ? 'ESCOLHA SUA SELEÇÃO' : tipo === 'colecao' ? 'ESCOLHA SUA COLEÇÃO' : 'ESCOLHA SEU CLUBE'; }
  function unitForType(tipo, count) { return `${count} ${tipo === 'selecao' ? (count === 1 ? 'seleção' : 'seleções') : tipo === 'colecao' ? (count === 1 ? 'coleção' : 'coleções') : (count === 1 ? 'clube' : 'clubes')}`; }

  // Gera cada liga de forma independente, preservando exatamente a ordem do arquivo.
  $('league-sections').innerHTML = ligas.map((liga, idx) => {
    const clubs = Array.isArray(liga.clubes) ? liga.clubes : [];
    const cid = `viewport-${idx}`;
    const title = titleForType(liga.tipo);
    const controls = clubs.length ? `<div class="carousel-controls"><button type="button" class="carousel-arrow" data-move="prev" data-viewport="${cid}" aria-label="Voltar escudos de ${safeText(liga.nome)}">${icon('arrow-left')}</button><button type="button" class="carousel-arrow" data-move="next" data-viewport="${cid}" aria-label="Avançar escudos de ${safeText(liga.nome)}">${icon('arrow-right')}</button></div>` : '';
    const segment = (dup) => `<div class="carousel-segment" ${dup ? 'aria-hidden="true"' : ''}>${clubs.map(c => badgeCard(c, dup)).join('')}</div>`;
    const body = clubs.length ? `<div id="${cid}" class="carousel-viewport" role="region" aria-roledescription="carrossel" aria-label="${safeText(liga.nome)}: arraste para ver todos os escudos" tabindex="0"><div class="carousel-rail">${segment(true)}${segment(false)}${segment(true)}</div></div>` : '<div class="empty-category">Nenhuma coleção cadastrada nesta categoria.</div>';
    return `<section class="league shell" id="${safeText(liga.id)}" aria-labelledby="league-title-${idx}"><div class="league-banner">${banner(liga, idx===0)}</div><div class="league-heading"><div><h2 id="league-title-${idx}">${title}</h2><p>${safeText(liga.nome)}${clubs.length ? ` · ${unitForType(liga.tipo, clubs.length)}` : ''}</p></div>${controls}</div>${body}</section>`;
  }).join('');

  // Imagens externas que falham recebem uma marcação discreta, sem quebrar o layout.
  document.addEventListener('error', event => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.closest('.club-art')) {
      img.closest('.club-art').classList.add('no-image');
    } else if (img instanceof HTMLImageElement && img.closest('.league-banner')) {
      const wrapper = img.closest('.league-banner');
      const section = wrapper.closest('.league');
      const item = ligas.find(l => l.id === section?.id);
      wrapper.innerHTML = `<div class="league-banner-empty">${safeText(item?.nome || 'Catálogo')}</div>`;
    }
  }, true);

  function createCarousel(viewport) {
    const rail = viewport.querySelector('.carousel-rail');
    const first = rail?.children[0];
    if (!first) return;
    const medium = window.matchMedia('(prefers-reduced-motion: reduce)');
    let groupWidth = 0, last = 0, remainder = 0, pausedUntil = 0, hover = false, focus = false, isTouch = false, dragging = false, dragX = 0, dragScroll = 0, moved = false, visible = false;
    let rafId = 0;
    function recalc() {
      const oldWidth = groupWidth;
      const relative = oldWidth ? viewport.scrollLeft - oldWidth : 0;
      groupWidth = first.getBoundingClientRect().width;
      if (!groupWidth) return;
      viewport.scrollLeft = groupWidth + (oldWidth ? Math.min(Math.max(0, relative), groupWidth) : 0);
    }
    function wrap() {
      if (!groupWidth) return;
      if (viewport.scrollLeft >= 2 * groupWidth) viewport.scrollLeft -= groupWidth;
      if (viewport.scrollLeft < groupWidth) viewport.scrollLeft += groupWidth;
    }
    function pause(ms = 4500) { pausedUntil = performance.now() + ms; }
    function tick(now) {
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;
      if (visible && !document.hidden && !medium.matches && !hover && !focus && !isTouch && !dragging && now >= pausedUntil && groupWidth) {
        remainder += 0.028 * dt;
        if (remainder >= 1) { viewport.scrollLeft += Math.floor(remainder); remainder %= 1; }
      }
      wrap();
      rafId = requestAnimationFrame(tick);
    }
    viewport.addEventListener('mouseenter', () => hover = true);
    viewport.addEventListener('mouseleave', () => { hover = false; pause(1800); });
    viewport.addEventListener('focusin', () => focus = true);
    viewport.addEventListener('focusout', e => { if (!viewport.contains(e.relatedTarget)) { focus = false; pause(); } });
    viewport.addEventListener('touchstart', () => { isTouch = true; pause(6000); }, {passive:true});
    viewport.addEventListener('touchend', () => { isTouch = false; pause(6000); }, {passive:true});
    viewport.addEventListener('touchcancel', () => { isTouch = false; pause(6000); }, {passive:true});
    viewport.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true; moved = false; dragX = e.clientX; dragScroll = viewport.scrollLeft;
      viewport.classList.add('is-dragging'); pause();
    });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const delta = e.clientX - dragX;
      if (Math.abs(delta) > 6) moved = true;
      viewport.scrollLeft = dragScroll - delta;
      wrap();
      // Continue arrastando corretamente depois da passagem pela cópia central.
      if (groupWidth && (viewport.scrollLeft > 1.94 * groupWidth || viewport.scrollLeft < 1.06 * groupWidth)) dragScroll = viewport.scrollLeft + delta;
    });
    const stopDrag = () => { if (!dragging) return; dragging = false; viewport.classList.remove('is-dragging'); pause(); };
    window.addEventListener('pointerup',stopDrag);
    window.addEventListener('blur',stopDrag);
    viewport.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    viewport.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault(); pause(); viewport.scrollLeft += e.key === 'ArrowRight' ? 175 : -175; wrap();
      }
    });
    viewport.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pause(); }, {passive:true});
    const controls = viewport.closest('.league').querySelectorAll('.carousel-arrow');
    controls.forEach(button => button.addEventListener('click', () => {
      pause(5500);
      const amount = button.dataset.move === 'next' ? 1 : -1;
      viewport.scrollBy({left:amount * (window.innerWidth <= 560 ? 260 : 338),behavior:medium.matches?'auto':'smooth'});
    }));
    recalc();
    const resize = new ResizeObserver(() => recalc());
    resize.observe(first);
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, {rootMargin:'200px 0px'});
    intersection.observe(viewport);
    rafId = requestAnimationFrame(tick);
    allCarousels.push({viewport, resize, intersection, stop: () => cancelAnimationFrame(rafId)});
  }
  document.querySelectorAll('.carousel-viewport').forEach(createCarousel);

  // Menu desktop por liga > clubes.
  const dropdownWrap = $('desktop-dropdown-wrap');
  const dropdownToggle = $('desktop-leagues-toggle');
  const dropdownPanel = $('desktop-leagues-panel');
  const desktopLeagueList = $('desktop-league-list');
  const desktopClubList = $('desktop-club-list');
  let activeLeague = 0;
  function renderClubMenu(index) {
    activeLeague = index;
    desktopLeagueList.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === index)));
    const liga = ligas[index];
    if (!liga) return;
    const clubs = Array.isArray(liga.clubes) ? liga.clubes : [];
    desktopClubList.innerHTML = `<div class="dropdown-mini-title">${safeText(liga.nome)} · <a href="#${safeText(liga.id)}" class="dropdown-go" aria-label="Ir à seção ${safeText(liga.nome)}">Ver seção ↗</a></div>${clubs.length ? clubs.map(c => safeUrl(c.link) ? `<a class="dropdown-club-link" href="${safeText(c.link)}" target="_blank" rel="noopener noreferrer">${safeText(c.nome)}</a>` : `<span class="dropdown-club-link disabled">${safeText(c.nome)}</span>`).join('') : '<div class="search-empty">Nenhuma coleção cadastrada.</div>'}`;
  }
  desktopLeagueList.innerHTML = ligas.map((l, i) => `<button class="dropdown-league-button" type="button" data-index="${i}" aria-current="false">${safeText(l.nome)} ${icon('arrow-right','ico-small')}</button>`).join('');
  desktopLeagueList.addEventListener('click', e => { const button = e.target.closest('button[data-index]'); if (button) renderClubMenu(Number(button.dataset.index)); });
  desktopLeagueList.addEventListener('mouseover', e => { const button = e.target.closest('button[data-index]'); if (button) renderClubMenu(Number(button.dataset.index)); });
  renderClubMenu(0);
  function setDropdown(open) { dropdownPanel.hidden = !open; dropdownToggle.setAttribute('aria-expanded', String(open)); }
  dropdownToggle.addEventListener('click', () => { setSearch(false); setDropdown(dropdownPanel.hidden); });
  document.addEventListener('pointerdown', e => { if (!dropdownWrap.contains(e.target)) setDropdown(false); });
  dropdownPanel.addEventListener('click', e => { if (e.target.closest('a')) setDropdown(false); });

  // Menu celular com submenus nativos e acessíveis.
  const mobileList = $('mobile-league-list');
  mobileList.innerHTML = ligas.map(l => `<details class="mobile-league-details"><summary>${safeText(l.nome)} ${icon('chevron','ico-small')}</summary><div class="mobile-clubs"><a href="#${safeText(l.id)}" class="mobile-section-link">Ver seção ${safeText(l.nome)}</a>${l.clubes.map(c => safeUrl(c.link) ? `<a href="${safeText(c.link)}" target="_blank" rel="noopener noreferrer">${safeText(c.nome)}</a>` : `<span>${safeText(c.nome)} · Sem catálogo</span>`).join('')}</div></details>`).join('');
  mobileList.addEventListener('toggle', e => { if (e.target.matches('details[open]')) mobileList.querySelectorAll('details').forEach(d => { if (d !== e.target) d.open = false; }); }, true);
  const menuToggle = $('mobile-menu-toggle');
  const mobileMenu = $('mobile-menu');
  function setMenu(open) { mobileMenu.hidden = !open; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); menuToggle.innerHTML = icon(open ? 'close' : 'menu'); }
  menuToggle.addEventListener('click', () => { setSearch(false); setMenu(mobileMenu.hidden); });
  mobileMenu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  window.matchMedia('(min-width: 841px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Pesquisa instantânea, sem acoplar dados de clubes diferentes.
  const searchToggle = $('search-toggle');
  const searchPanel = $('search-panel');
  const searchInput = $('search-input');
  const searchResults = $('search-results');
  function setSearch(open, returnFocus = false) {
    searchPanel.hidden = !open;
    searchToggle.setAttribute('aria-expanded', String(open));
    searchToggle.setAttribute('aria-label', open ? 'Fechar pesquisa' : 'Abrir pesquisa');
    if (open) { setMenu(false); setDropdown(false); searchInput.focus(); showResults(); }
    else { searchInput.value = ''; if (returnFocus) searchToggle.focus(); }
  }
  function showResults() {
    const q = normal(searchInput.value);
    if (!q) { searchResults.innerHTML = '<p class="search-empty">Digite um nome para localizar seu catálogo.</p>'; return; }
    const groups = ligas.map(l => {
      const ligaMatch = normal(l.nome).includes(q);
      const clubs = l.clubes.filter(c => ligaMatch || normal(c.nome).includes(q));
      return {liga:l, ligaMatch, clubs};
    }).filter(x => x.ligaMatch || x.clubs.length);
    if (!groups.length) { searchResults.innerHTML = '<p class="search-empty">Nenhum resultado encontrado. Tente outro clube, seleção ou liga.</p>'; return; }
    searchResults.innerHTML = groups.map(({liga,ligaMatch,clubs}) => {
      const header = `<div class="search-group-title">${safeText(liga.nome)}</div>`;
      const sectionLink = ligaMatch ? `<a class="search-result-item" href="#${safeText(liga.id)}"><strong>Ver ${safeText(liga.nome)}</strong><small>Ir para a seção</small></a>` : '';
      const clubLinks = clubs.map(c => safeUrl(c.link) ? `<a class="search-result-item" href="${safeText(c.link)}" target="_blank" rel="noopener noreferrer"><span>${safeText(c.nome)}</span><small>Ver catálogo ↗</small></a>` : `<div class="search-result-item is-disabled"><span>${safeText(c.nome)}</span><small>Sem catálogo</small></div>`).join('');
      return header + sectionLink + clubLinks;
    }).join('');
  }
  searchToggle.addEventListener('click', () => setSearch(searchPanel.hidden, !searchPanel.hidden));
  $('search-close').addEventListener('click', () => setSearch(false,true));
  searchInput.addEventListener('input',showResults);
  searchResults.addEventListener('click', e => { if (e.target.closest('a')) setSearch(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!searchPanel.hidden) {setSearch(false,true);return;}
      if (!dropdownPanel.hidden) {setDropdown(false);dropdownToggle.focus();return;}
      if (!mobileMenu.hidden) {setMenu(false);menuToggle.focus();}
    }
  });
  document.addEventListener('click', e => {
    if (!searchPanel.hidden && !searchPanel.contains(e.target) && !searchToggle.contains(e.target)) setSearch(false);
  });
})();
