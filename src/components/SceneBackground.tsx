import React from 'react';
import * as THREE from 'three';

export function SceneBackground() {
    return (
        <>
            <directionalLight position={[ 10, 15, 10 ]} intensity={0.75} castShadow={true} />
            <ambientLight intensity={0.25} />

            <mesh position={[ 0, 0, 0 ]} receiveShadow={true} rotation={[ 90 * Math.PI / 180, 0, 0 ]}>
                <planeBufferGeometry args={[ 10, 10 ]} />
                <meshStandardMaterial color={new THREE.Color('#111111')} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
}
