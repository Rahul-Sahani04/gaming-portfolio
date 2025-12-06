"use client";

export function Analytics() {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	if (!token) {
		return (
			<script
				src="https://beamanalytics.b-cdn.net/beam.min.js"
				data-token="a0fa7127-4c93-417b-abbe-b2165353b5f1"
				async
			>
			</script>
		)
	}
	return (
		<script
			src="https://beamanalytics.b-cdn.net/beam.min.js"
			data-token="a0fa7127-4c93-417b-abbe-b2165353b5f1"
			async
		>
		</script>
	);
}
