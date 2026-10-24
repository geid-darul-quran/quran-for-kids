# Mu’alim — design prototype

An interactive, dependency-free design sketch for an open-source Quran teaching companion used alongside Zoom.

## Run

From this directory, run `python -m http.server 8000 --bind 0.0.0.0` and open the site in a browser. Use **Open Student Board** to open a second window. Share only that window in Zoom. Both windows must be on the same browser origin for synchronization.

## Try

Switch between English and Arabic, enter student names in Lesson setup, advance turns, award stars, mark words with optional notes, clear marks, share a reference, and generate a sample recitation question. The Student Board hides the test continuation. Language preference is retained locally; lesson data is in memory only.

## Design boundaries

The reader now includes all 114 surahs (6,236 verses) from Tanzil Uthmani text, bundled locally with attribution in data/NOTICE.txt. This is a surah reader, not an exact 604-page Mushaf layout. Artificial tajweed colours were removed. Word meanings, translations, and Al-Muyassar integration remain pending. Audio streams directly from EveryAyah: Al-Husary Mu‘allim, with an explicit Regular recording option. Select a verse range, speed, verse-repeat count, and pause duration. Audio availability depends on the external host. Questions use the selected surah and avoid repeats until its pool is exhausted.

Accounts, saved classes and progress, individual age/proficiency settings, exact 604-page Mushaf layout, verified word translations and tajweed data, licensed references, whole-range repeat controls, test ranges, and private test marking/reveal remain implementation work. The existing mark tool synchronizes marks to the Student Board immediately; do not use it for private test assessment.

The full product should offer guest lessons and optional teacher accounts, saved classes with attendance, per-student ages and levels, lesson modes, manually awarded session stars with history, mistake notes, summaries, and separate teacher and student windows. Qaida content is outside the initial scope.

## Validation of the reader update

Browser checks cover all 114 selector entries, representative surah counts (1, 2, 114), matching verse audio URLs, range progression and termination, verse repeats, stopping on surah changes, and RTL switching. Audio transport was simulated because this development environment blocks EveryAyah; actual streaming is not verified here.
