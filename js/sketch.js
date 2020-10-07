
let scene, camera, renderer;

let controls;

let light1,light2;
let ball = new THREE.SphereGeometry(1,16,16);
let ballm= new THREE.MeshPhongMaterial({color:0x000000});
let mesh = new THREE.Mesh(ball,ballm);

//loader
let loader = new THREE.GLTFLoader();

loader.load('asset/32C.gltf', function(model32C){
    
    model32C.scene.rotation.y=Math.PI/2;
    model32C.scene.position.set(0,0,20);
    scene.add(model32C.scene);
    
});

let objload = new THREE.GLTFLoader();
objload.load('asset/1-VER3.gltf', function(model1s){
    scene.add(model1s.scene);
    model1s.scene.position.set(80,-200,500);
    // console.log(model1s.scene.position);
    // console.log("load");
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
    if(camera.position.z<60){
        sound1.play();
    }
    // sound1.loop = true;
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
    
    camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    
    light1= new THREE.DirectionalLight(0xffffff,1);
    light1.position.set(-10,6,8);
    //ball position
    mesh.position.set(-10,6,8);
    light2= new THREE.DirectionalLight(0xffffff,0.7);
    light2.position.set(0,6,1);
    //adding the light
    scene.add(light1, mesh, light2);

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
    
    
    scene.add(floor);


    //then render
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement); 

    //orbit control library must be imported separately
    controls= new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(0,90,90);
    
    controls.target.set(0,10,0);
    controls.update();
    
    //add audio listener to camera
    camera.add(ear);

    //mesh is loaded in the animation loop

    window.addEventListener('resize',resize,false); 
}


function update(){
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

