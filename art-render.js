/* Connect generated museum artwork to the exhibit renderer and keep exhibit metadata coherent. */
(function(){
  if(typeof window.renderExhibit!=='function') return;
  const baseRender=window.renderExhibit;
  window.renderExhibit=function(){
    baseRender();
    const visual=document.getElementById('artifactVisual');
    const exhibit=window.exhibits?.[window.current] || (typeof exhibits!=='undefined' ? exhibits[current] : null);
    if(!visual || !exhibit) return;
    const src=window.ALICE_GENERATED_ART && window.ALICE_GENERATED_ART[exhibit.no];
    if(src){
      visual.classList.add('has-generated-art');
      visual.textContent='';
      const img=document.createElement('img');
      img.src=src;
      img.alt='';
      img.decoding='async';
      img.loading='eager';
      visual.appendChild(img);
    }else{
      visual.classList.remove('has-generated-art');
      visual.textContent=exhibit.emoji || '◌';
    }
  };

  function syncExhibitDiscovery(){
    if(typeof exhibits==='undefined'||typeof current==='undefined'||!exhibits[current]) return;
    const exhibit=exhibits[current];
    const activeLang=(typeof lang!=='undefined'&&lang==='en')?'en':'ja';
    const text=exhibit[activeLang];
    if(!text) return;

    document.documentElement.lang=activeLang;
    const canonical=document.querySelector('link[rel="canonical"]');
    if(canonical){
      const url=new URL(location.href);
      url.search='';
      url.searchParams.set('exhibit',exhibit.no);
      url.hash='experiment';
      canonical.href=url.toString();
    }

    let schema=document.getElementById('exhibitStructuredData');
    if(!schema){
      schema=document.createElement('script');
      schema.id='exhibitStructuredData';
      schema.type='application/ld+json';
      document.head.appendChild(schema);
    }
    const exhibitUrl=new URL(location.href);
    exhibitUrl.search='';
    exhibitUrl.searchParams.set('exhibit',exhibit.no);
    exhibitUrl.hash='experiment';
    schema.textContent=JSON.stringify({
      '@context':'https://schema.org',
      '@type':'CreativeWork',
      name:text.title,
      description:text.future,
      url:exhibitUrl.toString(),
      identifier:exhibit.no,
      inLanguage:activeLang,
      isPartOf:{'@type':'CollectionPage',name:'ALICE INC. — Museum of the Future',url:'https://alwaysmored3-svg.github.io/-alice-inc/'}
    });
  }

  const title=document.querySelector('title');
  if(title)new MutationObserver(syncExhibitDiscovery).observe(title,{childList:true,characterData:true,subtree:true});
  window.addEventListener('popstate',()=>setTimeout(syncExhibitDiscovery,0));
  setTimeout(syncExhibitDiscovery,0);
})();
