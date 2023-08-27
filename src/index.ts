import './style.css'
import { WebGL } from './webgl/core/WebGL.ts'
import { WebGLContextProvider, WebGL2ContextProvider } from './webgl/WebGLContextProvider.ts'

window.addEventListener('load', () => {
  // WebGL2を使う場合はProviderでContext切り替える
  var gl = new WebGL(new WebGLContextProvider());
  gl.setup();
  gl.render();
});
