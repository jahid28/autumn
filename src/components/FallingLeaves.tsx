import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

type FallingLeavesProps = {
  count?: number;

  // falling speed
  speed?: number;
  speedRandomness?: number;

  // rotation
  rotationSpeed?: number;
  rotationRandomness?: number;

  // side movement
  xzDrift?: number;
  xzRandomness?: number;

  // spawn area
  area?: number;
  height?: number;

  // ground level
  groundY?: number;

  // model
  glbPath: string;

  // scale
  scale?: number;
};

type LeafData = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  initialY: number;

  speed: number;

  rotX: number;
  rotY: number;
  rotZ: number;

  driftX: number;
  driftZ: number;
};

const dummy = new THREE.Object3D();

export default function FallingLeaves({
  count = 80,

  speed = 0.7,
  speedRandomness = 0.5,

  rotationSpeed = 4,
  rotationRandomness = 1,

  xzDrift = 0.3,
  xzRandomness = 0.5,

  area = 8,
  height = 5,

  groundY = 0,

  glbPath,
  scale = 1,
}: FallingLeavesProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const { scene } = useGLTF(glbPath);

  // get first mesh from glb
  const mesh = useMemo<THREE.Mesh | null>(() => {
    let foundMesh: THREE.Mesh | null = null;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && !foundMesh) {
        foundMesh = child;
      }
    });

    return foundMesh;
  }, [scene]);
  const leaves = useMemo<LeafData[]>(() => {
    return new Array(count).fill(null).map(() => {
      const x = (Math.random() - 0.5) * area;
      const y = Math.random() * height;
      const z = (Math.random() - 0.5) * area;

      return {
        position: new THREE.Vector3(x, y, z),

        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),

        initialY: y,

        speed: speed + (Math.random() - 0.5) * speedRandomness,

        rotX: (Math.random() - 0.5) * rotationSpeed * rotationRandomness,

        rotY: (Math.random() - 0.5) * rotationSpeed * rotationRandomness,

        rotZ: (Math.random() - 0.5) * rotationSpeed * rotationRandomness,

        driftX: (Math.random() - 0.5) * xzDrift * xzRandomness,

        driftZ: (Math.random() - 0.5) * xzDrift * xzRandomness,
      };
    });
  }, [
    count,
    speed,
    speedRandomness,
    rotationSpeed,
    rotationRandomness,
    xzDrift,
    xzRandomness,
    area,
    height,
  ]);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    for (let i = 0; i < count; i++) {
      const leaf = leaves[i];

      dummy.position.copy(leaf.position);
      dummy.rotation.copy(leaf.rotation);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, leaves, scale]);

  useFrame((_, delta) => {
    if (!instancedMeshRef.current) return;

    for (let i = 0; i < count; i++) {
      const leaf = leaves[i];

      // falling
      leaf.position.y -= leaf.speed * delta;

      // side drift
      leaf.position.x += leaf.driftX * delta;
      leaf.position.z += leaf.driftZ * delta;

      // rotation
      leaf.rotation.x += leaf.rotX * delta;
      leaf.rotation.y += leaf.rotY * delta;
      leaf.rotation.z += leaf.rotZ * delta;

      // reset leaf
      if (leaf.position.y <= groundY) {
        leaf.position.y = height;

        leaf.position.x = (Math.random() - 0.5) * area;

        leaf.position.z = (Math.random() - 0.5) * area;
      }

      dummy.position.copy(leaf.position);
      dummy.rotation.copy(leaf.rotation);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!mesh) return null;

  const geometry = mesh.geometry;
//   const material = mesh.material;
const material = (mesh.material as THREE.MeshStandardMaterial).clone()

material.color = new THREE.Color('#cf6519')

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, count]}
      castShadow
      receiveShadow
    />
  );
}
