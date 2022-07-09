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

Instalamos loaders y plugins

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
    //El primer valor es el estado y el segundo la funcion que modifica el estado

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
## useEffect y consumo de APIs
Permite añadir informacion a nuestro componente y re-renderizar o cambiar su contenido cuando una funcion se haya completado.

* Para usar useEfect lo importamos desde react al igual que useState y para usarlo se crea como el llamado a una funcion con dos parametros de los cuales el primer es la funcion anonima que podria cargar los archivos de una api y el segundo sera un arreglo en el que agregamos los diferentes valores que va a escuchar sobre un cambio que se desencadene por la accion de un usuario.
* Para trabajar con los recursos de una API instalamos axios.

        npm install axios

* Ejemplo
```jsx
import React, { useEffect, useState} from 'react';
import OtroComponente from './ruta/otroComponente';
import axios from 'axios';

const API='http://urldeapi';

const miComponente =()=>{
    const [state, setState] = useState();

//Se usa async ya que una peticion se puede demorar
    useEffect(async()=>{
        const response = await axios(API);
        setState(response.data);
    }, [])
    return(
        //Se puede iterar un componte para que muestre 
        <>
        {state.map(dato=>(
            <OtroComponente atrib={dato}/>
        ))}
        </>
        
    );
}
export {miComponente};

```
* El anterios uso del hook nos puede llegar a generar un warning ya que useEffect no debe retornar nada mas que una funcion. Se debe crear una funcion adentro y llamarla inmediatamente.
//se puede iterar cada dato y pasarlo como atributo a otro componente. La forma correcta del ejemplo del proyecto sería:

```jsx
import React, { useEffect, useState } from 'react';
import {ProductItem} from '../components/ProductItem';
import '../styles/ProductList.scss';
import axios from 'axios';

const API = 'https://api.escuelajs.co/api/v1/products';

const ProductList = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {//ya no seria asincrona
        async function getData() {//se crea nueva funcion asincrona
          const response = await axios(API);
          setProducts(response.data);
        }
        getData();//se llama inmediatamente
    }, []);
    
    
    return(
        <section className="main-container">
            <div className="ProductList">
                {products.map(product=>(
                    <ProductItem par={product} key={product.id} />
                ))}
            </div>
        </section>
    )
}

export {ProductList};
```


* En ocaciones async y await puede requerir un plugin para que babel logre interpretarlo correctamente. Siendo el caso se instala.


            npm install @babel/plugin-transform-runtime

despues de instalado se agrega la configuracion para .babelrc
```json
"plugins":[
    "@babel/plugin-transform-runtime"
]
```

# CUSTOM HOOKS
Es la forma que separamos los hooks en una logica y poder reutilizarlos en otros componentes.

Se crea un directorio dentro de src llamado hooks y el nombre de cada archivo como buena practica deberia empezar con la palabra use y sera de extension .js ya que solo tendra logica.

```js
    import React, {useState, useEffect} from 'react';
    import axios from 'axios';

    const useGetProducts = (API)=>{
        const [products, setProducts] = useState([]);

        useEffect(()=>{
            async function getProducts(){
                const response = await axios(API);
                setProducts(response.data);
            }
            getProducts();
        }, [])

        return products;

    }
    export {useGetProducts};

```

* En el componente eliminamos la linea de codigo que acabamos de personalizar importamos el custom hook.
```jsx
import React from 'react';
import {ProductItem} from '../components/ProductItem';
import { useGetProducts } from '@hooks/useGetProducts';
import '@styles/ProductList.scss';

const API = 'https://api.escuelajs.co/api/v1/products';

const ProductList = ()=>{

    //Aqui se almacena toda la data
       const products = useGetProducts(API);
    //se pone la API como argumento
    return(
        <section className="main-container">
            <div className="ProductList">
                {products.map(product=>(
                    <ProductItem product={product} key={product.id} />
                //iteramos toda la data para renderizar el componente pasandole cada dato como atributo    
                //le pasamos una key la cual debe ser unica
                    
                ))}
            </div>
        </section>
    )
}

export {ProductList};

```

* El componente que recibe cada iteracion
```jsx
import React, {useState} from 'react';
import '@styles/ProductItem.scss';
import btncart from '@icons/bt_add_to_cart.svg';

const ProductItem = ({product})=>{

/* Para el uso correcto de la API se debe leer la documentacion de 
la misma ya que los datos que obtenemos debemos llamarlos de 
forma correcta y asi se muestren en el componente*/
    return(
        <div className='ProductItem'>
            <img src={product.images[0]} alt={product.title} />
            <div className="product-info">
                <div>
                    <p>$120,00</p>
                    <p>{product.title}</p>
                </div>
                <figure>
                    <img src={btncart} alt="button cart" />
                </figure>
            </div>
        </div>
    )
}
export {ProductItem};
```
# useRef y formularios
El hook useRef nos permite referenciar un formulario para poder obtener sus datos y manipularlos para su validacion antes de enviarlo al backend
EJ:
```jsx
import React, {useRef} from 'react';

const componenteLogin = ()=>{
    
    //se crea la referencia con el hook inicializandolo en valor null
    const form = useRef(null);

    //Se crea la funcion que manejara el click del formulario
    const handleSubmit = (e)=>{
        //preventDefault evita que se recargue la pagina
        //cuando se presiona el boton submit
        e.preventDefault();

        //FormData es nativo de javascript y creamos la instancia a 
        //traves de la const form
        const formData = new FormData(form.current);

        //se crea el objeto data
        const data = {
            email : formData.get("email");
            password : formData.get("password");
        }
        /*
        a traves del metodo get de FormData accedemos a cada uno de los campos del formulario al que hicimos referencia, los inputs deben tener el atributo name para poder obtener la referencia en el objeto data
        */
       console.log(data);//verificamos la captura de los datos

    }
    return(
        <div className="Login">
            <form ref={form}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
            </form>
            <button type="submit" onClick={handleSubmit}>Log in</button>
        </div>
    );
}
export {componenteLogin};
```

