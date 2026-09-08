"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useMuseumStore } from "../../../stores/museumStore";

const EYE_HEIGHT = 1.6;

const WALK_SPEED = 12;

const SPRINT_MULTIPLIER = 2;

const MOUSE_SENSITIVITY = 0.0025;

const SCROLL_SPEED = 0.035;

const MAX_PITCH = THREE.MathUtils.degToRad(70);

const MUSEUM_RADIUS = 230;

/*
 * ================================================================
 * ROOM DETECTION
 * ================================================================
 */

const ANCIENT_ROOM_CENTER = new THREE.Vector3(0, 0, -150);

const ANCIENT_ROOM_RADIUS = 70;

export default function FirstPersonCamera() {
  const gl = useThree((state) => state.gl);

  const setCurrentRoom = useMuseumStore((state) => state.setCurrentRoom);

  const keys = useRef<Record<string, boolean>>({});

  const yaw = useRef(0);

  const pitch = useRef(0);

  const targetPosition = useRef(new THREE.Vector3(0, EYE_HEIGHT, 5));

  const scrollVelocity = useRef(0);

  const detectedRoom = useRef("central");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true;

      if (
        ["KeyW", "KeyA", "KeyS", "KeyD", "ShiftLeft", "ShiftRight"].includes(
          event.code,
        )
      ) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys.current[event.code] = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) {
        return;
      }

      yaw.current -= event.movementX * MOUSE_SENSITIVITY;

      pitch.current -= event.movementY * MOUSE_SENSITIVITY;

      pitch.current = THREE.MathUtils.clamp(
        pitch.current,
        -MAX_PITCH,
        MAX_PITCH,
      );
    };

    const handleWheel = (event: WheelEvent) => {
      scrollVelocity.current += event.deltaY * SCROLL_SPEED;

      scrollVelocity.current = THREE.MathUtils.clamp(
        scrollVelocity.current,
        -25,
        25,
      );
    };

    const handleClick = () => {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("wheel", handleWheel, { passive: true });

    gl.domElement.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("keyup", handleKeyUp);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("wheel", handleWheel);

      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    const camera = state.camera;

    const direction = new THREE.Vector3();

    const forward = new THREE.Vector3(0, 0, -1);

    const right = new THREE.Vector3(1, 0, 0);

    const up = new THREE.Vector3(0, 1, 0);

    /*
     * ================================================================
     * CAMERA DIRECTION
     * ================================================================
     */

    forward.applyAxisAngle(up, yaw.current);

    right.applyAxisAngle(up, yaw.current);

    /*
     * ================================================================
     * KEYBOARD MOVEMENT
     * ================================================================
     */

    if (keys.current["KeyW"]) {
      direction.add(forward);
    }

    if (keys.current["KeyS"]) {
      direction.sub(forward);
    }

    if (keys.current["KeyD"]) {
      direction.add(right);
    }

    if (keys.current["KeyA"]) {
      direction.sub(right);
    }

    const sprinting = keys.current["ShiftLeft"] || keys.current["ShiftRight"];

    const speed = sprinting ? WALK_SPEED * SPRINT_MULTIPLIER : WALK_SPEED;

    if (direction.lengthSq() > 0) {
      direction.normalize();

      targetPosition.current.addScaledVector(direction, speed * dt);
    }

    /*
     * ================================================================
     * SCROLL MOVEMENT
     * ================================================================
     */

    if (Math.abs(scrollVelocity.current) > 0.001) {
      targetPosition.current.addScaledVector(
        forward,
        scrollVelocity.current * dt * 60,
      );

      scrollVelocity.current = THREE.MathUtils.damp(
        scrollVelocity.current,
        0,
        5,
        dt,
      );
    }

    /*
     * ================================================================
     * MUSEUM BOUNDARY
     * ================================================================
     */

    const horizontalDistance = Math.sqrt(
      targetPosition.current.x ** 2 + targetPosition.current.z ** 2,
    );

    if (horizontalDistance > MUSEUM_RADIUS) {
      const scale = MUSEUM_RADIUS / horizontalDistance;

      targetPosition.current.x *= scale;

      targetPosition.current.z *= scale;
    }

    targetPosition.current.y = EYE_HEIGHT;

    /*
     * ================================================================
     * ROOM DETECTION
     * ================================================================
     */

    const distanceToAncientRoom = Math.sqrt(
      (targetPosition.current.x - ANCIENT_ROOM_CENTER.x) ** 2 +
        (targetPosition.current.z - ANCIENT_ROOM_CENTER.z) ** 2,
    );

    let currentRoom = "central";

    if (distanceToAncientRoom <= ANCIENT_ROOM_RADIUS) {
      currentRoom = "ancient";
    }

    if (detectedRoom.current !== currentRoom) {
      detectedRoom.current = currentRoom;

      setCurrentRoom(currentRoom);
    }

    /*
     * ================================================================
     * SMOOTH CAMERA MOVEMENT
     * ================================================================
     */

    camera.position.lerp(targetPosition.current, 1 - Math.exp(-12 * dt));

    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw.current;

    camera.rotation.x = pitch.current;
  });

  return null;
}
