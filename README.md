# PRACTICA DE REACT CON EL PROYECTO SHOP

Para empezar configuramos nuestro proyecto con npm init, y posterior a esto instalamos las dependencias.

```
npm install react react-dom 
```

* Para estructurar mejor el proyecto organizamos los siguientes directorios:
```
    /src---->Contendra todo nuestro codigo
      |______index.js------> Punto de partida de la aplicacion
      |______/components
                |____App.jsx-------->primer componente

    /public---->carpeta que contendra los recursos para produccion
        |______index.html---->donde ira el renderizado de la app
```

* Dentro de App.jsx
```jsx
    import React from 'react';

    const App = ()=>{
        return(
            <h1>Hola mundo</h1>
        )
    }
    export default App;
```

* Modificamos index.js

````jsx
    import React from 'react';
    import ReactDOM from 'react-dom';

    ReactDOM.render(<App />, document.getElementById('app'))

```

