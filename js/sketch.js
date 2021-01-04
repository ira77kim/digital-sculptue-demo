
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
let group2 = new THREE.Group();
let loader = new THREE.GLTFLoader();
loader.load('asset/REALLLYREALLL.gltf', function(model32C){
// loader.load('asset/36.gltf', function(model32C){
    model32C.scene.rotation.y=Math.PI/2;
    // model32C.scene.position.set(0,-15,20);
    group2.add(model32C.scene);
    group2.position.set(60,0,0);
});


let group = new THREE.Group();
let objload = new THREE.GLTFLoader();
objload.load('asset/1-VER3.gltf', function(model1s){
    // scene.add(model1s.scene);
    model1s.scene.position.set(135,-225,520);
    group.add(model1s.scene);
    // console.log(model1s.scene.position);
    // console.log("load");
});

let group3 = new THREE.Group();
let test={};
let m={};
// m[0]='asset/10FORGLTF-orange.gltf';
m[0]='asset/10FORGLTF-orange.gltf';
m[1]='asset/10FORGLTF-yellow.gltf';
m[2]='asset/10FORGLTF-yelloworange.gltf';

test[0]= new THREE.GLTFLoader();
test[0].load( 'asset/10FORGLTF-orange.gltf', function(testobjects1){
    // test.position.set()
    group3.add(testobjects1.scene);
});
test[1]= new THREE.GLTFLoader();
test[1].load( 'asset/10FORGLTF-yellow.gltf', function(testobjects2){
    testobjects2.scene.position.set(100,-200,-1010);
    group3.add(testobjects2.scene);
});
test[2]= new THREE.GLTFLoader();
test[2].load( 'asset/10FORGLTF-yelloworange.gltf', function(testobjects3){
    group3.add(testobjects3.scene);
});




// }, 
// function ( xhr ) {
//     console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
// },

// // onError callback
// function ( error ) {
//     console.error( 'An error happened: '+ error );
// });




let ear = new THREE.AudioListener();

init();
update();

//sound

let sound1 = new THREE.PositionalAudio(ear);
let loader1 = new THREE.AudioLoader();
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
// for(i=0;i<2;i++){
//     sound[i]=new THREE.PositionalAudio(ear);
//     Audioloader[i]=new THREE.AudioLoader();
//     filename[i]="sound/"+i+".wav";
//     Audioloader[i].load(filename[i], function(buffer){
//         filename[i].setBuffer(buffer);
//         filename[i].setRefDistance(10);
//         filename[i].play();
//         console.log(filename[i]);
//     }); 
// }


//audio context
// let audioContext = new AudioContext();
// document.body.addEventListener('click',function(){
//     audioContext.resume();
// });


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
scene.add(group,group2, group3);

    //then render
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement); 

    //orbit control library must be imported separately
    controls= new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(15,90,90);
    
    // controls.target.set(15,10,0);
    controls.target.set(0,0,0);
    controls.update();
    
    //add audio listener to camera
    camera.add(ear);

    //mesh is loaded in the animation loop

    window.addEventListener('resize',resize,false); 
}


function update(){
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    group.rotation.y+=0.003;
    group2.rotation.y-=0.001;
}


function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

