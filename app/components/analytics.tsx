"use client";
import Script from "next/script";

export function Analytics() {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	if (!token) {
		return null;
	}
	return (
		<Script
			src="https://beamanalytics.b-cdn.net/beam.min.js"
			data-token={token}
			strategy="afterInteractive"
		/>
	);
}
