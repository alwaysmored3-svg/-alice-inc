/* Connect generated museum artwork to the exhibit renderer without changing exhibit data. */
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
})();
