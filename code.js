(function() {
  const rows = [];
  rows.push(['OWNER', 'Business Name', 'Job Title', 'LinkedIn URL']);

  const cards = document.querySelectorAll('li.artdeco-list__item');
  cards.forEach(card => {
    const nameEl = card.querySelector('span[data-anonymize="person-name"]') || card.querySelector('a[data-control-name="view_lead_panel_via_search_lead_name"]');
    const name = nameEl ? nameEl.innerText.trim() : '';

    const companyEl = card.querySelector('a[data-anonymize="company-name"]') || card.querySelector('.artdeco-entity-lockup__subtitle');
    const company = companyEl ? companyEl.innerText.trim() : '';

    const titleEl = card.querySelector('span[data-anonymize="headline"]') || card.querySelector('.artdeco-entity-lockup__caption');
    const title = titleEl ? titleEl.innerText.trim() : '';

    const linkEl = card.querySelector('a[href*="/sales/lead/"]') || card.querySelector('a[href*="/sales/people/"]') || card.querySelector('a[href*="/in/"]');
    let link = linkEl ? linkEl.href : '';
    if (link.includes('?')) link = link.split('?')[0];

    if (name && link) {
      rows.push([name, company, title, link]);
    }
  });

  const tsvContent = rows.map(e => e.join('\t')).join('\n');
  
  // Copy directly to clipboard
  const tempInput = document.createElement('textarea');
  tempInput.value = tsvContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  alert(`✅ ${rows.length - 1} Leads copied to clipboard! Just press Ctrl+V in your Google Sheet!`);
})();