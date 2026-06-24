# New Course Setup Checklist

## Files to change (4 only):

[ ] config/course.config.js     — courseId, courseTitle, subtitle, modules, units
[ ] config/gas.config.js        — paste GAS Web App URL
[ ] package.json                — name and homepage fields
[ ] vite.config.js              — base field

## Files that NEVER change:
- index.html                    (always says SRET E-Learning)
- src/shell/App.jsx
- src/shell/Login.jsx
- src/shell/Dashboard.jsx
- src/shell/api.js
- src/main.jsx
- src/index.css
- .github/workflows/deploy.yml
- Code.gs

## Steps:
1. Create GitHub repo
2. Copy this template folder → rename it → go into it in CMD
3. npm install && npm install react-router-dom && npm install --save-dev gh-pages
4. Edit the 4 files above
5. Add lesson files to src/lessons/
6. Set up Google Sheet + Apps Script (Code.gs) → get GAS URL
7. Paste GAS URL into config/gas.config.js
8. npm run dev → test locally
9. git init → git add . → git commit -m "init" → git branch -M main → git remote add origin https://github.com/aishugithub/course_python → git push origin main
10. GitHub repo → Settings → Actions → Read and write permissions → Save
11. Wait for green tick in Actions tab
12. GitHub repo → Settings → Pages → gh-pages branch → Save
13. Done! Site is live at https://aishugithub.github.io/REPO_NAME/


You need to give permissin for Actions in Github Settings
You need to enable pages. choose the gh-pages and save.
