const DAY_MS=86400000;
function localDateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function keyToUtc(key){const [y,m,d]=key.split('-').map(Number);return Date.UTC(y,m-1,d)}
const todayKey=localDateKey();
const launchKey='2026-09-07';
const projectDay=Math.max(0,Math.floor((keyToUtc(todayKey)-keyToUtc(launchKey))/DAY_MS));
const dailyIndex=projectDay%exhibits.length;

function updateVisitStreak(){
  const last=localStorage.getItem('aliceLastVisit');
  let streak=Number(localStorage.getItem('aliceVisitStreak')||0);
  if(!last){streak=1}
  else if(last!==todayKey){const gap=Math.round((keyToUtc(todayKey)-keyToUtc(last))/DAY_MS);streak=gap===1?streak+1:1}
  localStorage.setItem('aliceLastVisit',todayKey);localStorage.setItem('aliceVisitStreak',String(streak));return streak;
}
const visitStreak=updateVisitStreak();
function getSeen(){try{return new Set(JSON.parse(localStorage.getItem('aliceSeenExhibits')||'[]'))}catch(e){return new Set()}}
function saveSeen(set){localStorage.setItem('aliceSeenExhibits',JSON.stringify([...set]))}
function exhibitIndexFromUrl(){
  const requested=new URLSearchParams(location.search).get('exhibit');
  if(!requested)return -1;
  return exhibits.findIndex(e=>e.no===requested || e.no.endsWith(`-${String(requested).padStart(3,'0')}`));
}
function syncExhibitUrl(){
  const url=new URL(location.href);url.searchParams.set('exhibit',exhibits[current].no);url.hash='experiment';
  history.replaceState({exhibit:exhibits[current].no},'',url);
}
function updateShareMetadata(){
  const e=exhibits[current][lang];
  document.title=`${e.title} — ALICE INC. Museum of the Future`;
  const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=lang==='ja'?`2200年の研究者が2026年の「${e.title}」を復元。ALICE INC. 未来の博物館。`:`Future historians in 2200 reconstruct “${e.title}”. An ALICE INC. Museum of the Future exhibit.`;
}
function updateReturnUI(){
  const seen=getSeen();seen.add(exhibits[current].no);saveSeen(seen);
  const daily=exhibits[dailyIndex][lang];
  document.getElementById('dailyLabel').textContent=lang==='ja'?'今日の展示':"TODAY'S EXHIBIT";
  document.getElementById('dailyName').textContent=daily.title;
  document.getElementById('collectionStat').textContent=`${seen.size} / ${exhibits.length}`;
  document.getElementById('streakStat').textContent=`🔥 ${visitStreak}`;
  document.getElementById('collectionTitle').textContent=lang==='ja'?'コレクション':'COLLECTION';
  document.getElementById('collectionCopy').textContent=seen.size===exhibits.length
    ?(lang==='ja'?'100展示コンプリート。未来人より2026年に詳しい。':'All 100 exhibits complete. You now understand 2026 better than the future historians.')
    :(lang==='ja'?`${exhibits.length}展示すべて見るとコレクション完成。あと${exhibits.length-seen.size}。`:`See all ${exhibits.length} exhibits to complete the collection. ${exhibits.length-seen.size} left.`);
  fixScoreLabel();syncExhibitUrl();updateShareMetadata();
}
function fixScoreLabel(){const el=document.getElementById('score4');if(el)el.textContent=lang==='ja'?'公開展示':'Exhibits live'}
const originalRenderExhibit=renderExhibit;
renderExhibit=function(){originalRenderExhibit();updateReturnUI()};
document.getElementById('langToggle').addEventListener('click',()=>setTimeout(()=>{fixScoreLabel();updateReturnUI()},0));
window.addEventListener('popstate',()=>{const i=exhibitIndexFromUrl();if(i>=0&&i!==current){current=i;renderExhibit()}});
const linkedIndex=exhibitIndexFromUrl();current=linkedIndex>=0?linkedIndex:dailyIndex;renderExhibit();
