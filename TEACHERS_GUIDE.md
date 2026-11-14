# Foothold for Teachers — run this Python course for your own students

Foothold is a free, self-paced Python course for absolute beginners. Students type real
Python in the browser from the first lesson (about 460 small programs, checked
instantly). This guide shows you how to run **your own copy**: your web address, your
students, your Google Sheet. Nobody else can see your students' data.

**What you need:** a GitHub account, a Google account, and about 45 minutes.
You do not need to know web programming.

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

## Part 1 — Get your copy (10 minutes)

1. Open the Foothold repository on GitHub and choose **Use this template → Create a new
   repository**. Name it, for example, `python-course`. Keep it **Public** (free GitHub
   Pages needs that).
2. In your new repository, edit two files (the pencil icon on GitHub is enough):
   - `vite.config.js` — set `base` to your repository name, with slashes:
     `base: '/python-course/'`
   - `package.json` — set `homepage` to
     `https://YOUR-GITHUB-NAME.github.io/python-course`
3. **Settings → Actions → General → Workflow permissions →** choose
   **Read and write permissions** → Save.

## Part 2 — Set up the record book (15 minutes)

1. Create a new, empty Google Sheet. Name it, for example, `Python course records`.
2. In the Sheet: **Extensions → Apps Script**. Delete what is there, paste the whole of
   `Code.gs` from your repository, and save.
   Then add a second script file (the **+** next to *Files* → *Script*), name it
   `ClassDashboard`, and paste the whole of `ClassDashboard.gs` into it. Save.
3. In the Apps Script editor, pick the function **`setupSheets`** and press **Run**.
   Accept the permission request. This creates the `Students` and `Progress` tabs.
   **Run it once only: it clears those two tabs.**
4. **Deploy → New deployment → Web app.** Set *Execute as* **Me** and *Who has access*
   **Anyone**. Deploy, then copy the **Web app URL**.
5. In your repository, open `config/gas.config.js` and paste that URL in place of the
   existing one.

> Whenever `Code.gs` changes later, use **Deploy → Manage deployments → Edit → New
> version**. That keeps the same URL.

## Part 3 — Switch the site on (5 minutes)

1. Saving the files in Part 1 and 2 starts a build. Open the **Actions** tab and wait for
   the green tick (about 2 minutes).
2. **Settings → Pages → Branch:** choose **`gh-pages`** → Save.
3. Your course is live at `https://YOUR-GITHUB-NAME.github.io/python-course/`.

Open it, choose **Sign In / Register**, create an account, and finish one exercise.
A row should appear in the `Progress` tab of your Sheet.

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
feedback form. The signature and institution printed on it are in
`src/shell/Certificate.jsx`; change them to yours.

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

## Credit

You are welcome to use, adapt and teach from Foothold. In return, please keep the line
**"Built on Foothold by Aishwarya S."** with a link to the original course, visible on
your landing page.

Tell us you are using it — it helps the research behind the course, and we will help you
get set up: **[registration link to be added]**

---

## If something goes wrong

| What you see | Likely cause | Fix |
|---|---|---|
| Blank page after publishing | `base` in `vite.config.js` does not match the repository name | Correct it; include both slashes |
| Red cross in the Actions tab | Workflow permissions still read-only | Part 1, step 3 |
| "Network error" on sign-in | Wrong or old Web app URL, or access is not "Anyone" | Part 2, steps 4–5 |
| "This page is out of date" | The browser has an old copy of the site | Refresh with Ctrl+F5 |
| Sign-in works but nothing is saved | `Code.gs` was changed but not redeployed as a new version | See the note under Part 2 |
| "Loading Python" never finishes | The school network blocks `cdn.jsdelivr.net` | Ask IT to allow it |
