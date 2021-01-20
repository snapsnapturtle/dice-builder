import { Sky } from '@react-three/drei';
import React from 'react';

export function SceneBackground() {
    return (
        <>
            <directionalLight position={[ 10, 15, 10 ]} intensity={0.5} castShadow={true} />
            <ambientLight intensity={0.5} />

            <mesh position={[ 0, -0.65, 0 ]} receiveShadow={true} rotation={[ -Math.PI / 2, 0, 0 ]}>
                <planeBufferGeometry args={[ 10, 10 ]} />
                <shadowMaterial />
            </mesh>
            <Sky />
        </>
    );
}
