# Foothold Licence, version 1.0

Copyright © 2026 Aishwarya S. All rights reserved except as granted below.

"Foothold" means everything in this repository: the lessons, exercises, text, the
lesson engine, the site and the Google Apps Script files.

This licence is written in plain language on purpose. If you are unsure whether
something you plan is allowed, ask: the answer is usually yes.

## 1. What you may do

You may, free of charge:

1. **Use** Foothold to teach and to learn.
2. **Copy and host** it on your own web address, with your own students and your own
   Google Sheet.
3. **Change** it: hide, reorder, rewrite or remove lessons, and add your own.
4. **Share** your changed version with others, under this same licence.

## 2. What we ask in return

1. **Credit.** Keep the line **"Foothold Python course by Aishwarya S."**, with a link to
   the original course, visible on the landing page of your copy. (Your copy already
   shows it; it is set in `config/course.config.js` under `credit`.) Do not remove this
   licence file.
2. **Same licence.** If you share your version, share it under this licence, so the
   next teacher has the same freedoms you had.
3. **The usage signal.** Keep the usage signal described in section 4 switched on. It
   sends a few counts and never any student data.
4. **No selling.** Do not charge learners for access to Foothold or to a version of
   it, and do not sell it. Teaching it as part of a course your institution already
   charges fees for is fine. Anything else commercial needs written permission.
5. **Say what you changed.** If you alter lessons, do not present your version as the
   original, and do not suggest that the author endorses it.

## 3. Your students' data is yours to protect

Your copy stores your students' names, emails and progress in **your** Google Sheet.
The author never receives it and cannot see it. You are responsible for keeping it
private and for following your institution's and your country's rules on student data.

## 4. The usage signal — exactly what is sent

So that the author can tell how many institutions use Foothold, a copy sends a short
message to the author's records:

| When | What is sent |
|---|---|
| Each time you publish your site | the site's web address, the repository name and the course title |
| Once a week | three counts: students registered, students active that week, units completed that week; with a random id for your copy (it identifies the copy, not a person) and your site's address |

**Never sent:** any student's name, email, roll or register number, password, code,
answers, progress record or feedback. Your students' data stays in your Google Sheet.

You can read the code that sends the signal: `.github/adoption-signal.mjs` (on publish)
and `sendWeeklySignal()` in `Code.gs` (weekly).

## 5. What is not covered

- **Names and logos.** "Foothold", the Foothold mark and any institution's name or logo
  in this repository are not licensed for reuse beyond the credit line in section 2.
  Replace institutional logos with your own.
- **Other people's work.** Foothold uses software by others (for example React,
  Pyodide, pandas, matplotlib). Each stays under its own licence.

## 6. No warranty

Foothold is provided as it is, without any warranty. The author is not liable for any
loss or damage arising from its use, to the extent the law allows.

## 7. If the terms are not kept

Permission under this licence ends if its terms are broken and the problem is not
fixed within 30 days of being told about it.

---

Questions, or a use this licence does not cover: **foothold.aishwarya@gmail.com**
