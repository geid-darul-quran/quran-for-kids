# Mu’alim — design prototype

An interactive, dependency-free design sketch for an open-source Quran teaching companion used alongside Zoom.

## Run

From this directory, run `python -m http.server 8000 --bind 0.0.0.0` and open the site in a browser. Use **Open Student Board** to open a second window. Share only that window in Zoom. Both windows must be on the same browser origin for synchronization.

## Try

Switch between English and Arabic, enter student names in Lesson setup, advance turns, award stars, mark words with optional notes, clear marks, share a reference, and generate a sample recitation question. The Student Board hides the test continuation. Language preference is retained locally; lesson data is in memory only.

## Design boundaries

This is a layout and interaction prototype, not a production Quran resource. The sample Arabic text, page layout, tajweed colouring, and English translation have not been validated for teaching. The sample has no word translations, actual Al-Muyassar text, or audio integration. Playback controls show the intended design only. The seven sample questions avoid repeats until the sample pool is exhausted.

Accounts, saved classes and progress, individual age/proficiency settings, full 604-page Quran content, verified word translations and tajweed data, licensed references, Al-Husary Mu‘allim recordings, complete playback controls, test ranges, and private test marking/reveal remain implementation work. The existing mark tool synchronizes marks to the Student Board immediately; do not use it for private test assessment.

The full product should offer guest lessons and optional teacher accounts, saved classes with attendance, per-student ages and levels, lesson modes, manually awarded session stars with history, mistake notes, summaries, and separate teacher and student windows. Qaida content is outside the initial scope.