# React Context
Nos permite conectar toda la aplicación atraves de un contexto sin importar el nivel en el que se encuentre un componente, se podra acceder sin ningun problema.

Se crea un directorio context y el archivo AppContext.js
/src/context/AppContext.js
```js
import React from 'react';

//Se crea el context con objeto vacio
const AppContext = React.createContext({});

export {AppContext}
```

* Lo importamos dentro del componente principal App.js
* Usamos la etiqueta AppContext.Provider con un value con objeto vacio y debe encapsular todos los componentes o rutas que maneje este componente.

Ejemplo:
```jsx
import React from 'react';
import {AppContext} from '@context/AppContext';

const App = () =>{
   return(
    <AppContext.Provider value={}>
       <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/recovery-password' element={<RecoveryPassword/>} />
                    <Route exact path='/send-email' element={<SendEmail/>} />
                    <Route exact path='/new-password' element={<NewPassword/>} />
                    <Route exact path='/account' element={<MyAccount/>} />
                    <Route exact path='/signup' element={<CreateAccount/>} />
                    <Route exact path='/checkout' element={<Checkout/>} />
                    <Route exact path='/orders' element={<Orders/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </AppContext.Provider>
   ); 
}
```

* Creamos un custom hook para manejar el estado y funciones clave para el aplicativo.
* /src/hooks/useInitialState.js
```js
import {useState} from 'react';

//nos permitira trabajar con el carrito
const initialState = {
    cart: [],
}

const useInitialState = () =>{
    const [state, setState] = useState(initialState);

    const addToCart = (payload)=>{
        setState({
            ...state,
            cart: [...state.cart, payload]
        })
    }
    //Retornamos el estado y la funcion addToCart
    return {
        state,
        addToCart
    }
}
```
* En App.js importamos el custom hook

```jsx
import {useInitialState} from '@hooks/useInitialState';

const App = ()=>{
    const initialState = useInitialState();

    //Le compartimos el state para que sea accesible por toda la app
    <AppContext.Provider value={initialState}>
}
```

* Para conectarlo usaremos el componente ProductItem
* Tenemos que importar AppContext para poder hacer la conexion.

```jsx
import React, {useState} from 'react';
import '@styles/ProductItem.scss';
import btncart from '@icons/bt_add_to_cart.svg';
import AppContext from '@context/AppContext';

const ProductItem = ({product})=>{

    //Agregamos el context
    const { addToCart } = useContext(AppContext);

    const handleClick= item =>{
        //addToCart viene del custom Hook useInitialState
        addToCart(item)
    }

    return(
        <div className='ProductItem'>
            <img src={product.images[0]} alt={product.title} />
            <div className="product-info">
                <div>
                    <p>${product.price}</p>
                    <p>{product.title}</p>
                </div>
                {
                    //funcion anonima ejecuta handleClick que envía 
                    //product como argumento a traves de onClick
                }
                <figure onClick={ ()=> handleClick(product)} >
                    <img src={btncart} alt="button cart" />
                </figure>
            </div>
        </div>
    )
}
export {ProductItem};
```

+ Para completar la conexion en el header conectamos el estado

```jsx
import React, { useState, useContext } from 'react';
import '@styles/Header.scss';
import { Menu } from '@components/Menu';
import IconMenu from '@icons/icon_menu.svg';
import Logo from '@logos/logo_yard_sale.svg';
import IconCart from '@icons/icon_shopping_cart.svg';
//importamos el context para poder acceder a cart
import { AppContext } from '../context/AppContext';

const  Header = () =>{
  const [toggle, setToggle] = useState(false);


//destructuramos cart ya que en este ejemplo 
//no necesitaremos todo el state
//se usaria asi const { state } = useContext(AppContext);
  const { state : {cart}} = useContext(AppContext);

  const handleToggle = ()=>{
    setToggle(!toggle);
  }

    return (
      <nav>
        <img src={IconMenu} className="menu" alt="menu" />
        <img src={Logo} alt="logo"  className="logo"
        />
        <div className="navbar-left">
          <ul>
            <li>
            
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li className="navbar-email"
            onClick={handleToggle}>
              platzi@example.com
               </li>
            <li className="navbar-shopping-cart">
              <img src={IconCart} />
              {
                //validamos la longitud del cart para mostrar el div
                //si no se cumple el resultado sera nulo
              }
              {cart.length > 0 ? <div>{cart.length}</div> : null }
            </li>
          </ul>
        </div>
        {toggle && <Menu />}
      </nav>
    );
}
export {Header}
```
# Orden de compra del proyecto (practica)

