// import React from 'react'
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Leaf } from "./Leaf";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimeGirl } from "./AnimeGirl";
import { Html, useProgress, Text } from "@react-three/drei";
gsap.registerPlugin(ScrollTrigger);

export function Animation({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { camera, viewport } = useThree();
  //   const [y, setY] = useState(0);
  // const targetLookAt = useRef({ x: -0.85, y: 2.75, z: 1.1 });
  const targetLookAt = useRef({ x: 0, y: 5, z: 0 });
  const autumnText = useRef<THREE.Mesh>(null);
  const theText = useRef<THREE.Mesh>(null);
  const endText = useRef<THREE.Mesh>(null);
  const girlRef = useRef<THREE.Group>(null);
  const leafModel = useRef<THREE.Group>(null);
  const dissolveTarget = useRef({ y: 20 });

  const [dissolveY, setDissolveY] = useState(dissolveTarget.current.y);

  useFrame(() => {
    camera.lookAt(
      targetLookAt.current.x,
      targetLookAt.current.y,
      targetLookAt.current.z
    );
  });

  const cameraZoomInDuration = 6;
  const leafFallDuration = 10;
  const camMoveBackDuration = 4;
  const camFacesGirlDuration = 6;
  const dissolveDuration = 4;

  //   NOTES:
  //"<" : means start at the same time as the previous animation
  //">" : means start after the previous animation ends
  // "labelName": means starts where we added the label "labelName"

  const tl = useRef<GSAPTimeline | null>(null);

  const { active } = useProgress();

  useEffect(() => {
    if (active) return;
    if (!leafModel.current) return;
    if (!containerRef.current) return;

    requestAnimationFrame(() => {
      setupInitialState(camera, targetLookAt, leafModel, dissolveTarget);

      tl.current = gsap.timeline({
        paused: true,
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          // trigger: "#body", // or a div ref
          // trigger: document.getElementById("body"), // or a div ref
          trigger: containerRef.current, // or a div ref
          // trigger: document.body, // or a div ref
          start: "top top",
          // end: () => `+=${tl.current!.duration() * 500}`,
          end: () => `+=${tl.current!.duration() * window.innerHeight}`,

          // end: "+=4000", // scroll distance, 4000 means the animation will play until we've scrolled 4000px
          scrub: 1, // smooth scrubbing
          pin: true, // optional
          // invalidateOnRefresh: true,
          anticipatePin: 1,
          // markers: true, // remove later
        },
      });

      animateCameraZoomIn(
        tl.current,
        camera,
        targetLookAt,
        cameraZoomInDuration,
        girlRef
      );

      animateLeafFallAnimation(
        leafModel,
        tl.current,
        targetLookAt,
        camera,
        leafFallDuration,
        autumnText.current,
        dissolveTarget,
        setDissolveY
      );

      animateCameraMoveBack(tl.current, camera, camMoveBackDuration);

      animateCameraFaceGirl(
        tl.current,
        camera,
        targetLookAt,
        camFacesGirlDuration,
        theText.current,
        endText.current,
        leafModel
      );
      animateDissolve(
        tl.current,
        // camera,
        dissolveDuration,
        // targetLookAt,
        // theText.current,
        // endText.current,
        // leafModel,
        dissolveTarget.current,
        setDissolveY
      );

      // tl.current.play();
      ScrollTrigger.refresh();
    });

    return () => {
      tl.current?.scrollTrigger?.kill();
      tl.current?.kill();
    };
  }, [active]);

  return (
    <>
      <Leaf
        ref={leafModel}
        // position={[0, 4, 30]} //initial
        position={[-0.85, 2.75, 1.1]} //initial
        // position={[0.25, 1.172, 0.72]} //final
        scale={0.5}
        // rotation={[Math.PI / 2, 0.1, 0.1]} //initial
        rotation={[Math.PI / 3, -Math.PI / 4, Math.PI / 4]} //final
        dissolveY={dissolveY}
      />

      <AnimeGirl ref={girlRef} position={[-0.2, 0, 0.25]} scale={[0, 0, 0]} />

      {/* <Html
        as="div" // Wrapping element (default: 'div')
        // wrapperClass // The className of the wrapping element (default: undefined)
        prepend // Project content behind the canvas (default: false)
        center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        transform={true} // If true, applies matrix3d transformations (default=false)
        sprite // Renders as sprite, but only in transform mode (default=false)
      >
        <h1>hello</h1>
      </Html> */}

      <Text
        ref={autumnText}
        font="/fonts/FleurDeLeah-Regular.ttf"
        position={[-0.5, 3, 4.1]}
        // position={[-viewport.width*0.02,3, 5]}
        fontSize={7}
        // fontSize={viewport.width * 0.25}
        color="#ef581d"
        anchorX="center"
        anchorY="middle"
        // translateX={200}
        // translateY={200}
        sdfGlyphSize={256}
      >
        Autumn
      </Text>
      <Text
        ref={theText}
        font="/fonts/FleurDeLeah-Regular.ttf"
        position={[-1, 1.3, 0]}
        // position={[-viewport.width*0.02,3, 5]}
        fontSize={0.5}
        // fontSize={viewport.width * 0.25}
        color="#ef581d"
        anchorX="center"
        anchorY="middle"
        // translateX={200}
        // translateY={200}
        sdfGlyphSize={256}
        scale={[0, 0, 0]}
      >
        The
      </Text>
      <Text
        ref={endText}
        font="/fonts/FleurDeLeah-Regular.ttf"
        position={[0.8, 1.3, 0]}
        // position={[-viewport.width*0.02,3, 5]}
        fontSize={0.5}
        // fontSize={viewport.width * 0.25}
        color="#ef581d"
        anchorX="center"
        anchorY="middle"
        // translateX={200}
        // translateY={200}
        sdfGlyphSize={256}
        scale={[0, 0, 0]}
      >
        End
      </Text>
    </>
  );
}

