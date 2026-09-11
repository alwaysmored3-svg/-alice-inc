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
function bumpLocalMetric(name){const key=`aliceMetric:${name}`;const value=Number(localStorage.getItem(key)||0)+1;localStorage.setItem(key,String(value));return value}
function recordSession(){if(sessionStorage.getItem('aliceSessionRecorded'))return;sessionStorage.setItem('aliceSessionRecorded','1');bumpLocalMetric('sessions')}
recordSession();
function exhibitIndexFromUrl(){
  const requested=new URLSearchParams(location.search).get('exhibit');
  if(!requested)return -1;
  return exhibits.findIndex(e=>e.no===requested || e.no.endsWith(`-${String(requested).padStart(3,'0')}`));
}
function exhibitUrl(){const url=new URL(location.href);url.searchParams.set('exhibit',exhibits[current].no);url.hash='experiment';return url.toString()}
function syncExhibitUrl(){history.replaceState({exhibit:exhibits[current].no},'',exhibitUrl())}
function updateShareMetadata(){
  const e=exhibits[current][lang];
  document.title=`${e.title} — ALICE INC. Museum of the Future`;
  const text=lang==='ja'?`2200年の研究者が2026年の「${e.title}」を復元。ALICE INC. 未来の博物館。`:`Future historians in 2200 reconstruct “${e.title}”. An ALICE INC. Museum of the Future exhibit.`;
  const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=text;
  const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=document.title;
  const ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.content=text;
  const ogUrl=document.querySelector('meta[property="og:url"]');if(ogUrl)ogUrl.content=location.href;
}
function ensureCopyLink(){
  if(document.getElementById('copyExhibitLink'))return;
  const controls=document.querySelector('.exhibit-controls');if(!controls)return;
  const btn=document.createElement('button');btn.id='copyExhibitLink';btn.className='button ghost small';btn.type='button';controls.appendChild(btn);
  btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(exhibitUrl());bumpLocalMetric('link-copies');showToast(lang==='ja'?'展示リンクをコピーしたよ':'Exhibit link copied')}catch(e){showToast(lang==='ja'?'共有ボタンからリンクを送れます':'Use the share button to send this exhibit')}});
}
function updateCopyLabel(){const btn=document.getElementById('copyExhibitLink');if(btn){btn.textContent=lang==='ja'?'リンクをコピー':'Copy link';btn.setAttribute('aria-label',lang==='ja'?'この展示へのリンクをコピー':'Copy a link to this exhibit')}}
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
  fixScoreLabel();ensureCopyLink();updateCopyLabel();syncExhibitUrl();updateShareMetadata();
}
function fixScoreLabel(){const el=document.getElementById('score4');if(el)el.textContent=lang==='ja'?'公開展示':'Exhibits live'}
const originalRenderExhibit=renderExhibit;
renderExhibit=function(){originalRenderExhibit();updateReturnUI()};
document.getElementById('langToggle').addEventListener('click',()=>setTimeout(()=>{bumpLocalMetric('language-switches');fixScoreLabel();updateReturnUI()},0));
document.getElementById('toggleTruth').addEventListener('click',()=>{if(!document.getElementById('truth').hidden)bumpLocalMetric('corrections-opened')});
document.getElementById('nextExhibit').addEventListener('click',()=>bumpLocalMetric('next-clicks'));
document.getElementById('randomExhibit').addEventListener('click',()=>bumpLocalMetric('random-clicks'));
document.getElementById('shareButton').addEventListener('click',()=>bumpLocalMetric('share-attempts'));
window.addEventListener('popstate',()=>{const i=exhibitIndexFromUrl();if(i>=0&&i!==current){current=i;renderExhibit()}});
const linkedIndex=exhibitIndexFromUrl();current=linkedIndex>=0?linkedIndex:dailyIndex;renderExhibit();
