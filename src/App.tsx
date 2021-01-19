import { OrbitControls } from '@react-three/drei';
import React, { Suspense } from 'react';
import { Canvas, extend } from 'react-three-fiber';
import { CanvasLoading } from './CanvasLoading';
import { ActiveDie } from './components/ActiveDie';
import { PostProcessing } from './components/PostProcessing';
import { SceneBackground } from './components/SceneBackground';

extend({ OrbitControls });

function App() {
    return (
        <div className="App" style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
            <Canvas
                concurrent
                shadowMap={true}
                pixelRatio={window.devicePixelRatio}
                colorManagement={false}
                camera={{ zoom: 8, position: [ 0, 10, 20 ] }}
            >
                <Suspense fallback={<CanvasLoading />}>
                    <ActiveDie />
                    <SceneBackground />

                    <OrbitControls autoRotate onPointerMissed={null} />
                    <PostProcessing />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
