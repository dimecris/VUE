# Como manejar el Github 
v20250314 12:53
## Sinconizar el repositorio teniendo como base el local
0. **Clonar repositorio**
`git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
1.  **Preparar archivos**
`git add .`
Agregar (o "staging") todos los archivos y cambios actuales en el directorio de trabajo al área de preparación (staging area). Esto significa que los archivos están listos para ser confirmados (commit) en el repositorio local.
2. **Crear comentario**
`git commit -m "Add existing file"`
3. **Subirlo**
`$ git push origin main`  
o
`$ git push origin master`
## Errores
* **Actualizar el local porque se ha modificado algo en github**
`git pull origin main`
* **Evitar sincronizar una carpeta**
.gitignore
```
# Ignorar la carpeta node_modules
node_modules/
```
Si la carpeta ya está subida hay que **quitarla del cache del repositorio**
`git rm -r --cached node_modules`

* **Forzar el push y sobrescribir los cambios remotos**
`git push --force origin master`
## No encuentra el repositorio
 1. **Verifica la configuración**
 `git remote -v`
 2. **Agrega o corrige el repositorio remoto**
 `git remote add origin https://github.com/tu-usuario/nombre-del-repositorio.git`
 3. **Realiza el push**
`git push origin master`