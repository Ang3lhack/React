import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, LayoutDashboard } from 'lucide-react';
import './App.css';

function App() {
  // Inicializamos el estado leyendo de localStorage (para no perder datos al recargar)
  const [tareas, setTareas] = useState(() => {
    const guardado = localStorage.getItem('mis-tareas');
    return guardado ? JSON.parse(guardado) : [
      { id: 1, texto: 'Aprender React', completada: false },
      { id: 2, texto: 'Desplegar en Netlify', completada: false }
    ];
  });
  
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Guardar en localStorage cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem('mis-tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Cálculos para la barra de progreso
  const completadas = tareas.filter(t => t.completada).length;
  const total = tareas.length;
  const progreso = total === 0 ? 0 : Math.round((completadas / total) * 100);

  // Funciones de la app
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    
    setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }]);
    setNuevaTarea('');
  };

  const alternarTarea = (id) => {
    setTareas(tareas.map(t => 
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <div className="app-contenedor">
      <div className="dashboard">
        <header className="header">
          <div className="titulo">
            <LayoutDashboard className="icono-titulo" size={28} />
            <h1>Mi Dashboard</h1>
          </div>
          
          <div className="tarjeta-progreso">
            <div className="progreso-info">
              <span>Progreso diario</span>
              <strong>{progreso}%</strong>
            </div>
            <div className="barra-fondo">
              <div 
                className="barra-relleno" 
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
          </div>
        </header>

        <main>
          <form onSubmit={agregarTarea} className="formulario">
            <input 
              type="text" 
              placeholder="¿Qué necesitas hacer hoy?" 
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
            />
            <button type="submit" className="btn-agregar">
              <Plus size={20} />
            </button>
          </form>

          <div className="lista-tareas">
            {tareas.length === 0 ? (
              <p className="mensaje-vacio">¡Todo al día! Disfruta tu tiempo libre. ☕</p>
            ) : (
              tareas.map((tarea) => (
                <div key={tarea.id} className={`tarea ${tarea.completada ? 'completada' : ''}`}>
                  <button 
                    className="btn-icono check" 
                    onClick={() => alternarTarea(tarea.id)}
                  >
                    {tarea.completada ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  
                  <span className="texto-tarea">{tarea.texto}</span>
                  
                  <button 
                    className="btn-icono eliminar" 
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;