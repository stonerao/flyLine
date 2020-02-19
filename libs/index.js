/**
 * 
 * @param {*} opt 
 */
function Initialize(opt) {
    var camera, controls, scene, renderer;
    var clock = new THREE.Clock();
    var thm = this; 
    var df_Mouse, df_Raycaster;
    var df_Width, df_Height; //当前盒子的高宽
    var df_canvas; 

    function init() {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 400, 400);
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        scene = new THREE.Scene();

        scene.background = new THREE.Color(0xeeeeee);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.querySelector(opt.id).appendChild(renderer.domElement);
        df_canvas = renderer.domElement
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        df_Width = window.innerWidth;
        df_Height = window.innerHeight;
        df_Mouse = new THREE.Vector2();
        df_Raycaster = new THREE.Raycaster();
        // onload 
        if (opt.load) {
            opt.load({
                camera, controls, scene, renderer
            })
        }
        if (Stats) {
            stats = new Stats();
            document.querySelector(opt.id).appendChild(stats.dom);
        }
    }

    function onDocumentMouse(event) {
        event.preventDefault();
        df_Mouse.x = ((event.clientX - df_canvas.getBoundingClientRect().left) / df_canvas.offsetWidth) * 2 - 1;
        df_Mouse.y = -((event.clientY - df_canvas.getBoundingClientRect().top) / df_canvas.offsetHeight) * 2 + 1;
        df_Raycaster.setFromCamera(df_Mouse, camera);
        return {
            mouse: df_Mouse,
            event: event,
            raycaster: df_Raycaster
        }
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseUp(event) {
        if (typeof opt.mouseUp === 'function') {
            opt.mouseUp(onDocumentMouse(event))
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        var delta = clock.getDelta();
        renderer.render(scene, camera);
        if (opt.animation) opt.animation(delta);
        if (stats) stats.update();
    }
    init();
    animate();
}