import { useSettings } from '@/context/SettingsContext';
import { useScrollReveal } from '@/hooks/useGsapAnimations';
import { Play } from 'lucide-react';

export function VideoSection() {
  const { videoEnabled, videoUrl } = useSettings();
  const sectionRef = useScrollReveal<HTMLDivElement>();

  if (!videoEnabled || !videoUrl) {
    return null;
  }

  type VideoEmbed =
    | { kind: 'iframe'; src: string; title: string }
    | { kind: 'tiktok'; url: string; videoId?: string };

  const getEmbed = (url: string): VideoEmbed => {
    // YouTube Shorts
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) {
      return {
        kind: 'iframe',
        src: `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0&modestbranding=1`,
        title: 'Restaurant Video',
      };
    }

    // YouTube (regular and youtu.be)
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      return {
        kind: 'iframe',
        src: `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1`,
        title: 'Restaurant Video',
      };
    }

    // TikTok (requires a numeric video id for iframe embed)
    if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) {
      const idMatch = url.match(/(\d{15,})/);
      return {
        kind: 'tiktok',
        url,
        videoId: idMatch?.[1],
      };
    }

    // Fallback: treat as already-embeddable iframe URL
    return { kind: 'iframe', src: url, title: 'Restaurant Video' };
  };

  const embed = getEmbed(videoUrl);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/50" />
      <div ref={sectionRef} className="container relative z-10">
        <div className="text-center mb-12">
          <div className="section-divider mb-8" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Play className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Experience Our Story</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Take a glimpse into our kitchen, our passion, and the love we put into every dish
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="premium-card p-2 overflow-hidden">
            {embed.kind === 'tiktok' ? (
              <div className="bg-muted rounded-lg py-8 px-4">
                {embed.videoId ? (
                  <div className="flex justify-center">
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${embed.videoId}`}
                      width="325"
                      height="578"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="TikTok Video"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="text-center max-w-lg mx-auto">
                    <p className="text-sm text-muted-foreground">
                      TikTok embeds require a full video link (example: tiktok.com/@user/video/123...).
                    </p>
                    <a
                      className="story-link mt-3 inline-block text-sm"
                      href={embed.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open the TikTok link
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={embed.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={embed.title}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
