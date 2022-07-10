import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FC, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import {  Camera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Background : FC = function(props) {
    const renderer: WebGLRenderer = useRef<WebGLRenderer>(new WebGLRenderer()).current;
    
    const scene: Scene = useRef<Scene>(new Scene()).current;
    
    const camera: Camera = useRef<Camera>(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)).current;
    const orbitControlsRef: MutableRefObject<OrbitControls | undefined> = useRef<OrbitControls | undefined>(undefined);

    useEffect(
        () => {
            console.log("CustomLog: Setting up scene");
            camera.position.z = 5.0;
            
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(
                "/Shoe.glb", 
                (shoeGLB) => {
                    scene.add(shoeGLB.scene);

                    // for(let i: number = 0; i < shoeGLB.scene.children.length; i++) {
                    //     (shoeGLB.scene.children[i] as Mesh).position.set(camera.position.x + 5.0, camera.position.y + 5.0 , camera.position.z + 5.0);
                    // }
                }
            );
        },
        []
    );


    const onContainerReferenced = useCallback(
        (container: HTMLDivElement) => {
            console.log(`CustomLog: Container element referenced`);
            if(container == null) return;

            if(orbitControlsRef.current === undefined) orbitControlsRef.current = new OrbitControls(camera, container);
            const orbitControls: OrbitControls = orbitControlsRef.current;

            (camera as any).aspect = container.clientWidth / container.clientHeight;

            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);
            
            orbitControls.domElement = container;
            orbitControls.update();

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }
            animate();
        },
        []
    );    


    return (
        <div ref={onContainerReferenced} style={{width: "100%", height: "100%"}} />
    );
};

const LoadingIndicator: FC = function(props) {
    return <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>Loading...</div>;
};