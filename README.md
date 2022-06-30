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
    module.exports={
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


## CAMBIOS EN TIEMPO REAL CON WEBPACK

* Creamos nuevos scripts en package.json

    ```js
    "start":"webpack serve --open",
    "build": "webpack --mode production"
    ```
* start nos crea un servidor local para ejecutar nuestro proyecto con webpack
* build nos crea el archivo de produccion para poder subirlo a la nube

Para poder que react renderice componentes en el archivo index.html del directorio public debemos asignar un div con el id que hace render del componente en index.js


* Para evitar una advertencia de webpack agregamos el modo desarrollo en webpack.config.js
```js
    mode: 'development'
```

## Css y Sass

Para agregar estilos a react podemos usar el preprocesador sass.
<br> Se instalan las siguientes dependencias que nos permitiran trabajar con estilos y el preprocesador sass
```js
npm install mini-css-extract-plugin css-loader style-loader sass -D
```
 
 Se añade el plugin a webpack.config.js

 ```js
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 ```
* se configuran los loaders instalados

```js
{
    test:/\.s[ac]ss$/i,
    use:[        
            "style-loader",
            "css-loader",
            "sass-loader",
        ]
}
```
* Se agrega el plugin
```js
plugins:[
  /*  new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html'
    }),*/

    new MiniCssExctractplugin({
        filename: '[name].css'
    }),
],
devServer:{
            static:path.join(__dirname,'dist'),
            compress: true,
            port: 3005,
        }
```

* La linea devSever nos permite ubicar el proyecto para trabajar en el modo de desarrollo y cambiar el puerto.

* Dentro de src se crea el directorio styles y dentro global.scss, dentro de global se crea la configuracion para probar el archivo

```scss
$base-color: #ff0000;
$color: rgba(black, 0.88);
body{
    background-color: $base-color;
    color: $color;
}
````

* Seguimos con App.jsx e importamos el archivo de estilo
```jsx
import '../styles/global.scss';
```

# TRANSFORMANDO HTML EN COMPONENTES
Se debe analizar como esta construido el proyecto para poder hacer la conversion a componentes.

EJEMPLO:
creamos dentro de src el directorio containers y dentro login.jsx

*Login.html

```html
<div class="login">
        <div class="form-container">
            <img src="./assets/logos/logo_yard_sale.svg" alt="logo" class="logo">

            <h1 class="title">Create a new password</h1>
            <p class="subtitle">Enter a new password for you account</p>

            <form action="/" class="form">
                <label for="password">Password</label>
                <input type="password" id="password"
                 placeholder="*********"
                  class="input input-password">
                <label for="new-password">Password</label>
                  <input type="password" id="new-password"
                   placeholder="*********"
                    class="input input-password">
                <input type="submit"
                 value="Confirm"
                  class="primary-button logi-button">
            </form>
        </div>
    </div>
```
* Se debe tener en cuenta que class es una palabra reservada de javascript y por lo tanto para dar estilos a los componentes se usa className (con camelcase), y todas las etiquetas deben tener un cierre (/>) como las imagenes o los inputs.
* Login.jsx

```jsx
import React from 'react';

const Login=()=>{
    return(
        <div className="login">
        <div className="form-container">
            <img src="./assets/logos/logo_yard_sale.svg" alt="logo" className="logo" />

            <h1 className="title">Create a new password</h1>
            <p className="subtitle">Enter a new password for you account</p>

            <form action="/" className="form">
                <label for="password">Password</label>
                <input type="password" id="password"
                 placeholder="*********"
                  className="input input-password"/>
                <label for="new-password">Password</label>
                  <input type="password" id="new-password"
                   placeholder="*********"
                    className="input input-password"/>
                <input type="submit"
                 value="Confirm"
                  className="primary-button logi-button"/>
            </form>
        </div>
    </div>
    );
}

export {Login};
```

## Estilos en los componentes

Para agregar estilos en los componentes creamos el archivo scss con las variables que vamos a estar usando a lo largo del proyecto.

* _vars.scss
```scss
:root{
    --white:#FFFFFF;
    --black:#000000;
    --very-light-pink:#C7C7C7;
    --text-input-field:#F7F7F7;
    --hospital-green:#ACD9B2;
    --sm: 14px;
    --md: 16px;
    --lg: 18px;
}
```
* Tambien el respectivo estilo para el componente login, se agregarian los estilos sin el body ni las variables.

* Se crea el archivo Layout.jsx
```jsx
import React from 'react';

const Layout = ({children})=>{
    return(
        <div className="Layout">
            {children}
        </div>
    )
}
export {Layout};
```
* La palabra children traera el componente que se declare dentro de layout cuando se llama en otro componente en este caso App.jsx.
```jsx
import React from 'react';
import { Layout } from '../containers/Layout';
import { Login } from '../containers/Login';
import '../styles/global.css'

const App = () =>{
    return(
        <Layout>
            <Login/>
        </Layout>
    )
}
export {App};
```
* En este caso el componente Login seria children del componente Layout
* Para evitar problemas de carga con las imagenes se importa el loader file-loader y se configura en webpack.config.js, se añade en rules con test paraque use los diferentes tipos de archivo de imagenes.
```js
//Gracias al comentario del compañero 
//Arturo Juarez Sanchez en platzi
{
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use:[
                        {
                            loader: 'file-loader',
                            options: {
                                name:'images/[hash]-[name].[ext]',
                            }
                        }
                    ]
                } 
```

# PAGINAS RUTAS Y COMPONENTES
## React Router DOM
Permite generar la navegacion entre paginas y componentes se crea el componente RecoveryPassword.jsx de la misma forma que se creo Login.

* Se instala react-router-dom sin -D porque sera parte del proyecto en produccion

        npm install react-router-dom

Se crea el directorio /routes dentro se mueve el componente App.js que sera nuestro enrutador principal y nos dara mas orden al proyecto. Dentro se importa react-router-dom y sus herramientas.

* App.jsx quedaria asi
```jsx
//react-router-dom actualizado a la version 6 gracias a los compañeros
//Carlos Antonio Spin y Luis Fernando Nuñes
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout } from '../containers/Layout';
import { Login } from '../containers/Login';
import { RecoveryPassword } from '../containers/RecoveryPassword';
import '../styles/global.css'

