"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Botanical form: an upright young Podocarpus, with irregular woody branches
// and spirally arranged, narrow lanceolate leaves rather than pine needles.
export default function PlantScene({rotating,watering}:{rotating:boolean;watering:boolean}){
 const host=useRef<HTMLDivElement>(null),state=useRef({rotating,watering});
 const [status,setStatus]=useState("loading");
 useEffect(()=>{state.current={rotating,watering}},[rotating,watering]);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"})}catch{setStatus("unavailable");return}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  el.appendChild(renderer.domElement);renderer.domElement.setAttribute("aria-label","Interactive 3D young Lohansung tree. Drag to rotate.");renderer.domElement.setAttribute("role","img");
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,60);
  camera.position.set(4.6,3.0,7.4);camera.lookAt(0,1.9,0);
  scene.add(new THREE.HemisphereLight(0xf6ffe7,0x7c8770,2.5));
  const sun=new THREE.DirectionalLight(0xfff5db,4.1);sun.position.set(-3,7,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-4;sun.shadow.camera.right=4;sun.shadow.camera.top=5;sun.shadow.camera.bottom=-4;sun.shadow.normalBias=.025;sun.shadow.bias=-.0003;sun.shadow.radius=4;scene.add(sun);
  const fill=new THREE.DirectionalLight(0xe4eee1,1.9);fill.position.set(4,3,-4);scene.add(fill);
  const all=new THREE.Group(),tree=new THREE.Group();scene.add(all);all.add(tree);
  let seed=428;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
  const barkCanvas=document.createElement("canvas");barkCanvas.width=128;barkCanvas.height=256;
  const ctx=barkCanvas.getContext("2d")!;ctx.fillStyle="#73654f";ctx.fillRect(0,0,128,256);
  for(let i=0;i<550;i++){ctx.strokeStyle=rand()>.45?"#92826a":"#4c473b";ctx.globalAlpha=.15+rand()*.3;ctx.lineWidth=.4+rand()*1.5;const x=rand()*128,y=rand()*256;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+rand()*3-1.5,y+rand()*50);ctx.stroke()}
  const barkTexture=new THREE.CanvasTexture(barkCanvas);barkTexture.wrapS=barkTexture.wrapT=THREE.RepeatWrapping;barkTexture.colorSpace=THREE.SRGBColorSpace;
  const bark=new THREE.MeshStandardMaterial({map:barkTexture,color:0xb8ac91,roughness:.93,bumpMap:barkTexture,bumpScale:.03});
  function branch(a:THREE.Vector3,b:THREE.Vector3,r1:number,r2:number){const d=b.clone().sub(a),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,d.length(),7),bark);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());mesh.castShadow=true;tree.add(mesh)}
  const trunkPoints=[new THREE.Vector3(0,.72,0),new THREE.Vector3(-.045,1.32,.02),new THREE.Vector3(.03,1.97,-.02),new THREE.Vector3(-.04,2.62,.02),new THREE.Vector3(.045,3.25,0),new THREE.Vector3(.015,3.83,.01)];
  for(let i=0;i<trunkPoints.length-1;i++)branch(trunkPoints[i],trunkPoints[i+1],.049-i*.008,.041-i*.008);
  // Folded midrib and a slight curved tip catch light from different angles.
  const verts:number[]=[],uvs:number[]=[],indices:number[]=[];
  for(let j=0;j<=12;j++){const t=j/12,w=Math.pow(Math.sin(Math.PI*t),.72)*.036;for(let k=0;k<3;k++){verts.push((k-1)*w,t*.49,Math.sin(t*Math.PI)*.025+(k===1?.009:0)-t*t*.075);uvs.push(k/2,t)}if(j<12)for(let k=0;k<2;k++){const a=j*3+k;indices.push(a,a+3,a+1,a+1,a+3,a+4)}}
  const leafGeo=new THREE.BufferGeometry();leafGeo.setAttribute("position",new THREE.Float32BufferAttribute(verts,3));leafGeo.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));leafGeo.setIndex(indices);leafGeo.computeVertexNormals();
  const leafCanvas=document.createElement("canvas");leafCanvas.width=64;leafCanvas.height=256;const lc=leafCanvas.getContext("2d")!;
  const grad=lc.createLinearGradient(0,0,64,0);grad.addColorStop(0,"#738b51");grad.addColorStop(.46,"#a6b979");grad.addColorStop(.49,"#d0dba4");grad.addColorStop(.53,"#9fb570");grad.addColorStop(1,"#617d43");lc.fillStyle=grad;lc.fillRect(0,0,64,256);
  const leafTex=new THREE.CanvasTexture(leafCanvas);leafTex.colorSpace=THREE.SRGBColorSpace;
  const leafMat=new THREE.MeshStandardMaterial({map:leafTex,color:0x8da965,roughness:.46,metalness:0,side:THREE.DoubleSide});
  const leafInstances:{pos:THREE.Vector3;dir:THREE.Vector3;scale:number;color:THREE.Color;roll:number}[]=[];
  function foliage(start:THREE.Vector3,end:THREE.Vector3,count:number,fresh=false){const axis=end.clone().sub(start).normalize(),u=new THREE.Vector3().crossVectors(axis,new THREE.Vector3(0,0,1)).normalize(),v=new THREE.Vector3().crossVectors(axis,u).normalize();for(let i=0;i<count;i++){const t=.15+i/count*.85,angle=i*2.39996+rand()*.5;const radial=u.clone().multiplyScalar(Math.cos(angle)).addScaledVector(v,Math.sin(angle));const dir=radial.multiplyScalar(.75).addScaledVector(axis,.35+rand()*.55).normalize();leafInstances.push({pos:start.clone().lerp(end,t),dir,scale:(.55+rand()*.37)*(fresh?.78:1),color:new THREE.Color().setHSL(fresh?.22:.25+rand()*.04,.34+rand()*.15,fresh?.47+rand()*.13:.20+rand()*.13),roll:rand()*.9-.45})}}
  for(let tier=0;tier<9;tier++){
   const y=1.18+tier*.285;
   for(let side=0;side<3;side++){
    const angle=tier*2.399+side*2.09+rand()*.45,length=(.82-tier*.052)*(.78+rand()*.4),a=new THREE.Vector3(Math.sin(y*4)*.03,y,0),b=new THREE.Vector3(Math.cos(angle)*length,y+.22+rand()*.19,Math.sin(angle)*length);
    branch(a,b,.015-tier*.0012,.004);foliage(a,b,14,tier>6);
    for(let twig=0;twig<3;twig++){const t=.42+twig*.22,s=a.clone().lerp(b,t),ta=angle+(twig%2?1:-1)*(.5+rand()*.4),tl=.25+rand()*.17,e=s.clone().add(new THREE.Vector3(Math.cos(ta)*tl,.17+rand()*.17,Math.sin(ta)*tl));branch(s,e,.005,.0016);foliage(s,e,9,tier>5&&twig===2)}
   }
  }
  foliage(trunkPoints[4],trunkPoints[5],18,true);
  const leaves=new THREE.InstancedMesh(leafGeo,leafMat,leafInstances.length),dummy=new THREE.Object3D();
  leafInstances.forEach((l,i)=>{dummy.position.copy(l.pos);dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),l.dir);dummy.rotateY(l.roll);dummy.scale.setScalar(l.scale);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);leaves.setColorAt(i,l.color)});leaves.castShadow=true;tree.add(leaves);
  const potMat=new THREE.MeshStandardMaterial({color:0xd9d4c4,roughness:.82});
  const profile=[new THREE.Vector2(.35,.035),new THREE.Vector2(.36,.08),new THREE.Vector2(.46,.68),new THREE.Vector2(.47,.72),new THREE.Vector2(.465,.76),new THREE.Vector2(.435,.76),new THREE.Vector2(.425,.70),new THREE.Vector2(.34,.08)];
  const pot=new THREE.Mesh(new THREE.LatheGeometry(profile,64),potMat);pot.castShadow=true;pot.receiveShadow=true;all.add(pot);
  // Subtle ceramic ribs rather than a flat illustrated flowerpot.
  const ribMat=new THREE.MeshStandardMaterial({color:0xd0cbbb,roughness:.9});
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2;const rib=new THREE.Mesh(new THREE.CylinderGeometry(.003,.002,.58,3),ribMat);rib.position.set(Math.sin(a)*.407,.37,Math.cos(a)*.407);rib.rotation.z=-Math.sin(a)*.16;rib.rotation.x=Math.cos(a)*.16;all.add(rib)}
  const soilMat=new THREE.MeshStandardMaterial({color:0x3d3528,roughness:1}),soil=new THREE.Mesh(new THREE.CylinderGeometry(.431,.431,.025,48),soilMat);soil.position.y=.708;soil.receiveShadow=true;all.add(soil);
  const stoneGeo=new THREE.DodecahedronGeometry(1,0),stoneMat=new THREE.MeshStandardMaterial({color:0x84725a,roughness:1});
  for(let i=0;i<110;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*.41,s=.006+rand()*.013,stone=new THREE.Mesh(stoneGeo,stoneMat);stone.position.set(Math.cos(a)*r,.728,Math.sin(a)*r);stone.scale.set(s,s*.55,s*.8);stone.rotation.set(rand()*3,rand()*3,0);all.add(stone)}
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:0x667351,opacity:.17}));floor.rotation.x=-Math.PI/2;floor.position.y=.002;floor.receiveShadow=true;scene.add(floor);
  const drops=new THREE.InstancedMesh(new THREE.SphereGeometry(.012,5,4),new THREE.MeshStandardMaterial({color:0x83b9ba,transparent:true,opacity:.7}),40);scene.add(drops);
  let targetRotation=-.35,rotation=-.35,dragging=false,lastX=0,hover=0,frame=0,alive=true,visible=true;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function down(e:PointerEvent){if(e.pointerType==="touch")return;dragging=true;lastX=e.clientX;el!.setPointerCapture(e.pointerId)}
  function move(e:PointerEvent){if(dragging){targetRotation+=(e.clientX-lastX)*.012;lastX=e.clientX}hover=1}
  function up(){dragging=false}function leave(){hover=0;dragging=false}
  el.addEventListener("pointerdown",down);el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointerleave",leave);
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.set(4.6,3,7.4);if(w/h<.85)camera.position.multiplyScalar(1.1);camera.lookAt(0,1.9,0);camera.updateProjectionMatrix()});resize.observe(el);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});observer.observe(el);
  const started=performance.now();
  function animate(){if(!alive)return;frame=requestAnimationFrame(animate);if(!visible||document.hidden)return;const t=(performance.now()-started)/1000;if(state.current.rotating&&!reduced)targetRotation+=.003;rotation+=(targetRotation-rotation)*.055;all.rotation.y=rotation;tree.rotation.z=reduced?0:Math.sin(t*1.3)*(.005+hover*.008);tree.rotation.x=reduced?0:Math.sin(t*.8)*.004;const intro=reduced?1:Math.min(1,t/1.4);all.scale.setScalar(1-Math.pow(1-intro,3)*.15);all.position.y=-(1-intro)*.12;drops.visible=state.current.watering;if(drops.visible){for(let i=0;i<40;i++){const a=i*2.4,r=.12+(i%7)*.028;dummy.position.set(Math.sin(a)*r,.8+((t*1.2+i*.062)%1)*1.4,Math.cos(a)*r);dummy.rotation.set(0,0,0);dummy.scale.set(1,2.6,1);dummy.updateMatrix();drops.setMatrixAt(i,dummy.matrix)}drops.instanceMatrix.needsUpdate=true}renderer.render(scene,camera)}
  animate();setStatus("ready");
  return()=>{alive=false;cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();el.removeEventListener("pointerdown",down);el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointerleave",leave);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose())}});barkTexture.dispose();leafTex.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div ref={host} className="tree-canvas">{status==="loading"&&<div className="scene-loading">Growing your little world…</div>}{status==="unavailable"&&<div className="scene-loading">Enable WebGL in your browser to explore the 3D lohansung.</div>}</div>;
}
