import { useState, lazy, Suspense } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import { getProgress, saveProgress } from './api.js';
import COURSE_CONFIG from '../../config/course.config.js';

const C = { bg: '#0D1117', muted: '#8B949E' };

function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', gap: 16 }}>
      <div style={{ fontSize: 40 }}>⚡</div>
      <div style={{ color: C.muted, fontSize: 15 }}>{message}</div>
    </div>
  );
}

export default function App() {
  const [student, setStudent]                 = useState(null);
  const [completedUnits, setCompletedUnits]   = useState([]);
  const [activeUnit, setActiveUnit]           = useState(null);
  const [LessonComponent, setLessonComponent] = useState(null);
  const [loadingLesson, setLoadingLesson]     = useState(false);

  async function handleLogin(studentData) {
    setStudent(studentData);
    const completed = await getProgress(studentData.rollNo, COURSE_CONFIG.courseId);
    setCompletedUnits(completed);
  }

  async function handleSelectUnit(unitId) {
    setLoadingLesson(true);
    setActiveUnit(unitId);
    try {
      const mod = await import(`../lessons/${unitId}.jsx`);
      setLessonComponent(() => mod.default);
    } catch (err) {
      console.error('Could not load lesson:', unitId, err);
      setLessonComponent(null); setActiveUnit(null);
    }
    setLoadingLesson(false);
  }

  async function handleUnitComplete() {
    if (!activeUnit) return;
    await saveProgress(student.rollNo, COURSE_CONFIG.courseId, activeUnit);
    setCompletedUnits(prev => [...new Set([...prev, activeUnit])]);
    setActiveUnit(null); setLessonComponent(null);
  }

  function handleBackToDashboard() { setActiveUnit(null); setLessonComponent(null); }

  if (!student) return <Login onLogin={handleLogin} />;
  if (loadingLesson) return <LoadingScreen message="Loading lesson…" />;

  if (activeUnit && LessonComponent) {
    return (
      <div>
        <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
          <button onClick={handleBackToDashboard} style={{ background: '#1C2333', border: '1px solid #30363D', color: '#8B949E', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>← Dashboard</button>
        </div>
        <Suspense fallback={<LoadingScreen message="Preparing lesson…" />}>
          <LessonComponent student={student} onUnitComplete={handleUnitComplete} />
        </Suspense>
      </div>
    );
  }

  return <Dashboard student={student} completedUnits={completedUnits} onSelectUnit={handleSelectUnit} />;
}
