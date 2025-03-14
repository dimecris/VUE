# Como manejar el Github 
v20250314
## Sinconizar el repositorio teniendo como base el local
### 0- Clonar repositorio
`git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
### 1-  Preparar archivos
`git add .`
Agregar (o "staging") todos los archivos y cambios actuales en el directorio de trabajo al área de preparación (staging area). Esto significa que los archivos están listos para ser confirmados (commit) en el repositorio local.


Aquí está el desglose del comando:

git add: Este es el comando de Git que agrega archivos al área de preparación.
.: Este es un comodín que representa el directorio actual y todos los archivos y subdirectorios dentro de él.

En resumen, $ git add . le dice a Git que agregue todos los cambios en el directorio actual (incluyendo archivos nuevos, modificados y eliminados) al área de preparación, preparándolos para ser confirmados en el próximo commit.



### 2- Crear comentario
`git commit -m "Add existing file"`
crea un nuevo commit en tu repositorio local con los cambios que has preparado, y el mensaje del commit será "Add existing file". Esto es útil para mantener un historial claro y descriptivo de los cambios realizados en el repositorio.

### 3- Subirlo

`$ git push origin main`  

o

`$ git push origin master`

Push the changes in your local repository to GitHub.com.

## Para actualizar el local porque se ha modificado algo en github
`git pull origin main`

## Evitar sincronizar una carpeta
Para evitar subir la carpeta node_modules a tu repositorio de GitHub, puedes usar un archivo .gitignore. Este archivo le dice a Git que ignore ciertos archivos y carpetas al realizar commits. A continuación, te muestro cómo puedes hacerlo:

Crea un archivo llamado .gitignore en la raíz de tu proyecto (si no existe ya).
Agrega la línea node_modules/ al archivo .gitignore.
Aquí tienes un ejemplo de cómo debería verse tu archivo .gitignore:


.gitignore
`# Ignorar la carpeta node_modules
node_modules/`