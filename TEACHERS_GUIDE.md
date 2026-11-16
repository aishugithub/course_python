# Foothold for Teachers — run this Python course for your own students

Foothold is a free, self-paced Python course for absolute beginners. Students type real
Python in the browser from the first lesson (about 470 small programs, checked
instantly). This guide shows you how to run **your own copy**: your web address, your
students, your Google Sheet. Nobody else can see your students' data.

**What you need:** a GitHub account, a Google account, and about 30 minutes.
No programming is needed: you only follow the steps below.

**What it costs:** nothing. GitHub Pages hosts the site; a Google Sheet stores sign-ins
and progress.

---

## How it fits together

| Part | Where it lives | What it does |
|---|---|---|
| The course site | Your GitHub repository → GitHub Pages | Lessons, editor, Python (runs in the student's browser) |
| The record book | Your Google Sheet + its Apps Script | Sign-ins, progress, feedback, usage events |
| The settings | `config/course.config.js` | Course title, which modules and units are shown |

---

## Part 1 — Get your copy (5 minutes)

In the links below, put your GitHub username in place of `USERNAME` and your
repository's name in place of `REPO`.

1. Open **https://github.com/foothold-courses/python/generate**. Owner: you. Name it, for
   example, `python-course`. Keep it **Public** (free GitHub Pages needs that). Press
   **Create repository**. The site's address follows the name automatically; there is
   nothing to edit.
2. Open **https://github.com/USERNAME/REPO/settings/actions**, scroll to **Workflow
   permissions**, choose **Read and write permissions** → **Save**.

## Part 2 — Set up the record book (10 minutes)

Sign in to Google with the account that should hold your class records.

1. Open this link and press **Make a copy**:
   **https://docs.google.com/spreadsheets/d/1317jn76PiYFnZikqy4JLZTyl3JRIn9NTUZ4SjMSo4Qc/copy**
   You get your own Sheet with both scripts already attached (`Code.gs` and
   `ClassDashboard.gs`); there is nothing to paste. Rename it, for example
   `Python course records`.
2. In your copy: **Extensions → Apps Script**. In the toolbar, pick the function
   **`setupSheets`** and press **Run**. Google asks for permission: choose your account,
   then **Advanced → Go to Foothold course records (unsafe) → Allow**. ("Unsafe" only
   means Google has not reviewed this script; it is the script in your own Sheet.)
   Google lists what the script may do: use this Sheet, run once a week, and connect to
   an external service (that is the weekly usage signal, see *Credit and the usage
   signal* below). This creates the `Students` and `Progress` tabs. Run it once. It
   refuses to run on a Sheet that already has students, so it can never wipe a class.
3. **Deploy → New deployment →** the gear icon **→ Web app.** Set *Execute as* **Me** and
   *Who has access* **Anyone**. Deploy, then copy the **Web app URL** (it ends in `/exec`).
4. Open **https://github.com/USERNAME/REPO/edit/main/config/gas.config.js** and paste
   that URL in place of `PASTE_YOUR_WEB_APP_URL_HERE` (keep the quotes). Press
   **Commit changes**.

> Whenever `Code.gs` changes later, use **Deploy → Manage deployments → Edit → New
> version**. That keeps the same URL.

## Part 3 — Switch the site on (5 minutes)

1. Committing the file in Part 2 starts a build. Open
   **https://github.com/USERNAME/REPO/actions** and wait for the green tick (about 2
   minutes). A red cross on the very first run, from before
   Part 1 step 2, is normal; the newest run is the one that counts.
2. Open **https://github.com/USERNAME/REPO/settings/pages** → **Deploy from a branch** →
   Branch **`gh-pages`**, folder **/ (root)** → **Save**.
3. Your course is live at `https://USERNAME.github.io/REPO/` after a minute or two.

Open it, choose **Sign In / Register**, create an account, and finish one exercise.
A row should appear in the `Progress` tab of your Sheet.

**Prefer to be guided?** Open a new chat with Claude (a free or paid account), attach
`SETUP_WITH_CLAUDE.md` from your repository, and say *start*. Claude shows you this
checklist with your own direct links. Follow it yourself, or let Claude take you through
it one step at a time; either way it helps if anything looks different on your screen.

---

## Make it yours

Everything below is in `config/course.config.js`. Every save republishes the site.

**Title and batch.** Change `courseTitle`, `subtitle` and `batch` at the top.

**Hide a whole module.** Add `hidden: true` to it. It disappears from the dashboard and
from the course percentage. Remove the line and it is back; nothing is deleted.

```js
{
  moduleId:    "M13",
  hidden:      true,          // ← add this line
  moduleTitle: "Data Visualization",
```

**Hide one unit.** Put `//` in front of that unit's line.

**Reorder modules.** Move the whole `{ … }` block of a module up or down.

