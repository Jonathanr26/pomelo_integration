# Integración con la API de Pomelo

Este proyecto es una integración completa del frontend y backend con la API de Pomelo para realizar la creación de usuarios y tarjetas. A continuación, se detallan las funcionalidades implementadas y la estructura del proyecto.

## Descripción General

La integración con la API de Pomelo permite realizar las siguientes acciones:

- **Crear Usuario:** Permite a los usuarios ingresar sus datos personales y crear un nuevo usuario en el sistema de Pomelo.
- **Crear Tarjeta:** Permite crear una tarjeta para un usuario existente, ingresando los detalles necesarios.

## Estructura del Proyecto

### Frontend

El frontend está desarrollado con React y Material-UI. Los componentes principales son:

- **App.jsx:** El componente principal de la aplicación que maneja la navegación por pestañas y la lógica de envío de formularios.
- **UserForm.jsx:** Componente de formulario para capturar los detalles del usuario y enviarlos para crear un nuevo usuario.
- **CardForm.jsx:** Componente de formulario para capturar los detalles de la tarjeta y enviarlos para crear una nueva tarjeta para un usuario existente.

### Backend

El backend está desarrollado con Node.js y utiliza Axios para realizar solicitudes HTTP a la API de Pomelo. Los principales controladores incluyen:

- **usersController.js:** Controlador para gestionar las operaciones relacionadas con usuarios, como la creación, búsqueda, obtención y actualización de usuarios.
- **cardIssuanceController.js:** Controlador para gestionar las operaciones relacionadas con la emisión de tarjetas, como la creación, búsqueda, obtención y actualización de tarjetas.
- **authController.js:** Controlador para gestionar la autenticación, incluyendo la obtención y revocación de tokens.

## Detalles de Implementación

### Funcionalidades del Frontend

1. **Navegación por Pestañas:** La aplicación utiliza pestañas para separar las funciones de creación de usuarios y tarjetas.
2. **Eliminación de Campos Vacíos:** Antes de enviar los datos al backend, se eliminan los campos vacíos para asegurar que solo se envíe información válida.
3. **Manejo de Errores:** Se incluyen alertas para notificar al usuario en caso de éxito o error durante la creación de usuarios o tarjetas.

### Funcionalidades del Backend

1. **Creación de Usuarios:** La función `createUsers` envía una solicitud POST a la API de Pomelo para crear un nuevo usuario con los datos proporcionados. Se obtiene un token de autenticación antes de la solicitud y se revoca después de la operación.
2. **Creación de Tarjetas:** La función `createCard` envía una solicitud POST a la API de Pomelo para crear una nueva tarjeta asociada a un usuario existente. También se maneja la autenticación de manera similar a la creación de usuarios.
3. **Obtención y Revocación de Tokens:** Las funciones `getToken` y `revokeToken` en `authController` manejan la autenticación con la API de Pomelo, asegurando que las solicitudes se realicen con tokens válidos.

## Configuración y Ejecución

1. **Instalación de Dependencias:** Clona el repositorio e instala las dependencias con `npm install`.
2. **Variables de Entorno:** Configura las variables de entorno necesarias en un archivo `.env` incluyendo `BASE_URL`, `CLIENT_ID`, `CLIENT_SECRET`, `AFFINITY_GROUP_ID`, entre otras.
3. **Ejecución del Proyecto:** Inicia la aplicación frontend con `npm start` y el servidor backend con el comando `npm start`).

Este proyecto proporciona una base sólida para integraciones adicionales con la API de Pomelo y puede ser extendido según las necesidades del usuario.
