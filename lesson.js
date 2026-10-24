/* Real Quran content and verse-by-verse recitation for the classroom prototype. */
state.surah = 1;
const originalRender = render;
const heading = document.querySelector('.boardhead');
heading.innerHTML = '<div><label for="surahSelect">Surah / السورة</label><select id="surahSelect" aria-label="Surah"></select></div><span id="chapterCount" class="pill"></span>';
for (const chapter of QURAN.chapters) {
  const option = document.createElement('option');
  option.value = chapter.id;
  option.textContent = `${chapter.id}. ${chapter.transliteration} — ${chapter.name}`;
  $('surahSelect').append(option);
}
const audioPanel = document.querySelector('.audio');
audioPanel.innerHTML = `<b>Al-Husary · Mu‘allim / الحصري المعلّم</b>
<div class="row" style="margin-top:12px;flex-wrap:wrap">
<label>From / من <select id="fromAyah"></select></label>
<label>To / إلى <select id="toAyah"></select></label>
<label>Speed / السرعة <select id="speed"><option value="1">1×</option><option value="0.75">0.75×</option><option value="0.5">0.5×</option></select></label>
<label>Repeat verse / تكرار الآية <select id="repeats"><option value="1">1×</option><option value="2">2×</option><option value="3">3×</option></select></label>
<label>Pause / مهلة <select id="gap"><option value="0">0s</option><option value="3">3s</option><option value="5">5s</option><option value="10">10s</option></select></label>
</div><div class="row" style="margin-top:12px"><button id="listen" class="primary">▶ Play / تشغيل</button><button id="stopAudio">■ Stop / إيقاف</button><select id="recording" aria-label="Recording"><option value="Husary_Muallim_128kbps">Mu‘allim</option><option value="Husary_128kbps">Regular / مرتّل</option></select></div>
<p id="audioStatus" role="status" aria-live="polite">Select a verse range, then Play. / اختر الآيات ثم اضغط تشغيل.</p>`;
const media = new Audio();
media.preload = 'none';
let playing = false, currentVerse = 1, repetition = 0, pauseTimer, playbackRun = 0;
function stopPlayback() {
  playing = false; playbackRun++; clearTimeout(pauseTimer); media.pause(); media.removeAttribute('src'); media.load();
  $('listen').textContent = '▶ Play / تشغيل';
}
function audioURL(surah, verse, recording) {
  return `https://everyayah.com/data/${recording}/${String(surah).padStart(3,'0')}${String(verse).padStart(3,'0')}.mp3`;
}
async function playVerse() {
  const run = playbackRun;
  media.src = audioURL(state.surah, currentVerse, $('recording').value);
  media.playbackRate = Number($('speed').value);
  $('audioStatus').textContent = `Loading / تحميل · ${state.surah}:${currentVerse}`;
  try { await media.play(); if(run !== playbackRun) return; $('audioStatus').textContent = `Playing / تشغيل · ${state.surah}:${currentVerse}`; }
  catch(error) { if(run !== playbackRun) return; stopPlayback(); $('audioStatus').textContent = 'Unable to play audio. Check your connection or try the Regular recording. / تعذّر تشغيل الصوت. تحقق من الاتصال أو جرّب التسجيل المرتّل.'; }
}
media.onerror = () => { if (!playing) return; stopPlayback(); $('audioStatus').textContent = 'The audio host could not load this recording. Try Regular or retry. / تعذّر تحميل التسجيل. جرّب المرتّل أو أعد المحاولة.'; };
media.onended = () => {
  if (!playing) return;
  repetition++;
  if (repetition >= Number($('repeats').value)) { repetition = 0; currentVerse++; }
  if (currentVerse > Number($('toAyah').value)) { stopPlayback(); $('audioStatus').textContent = 'Range complete / اكتمل المقطع'; return; }
  $('audioStatus').textContent = 'Your turn to repeat… / دورك للترديد…';
  pauseTimer = setTimeout(playVerse, Number($('gap').value)*1000);
};
$('listen').onclick = () => {
  if (playing) { stopPlayback(); $('audioStatus').textContent = 'Stopped / متوقف'; return; }
  if (Number($('fromAyah').value) > Number($('toAyah').value)) { $('audioStatus').textContent = 'The ending verse must follow the starting verse. / يجب أن تكون آية النهاية بعد آية البداية.'; return; }
  playing = true; currentVerse = Number($('fromAyah').value); repetition = 0;
  $('listen').textContent = '■ Stop / إيقاف'; playVerse();
};
$('stopAudio').onclick = () => { stopPlayback(); $('audioStatus').textContent = 'Stopped / متوقف'; };
for (const id of ['fromAyah','toAyah','recording']) $(id).onchange = () => { stopPlayback(); $('audioStatus').textContent = 'Selection changed. Press Play. / اضغط تشغيل للاستماع.'; };
$('speed').onchange = () => media.playbackRate = Number($('speed').value);
let shownSurah;
render = function() {
  const id = state.surah || 1;
  const chapter = QURAN.chapters[id-1];
  lines.splice(0, lines.length, ...QURAN.verses[id].map(v => v.text));
  if (shownSurah !== id) {
    stopPlayback(); shownSurah = id; used = [];
    for (const name of ['fromAyah','toAyah']) {
      $(name).replaceChildren();
      for(let n=1;n<=lines.length;n++) { const option = document.createElement('option'); option.value=n; option.textContent=n; $(name).append(option); }
    }
    $('toAyah').value = lines.length;
    $('audioStatus').textContent = 'Select a verse range, then Play. / اختر الآيات ثم اضغط تشغيل.';
  }
  originalRender();
  $('surahSelect').value = id;
  $('chapterCount').textContent = `${chapter.total_verses} ayat / آيات`;
  document.querySelector('.surah').textContent = chapter.name;
  document.querySelector('.pagefoot').textContent = `${chapter.transliteration} · Surah ${id} · سورة ${id}`;
  $('refLabel').textContent = `${chapter.transliteration} · Reference preview / معاينة المرجع`;
};
$('surahSelect').onchange = () => {
  state.surah=Number($('surahSelect').value); state.marks=[]; state.test=null; state.reference='';
  $('reference').textContent='Translations and tafseer are not connected yet. / الترجمة والتفسير غير متاحين بعد.';
  sync();
};
$('translation').onclick = () => { $('reference').textContent = 'Verse translations are not connected yet. / ترجمة الآيات غير متاحة بعد.'; };
document.querySelector('.footer span').removeAttribute('data-en');
document.querySelector('.footer span').removeAttribute('data-ar');
document.querySelector('.footer span').innerHTML = 'Quran text © <a href="https://tanzil.net" target="_blank" rel="noopener">Tanzil Project</a> · CC BY 3.0 · <a href="data/NOTICE.txt">Text notice</a> · Audio streamed from EveryAyah. Surah view; Mushaf page layout and tajweed colours are pending.';
render();
