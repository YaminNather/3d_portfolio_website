import React, { FC, ReactNode } from "react";
import { ObjectMap, useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as Three from "three";
import { Group, Mesh, MeshStandardMaterial } from 'three';

export const Shoe: FC = function(props) {
    const shoeGltf: GLTF & ObjectMap = useLoader(GLTFLoader, "/Shoe.glb");
    
    const shoeGroupInGltf: Group = shoeGltf.nodes['Shoe'] as Group;
    const glowMaterial: MeshStandardMaterial = (shoeGroupInGltf.children[2] as Mesh).material as MeshStandardMaterial;
    glowMaterial.emissive = new Three.Color(0.0, 0.055604, 1.0);
    glowMaterial.emissiveIntensity = 1.17;

    return (
        <primitive object={shoeGltf.scene} />
    );
}