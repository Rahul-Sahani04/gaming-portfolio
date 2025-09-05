"use client";
import { useState, useEffect } from 'react';
import LoadingScreen from "../components/LoadingScreen";

interface ProjectsClientProps {
  children: React.ReactNode;
}

export default function ProjectsClient({ children }: ProjectsClientProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start with loading true and let LoadingScreen handle the animation
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      {!loading && children}
    </>
  );
}