function setupInitialState(
  camera: THREE.Camera,
  targetLookAt: React.RefObject<{ x: number; y: number; z: number }>,
  leafModel: React.RefObject<THREE.Group | null>,
  dissolveTarget: React.RefObject<{ y: number }>
) {
  gsap.set(targetLookAt.current, {
    x: 0,
    y: 5,
    z: 0,
    // x: -0.2,
    //  y: 1.2,
    //  z: 0.2,
  });

  gsap.set(camera.position, {
    x: 0,
    y: 4,
    z: 30,
    //  x: 0,
    //   y: 1.4,
    //   z: 2,
  });

  gsap.set(leafModel.current!.rotation, {
    x: Math.PI / 2,
    y: 0,
    z: 0,
  });
  gsap.set(leafModel.current!.position, {
    x: -0.85,
    y: 2.75,
    z: 1.1,
  });
  // gsap.set(
  //   //to immediately posituion the y clip near the leaf as it was at y=20
  //   dissolveTarget,
  //   {
  //     y: 20,
  //   },
  // );

  //adding text:
  // const div = document.createElement("div");
  // div.style.position = "absolute";
  // div.style.top = "50%";
  // div.style.left = "50%";
  // div.innerText="Autumn"
  // div.style.fontSize = "20vh";
  // div.style.fontFamily = "Arial, sans-serif";
  // div.style.color = "#c9572a";
  // div.style.transform = "translate(-50%, -50%)";
  // div.style.zIndex = "10000";
  // // div.style.border = "2px solid #c9572a";
  // div.style.pointerEvents = "none";
  // document.body.appendChild(div);
}

function animateCameraZoomIn(
  tl: GSAPTimeline,
  camera: THREE.Camera,
  targetLookAt: React.RefObject<{ x: number; y: number; z: number }>,
  cameraZoomInDuration: number,
  // setShowGirl: React.Dispatch<React.SetStateAction<boolean>>
  girlRef: React.RefObject<THREE.Group | null>
) {
  tl.addLabel("cameraZoomInAnimation");

  tl.to(
    camera.position,
    {
      x: -0.85,
      y: 2.75,
      z: 1.6,
      duration: cameraZoomInDuration,
      ease: "power1.out",
      onComplete: () => {
        // setShowGirl(true);
        girlRef.current!.scale.set(1, 1, 1);
      },
    },
    "cameraZoomInAnimation"
  );
  tl.to(
    targetLookAt.current,
    {
      x: -0.85,
      y: 2.75,
      z: 1.1,
      duration: cameraZoomInDuration,
      ease: "power1.out",
    },
    "cameraZoomInAnimation"
  );
}

