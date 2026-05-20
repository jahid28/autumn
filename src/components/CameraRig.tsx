import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CameraRig() {
  const { camera } = useThree();

  const rig = useRef<THREE.Group>(null);

  const parameters = useRef({
    X_AXIS_ROTATION_AMOUNT: 0.05,
    Y_AXIS_ROTATION_AMOUNT: 0.05,
    X_AXIS_DAMPING_FACTOR: 0.05,
    Y_AXIS_DAMPING_FACTOR: 0.05,
  });

  const mouse = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());

  useEffect(() => {
    if (!rig.current) return;

    // move current camera under rig
    rig.current.add(camera);

    const handlePointerMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!rig.current) return;

    const {
      X_AXIS_DAMPING_FACTOR,
      Y_AXIS_DAMPING_FACTOR,
      X_AXIS_ROTATION_AMOUNT,
      Y_AXIS_ROTATION_AMOUNT,
    } = parameters.current;

    const dx =
      1 -
      Math.pow(
        1 - X_AXIS_DAMPING_FACTOR,
        delta * 60
      );

    const dy =
      1 -
      Math.pow(
        1 - Y_AXIS_DAMPING_FACTOR,
        delta * 60
      );

    target.current.x +=
      (mouse.current.x - target.current.x) * dx;

    target.current.y +=
      (mouse.current.y - target.current.y) * dy;

    rig.current.rotation.y =
      target.current.x *
      X_AXIS_ROTATION_AMOUNT;

    rig.current.rotation.x =
      -target.current.y *
      Y_AXIS_ROTATION_AMOUNT;
  });

  return <group ref={rig} />;
}
