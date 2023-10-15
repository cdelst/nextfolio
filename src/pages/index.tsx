import {
  Bounds,
  Box,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  QuadraticBezierLine,
  RandomizedLight,
  RoundedBox,
  Scroll,
  ScrollControls,
  Sky,
  Sphere,
  Stage,
  useBounds,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { PointLight, RectAreaLight } from "three";
import React, { Suspense, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Busts from "app/components/ui/Busts";
import Head from "next/head";
import Image from "next/image";
import { Inconsolata } from "next/font/google";
import Link from "next/link";
import { Model } from "app/components/ui/New_hair";
import { api } from "app/utils/api";
import { cx } from "class-variance-authority";

const font = Inconsolata({ subsets: ["latin"] });

const windowNormalizer = (
  a: number,
  b: number,
  minWindowSize: number,
  maxWindowSize: number,
) => {
  if (typeof window === "undefined") {
    return 0;
  }

  const normalizedWindowSize =
    ((b - a) * (window.innerWidth - minWindowSize)) /
      (maxWindowSize - minWindowSize) +
    a;

  return normalizedWindowSize;
};

export default function Home() {
  const minWindowSize = 360;
  const maxWindowSize = 1920;

  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // const { data, isLoading } = api.example.getAllObjectKeys.useQuery();

  // Set the speed to the current width of the window
  const [speed, setSpeed] = useState(
    windowNormalizer(0.5, 2, minWindowSize, maxWindowSize),
  );
  const [modelCount, setModelCount] = useState(40);
  const [modelScale, setModelScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setSpeed(windowNormalizer(0.5, 1, minWindowSize, maxWindowSize));
      setModelCount(windowNormalizer(20, 40, minWindowSize, maxWindowSize));
      setModelScale(windowNormalizer(0.5, 1, minWindowSize, maxWindowSize));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const { data: imageLink, isLoading: isImageLoading } =
  //   api.example.getObject.useQuery(
  //     {
  //       key: data?.[0],
  //     },
  //     {
  //       enabled: data !== undefined,
  //     },
  //   );
  // if (isLoading || isImageLoading || !imageLink) {
  //   return <div>Loading...</div>;
  // }

  // if (data) {
  //   console.log(imageLink);
  // }

  // Header on top of busts background
  return (
    <>
      <Suspense fallback={null}>
        <div className="fixed left-0 top-0 h-full w-full">
          <Busts
            speed={speed}
            count={modelCount}
            scaleMultiplier={modelScale}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center align-middle">
          <div className=" flex w-fit flex-col items-center gap-4 rounded-xl p-5 shadow-2xl backdrop-blur-sm backdrop-saturate-150 md:top-60 md:p-10">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.75)] md:text-9xl">
              Case Delst
            </h1>
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Software Engineer
            </h2>
          </div>
        </div>
      </Suspense>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
