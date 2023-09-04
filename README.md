# PruebaTecnica_Tareas

El objetivo de esta prueba es crear una aplicación web completa utilizando Django como backend y Angular como frontend. La aplicación debe incluir un sistema de autenticación (login) y un CRUD para administrar una lista de elementos (por ejemplo, "Tareas pendientes").

Parte 1: Backend Django

Cree un proyecto de Django y una aplicación llamada api.

Defina un modelo de Django llamado Task que tenga los campos id (clave primaria automática), title, description, y completed.

Configure las rutas de Django para permitir operaciones CRUD en el modelo Task. Utilice vistas basadas en clases.

Implemente la autenticación de usuarios utilizando el sistema de autenticación de Django. Los usuarios deben tener la capacidad de registrarse, iniciar sesión y cerrar sesión.

Proteja las rutas de la API para que solo los usuarios autenticados puedan acceder a las operaciones CRUD de las tareas.

Parte 2: Frontend Angular

Cree un proyecto de Angular.

Desarrolle una página de inicio de sesión (login) que permita a los usuarios ingresar su correo electrónico y contraseña.

Implemente la funcionalidad de autenticación en Angular: Haga solicitudes HTTP para autenticar a los usuarios utilizando el backend Django.

Cree una página principal después del inicio de sesión en la que los usuarios puedan ver una lista de tareas pendientes obtenidas de la API Django.

Implemente operaciones CRUD en el frontend Angular para que los usuarios puedan crear, leer, actualizar y eliminar tareas.

Requisitos:

Use Django como backend y Angular como frontend.
Utilice el sistema de autenticación de Django para gestionar la autenticación de usuarios.
Utilice solicitudes HTTP para comunicarse entre el frontend y el backend.
Asegúrese de que las rutas protegidas solo sean accesibles para usuarios autenticados.
Implemente validaciones de formularios tanto en el frontend como en el backend.
Utilice un diseño y estilo apropiado para la interfaz de usuario en Angular.
