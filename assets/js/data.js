// ============================================
// ECOPLENO - Datos estáticos de la aplicación
// ============================================

const AppData = {
  // === BENEFICIOS ===
  beneficios: [
    {
      id: 'b1',
      icon: '📅',
      title: 'Organización Inteligente',
      description: 'Calendario adaptativo que ayuda a estructurar rutinas diarias, horarios escolares y terapias con colores y categorías.'
    },
    {
      id: 'b2',
      icon: '⏰',
      title: 'Recordatorios Personalizados',
      description: 'Nunca olvides medicamentos, tareas o terapias. Sistema de prioridades y notificaciones visuales.'
    },
    {
      id: 'b3',
      icon: '📚',
      title: 'Técnicas de Estudio',
      description: 'Métodos probados para mejorar la concentración y el rendimiento académico de niños con TDAH.'
    },
    {
      id: 'b4',
      icon: '🧘',
      title: 'Bienestar Emocional',
      description: 'Ejercicios de relajación, respiración guiada y registro emocional para reducir el estrés familiar.'
    },
    {
      id: 'b5',
      icon: '👨‍⚕️',
      title: 'Directorio Especializado',
      description: 'Conecta con psicólogos, psiquiatras y terapeutas expertos en TDAH infantil.'
    },
    {
      id: 'b6',
      icon: '🎯',
      title: 'Metas y Logros',
      description: 'Establece objetivos académicos semanales y mensuales con seguimiento visual y recompensas.'
    }
  ],

  // === ESTADÍSTICAS ===
  estadisticas: [
    { id: 'e1', number: 85, suffix: '%', label: 'Mejora en organización' },
    { id: 'e2', number: 12000, suffix: '+', label: 'Familias ayudadas' },
    { id: 'e3', number: 500, suffix: '+', label: 'Recursos educativos' },
    { id: 'e4', number: 98, suffix: '%', label: 'Satisfacción parental' }
  ],

  // === TESTIMONIOS ===
  testimonios: [
    {
      id: 't1',
      name: 'María García',
      role: 'Madre de Diego (8 años)',
      text: 'NeuroFlow transformó nuestra rutina familiar. Ahora Diego sabe qué esperar cada día y las crisis de ansiedad han disminuido notablemente.',
      rating: 5
    },
    {
      id: 't2',
      name: 'Carlos Mendoza',
      role: 'Padre de Sofía (10 años)',
      text: 'El calendario inteligente y los recordatorios nos salvan cada semana. Las técnicas de estudio mejoraron las calificaciones de Sofía en dos meses.',
      rating: 5
    },
    {
      id: 't3',
      name: 'Ana Lucía Romero',
      role: 'Madre de Mateo (6 años)',
      text: 'Los ejercicios de relajación son mágicos. Mi hijo los pide cuando se siente abrumado. La respiración guiada es su favorita.',
      rating: 5
    },
    {
      id: 't4',
      name: 'Patricia Vega',
      role: 'Madre de Lucas (12 años)',
      text: 'Encontrar especialistas nunca fue tan fácil. El directorio nos conectó con una neuropediatra increíble que cambió la vida de Lucas.',
      rating: 5
    }
  ],

  // === CONSEJOS DIARIOS ===
  consejosDiarios: [
    'Establece rutinas consistentes: los niños con TDAH prosperan con horarios predecibles.',
    'Usa temporizadores visuales para ayudar a tu hijo a entender el paso del tiempo.',
    'Divide las tareas grandes en pasos pequeños y celebra cada logro.',
    'Crea un espacio de estudio libre de distracciones: sin pantallas, juguetes ni ruido.',
    'El ejercicio físico regular ayuda a reducir la hiperactividad y mejora el enfoque.',
    'Usa refuerzo positivo inmediato: las recompensas funcionan mejor cuando son inmediatas.',
    'Establece 3 reglas claras y consistentes en lugar de muchas reglas confusas.',
    'El sueño es fundamental: establece una rutina relajante antes de dormir.',
    'Los descansos frecuentes durante el estudio mejoran la retención de información.',
    'Comunícate con los maestros de tu hijo para mantener consistencia entre casa y escuela.',
    'Etiqueta las emociones: ayuda a tu hijo a ponerle nombre a lo que siente.',
    'Reduce las opciones: dar 2 opciones en lugar de 10 facilita la toma de decisiones.',
    'Los masajes y el contacto físico ayudan a calmar el sistema nervioso.',
    'Crea un "rincón de calma" en casa con objetos sensoriales que tu hijo pueda usar.',
    'La música clásica o instrumental puede mejorar la concentración durante el estudio.',
    'Celebra los esfuerzos, no solo los resultados. El progreso es más importante que la perfección.',
    'Establece señales visuales para las transiciones: un semáforo de colores funciona bien.',
    'Involucra a tu hijo en la creación de sus rutinas para darle sentido de control.',
    'Lee libros sobre TDAH: el conocimiento reduce la frustración y empodera a los padres.',
    'Cuida tu propia salud mental: los padres también necesitan apoyo y descanso.'
  ],

  // === TÉCNICAS DE ESTUDIO ===
  tecnicasEstudio: [
    {
      id: 'te1',
      title: 'Técnica Pomodoro',
      description: '25 minutos de trabajo enfocado seguido de 5 minutos de descanso. Después de 4 ciclos, toma un descanso largo de 15-20 minutos.',
      icon: '🍅',
      color: 'var(--accent-danger)',
      hasTimer: true
    },
    {
      id: 'te2',
      title: 'Método Cornell',
      description: 'Divide tus apuntes en 3 secciones: notas principales, palabras clave y resumen. Ideal para organizar información.',
      icon: '📝',
      color: 'var(--secondary-400)',
      hasTimer: false
    },
    {
      id: 'te3',
      title: 'Mapas Mentales',
      description: 'Usa colores, dibujos y palabras clave para conectar ideas visualmente. Excelente para niños visuales con TDAH.',
      icon: '🧠',
      color: 'var(--accent-purple)',
      hasTimer: false
    },
    {
      id: 'te4',
      title: 'Técnica de la Tortuga',
      description: 'Trabaja a tu propio ritmo sin prisas. Concéntrate en una sola tarea a la vez durante periodos cortos.',
      icon: '🐢',
      color: 'var(--primary-500)',
      hasTimer: false
    },
    {
      id: 'te5',
      title: 'Regla 5-10-15',
      description: '5 minutos de preparación, 10 minutos de trabajo intenso, 15 minutos de repaso. Ciclos cortos ideales para TDAH.',
      icon: '⏱',
      color: 'var(--accent-teal)',
      hasTimer: true
    },
    {
      id: 'te6',
      title: 'Estudio con Colores',
      description: 'Asigna un color a cada materia. Usa resaltadores, post-its y organizadores visuales para hacer el estudio más atractivo.',
      icon: '🎨',
      color: 'var(--accent-warm)',
      hasTimer: false
    },
    {
      id: 'te7',
      title: 'Técnica del Lugar Fijo',
      description: 'Designa un lugar específico y siempre el mismo para estudiar. Ayuda al cerebro a entrar en "modo estudio" más rápido.',
      icon: '📍',
      color: 'var(--primary-400)',
      hasTimer: false
    },
    {
      id: 'te8',
      title: 'Auto-instrucciones',
      description: 'Enséñale a tu hijo a hablarse a sí mismo en voz baja: "Primero leo, luego subrayo, después resumo".',
      icon: '💬',
      color: 'var(--secondary-500)',
      hasTimer: false
    }
  ],

  // === RECURSOS EDUCATIVOS ===
  recursos: [
    {
      id: 'r1',
      title: 'Guía Completa del TDAH Infantil',
      type: 'guia',
      typeLabel: 'Guía',
      description: 'Todo lo que necesitas saber sobre el TDAH: síntomas, diagnóstico, tratamientos y estrategias de apoyo en casa.',
      image: '📖',
      category: 'Información',
      url: '#'
    },
    {
      id: 'r2',
      title: 'Ejercicios de Atención Sostenida',
      type: 'actividad',
      typeLabel: 'Actividad',
      description: '10 actividades imprimibles para mejorar la capacidad de atención en niños de 6 a 12 años.',
      image: '✏️',
      category: 'Ejercicios',
      url: '#'
    },
    {
      id: 'r3',
      title: 'Cómo Hablar con tu Hijo sobre TDAH',
      type: 'pdf',
      typeLabel: 'PDF',
      description: 'Una guía diseñada para ayudar a los padres a explicar el TDAH a sus hijos de manera positiva.',
      image: '📄',
      category: 'Familia',
      url: '#'
    },
    {
      id: 'r4',
      title: 'Rutinas Matutinas Efectivas',
      type: 'video',
      typeLabel: 'Video',
      description: 'Video tutorial con estrategias visuales para crear mañanas tranquilas y organizadas.',
      image: '🎬',
      category: 'Rutinas',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'r5',
      title: 'Estrategias para la Tarea Escolar',
      type: 'guia',
      typeLabel: 'Guía',
      description: 'Métodos probados para hacer la tarea menos frustrante y más productiva para niños con TDAH.',
      image: '📚',
      category: 'Escolar',
      url: '#'
    },
    {
      id: 'r6',
      title: 'Tarjetas de Emociones Imprimibles',
      type: 'actividad',
      typeLabel: 'Actividad',
      description: 'Set de 20 tarjetas con emociones para ayudar a tu hijo a identificar y expresar lo que siente.',
      image: '🎭',
      category: 'Emociones',
      url: '#'
    },
    {
      id: 'r7',
      title: 'Alimentación y TDAH',
      type: 'pdf',
      typeLabel: 'PDF',
      description: 'Guía nutricional con alimentos recomendados y aquellos que pueden empeorar los síntomas del TDAH.',
      image: '🥗',
      category: 'Salud',
      url: '#'
    },
    {
      id: 'r8',
      title: 'Yoga para Niños Hiperactivos',
      type: 'video',
      typeLabel: 'Video',
      description: 'Sesión guiada de 15 minutos de yoga diseñada específicamente para niños con mucha energía.',
      image: '🧘',
      category: 'Relajación',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'r9',
      title: 'Organizadores Visuales para Descargar',
      type: 'actividad',
      typeLabel: 'Actividad',
      description: 'Plantillas de horarios, checklists y organizadores semanales listos para imprimir y usar.',
      image: '📋',
      category: 'Organización',
      url: '#'
    },
    {
      id: 'r10',
      title: 'Meditación Guiada para Padres',
      type: 'video',
      typeLabel: 'Video',
      description: '10 minutos de meditación diseñada para padres que necesitan recargar energías.',
      image: '🌿',
      category: 'Bienestar',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'r11',
      title: 'Derechos Educativos del Niño con TDAH',
      type: 'guia',
      typeLabel: 'Guía',
      description: 'Información sobre adaptaciones curriculares, apoyos escolares y derechos legales.',
      image: '⚖️',
      category: 'Legal',
      url: '#'
    },
    {
      id: 'r12',
      title: 'Cuaderno de Logros Diarios',
      type: 'pdf',
      typeLabel: 'PDF',
      description: 'Imprimible para que el niño registre 3 logros cada día y cultive una mentalidad positiva.',
      image: '🌟',
      category: 'Motivación',
      url: '#'
    }
  ],

  // === SONIDOS AMBIENTALES ===
  sonidosAmbientales: [
    { id: 's1', name: 'Lluvia', icon: '🌧️', color: '#42A5F5' },
    { id: 's2', name: 'Bosque', icon: '🌲', color: '#4CAF50' },
    { id: 's3', name: 'Mar', icon: '🌊', color: '#26A69A' },
    { id: 's4', name: 'Noche', icon: '🌙', color: '#5C6BC0' },
    { id: 's5', name: 'Viento', icon: '🍃', color: '#9CCC65' },
    { id: 's6', name: 'Fuego', icon: '🔥', color: '#FF7043' }
  ],

  // === ESPECIALISTAS ===
  especialistas: [
    {
      id: 'esp1',
      name: 'Dra. Laura Castillo',
      especialidad: 'Psicóloga Infantil',
      foto: '',
      rating: 4.9,
      reviews: 124,
      telefono: '+52 55 1234 5678',
      email: 'laura.castillo@email.com',
      ubicacion: 'Ciudad de México',
      horario: 'Lun-Vie 9:00-18:00',
      descripcion: 'Especialista en TDAH infantil con más de 15 años de experiencia. Terapia cognitivo-conductual y entrenamiento para padres.',
      precio: '$800 - $1,200 MXN'
    },
    {
      id: 'esp2',
      name: 'Dr. Roberto Méndez',
      especialidad: 'Psiquiatra Infantil',
      foto: '',
      rating: 4.8,
      reviews: 98,
      telefono: '+52 55 2345 6789',
      email: 'roberto.mendez@email.com',
      ubicacion: 'Monterrey',
      horario: 'Lun-Sáb 8:00-14:00',
      descripcion: 'Psiquiatra especializado en trastornos del neurodesarrollo. Manejo farmacológico y terapia integrativa.',
      precio: '$1,200 - $1,800 MXN'
    },
    {
      id: 'esp3',
      name: 'Dra. Carmen Suárez',
      especialidad: 'Neuropediatra',
      foto: '',
      rating: 4.9,
      reviews: 156,
      telefono: '+52 55 3456 7890',
      email: 'carmen.suarez@email.com',
      ubicacion: 'Guadalajara',
      horario: 'Lun-Vie 9:00-17:00',
      descripcion: 'Neuropediatra con subespecialidad en trastornos del neurodesarrollo. Evaluaciones integrales y diagnóstico temprano.',
      precio: '$1,500 - $2,500 MXN'
    },
    {
      id: 'esp4',
      name: 'Lic. Mariana Ríos',
      especialidad: 'Terapeuta Ocupacional',
      foto: '',
      rating: 4.7,
      reviews: 87,
      telefono: '+52 55 4567 8901',
      email: 'mariana.rios@email.com',
      ubicacion: 'Ciudad de México',
      horario: 'Lun-Vie 10:00-19:00',
      descripcion: 'Terapia ocupacional especializada en integración sensorial para niños con TDAH. Enfoque lúdico y práctico.',
      precio: '$600 - $900 MXN'
    },
    {
      id: 'esp5',
      name: 'Dr. Andrés Vega',
      especialidad: 'Psicólogo Clínico',
      foto: '',
      rating: 4.6,
      reviews: 73,
      telefono: '+52 55 5678 9012',
      email: 'andres.vega@email.com',
      ubicacion: 'Querétaro',
      horario: 'Mar-Sáb 9:00-18:00',
      descripcion: 'Psicólogo clínico especializado en TDAH en adolescentes. Terapia individual y grupal, así como orientación vocacional.',
      precio: '$700 - $1,000 MXN'
    },
    {
      id: 'esp6',
      name: 'Lic. Gabriela Torres',
      especialidad: 'Terapeuta de Lenguaje',
      foto: '',
      rating: 4.8,
      reviews: 62,
      telefono: '+52 55 6789 0123',
      email: 'gabriela.torres@email.com',
      ubicacion: 'Puebla',
      horario: 'Lun-Vie 8:00-16:00',
      descripcion: 'Terapia de lenguaje y comunicación para niños con TDAH que presentan dificultades en la expresión y comprensión.',
      precio: '$500 - $800 MXN'
    }
  ],

  // === PRODUCTOS - TIENDA ===
  productos: [
    {
      id: 'prod1',
      name: 'Kit Sensorial Anti-estrés',
      category: 'juguetes-sensoriales',
      categoryLabel: 'Juguetes Sensoriales',
      price: 349,
      originalPrice: 450,
      image: '',
      emoji: '🧸',
      rating: 4.8,
      reviews: 234,
      description: 'Set de 6 juguetes sensoriales diseñados para canalizar la energía y reducir la ansiedad. Incluye pelota anti-estrés, spinner, cubo fidget y más.',
      stock: 15
    },
    {
      id: 'prod2',
      name: 'Reloj Visual Time Timer',
      category: 'organizacion',
      categoryLabel: 'Organización',
      price: 599,
      originalPrice: null,
      image: '',
      emoji: '⏰',
      rating: 4.9,
      reviews: 189,
      description: 'Reloj visual con disco de tiempo que ayuda a los niños a entender el concepto del tiempo. Ideal para rutinas y transiciones.',
      stock: 8
    },
    {
      id: 'prod3',
      name: 'Guía Práctica: TDAH en Casa',
      category: 'libros',
      categoryLabel: 'Libros',
      price: 249,
      originalPrice: 299,
      image: '',
      emoji: '📘',
      rating: 4.7,
      reviews: 312,
      description: 'Libro con estrategias prácticas para padres. Incluye planes de acción, hojas de trabajo y casos reales.',
      stock: 25
    },
    {
      id: 'prod4',
      name: 'Audífonos Cancelación de Ruido',
      category: 'tecnologia',
      categoryLabel: 'Tecnología Asistiva',
      price: 1299,
      originalPrice: 1599,
      image: '',
      emoji: '🎧',
      rating: 4.6,
      reviews: 98,
      description: 'Audífonos diseñados para niños con hipersensibilidad auditiva. Cancelación activa de ruido y volumen limitado.',
      stock: 5
    },
    {
      id: 'prod5',
      name: 'Set de Organización Escolar',
      category: 'organizacion',
      categoryLabel: 'Organización',
      price: 199,
      originalPrice: null,
      image: '',
      emoji: '📚',
      rating: 4.5,
      reviews: 156,
      description: 'Kit completo con separadores de colores, etiquetas, calendario magnético y checklists para organizar tareas escolares.',
      stock: 30
    },
    {
      id: 'prod6',
      name: 'Pelota de Equilibrio',
      category: 'juguetes-sensoriales',
      categoryLabel: 'Juguetes Sensoriales',
      price: 449,
      originalPrice: 549,
      image: '',
      emoji: '⚽',
      rating: 4.4,
      reviews: 67,
      description: 'Pelota sensorial con texturas que estimula el sistema propioceptivo. Ayuda a mejorar la concentración y regular la energía.',
      stock: 12
    },
    {
      id: 'prod7',
      name: 'Diario de Emociones',
      category: 'libros',
      categoryLabel: 'Libros',
      price: 179,
      originalPrice: null,
      image: '',
      emoji: '📓',
      rating: 4.8,
      reviews: 203,
      description: 'Cuaderno diario diseñado para que los niños expresen sus emociones a través de dibujos, colores y escritura guiada.',
      stock: 40
    },
    {
      id: 'prod8',
      name: 'Lámpara Proyector de Estrellas',
      category: 'tecnologia',
      categoryLabel: 'Tecnología Asistiva',
      price: 399,
      originalPrice: 499,
      image: '',
      emoji: '🌟',
      rating: 4.9,
      reviews: 178,
      description: 'Lámpara nocturna con proyección de estrellas y colores relajantes. Ideal para crear un ambiente tranquilo antes de dormir.',
      stock: 10
    }
  ],

  // === PREGUNTAS FRECUENTES ===
  faqs: [
    {
      q: '¿Qué es NeuroFlow?',
      r: 'NeuroFlow es una plataforma digital diseñada para ayudar a padres de niños con TDAH a organizar rutinas, dar seguimiento académico, acceder a recursos educativos y conectar con especialistas.'
    },
    {
      q: '¿NeuroFlow reemplaza el tratamiento médico?',
      r: 'No. NeuroFlow es una herramienta complementaria que apoya la gestión diaria, pero no sustituye la atención médica profesional ni los tratamientos recomendados por especialistas.'
    },
    {
      q: '¿La plataforma es gratuita?',
      r: 'Sí, NeuroFlow es completamente gratuita. Todos los módulos y recursos están disponibles sin costo alguno para las familias.'
    },
    {
      q: '¿Cómo se guarda mi información?',
      r: 'Toda la información se almacena localmente en tu navegador (LocalStorage). No se envía ningún dato a servidores externos, garantizando tu privacidad.'
    },
    {
      q: '¿Puedo usar NeuroFlow en mi teléfono?',
      r: 'Sí, la plataforma está diseñada para ser responsive y funciona perfectamente en móviles, tablets y computadoras de escritorio.'
    },
    {
      q: '¿A qué edad está dirigido?',
      r: 'NeuroFlow está diseñado para padres de niños con TDAH entre 5 y 17 años. Las herramientas se adaptan a diferentes etapas del desarrollo.'
    }
  ]
};

// Función para obtener un consejo aleatorio
AppData.getConsejoDelDia = function() {
  const today = new Date().toDateString();
  const stored = Storage.get('consejo_dia');
  if (stored && stored.date === today) return stored.consejo;

  const idx = Math.floor(Math.random() * this.consejosDiarios.length);
  const consejo = this.consejosDiarios[idx];
  Storage.set('consejo_dia', { date: today, consejo });
  return consejo;
};

// Exponer globalmente
window.AppData = AppData;
