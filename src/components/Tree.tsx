import { useGLTF } from '@react-three/drei'

export function Tree(props:any) {
  const { nodes, materials }:{
    nodes:any,
    materials:any
  } = useGLTF('/autumn_tree_compressed.glb')
  // } = useGLTF('/tree.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.branches}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_1.geometry}
        material={materials.leaves}
        scale={0.1}
      />
    </group>
  )
}

useGLTF.preload('/autumn_tree_compressed.glb')
// useGLTF.preload('/tree.glb')
