🧩 FASE 0 – DEFINICIONES CLAVE (muy importante)

Antes de escribir nada, define esto (mentalmente o en notas):

1️⃣ Modelo de tiempo

Decide UNA regla clara:

La duración estándar es 42 días

Puede variar (40–45)

La fecha base siempre será:

Fecha oficial del inicio de la versión actual

👉 Esto evita errores y confusión futura.

2️⃣ Nivel de exactitud

Tu app debe decir algo como:

“Tiempo estimado para la próxima versión”

Esto te protege si:

HoYoverse cambia fechas

Hay delays o adelantos

3️⃣ Tipo de actualización

Al inicio:

Manual (editar un archivo de datos)

Más adelante (opcional):

Panel admin

Automatización

👉 No compliques ahora.

🧱 FASE 1 – CREAR LA BASE DEL PROYECTO (Astro)
Paso 1

Crea un proyecto nuevo con Astro

Elige:

TypeScript: sí

Framework extra: ninguno (por ahora)

Instalar dependencias: sí

🎯 Objetivo: Tener el proyecto corriendo en local.

Paso 2

Ejecuta el proyecto

Abre la web en el navegador

Confirma que:

Carga rápido

No hay errores

🚨 Checkpoint
No sigas si Astro no corre bien.

🎨 FASE 2 – ESTILO GLOBAL (antes del contenido)
Paso 3

Decide el estilo visual:

Oscuro (recomendado)

Colores por juego (verde Genshin, rojo HSR, amarillo ZZZ)

Tipografía clara y gamer

Paso 4

Integra:

Un sistema de estilos global

Decide si usarás:

Tailwind CSS (recomendado)

o CSS propio

🎯 Objetivo:
Que TODA la web tenga coherencia visual desde el inicio.

🧠 FASE 3 – MODELO DE DATOS (sin backend)
Paso 5

Crea un archivo de datos central, no hardcodees en componentes.

Cada juego debe tener:

Nombre

Versión actual

Próxima versión

Fecha de inicio de la versión actual

Duración estimada (en días)

👉 Esto será el corazón del proyecto.

Paso 6

Valida mentalmente:

¿Puedo actualizar una versión en 10 segundos?

¿Puedo agregar un nuevo juego sin romper nada?

Si la respuesta es “sí”, vas bien.

⏳ FASE 4 – LÓGICA DEL CONTADOR (aislada)
Paso 7

Define la lógica del tiempo:

Fecha objetivo = fecha_inicio + duración_días

Tiempo restante = fecha_objetivo – ahora

⚠️ Importante:

Decide si el contador:

Se actualiza cada segundo

o cada minuto (suficiente y más eficiente)

Paso 8

Decide:

Qué mostrar si el tiempo llega a 0

“¡Nueva versión disponible!”

“Actualizando datos…”

⚛️ FASE 5 – INTERACTIVIDAD (React en Astro)
Paso 9

Usa React solo para el contador:

Astro para el layout

React para:

el timer

el cálculo dinámico

👉 Esto se llama Islands Architecture (Astro).

Paso 10

Asegúrate de que:

La página carga sin JS

El contador se activa después

SEO + performance ✔️

🧱 FASE 6 – ESTRUCTURA DE LA PÁGINA
Paso 11

Diseña la UI:

Card por juego

Cada card muestra:

Logo

Versión actual

Próxima versión

Contador

Paso 12

Decide si:

Todo va en una sola página

o una página por juego

💡 Recomendación:

Home → todos los juegos

/genshin, /hsr, etc → SEO fuerte

🔍 FASE 7 – SEO (MUY IMPORTANTE)
Paso 13

Define:

Títulos por página

Descripciones claras

URLs limpias

Ejemplo mental:

“¿Cuánto falta para Genshin Impact 6.0?”

Paso 14

Agrega:

OpenGraph

Metadata básica

Texto explicativo debajo del contador

Google ama texto + datos.

🚀 FASE 8 – DEPLOY
Paso 15

Sube el proyecto a:

GitHub

Vercel / Netlify / Cloudflare Pages

Verifica:

Velocidad

Mobile

SEO básico

🧠 REGLA DE ORO PARA ESTE PROYECTO

Primero claridad, luego precisión, luego automatización
