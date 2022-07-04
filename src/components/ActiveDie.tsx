import { useTexture } from '@react-three/drei';
import CANNON, { Vec3, World } from 'cannon';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { DiceD6, DiceManager, DiceObject } from '../lib/DiceLibrary';

export function ActiveDie() {
    const { scene } = useThree();
    const diceRef = useRef<DiceObject>();
    const textureMaps = useTexture([ 1, 2, 3, 4, 5, 6 ].map(side => `${process.env.PUBLIC_URL}/dice/lava/2021-01-17-lava-dice-${side}-face.png`));
    const emissionMaps = useTexture([ 1, 2, 3, 4, 5, 6 ].map(side => `${process.env.PUBLIC_URL}/dice/lava/2021-01-17-lava-dice-${side}-emission.png`));

    const world: World = useMemo(() => {
        const w = new World();
        const floor = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), material: DiceManager.floorBodyMaterial, position: new Vec3(0, 0.05, 0) });
        floor.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI / 2);
        w.addBody(floor);
        return w;
    }, []);

    useEffect(() => {
        DiceManager.setWorld(world);

        const die = new DiceD6({
            size: 1,
            shininess: 60,
            backColor: '#0b2ea7',
            fontColor: '#ffffff',
            customMaterialsFunction: (text: string) => {
                const dieSide = Number.parseInt(text) - 1;
                if (textureMaps[ dieSide ]) {
                    return new THREE.MeshPhongMaterial({
                        specular: 0x2e2e2e,
                        color: 0xf0f0f0,
                        shininess: 10,
                        emissive: new THREE.Color('#702600'),
                        emissiveMap: emissionMaps[ dieSide ],
                        map: textureMaps[ dieSide ]
                    });
                } else {
                    return new THREE.MeshPhongMaterial({
                        color: new THREE.Color('#FFC600'),
                        emissive: new THREE.Color('#702600')
                    });
                }
            }
        });

        die.getObject().rotation.z = Math.PI;

        die.updateBodyFromMesh();

        diceRef.current = die;

        scene.add(die.getObject());

        return () => {
            scene.remove(die.getObject());
        };
    }, [ emissionMaps, scene, textureMaps, world ]);

    useFrame(() => {
        diceRef.current?.updateMeshFromBody();
    });

    return null;
}
