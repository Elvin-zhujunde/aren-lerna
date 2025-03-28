import React, { Suspense, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

const GltfModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <group>
      <primitive object={gltf} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      <pointLight position={[-10, -10, -10]} />
    </group>
  );
};

const ModelLoader: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const loader = useRef();

  loader.current = new GLTFLoader();

  return (
    <Suspense fallback={null}>
      <GltfModel modelPath={modelPath} />
    </Suspense>
  );
};

const ModelViewer: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  return (
    <>
      <color attach="background" args={["#171720"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <ModelLoader modelPath={modelPath} />
    </>
  );
};

export default ModelViewer;