const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Layout>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/' element={<Login/>} />
                    <Route exact path='/' element={<RecoveryPassword/>} />
                    <Route element={NotFound} />
                </Layout>
            </Routes>
        </BrowserRouter>
    )
}
export {App};
```
* NOTA: A partir de la version 6 se dejo de usar Swicth y fue reemplazado por Routes dentro de Route ya no se usa component en su lugar se usa element. Y dentro de las llaves {} del atributo element se usa el componente como etiqueta.

## Navegando entre rutas

Para probar que las rutas estan funcionando correctamente se escribe en la barra de navegacion manualmente las rutas y me deben mostrar los componentes asignados a la ruta, tambien se crean los componentes Home y NotFound para la pagina de error 404 esta es la ruta por defecto a la que no se le asigna path por lo que al escribir mal una ruta en la barra de direcciones nos mostrara este componente.

## Header En todas las rutas

* Se crea el componente Header.jsx y se crea su estructura
```jsx
import React from 'react';
import { Header } from '../components/Header';

const Home = () =>{
    return(
        <Header />
    );
}
export {Home};
```
* Tambien se crea su respectivo archivo scss para los estilos.

# ATOMIC DESIGN

Es la forma en como puede estar dividida la aplicacion Atomos, Moleculas, Organizmos, plantillas y paginas.

* ATOMOS: Representan pequeños elementos o unidades clave del proyecto. (Botones, elementos de texto o imagenes).

* MOLECULAS: Permiten unir uno o mas componentes.

* ORGANISMOS: Es la forma de combinar varios componentes (logos y menus dentro de un header).

* PLANTILLAS (templates): Representacion de los organismos su comportamiento y su ciclo de vida.

* PAGINAS (PAGES): Es la pagina de una aplicacion ya funcionando

# CREANDO COMPONENTES Y RUTAS

Se crean las rutas principales de nuestra aplicacion.
* App.jsx
```jsx
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout } from '../containers/Layout';
import { Login } from '../containers/Login';
import { RecoveryPassword } from '../containers/RecoveryPassword';
import {Home} from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import '../styles/global.css'

