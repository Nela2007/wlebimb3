// Piccola interattività: scorri morbido e evidenzia anchor
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href')
      if(href.startsWith('#')){
        e.preventDefault()
        const el=document.querySelector(href)
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'})
      }
    })
  })
})

// Alterna colori a titoli (h1-h6) in rosso/giallo e rende in grassetto; rimuove span .lead precedenti
document.addEventListener('DOMContentLoaded',()=>{
  // rimuovi eventuali span.lead creati precedentemente
  document.querySelectorAll('span.lead').forEach(sp=>{
    const txt = document.createTextNode(sp.textContent)
    sp.parentNode.replaceChild(txt, sp)
  })

  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
  headings.forEach((h, idx)=>{
    // evita doppia applicazione
    if(h.classList.contains('alt-processed')) return
    const cls = (idx % 2 === 0) ? 'alt-red' : 'alt-yellow'
    h.classList.add(cls)
    h.classList.add('alt-heading')
    h.classList.add('alt-processed')
  })

  // colorare tutti i tag <strong> e <b> in rosso
  document.querySelectorAll('strong, b').forEach(el=>{
    el.classList.add('bold-red')
  })
})

// Colora in rosso e in grassetto le prime 3 righe/elementi visibili all'inizio della pagina
document.addEventListener('DOMContentLoaded',()=>{
  const candidates = Array.from(document.querySelectorAll('h1,h2,h3,p,a,li'))
  let applied = 0
  for(const el of candidates){
    if(applied >= 3) break
    // salta elementi non visibili
    if(!(el instanceof Element)) continue
    const style = window.getComputedStyle(el)
    if(style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null) continue
    el.classList.add('first-red')
    applied++
  }
})

// Alterna le parole del terzo elemento visibile (se presente) in rosso/giallo
document.addEventListener('DOMContentLoaded',()=>{
  const firstThree = Array.from(document.querySelectorAll('.first-red'))
  if(firstThree.length < 3) return
  const third = firstThree[2]
  if(!third || third.classList.contains('third-processed')) return
  const text = third.textContent || ''
  const tokens = text.trim().split(/(\s+)/)
  let out = ''
  let wordIndex = 0
  for(const t of tokens){
    if(/\s+/.test(t)){
      out += t
    } else {
      const cls = (wordIndex % 2 === 0) ? 'alt-red' : 'alt-yellow'
      out += `<span class="${cls}">${escapeHtml(t)}</span>`
      wordIndex++
    }
  }
  third.innerHTML = out
  third.classList.add('third-processed')
})

function escapeHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

// Alterna colore dei link di navigazione (.toc a) in rosso/giallo

// piccoli cuori animati gialli e rossi
// creiamo alcuni elementi <span> con classe heart e li posizioniamo casualmente
window.addEventListener('DOMContentLoaded',()=>{
  const colors=['alt-red','alt-yellow'];
  for(let i=0;i<12;i++){
    const span=document.createElement('span');
    span.classList.add('heart', colors[i%2]);
    // use red or yellow heart emoji depending on class
    span.textContent = (i % 2 === 0) ? '❤️' : '💛';
    span.style.top = Math.random()*80 + '%';
    span.style.left = Math.random()*80 + '%';
    document.body.appendChild(span);
  }
});
document.addEventListener('DOMContentLoaded',()=>{
  const navLinks = Array.from(document.querySelectorAll('.toc a'))
  navLinks.forEach((a, i)=>{
    // assegna alternanza: 0 -> rosso, 1 -> giallo, ecc.
    a.classList.remove('alt-red','alt-yellow')
    a.classList.add((i % 2 === 0) ? 'alt-red' : 'alt-yellow')
  })
})
