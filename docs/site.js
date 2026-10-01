(() => {
  function makeDrawer(title){
    const dialog=document.createElement('dialog');
    dialog.className='side-drawer';
    const heading=document.createElement('h2');heading.textContent=title;
    heading.id='drawer-title-'+document.querySelectorAll('.side-drawer').length;
    dialog.setAttribute('aria-labelledby',heading.id);
    const top=document.createElement('div');top.className='drawer-header';
    const close=document.createElement('button');close.type='button';close.className='button secondary';close.textContent='Close';close.autofocus=true;
    top.append(heading,close);dialog.append(top);
    const body=document.createElement('div');body.className='drawer-body';dialog.append(body);
    document.body.append(dialog);
    close.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{document.documentElement.classList.remove('drawer-open');});
    return {dialog,body,open(){dialog.showModal();document.documentElement.classList.add('drawer-open');}};
  }
  let bookingDrawer;
  document.querySelectorAll('a[href]').forEach(link=>{
    const url=new URL(link.href,location.href);
    if(url.hostname!=='booking.mangomint.com')return;
    link.setAttribute('aria-haspopup','dialog');
    link.addEventListener('click',event=>{
      if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      event.preventDefault();
      if(!bookingDrawer){
        bookingDrawer=makeDrawer('Book an appointment');
        bookingDrawer.dialog.classList.add('booking-drawer');
        const fallback=document.createElement('a');fallback.className='booking-fallback';fallback.textContent='Open booking in a new tab';fallback.target='_blank';fallback.rel='noopener';
        const frame=document.createElement('iframe');frame.title='Balance on Buffalo appointment booking';frame.allow='payment';
        bookingDrawer.body.append(fallback,frame);
      }
      const frame=bookingDrawer.body.querySelector('iframe');
      if(frame.getAttribute('src')!==link.href)frame.src=link.href;
      bookingDrawer.body.querySelector('a').href=link.href;
      bookingDrawer.open();
    });
  });
  const story=document.querySelector('#soundspace-story');
  if(story){
    const trigger=story.querySelector('summary');
    let storyDrawer;
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.addEventListener('click',event=>{
      event.preventDefault();
      if(!storyDrawer){storyDrawer=makeDrawer('The SoundSpace story');story.querySelector('.blockInnerContent > h2')?.remove();[...story.children].filter(e=>e!==trigger).forEach(e=>storyDrawer.body.append(e));}
      storyDrawer.open();
    });
  }
  document.querySelectorAll('.calendar-expand').forEach(button=>button.addEventListener('click',()=>{
    const panel=button.closest('.embed-shell');const expanded=panel.classList.toggle('calendar-expanded');
    button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'Restore calendar size':'Expand calendar';
    if(expanded)panel.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));
  const menuButton=document.querySelector('#menu-toggle');
  const menu=document.querySelector('#primary-menu');
  function closeDropdowns(except){document.querySelectorAll('[data-disclosure]').forEach(button=>{if(button!==except){button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true;}});}
  menuButton?.addEventListener('click',()=>{const opened=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!opened));menu.classList.toggle('menu-open',!opened);if(opened)closeDropdowns();});
  document.querySelectorAll('[data-disclosure]').forEach(button=>button.addEventListener('click',()=>{const opened=button.getAttribute('aria-expanded')==='true';closeDropdowns(button);button.setAttribute('aria-expanded',String(!opened));document.getElementById(button.getAttribute('aria-controls')).hidden=opened;}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const current=document.querySelector('[data-disclosure][aria-expanded=true]');if(current){closeDropdowns();current.focus();}else if(menuButton?.getAttribute('aria-expanded')==='true'){menuButton.click();menuButton.focus();}}});
  document.addEventListener('click',event=>{if(!event.target.closest('.nav-list'))closeDropdowns();});
  document.querySelectorAll('[data-load-embed]').forEach(button=>button.addEventListener('click',()=>{const shell=button.closest('.embed-shell');if(shell.querySelector('iframe'))return;const frame=document.createElement('iframe');frame.src=button.dataset.src;frame.title=button.dataset.title;frame.loading='lazy';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';frame.dataset.kind=button.dataset.kind||'calendar';const status=shell.querySelector('.embed-status');if(status)status.textContent='Loading… You can also open the provider directly.';frame.addEventListener('load',()=>{if(status)status.textContent='Use the embedded view or open the provider directly.';});shell.append(frame);button.hidden=true;}));
  const signup=document.querySelector('#newsletter-signup');
  const formId='dbbb6517-83e8-49d6-9f4e-8343af332cb6';
  let signupOpening=false;
  function resetInvitation(){try{['timer','exit','button'].forEach(type=>localStorage.removeItem('ctct_popup_last_seen_'+type+'_'+formId));}catch{}}
  function showOfficialSignup(){const jq=window.jQuery;const wrapper=document.querySelector('.ctct-popup-wrapper');if(!jq||!wrapper||!jq.fn.ctctPopupForm)return false;const instance=jq.data(wrapper,'plugin_ctctPopupForm');if(!instance)return false;if(instance.delayTimerId)window.clearTimeout(instance.delayTimerId);jq(wrapper).ctctPopupForm('show','button',true);return true;}
  signup?.addEventListener('click',()=>{
    const status=document.querySelector('#newsletter-status');
    if(showOfficialSignup()){status.textContent='';return;}
    if(signupOpening)return;
    signupOpening=true;resetInvitation();
    window._ctct_m='d1e35648135e4d2ad9898a02dd95a5c2';
    status.textContent='Opening the secure newsletter signup form…';
    const existing=document.querySelector('#signupScript');
    if(!existing){const script=document.createElement('script');script.id='signupScript';script.src='https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js';script.async=true;document.head.append(script);}else if(window.SignUpFormWidget?.main){window.SignUpFormWidget.main();}
    let attempts=0;
    const timer=window.setInterval(()=>{attempts++;if(showOfficialSignup()){window.clearInterval(timer);signupOpening=false;status.textContent='';}else if(attempts>=80){window.clearInterval(timer);signupOpening=false;status.innerHTML='The signup form could not load. <a href="https://balanceonbuffalo.com/">Open the original signup page</a>.';}},250);
  });
  const enlargements=[...document.querySelectorAll('[data-enlarge]')];
  if(enlargements.length){const dialog=document.createElement('dialog');dialog.className='photo-dialog';dialog.setAttribute('aria-label','Photo viewer');dialog.innerHTML='<div class="photo-controls"><button type="button" data-photo-prev>Previous photo</button><button type="button" data-photo-next>Next photo</button><button type="button" data-photo-close>Close</button></div><img alt=""><p></p>';document.body.append(dialog);let index=0;const show=()=>{const trigger=enlargements[index];dialog.querySelector('img').src=trigger.dataset.enlarge;dialog.querySelector('img').alt=trigger.querySelector('img').alt;dialog.querySelector('p').textContent=trigger.querySelector('img').alt;};enlargements.forEach((button,i)=>button.addEventListener('click',()=>{index=i;show();dialog.showModal();}));dialog.querySelector('[data-photo-close]').addEventListener('click',()=>dialog.close());dialog.querySelector('[data-photo-prev]').addEventListener('click',()=>{index=(index-1+enlargements.length)%enlargements.length;show();});dialog.querySelector('[data-photo-next]').addEventListener('click',()=>{index=(index+1)%enlargements.length;show();});dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')dialog.querySelector('[data-photo-prev]').click();if(event.key==='ArrowRight')dialog.querySelector('[data-photo-next]').click();});}
})();
