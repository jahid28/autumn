import { Plane } from "@react-three/drei";
import * as THREE from "three";

const Ground = () => {
  //add a shader plane material which is a circular gradient that goes from a light orange color in the center to transparent at the edges. The plane should be rotated to be horizontal and positioned at y=0. The plane should also receive shadows.
  const groundMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("#f9a77d") },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float distance = length(vUv - 0.5);
          float alpha = 1.0 - smoothstep(0.3, 0.4, distance);
          gl_FragColor = vec4(color, alpha);
            #include <colorspace_fragment>
        }
      `,
    transparent: true,
    //   depthWrite: false,
    //   blending: THREE.NormalBlending,
  });

  return (
    <group>
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        // receiveShadow
        material={groundMaterial}
      />
    </group>
  );
};

export default Ground;
