import { Video } from "lucide-react";

interface VideoPlayerProps {
	videoUrl?: string;
	title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
	if (!videoUrl) {
		return (
			<div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 text-center">
				<Video className="size-6 text-muted-foreground" aria-hidden="true" />
				<p className="max-w-sm text-sm text-muted-foreground">
					Training media will be available in the portfolio version.
				</p>
			</div>
		);
	}

	return (
		<video controls preload="metadata" className="aspect-video w-full rounded-lg border border-border bg-black" aria-label={title}>
			<source src={videoUrl} type="video/mp4" />
		</video>
	);
}
