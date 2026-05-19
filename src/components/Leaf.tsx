
// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Leaf({ dissolveY, ...props }:any) {
  const { nodes }:{
    nodes: any
  } = useGLTF('/autumn_leaf.glb')

  console.log("dissolveY ",dissolveY)

   const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  /**
   * PARAMETERS
   */
  const parameters = {

    PARTICLES_COLOR: "#ffffff",
    PARTICLES_SIZE: 0.01,
    PARTICLES_SPEED: 0.35,
    PARTICLES_HEIGHT: 0.1,
  };

  /**
   * CLIPPING PLANE
   */
  const clippingPlane = useMemo(() => {
    return new THREE.Plane(
      new THREE.Vector3(0, -1, 0),
      dissolveY
    );
  }, []);

  /**
   * PARTICLE GEOMETRY
   */
  const particlesGeometry = useMemo(() => {
    const geometry = nodes.Object_12.geometry.clone();

    const positionAttr = geometry.attributes.position;

    const count = positionAttr.count;

    const randomSpeed = new Float32Array(count);
    const randomSize = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randomSpeed[i] = Math.random();
      randomSize[i] = Math.random() * parameters.PARTICLES_SIZE;
    }

    geometry.setAttribute(
      "aRandomSpeed",
      new THREE.BufferAttribute(randomSpeed, 1)
    );

    geometry.setAttribute(
      "aRandomSize",
      new THREE.BufferAttribute(randomSize, 1)
    );

    return geometry;
  }, [nodes]);

  /**
   * PARTICLE SHADER
   */
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: new THREE.Uniform(0),

        uParticleSpeed: new THREE.Uniform(
          parameters.PARTICLES_SPEED
        ),

        uParticleHeight: new THREE.Uniform(
          parameters.PARTICLES_HEIGHT
        ),

        uClipY: new THREE.Uniform(
          dissolveY
        ),

        uColor: new THREE.Uniform(
          new THREE.Color(parameters.PARTICLES_COLOR)
        ),

        uResolution: new THREE.Uniform(
          new THREE.Vector2(
            window.innerWidth * Math.min(window.devicePixelRatio, 2),
            window.innerHeight * Math.min(window.devicePixelRatio, 2)
          )
        ),
      },

      vertexShader: `
        uniform float uTime;
        uniform float uClipY;
        uniform float uParticleSpeed;
        uniform float uParticleHeight;
        uniform vec2 uResolution;

        attribute float aRandomSpeed;
        attribute float aRandomSize;

        varying float yPos;

        void main(){

          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          float isAboveMin = step(uClipY, modelPosition.y);

          float ramp = mod(
            uTime * uParticleSpeed * aRandomSpeed,
            uParticleHeight
          );

          modelPosition.y += ramp * isAboveMin;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition =
            projectionMatrix * viewPosition;

          gl_Position = projectedPosition;

          gl_PointSize = aRandomSize * uResolution.y;
          gl_PointSize *= (1.0 / -viewPosition.z);

          yPos = modelPosition.y;
        }
      `,

      fragmentShader: `
        uniform float uClipY;
        uniform float uParticleHeight;
        uniform vec3 uColor;

        varying float yPos;

        void main(){

          float strength = distance(
            gl_PointCoord,
            vec2(0.5)
          );

          strength = 1.0 - strength;
          strength = step(0.5, strength);

          float isAboveMin = step(uClipY, yPos);

          float isBelowMax =
            1.0 -
            smoothstep(
              uClipY,
              uClipY + uParticleHeight,
              yPos
            );

          float inRange = isAboveMin * isBelowMax;

          gl_FragColor = vec4(
            uColor,
            strength * inRange
          );

          #include <colorspace_fragment>
        }
      `,

      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, []);


  /**
   * UPDATE CLIP VALUE
   */
  useEffect(() => {
    clippingPlane.constant = dissolveY;

    particleMaterial.uniforms.uClipY.value =
      dissolveY;
  }, [dissolveY]);

  /**
   * APPLY CLIPPING
   */
  useEffect(() => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    material.clippingPlanes = [clippingPlane];
    material.clipShadows = true;
  }, []);

  /**
   * ANIMATION
   */
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    particleMaterial.uniforms.uTime.value = elapsed;

    // dissolve movement
    // clippingPlane.constant = THREE.MathUtils.lerp(
    //   clippingPlane.constant,
    //   parameters.CUTTING_PLANE_MIN_Y,
    //   0.01
    // );

    // particleMaterial.uniforms.uClipY.value =
    //   clippingPlane.constant;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        // material={new THREE.MeshStandardMaterial({ color: '#cf6519',side: THREE.DoubleSide })}
        // material={materials.leaf}
        rotation={[-0.11, -0.414, -1.015]}
      >
        <meshStandardMaterial
          color={"#cf6519"}
          side={THREE.DoubleSide}
          clippingPlanes={[clippingPlane]}
        />
        </mesh>

         {/* PARTICLES */}
      <points
        ref={particlesRef}
        geometry={particlesGeometry}
        rotation={[-0.11, -0.414, -1.015]}
      >
        <primitive
          object={particleMaterial}
          attach="material"
        />
      </points>
    </group>
  )
}

useGLTF.preload('/autumn_leaf.glb')
