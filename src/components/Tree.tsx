import { useGLTF } from '@react-three/drei'

export function Tree(props:any) {
  const { nodes, materials }:{
    nodes:any,
    materials:any
  } = useGLTF('/autumn_tree.glb')
  // } = useGLTF('/tree.glb')
  return (
    // <group {...props} dispose={null}>
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.mesh_0.geometry}
    //     material={materials.branches}
    //   />
    //   <mesh castShadow receiveShadow geometry={nodes.mesh_1.geometry} material={materials.leaves} />
    // </group>
     <group {...props} dispose={null}>
      <group scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0.geometry}
          material={materials.branches}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials.leaves}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/autumn_tree.glb')
// useGLTF.preload('/tree.glb')
