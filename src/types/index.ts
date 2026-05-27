// Este es el molde estricto de lo que es una Tarea en nuestra aplicación
export interface Task {
  id: string;          // El identificador único que genera Supabase
  title: string;       // El título de la tarea (ej: "Diseñar Login")
  description: string; // Detalle opcional de qué hay que hacer
  status: 'todo' | 'in_progress' | 'done'; // ¡Fijo! Solo permitimos estos tres estados
  tag: 'Frontend' | 'Backend' | 'Bug' | 'Diseño'; // Etiquetas para categorizar
  due_date?: string;   // Fecha límite (el ? significa que es opcional)
  project_id: string;  // A qué proyecto pertenece esta tarea
  created_at: string;  // Fecha de creación
}

// Este es el molde de un Proyecto (que va a contener varias tareas)
export interface Project {
  id: string;
  name: string;        // Ej: "App de Pádel" o "Portfolio"
  created_at: string;
}