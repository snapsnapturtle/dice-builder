import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

export function PostProcessing() {
    const { gl, scene, camera, size } = useThree();

    const composer = useMemo(() => {
        const composer = new EffectComposer(gl);

        composer.addPass(new RenderPass(scene, camera));

        const bloom = new BloomEffect({
            blendFunction: BlendFunction.ADD,
            kernelSize: KernelSize.MEDIUM,
            luminanceThreshold: 0.3,
            luminanceSmoothing: 0.3,
            intensity: 2,
            height: 800
        });

        composer.addPass(new EffectPass(camera, bloom));

        return composer;
    }, [ camera, gl, scene ]);

    useEffect(() => void composer.setSize(size.width, size.height), [ composer, size ]);

    useFrame((_, delta) => {
        composer.render(delta);
    }, 1);

    return null;
}
