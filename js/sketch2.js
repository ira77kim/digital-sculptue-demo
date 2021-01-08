
let scene, camera, renderer;

let controls;

let light1,light2;
let ball = new THREE.SphereGeometry(1,16,16);
let ballm= new THREE.MeshPhongMaterial({
    color:0x000000,
    transparent:true,
    opacity:0,
    depthwrite:true
});
let mesh = new THREE.Mesh(ball,ballm);

//loader
let group1 = new THREE.Group();
let loader1 = new THREE.GLTFLoader();
loader1.load('asset/GLTF files/1.gltf', function(x){
    // x.scene.position.set(135,-225,520);
    group1.add(x.scene);
});
group1.position.set(0,0,0);

let group2 = new THREE.Group();
let loader2 = new THREE.GLTFLoader();
loader2.load('asset/GLTF files/2.gltf', function(x){
    // x.scene.rotation.y=Math.PI/2;
    group2.add(x.scene);
    // group2.position.set(60,0,0);
});
group2.position.set(100,100,100);

let group3_0 = new THREE.Group();
let group3_1 = new THREE.Group();
let loader3_0 = new THREE.GLTFLoader();
let loader3_1 = new THREE.GLTFLoader();
let test={};
let m={};
m[0]='asset/GLTF files/3-1.gltf';
m[1]='asset/GLTF files/3-2.gltf';
loader3_0.load(m[0], function(x){
    group3_0.add(x.scene);
    group3_0.position.set(-100,-100,100);
});
loader3_1.load(m[1], function(x){
    group3_1.add(x.scene);
}); // file 3-2 position weird
group3_1.position.set(0,0,60);

let group4 = new THREE.Group();
let loader4 = new THREE.GLTFLoader();
loader4.load('asset/GLTF files/4.gltf', function(x){
    group4.add(x.scene);
}); //GTLF loader.js error unexpected token R in JSON at position 0
group4.position.set(60,100,100);

let group5 = new THREE.Group();
let loader5 = new THREE.GLTFLoader();
loader5.load('asset/GLTF files/5.gltf', function(x){
    group5.add(x.scene);
});
group5.position.set(150,100,20);

let group6 = new THREE.Group();
let loader6 = new THREE.GLTFLoader();
loader6.load('asset/GLTF files/6.gltf', function(x){
    group6.add(x.scene);
});
group6.position.set(0,50,0);

let group12 = new THREE.Group();
let loader12 = new THREE.GLTFLoader();
loader12.load('asset/GLTF files/12.gltf', function(x){
    group12.add(x.scene);
});
group12.position.set(40,120,50);

let group14 = new THREE.Group();
let loader14 = new THREE.GLTFLoader();
loader14.load('asset/GLTF files/14.gltf', function(x){
    group14.add(x.scene);
});
group14.position.set(-20,0,-60);

let group19 = new THREE.Group();
let loader19 = new THREE.GLTFLoader();
loader19.load('asset/GLTF files/19.gltf', function(x){
    group19.add(x.scene);
});
group19.position.set(-50, -20,150);

let group32 = new THREE.Group();
let loader32 = new THREE.GLTFLoader();
loader32.load('asset/GLTF files/32.gltf', function(x){
    group32.add(x.scene);
});
group32.position.set(20,60,-130);

let group48 = new THREE.Group();
let loader48 = new THREE.GLTFLoader();
loader48.load('asset/GLTF files/48.gltf', function(x){
    group48.add(x.scene);
});
group48.position.set(50,20,-50);

let group54 = new THREE.Group();
let loader54 = new THREE.GLTFLoader();
loader54.load('asset/GLTF files/54.gltf', function(x){
    group54.add(x.scene);
});
group54.position.set(20,-40,-20);

let group58 = new THREE.Group();
let loader58 = new THREE.GLTFLoader();
loader58.load('asset/GLTF files/58.gltf', function(x){
    group58.add(x.scene);
});
group58.position.set(-40,-40,-40);

let ear = new THREE.AudioListener();

init();
update();

//sound

let sound1 = new THREE.PositionalAudio(ear);
let audioloader1 = new THREE.AudioLoader();
loader1.load("sound/0.wav", function(buffer){
    sound1.setBuffer(buffer);
    sound1.setRefDistance(10);
    sound1.loop = true;
    // sound1.play();
    document.addEventListener("click",function(){
        sound1.play();
    });
});
mesh.add(sound1);


let sound={};
let Audioloader={};
let filename={};
let stringed={};


function init(){
    scene= new THREE.Scene();
    scene.background=new THREE.Color(0xf1f1f1);
    // scene.background=new THREE.Color(0x000000);
    
    camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    
    light1= new THREE.AmbientLight(0xffffff,1);
    light1.position.set(-10,6,8);
    //ball position
    mesh.position.set(0,-.30,0);
    // light2= new THREE.DirectionalLight(0xffffff,0.4);
    light2= new THREE.DirectionalLight(0xffffff,0.3);
    light2.position.set(0,6,1);
    //adding the light
    scene.add( mesh, light1, light2);

    //floor
    let floorgeo = new THREE.BoxGeometry(100,100,5);
    let floormaterial = new THREE.MeshPhongMaterial({color:0xffffff, emissive:0xd6d6d6})
    let floor = new THREE.Mesh(floorgeo, floormaterial);
    floor.position.y=-80;
    floor.rotation.x=Math.PI/2;
    let wall=[]
    for (i=0;i<3;i++){
        wall[i]= new THREE.Mesh(floorgeo, floormaterial);
    }
    wall[0].position.z=100;
    wall[1].rotation.y=Math.PI/2;
    wall[1].position.x=-100;
    wall[2].position.z=-100;
    
    
    // scene.add(floor);
scene.add(floor, group1,group2, group3_0,group3_1, group4, group5, group6, group12, group14, group19, group32, group48, group54, group58);

    //then render
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement); 

    //orbit control library must be imported separately
    controls= new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(180,20,180);
    
    // controls.target.set(15,10,0);
    controls.target.set(0,0,0);
    controls.update();
    
    //auto rotate
    controls.autoRotate=true;


    //add audio listener to camera
    camera.add(ear);

    //mesh is loaded in the animation loop

    window.addEventListener('resize',resize,false); 
}


function update(){
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    controls.update();
}


function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