**The certificate.** A learner earns it by clearing all ten Crucibles and submitting the
feedback form. The name and role printed on it are under `certificate` in
`config/course.config.js`; put in your own.

**Do not rename a `unitId`.** Students' saved progress is stored under it.

---

## Your students

- **They register themselves** with an email and a password of their choice, or
- **you add them**: one row each in the `Students` tab — `RollNo | Password | Name |
  Batch | Email`. They sign in with the roll number. The password you type is replaced
  by a scrambled form the first time they sign in, so nobody can read it afterwards.
- **Forgotten password:** type a new one into that student's `Password` cell.
- **Progress** is in the `Progress` tab (one row per finished unit or exercise).
  **Events** has one row per lesson opened, finished or skipped.

## Your class dashboard

Reload the Sheet and a new menu appears: **Foothold → Open class dashboard**. It reads
your Sheet and shows:

> **Open it from the Sheet's menu, not from the Apps Script editor.** If you press
> *Run* in the editor, the dashboard still opens, but in the Sheet's browser tab, not in
> the editor, so it looks as if nothing happened. The editor's log then tells you to
> switch to the Sheet's tab.

- **Students** — course progress, units covered, programs written, Crucibles cleared,
  active time and last active date for each student. Click a student to see every unit
  and exactly which programs are still to be written.
- **Units** — how much of the class has covered each unit, how many tries a program
  took on average, the most common Python error, and how often sections were skipped.
- **Needs attention** — students who have gone quiet for a week, students who have not
  started, students who keep leaving out the final "Make It" program, and the programs
  the class finds hard.
- **Export table to a tab** — writes the student table to a tab named `Class export`.

A unit counts as *covered* at 80% of its programs. *Active time* counts only minutes
when the student was typing, clicking or scrolling. Progress is checked in the student's
browser, so read it as evidence of practice; the Crucibles are the stronger evidence of
skill. Only people you share the Sheet with can open the dashboard.

**Looking after their data.** The Sheet holds names, emails and learning records. Keep
it private (do not share it by link), and never upload an export of it to GitHub.

---

## Adding your own lessons

A lesson is one file in `src/lessons/` plus one line in `config/course.config.js`:

```js
{ unitId: "Unit6_5", title: "Loops in My Subject", blurb: "One line that makes them click." },
```

The quickest way to write the file is with an AI coding assistant. Give it
`src/lessons/Unit4_1.jsx` as the model and a request like this:

> Build a new Foothold unit `Unit6_5` on *[topic]*, in the same format as `Unit4_1.jsx`:
> sections that each end with programs the learner types, tests with at least one hidden
> test per exercise, hints, a final "make" task, and a five-question quiz. Use only
> Python taught up to Module 6.

Before you publish, open the unit yourself and solve every exercise once.

---

## Keeping up with improvements

Lessons in the original Foothold are corrected and extended over time. If you have not
edited a lesson file yourself, you can copy the newer version of that file from the
original repository over yours. Your settings file and your Sheet are not affected.

---

## Credit and the usage signal

You are welcome to use, adapt and teach from Foothold under its licence (`LICENSE.md`).
In return:

- **Keep the credit line** **"Foothold Python course by Aishwarya S."**, linked to the
  original course. Your landing page already shows it at the bottom.
- **Keep the usage signal on.** It lets the author know how many classes use the course.
  Each time your site is published, it sends your site's address, repository name and
  course title. Once a week, your Sheet sends three counts: students registered,
  students active that week and units completed that week, with a random id for your
  copy. **No student data is ever sent**: no names, emails, roll numbers, passwords,
  code or answers. You can read the code: `.github/adoption-signal.mjs` and
  `sendWeeklySignal()` in `Code.gs`.

**A line for other teachers.** Your site shows one line at the top of the landing page
and the dashboard, and a short card on the landing page, telling other teachers that
they can run Foothold for their own class too. It links to the original course. A
student can close the line on the dashboard.

Stuck, or want to tell us how it went? Write to **foothold.aishwarya@gmail.com**.

---

## If something goes wrong

| What you see | Likely cause | Fix |
|---|---|---|
| Blank page or 404 after publishing | GitHub Pages is not switched on yet | Part 3, step 2 |
| Red cross in the Actions tab | Workflow permissions still read-only | Part 1, step 3 |
| "Network error" on sign-in | Wrong or old Web app URL, or access is not "Anyone" | Part 2, steps 3–4 |
| "This page is out of date" | The browser has an old copy of the site | Refresh with Ctrl+F5 |
| Sign-in works but nothing is saved | `Code.gs` was changed but not redeployed as a new version | See the note under Part 2 |
| "Loading Python" never finishes | The school network blocks `cdn.jsdelivr.net` | Ask IT to allow it |
