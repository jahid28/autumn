import "./App.css";

import {
  Canvas,
  // useLoader,
  // useFrame,
  // extend,
  // useThree,
} from "@react-three/fiber";
import {
  // Center,
  // Text3D,
  // Instance,
  // Instances,
  Environment,
  Loader,
  // Lightformer,
  OrbitControls,
  Plane,
  // RandomizedLight,
  // AccumulativeShadows,
  // MeshTransmissionMaterial,
  // PerspectiveCamera,
  // Box,
  // Plane,
} from "@react-three/drei";
import FallingLeaves from "./components/FallingLeaves";
import { Tree } from "./components/Tree";
import { Animation } from "./components/Animation";
import { CameraRig } from "./components/CameraRig";
import { Suspense, useRef } from "react";
// import { setupInitialState } from "./animations/setupInitialState";
// import { animateCameraZoomIn } from "./animations/animateCameraZoomIn";
// import { useRef } from "react";
import { UI } from "./components/UI";
import Ground from "./components/Ground";

function App() {
  // const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main
        id="mainn"
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "hidden",
        }}
      >
        {/* <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}> */}
        {/* <div id="divv" style={{ position: "sticky", top: 0, height: "100vh" }}> */}
        {/* <div className="sticky top-0 h-screen"> */}

        <Canvas
          id="lol"
          // gl={(props) => {
          //   extend(THREE)
          //   const renderer = new THREE.WebGPURenderer(props:any)
          //   return renderer.init().then(() => renderer)
          // }}
           gl={{
    localClippingEnabled: true,
  }}
          camera={{
            // position: [-0.85, 2.75, 1.1+0.5],
            position: [0, 4, 18],
            fov: 45,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor("#fcb28d");
          }}
          
        >
          <Suspense fallback={null}>
            {/* <axesHelper args={[5]} /> */}

            {/* <PerspectiveCamera
          fov={45}
          near={0.1}
          far={1000000}
          position={[-0.85, 2.75, 1.1+2]}
          // position={[0, 1, 20]}
          makeDefault
          /> */}

            <color attach="background" args={["#fcb28d"]} />

            {/* <Environment preset='dawn'/> */}
            <Environment preset="sunset" />

            <OrbitControls
              // makeDefault
              enableRotate={false}
              enablePan={false}
              enableDamping={false}
              enableZoom={false}
            />

            <CameraRig />

            <Tree />

            <FallingLeaves glbPath="/autumn_leaf.glb" />

            <Animation containerRef={containerRef} />

            <Ground/>

            {/* <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 9, 0]}/> */}
          </Suspense>
        </Canvas>
        <Loader
          containerStyles={{ backgroundColor: "#fcb28d" }} // Flex layout styles
          innerStyles={{ backgroundColor: "white" }} // Inner container styles
          barStyles={{ backgroundColor: "#c9572a" }} // Loading-bar styles
          dataStyles={{ color: "black" }} // Text styles
          // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
          // initialState={(active) => active} // Initial black out state
        />
        {/* </div> */}
      </main>

      <UI />
    </>
  );
}

export default App;
