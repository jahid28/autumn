import { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from "three";


export function AnimeGirl(props:any) {
  const group = props.ref || useRef<THREE.Group>(null!);
  // const group = useRef<THREE.Group>(null!);
  const { nodes, materials, animations } :{
    nodes: any
    materials: any
    animations: any
  } = useGLTF('/animeGirl_compressed (1).glb')
  const { actions } = useAnimations(animations, group)
//   console.log("actions ",actions)DEF-MainAction
// 
 useEffect(() => {
    if(actions['DEF-MainAction']){
        actions['DEF-MainAction'].play();
        actions['DEF-MainAction'].paused=true;
        //change animation speed
        // actions['DEF-MainAction'].setEffectiveTimeScale(1);
    }
  }, [actions]);

   // disable frustum culling for everything
  useEffect(() => {
    group.current?.traverse((obj: any) => {
      obj.frustumCulled = false;
    });
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* <mesh
          name="Object_8"
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials['Material.006']}
          position={[-0.057, -0.099, -0.047]}
        /> */}
        <group name="GLTF_created_0" position={[3.838, 0, 0]}>
          <primitive object={nodes.GLTF_created_0_rootJoint} />
        </group>
        <skinnedMesh
          name="Object_17"
          geometry={nodes.Object_17.geometry}
          material={materials['B.002']}
          skeleton={nodes.Object_17.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_18"
          geometry={nodes.Object_18.geometry}
          material={materials['t.002']}
          skeleton={nodes.Object_18.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_19"
          geometry={nodes.Object_19.geometry}
          material={materials['Eye.002']}
          skeleton={nodes.Object_19.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_20"
          geometry={nodes.Object_20.geometry}
          material={materials['t.002']}
          skeleton={nodes.Object_20.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_21"
          geometry={nodes.Object_21.geometry}
          material={materials.HeadBody}
          skeleton={nodes.Object_21.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_22"
          geometry={nodes.Object_22.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_22.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_24"
          geometry={nodes.Object_24.geometry}
          material={materials.Cloth}
          skeleton={nodes.Object_24.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_25"
          geometry={nodes.Object_25.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_25.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_27"
          geometry={nodes.Object_27.geometry}
          material={materials.Cloth}
          skeleton={nodes.Object_27.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_29"
          geometry={nodes.Object_29.geometry}
          material={materials['t.002']}
          skeleton={nodes.Object_29.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_31"
          geometry={nodes.Object_31.geometry}
          material={materials['t.002']}
          skeleton={nodes.Object_31.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_33"
          geometry={nodes.Object_33.geometry}
          material={materials.HairF}
          skeleton={nodes.Object_33.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_34"
          geometry={nodes.Object_34.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_34.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_36"
          geometry={nodes.Object_36.geometry}
          material={materials.HairF}
          skeleton={nodes.Object_36.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_37"
          geometry={nodes.Object_37.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_37.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_39"
          geometry={nodes.Object_39.geometry}
          material={materials.HairF}
          skeleton={nodes.Object_39.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_40"
          geometry={nodes.Object_40.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_40.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_42"
          geometry={nodes.Object_42.geometry}
          material={materials.HairF}
          skeleton={nodes.Object_42.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_43"
          geometry={nodes.Object_43.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_43.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_45"
          geometry={nodes.Object_45.geometry}
          material={materials.HairF}
          skeleton={nodes.Object_45.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_47"
          geometry={nodes.Object_47.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_47.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_48"
          geometry={nodes.Object_48.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_48.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_50"
          geometry={nodes.Object_50.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_50.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_52"
          geometry={nodes.Object_52.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_52.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_54"
          geometry={nodes.Object_54.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_54.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_56"
          geometry={nodes.Object_56.geometry}
          material={materials['t.002']}
          skeleton={nodes.Object_56.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_58"
          geometry={nodes.Object_58.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_58.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_60"
          geometry={nodes.Object_60.geometry}
          material={materials.Cloth}
          skeleton={nodes.Object_60.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_61"
          geometry={nodes.Object_61.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_61.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_63"
          geometry={nodes.Object_63.geometry}
          material={materials.Scarf}
          skeleton={nodes.Object_63.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_65"
          geometry={nodes.Object_65.geometry}
          material={materials.Scarf}
          skeleton={nodes.Object_65.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_67"
          geometry={nodes.Object_67.geometry}
          material={materials.Cloth}
          skeleton={nodes.Object_67.skeleton}
          position={[3.838, 0, 0]}
        />
        <skinnedMesh
          name="Object_68"
          geometry={nodes.Object_68.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_68.skeleton}
          position={[3.838, 0, 0]}
        />
        {/* <skinnedMesh
          name="Object_70"
          geometry={nodes.Object_70.geometry}
          material={materials.Tail}
          skeleton={nodes.Object_70.skeleton}
          position={[3.838, 0, 0]}
        /> */}
        {/* <skinnedMesh
          name="Object_71"
          geometry={nodes.Object_71.geometry}
          material={materials.FullBlack}
          skeleton={nodes.Object_71.skeleton}
          position={[3.838, 0, 0]}
        /> */}
      </group>
    </group>
  )
}

useGLTF.preload('/animeGirl_compressed (1).glb')