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

````

## Webpack y babel en nuestro proyecto

Webpack optimiza nuestro proyecto y babel convierte nuestro codigo javascript moderno para que sea compatible con todos los navegadores.

Instalamos babel

        npm install @babel/core @babel/preset-env @babel/preset-react

Instalamos webpack
        
        npm install webpack webpack-cli webpack-dev-server

Instalamos loaders y pligins

    npm install babel-loader html-loader html-webpack-plugin

* Creamos el archivo .gitignore que contendra la lista de archivos o directorios que queremos que git no tenga en cuenta y no sean subidos a nuestro repositorio (/node_modules)

* configuramos babel creando el archivo .babelrc que contendra el siguiente objeto de configuracion

```js
    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
 ```
 * Creamos el archivo de configuracion de webpack llamado webpack.config.js

 ```js
    const path = require("path");
    const HtmlWebpackPlugin = require('htmlwebpackplugin');
    modules.exports={
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve:{
            extensions:['.js','.jsx'],
        },
        module:{
            rules:[
                {
                    test: /\.(js|jsx)$/,
                    exclude:/node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test:/\.html$/,
                    use:[
                        {
                            loader: 'html-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: './index.html'
            })
        ]
    }
 ```

* path importa el modulo path que ya viene con node.
* Module.export contiene el objeto para añadir las configuraciones de nuestro proyecto
* entry tiene el punto de entrada del proyecto
* output le indicamos donde compilara nuestro proyecto, por convencion se le da el nombre dis y el archivo tendra el nombre bundle.js *opcional

* Dentro del objeto resolve va un objeto que contiene las extensiones que va a usar el proyecto
*El objeto module trabaja las reglas de los loaders y los plugins que se van agregando.
*test le indica las extensiones de archivos con los que va a trabajar con un regex.
* exclude me permite ignorar archivos o directorios que no queremos que interfieran en la compilacion tambien contiene los loaders que vayamos a instalar, hasta el momento se agregaron las reglas para babel-loader y html-loader
* por ultimo se agregan los plugins pero para agregarlos hay que importarlos con el nombre del paquete que instalamos. html-webpack-plugin. Le agregamos la configuracion como objeto tendra template donde esta nuestro archivo html y filename contiene el archivo de salida



