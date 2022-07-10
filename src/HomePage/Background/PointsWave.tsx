import * as ThreeJs from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { MutableRefObject, Ref, RefObject, useMemo, useRef } from 'react';
import circleTextureFile from './circle.png';

export const PointsWave : React.FC = function(props) {
    const time: MutableRefObject<number> = useRef<number>(0.0);
    const circleTexture: ThreeJs.Texture = useLoader(ThreeJs.TextureLoader, circleTextureFile);

    const geometryPositionAttributeRef: RefObject<ThreeJs.BufferAttribute> = useRef<ThreeJs.BufferAttribute>(null);

    const positions: Float32Array = useMemo<Float32Array>(() => calculatePointPositions(time.current), []);

    useFrame(        
        (state, delta, frame) => {            
            time.current = time.current + 2 * delta;

            const geometryPositionAttribute: ThreeJs.BufferAttribute = geometryPositionAttributeRef.current!;            
            geometryPositionAttribute.array = calculatePointPositions(time.current);
            geometryPositionAttribute.needsUpdate = true;
        }
    );


    return (    
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    ref={geometryPositionAttributeRef}
                    attach={"attributes-position"}
                    array={positions}
                    count={positions.length}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial attach="material" map={circleTexture} color={new ThreeJs.Color(0xFFFFFF )} size={0.5} alphaTest={0.5} />            
        </points>
    );
};

function calculatePointPositions(time: number): Float32Array {
    const count: number = 100;
    const sep: number = 3;

    const positionsArray: number[] = [];

    for(let i: number = 0; i < count; i++) {
        for(let j: number = 0; j < count; j++) {
            const x: number = sep * (i - count / 2);
            const z: number = sep * (j - count / 2);
            const y: number = graph(x, z, time);
            positionsArray.push(x, y, z);
        }
    }

    return new Float32Array(positionsArray);
}

function graph(x: number, z: number, time: number): number {
    const amplitude: number = 2.0;
    // const frequency: number = 2.0;

    console.log(`CustomLog: Time = ${time}`);
    return Math.sin(x ** 2 + z ** 2 + time) * amplitude;
}