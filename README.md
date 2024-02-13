# TinyRSS


## 📝 Índice

- [Proyecto](#Proyecto)
  - [Expo](#Expo)
  - [Patrones de diseño](#Patrones)
- [Funcionalidad adicional](#Funcionalidad-adicional)
- [Escalado y mantenibilidad](#Escalado-mantenibilidad)

## 🚀 Uso

- Ejecutar `yarn` o `npm install` para instalar dependencias
- `yarn start` o `npm run start` para ejecutar proyecto con Expo Go.
- El proyecto estará disponible por defecto en el puerto 8081

Para iniciar los tests ejecutar `yarn test`

# Proyecto

## Expo

El proyecto se ha desarrollado utilizando expo en su modalidad managed. Las razones por las que se ha decidido su implementación por una parte son la facilidad de inicialización y compatibilidad con dependencias de terceros como React Navigation y Reanimated (entre muchas otras). Por otro lado nos ofrece ya una serie de herramientas como Expo Client App y Expo DevTools para ayudarnos a controlar y depurar el desarollo.
Además, de cara a un posible escalado futuro podemos tener acceso a todas las dependencias compatibles con expo que nos ofrece el framework.

## Patrones
En cuanto a patrones de diseño se ha optado por presentar el proyecto como MVP ya que, al ser componentes con una lógica simple, se desarrolla el componente como vista-presentador siempre que sea posible.

En la clase modelo principal del proyecto `article` se ha decidido realizar en ella el procesamiento de los datos en crudo recibidos por el proveedor ya que, aunque todos ellos cumplen el protocolo RSS 2.0 en ocasiones la disposición de la presentación de los datos varía levemente entre uno y otro por lo que, si en un futuro se decide añadir nuevas formas de obtener el feed de noticias se podrá instanciar esa misma clase, sin importar esas variaciones, desde cualquier procesador con la única condición de que los datos a procesar sean cumplan el tipo `RawRSSItem`.

Se ha realizado una diferenciación entre pantallas y componentes, pudiéndo estos últimos reutilizarse en diferentes pantallas de la app en caso de querer extender su funcionalidad.


# Adicional

Se ha añadido la librería `rxjs` en el componente SearchBar para poder hacer uso de un debounceTime y evitar realizar el proceso de comprobación de los títulos de la lista de forma innecesaria.

Se ha realizado la funcionalidad de poder añadir fuentes de noticias desde una URL. A través del icono superior derecho llamamos a un modal que nos pedirá tanto un nombre de la fuente como su url, la cual comprobará al pulsar sobre el botón de añadir para comprobar si la fuente es válida o no.

En el aspecto visual de la aplicación se ha optado por no utilizar librerías de componentes de terceros primando el rendimiento de los componentes nativos de react-native y su facilidad de depurar e intregar en tests. Por ello se ha realizado un ejercicio de diseño básico pero funcional.

Se ha añadido, para propósitos de la demo, una pequeña store con `mobXLite` que, ampliando su funcionalidad, podemos hacer uso de los observers para mantener en sincronización el contendido de las futuras pantallas.

Con la librería `Reanimated` hemos podido añadir una barra superior en la visualización del artículo que nos indica la cantidad del total de artículo que hemos leído en función de la posición del scroll. Además, en la carga de los elementos del FlatList se ha añadido un fadeIn lateral así como en la carga del artículo diferentes animaciones que mejoran la experiencia de uso de la app.

Se han incluido tests de los componentes realizados con `jest` y `react-testing-library`.

# Escalado y mantenibilidad
Se ha optado por el uso de la librería `react-native-render-html` por su sólida comunidad y soporte continuo. La forma en la que nos beneficiamos de su uso es por la posibilidad de poder añadir renderers para componentes adicionales como por ejemplo iframe o audio así de su capacidad de manipular los elementos de los artículos, pudiéndose en un futuro extender la funcionalidad y estilo en la visualización de artículos.


A la hora de elegir una librería para hacer el fetch de las noticias se ha optado por `rss-to-json`, ya que nos permite, al haber añadido la funcionalidad extra de añadir fuentes en el feed, mantener una fuente de datos lo más similar posible entre los distintos proveedores.

https://github.com/nandychu/tinyrss/assets/3582298/bc22a917-efc1-4f0a-8ba9-698e953dec41


https://github.com/nandychu/tinyrss/assets/3582298/07a618e7-efd0-4a86-a8fd-2480cfd10051