## Manejo del toggle
En el componente Header creamos un nuevo estado ```[ toggleOrders, setToggleOrders ]``` que se inicialice en ``` false ``` importamos el componente MyOrder se llama despues del anterior toggle creado 
```jsx
{toggleOrders && <MyOrder />}
```
* Para mostrarlos usamos todo el icono del carrito de compras agregamos el evento onClick y directamente modificamos el valor con setToggleOrders y el simbolo ! que negaria el valor actual del toggleOrders.
* NOTA: dentro de onClick no se debe ejecutar una funcion directamente sino que se debe encerrar dentro de una funcion anonima para evitar que se desencadene autmaticamente.

* En el componente MyOrder importamos useContext y lo usamos igual que en los componentes anteriores.
```jsx

import React, { useContext } from 'react';
import arrow from '@icons/flechita.svg'
import {OrderItem} from '../components/OrderItem';
import '@styles/MyOrder.scss';

const MyOrder = ()=>{
    const { state } = useContext(AppContext);
    return(
        <aside className="MyOrder">
            <div className="title-container">
                <img src={arrow} alt="arrow" />
                <p className="title">My order</p>
            </div>
            <div className="my-order-content">
            {
            //state.cart es donde se almacenan todos los recursos en este ejemplo
            //Los iteramos con map
            }
                {state.cart.map(product=>(
                    <OrderItem product={ product } key={`orderItem-${product.id}`}/>
                ))}
                <div className="order">
                    <p>
                        <span>Total</span>
                    </p>
                    <p>$560.00</p>
                </div>
                <button className="primary-button">
                    Checkout
                </button>
            </div>
        </aside>
    );
}
export {MyOrder};
```

* NOTA: Al usar el key en el componente para evitar que se repitan key en otros rendrizados se usan template literals (`) para personalizar cada key.
 - Tambien al usar la funcion anonima dentro de map usamos parentesis para evitar el uso de return del componente, en caso de usar {} se debe poner la palabra return antes del componente.

 ## Calculando el precio total

 Primero se debe renderizar cada producto en orderItem que renderizara cada elemento pasado por props haciendo uso de las propiedades que provee la API.
 ```jsx
 import React from 'react';
import '@styles/OrderItem.scss';
import close from '@icons/icon_close.png';

const OrderItem = ({ product })=>{
    return(
        <div className="OrderItem">
            <figure>
                <img src={product.images[0]} alt="Bike"/>
            </figure>
            <p>{product.title}</p>
            <p>${product.price}</p>
            <img src={close} alt="close"/>
        </div>
    );
}
export {OrderItem};
 ```
 * En MyOrder.jsx calcularemos el total de la siguiente forma:
 * Recordando la funcion ```reduce``` de los arrays
 ```js
 const reducer = (acumulador, valorActual) => nuevoAcumulador
 /*la funcion reducce tiene dos parametros:
 ----El primero es la funcion reductora
 ----Y el segundo es el valor inicial en el siguiente ejemplo seria 0 
 --La funcion reductoria contiene un acumulador y un elmento que se ira 
 asignando en cada iteracion para sumarse con el acumulador y retorna el valor final para la siguiente iteracion.
 */
 const array = [].reduce((acum, element) => acum + element, 0);

 ```

 ```jsx
 import React, { useContext } from 'react';
import arrow from '@icons/flechita.svg'
import {OrderItem} from '../components/OrderItem';
import '@styles/MyOrder.scss';
import { AppContext } from '../context/AppContext';

const MyOrder = ()=>{
    const { state } = useContext(AppContext);
    const sumTotal = () =>{
        const reducer = (accumulator, currentValue)=>accumulator+currentValue.price;
        const sum = state.cart.reduce(reducer, 0);
        return sum;
    }
    return(
        <aside className="MyOrder">
            <div className="title-container">
                <img src={arrow} alt="arrow" />
                <p className="title">My order</p>
            </div>
            <div className="my-order-content">
                {state.cart.map((product)=>(
                    <OrderItem product={product} key={`orderItem-${product.id}`} />
                ))}
                <div className="order">
                    <p>
                        <span>Total</span>
                    </p>
                    <p>${ sumTotal() }</p>
                </div>
                <button className="primary-button">
                    Checkout
                </button>
            </div>
        </aside>
    );
}
export {MyOrder};
 ```

 ## Eliminando productos del carrito de compras

*Agregamos una nueva funcion a nuestro custom hook useInitialState.
```js
const removeFromCart = (payload) =>{
    setState({
        ...state,
        cart : state.cart.filter(items => items.id != payload.id),
    })
    //Se agrega esta funcion al return
}
```
* Lo llamamos dentro del componente que tiene el icono de la X OrderItem
recordar que hay que importar el context 
```jsx
<img src={close} alt="close" onClick={}/>
```