const App = () =>{
    return(
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/recovery-password' element={<RecoveryPassword/>} />
                    <Route exact path='/send-email' element={<SendEmail/>} />
                    <Route exact path='/new-password' element={<NewPassword/>} />
                    <Route exact path='/account' element={<Account/>} />
                    <Route exact path='/signup' element={<CreateAccount/>} />
                    <Route exact path='/checkout' element={<Checkout/>} />
                    <Route exact path='/orders' element={<Orders/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}
export {App};

```

# TIPOS DE COMPONENTES 
## Componentes stateful
Nos permiten trabajar con un estado a traves de los hooks de estado y que lleva logica entre su declaracion y su return.
*  EJ:
```jsx
import React, {useState} from 'react';

const Button = ()=>{
    const [name, setName] = useState('Hola');
    return(
        <div>
            <h1>{name} Mundo</h1>
        </div>
    );
}
```
## Componentes stateless
Estos componentes solo renderizan informacion o vistas y la mejor forma de estrucurarlos es sin el return o usando directamente el componente que va a renderizar con parentesis.

Ejemplo 1:
```jsx
import React from 'react';

const Button = ()=>(
    <div>
        <h1>hola mundo</h1>
    </div>
)
```
Ejemplo 2:
```jsx
import React from 'react';

const Button = ({text})=><ButtonRed text={text} />
```

## Otros Componentes
Otros componentes que ya son muy usados pero que nos podemos encontrar en proyectos son:

## Componentes de Clase
Usaban un constructos para declarar el estado y fueron reemplazados por los hooks
```jsx
import React, { Component } from 'react';

class App extends Component {
    constructor(){
        this.state = {
            count: 0
        };
    }
    render(){
        return(
            <div>
                <h1>Hello world</h1>
            </div>
        )
    }
}
 ```
 ## Componentes de orden Superior o HOC (High Order Components)
 Reciben un componente, extienden su funcionalidad y retornan un componente compuesto.

 ```jsx
import React, { Component } from 'react';

function ComponentWrapper(WrapperComponent) {
    class Wrapper extends Component{
        render(){
            return <WrapperComponent {...this.props} />
        }
    }
    return Wrapper;
}
 ```

 ## IMAGENES Y ALIAS EN WEBPACK
 Para mejor estructura del proyecto se mueven los directorios logos e iconos a /src dentro de un nuveo directorio llamado assets y se configura webpack de la siguiente forma.

 * A partir de la version 5 de webpack ya no es necesario instalar ningun loader para la manipulacion de imagenes.

 * Se agrega un nuevo test en webpack.config.js
 ```js
 {
   test: /\.(png|svg|jp(e*)g|gif)$/,
   type: 'asset'
 }
 
 ```

 ## ALIAS
 Nos permite acceder de una forma mas amigable a diferentes archivos en diferentes directorios y evitar el uso de rutas demasiado largas.

 Dentro del resolve de webpack.config.js agregamos un nuevo objeto con el nombre de alias.
 ```js
 alias:{
    '@components': path.resolve(__dirname, 'src/components/'),
    '@containers': path.resolve(__dirname, 'src/containers/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@logos': path.resolve(__dirname, 'src/assets/logos/'),
    '@icons': path.resolve(__dirname, 'src/assets/icons/'),
    '@styles': path.resolve(__dirname, 'src/styles/'),
 }
 ```

 Con estos alias podemos llamar archivos desde una variable y asignarlo con {} a un componente.
 
 * Ejemplo:
 ```jsx
 const logo = '@logos/main_logo.svg';

 <img src={logo} alt="menu" />
 ```
 La mejor practica es traer las imagenes con import para lo anterior es mejor usarlo para cdn o archivos que se usen con url de terceros.

 ```jsx
import logo from '@logos/main_logo.svg';

 <img src={logo} alt="menu" />
 ```

 # HOOKS
Los hooks permiten manejar el comportamiento de los componentes como el estado y ya vienen integrados con react. Se reconoce porque al usarlos empiezan con la palabra use ej:(useState).

```jsx
import React, {useState} from 'react';

const componente = ()=>{
    //el valor inicial es opcional o podria se cualquier valor 
    //primitivo, arreglo u objeto
    const [estado, setEstado] = useState("Valor inicial");

    //Se crea una funcion que cambie el estado
    const handleState = ()=>{
        setEstado("Valor cambiado");
    }
    return(
        <>
            {//Se asigna la funcion que maneja el estado al onclick
            }
            <h1 onClick={handleState}>Titulo</h1>
            <p>{estado}</p>
        </>
        
    );
}
export {component};

```