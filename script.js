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