function animateLeafFallAnimation(
  leafModel: React.RefObject<THREE.Group | null>,
  tl: GSAPTimeline,
  targetLookAt: React.RefObject<{ x: number; y: number; z: number }>,
  camera: THREE.Camera,
  leafFallDuration: number,
  autumnText: THREE.Mesh | null,
  dissolveTarget: React.RefObject<{ y: number }>,
  setDissolveY: React.Dispatch<React.SetStateAction<number>>
) {
  tl.addLabel("leafFallAnimation");

  // if (autumnText) {
  tl.to(
    autumnText!.position,
    {
      x: -0.6,
      y: 3,
      z: 50,
      duration: 1,
    },
    "leafFallAnimation"
  );
  // }

  tl.to(
    camera.position,
    {
      x: -0.2,
      y: 1.3,
      z: 0.7,
      // x: -0.5,
      // y: 1.4,
      // z: 0.9,
      duration: leafFallDuration,
      ease: "power1.in",
    },
    "leafFallAnimation"
  );

  tl.to(
    targetLookAt.current,
    {
      x: 0.25,
      y: 1.172,
      z: 0.72,
      duration: leafFallDuration,
      ease: "power1.in",
    },
    "leafFallAnimation"
  );

  tl.to(
    leafModel.current!.position,
    {
      x: 0.25,
      y: 1.172,
      z: 0.72,
      duration: leafFallDuration,
      ease: "power1.in",
    },
    "leafFallAnimation"
    // `cameraZoomIn+=${cameraZoomInDuration}` //start a bit after the camera starts zooming in
  );

  tl.to(
    leafModel.current!.rotation,
    {
      x: Math.PI / 3 + Math.PI * 2,
      y: -Math.PI / 4 - Math.PI * 2,
      z: Math.PI / 4 + Math.PI * 2,
      duration: leafFallDuration,
      ease: "power1.in",
    },
    "leafFallAnimation"
    // `cameraZoomIn+=${cameraZoomInDuration}` //start a bit after the camera starts zooming in
  );
  tl.to(
    dissolveTarget.current,
    {
      y: 1.2,
      ease: "power1.in",
      duration: leafFallDuration,
      onUpdate: () => {
        setDissolveY(dissolveTarget.current.y);
      },
    },
    "leafFallAnimation"
  );
}

function animateCameraMoveBack(
  tl: GSAPTimeline,
  camera: THREE.Camera,
  camMoveBackDuration: number
) {
  tl.addLabel("cameraMoveBackAnimation");

  tl.to(
    camera.position,
    {
      x: -1.5,
      y: 1.4,
      z: 0,
      duration: camMoveBackDuration,
      ease: "power2.inOut",
    },
    "cameraMoveBackAnimation"
  );
}

function animateCameraFaceGirl(
  tl: GSAPTimeline,
  camera: THREE.Camera,
  targetLookAt: React.RefObject<{ x: number; y: number; z: number }>,
  camFacesGirlDuration: number,
  theText: THREE.Mesh | null,
  endText: THREE.Mesh | null,
  leafModel: React.RefObject<THREE.Group | null>
) {
  tl.addLabel("cameraFaceGirlAnimation");

  // if (theText && endText) {
  // tl.addLabel("showTheEndTextAnimation");
  tl.to(
    theText!.scale,
    {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
      // ease: "power2.inOut",
    },
    "cameraFaceGirlAnimation+=4"
  );
  tl.to(
    endText!.scale,
    {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
      // ease: "power2.inOut",
    },
    "cameraFaceGirlAnimation+=4"
  );
  // }

  tl.to(
    camera.position,
    {
      x: 0,
      y: 1.4,
      // z: 5,
      z: 2,
      duration: camFacesGirlDuration,
      ease: "power2.inOut",
    },
    "cameraFaceGirlAnimation"
  );

  tl.to(
    targetLookAt.current,
    {
      x: -0.2,
      y: 1.2,
      z: 0.2,
      duration: camFacesGirlDuration,
      ease: "power2.inOut",
    },
    "cameraFaceGirlAnimation"
  );
}

function animateDissolve(
  tl: GSAPTimeline,
  // camera: THREE.Camera,
  // targetLookAt: React.RefObject<{ x: number; y: number; z: number }>,
  dissolveDuration: number,
  // theText: THREE.Mesh | null,
  // endText: THREE.Mesh | null,
  // leafModel: React.RefObject<THREE.Group | null>,
  dissolveTarget: { y: number },
  setDissolveY: React.Dispatch<React.SetStateAction<number>>
) {
  tl.addLabel("dissolveAnimation");

  // tl.to(
  //   //to immediately posituion the y clip near the leaf as it was at y=20
  //   dissolveTarget,
  //   {
  //     y: 1.2,
  //     duration: 0.2,
  //     ease: "power2.in",
  //     onUpdate: () => {
  //       console.log("update ", dissolveTarget.y);
  //     },
  //     onComplete: () => {
  //       setDissolveY(dissolveTarget.y);
  //     },
  //   },
  //   "dissolveAnimation"
  // );
  tl.to(
    dissolveTarget,
    {
      y: 1.05,
      duration: dissolveDuration,
      ease: "power2.in",
      onUpdate: () => {
        setDissolveY(dissolveTarget.y);
      },
    },
    "dissolveAnimation"
  );
}
