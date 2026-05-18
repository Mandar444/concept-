import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoIconProps {
  src: string;
  size?: number;
}

const VideoIcon: React.FC<VideoIconProps> = ({ src, size = 72 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore auto-play errors
      });
    }
  }, []);

  return (
    <span
      className="inline-block align-middle rounded-full overflow-hidden flex-shrink-0"
      style={{
        width: `clamp(48px, 10vw, ${size}px)`,
        height: `clamp(48px, 10vw, ${size}px)`,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </span>
  );
};

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  const VIDEO_HUMAN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_090051_64ea5059-da6b-492b-a171-aa7ecc767dc3.mp4';
  const VIDEO_AI = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_093237_ff0ddc63-c068-4e29-96da-fdd0e40af133.mp4';

  return (
    <section
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#000',
      }}
    >
      {/* Background HLS Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content Container */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
        style={{ marginTop: 'min(380px, 20vh)' }}
      >
        <h1
          className="leading-tight"
          style={{
            fontFamily: "'YDYoonche L', 'YDYoonche M', sans-serif",
            fontSize: 'clamp(2.2rem, 7vw, 6.5rem)',
            color: '#fff',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(90deg, #666666 0%, #d0d0d0 50%, #666666 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              lineHeight: 1.1,
              marginBottom: '-0.22em',
            }}
          >
            The future
          </span>
          <span
            style={{
              background: 'linear-gradient(90deg, #666666 0%, #d0d0d0 50%, #666666 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              lineHeight: 1.1,
              marginBottom: '-0.22em',
            }}
          >
            of research
          </span>
          <div className="flex items-center justify-center gap-3 flex-wrap text-white">
            <span style={{ color: '#999' }}>is</span>
            <VideoIcon src={VIDEO_HUMAN} size={110} />
            <span>you</span>
            <span style={{ color: '#999', position: 'relative', top: '0.15em', marginLeft: '0.25em' }}>+</span>
            <VideoIcon src={VIDEO_AI} size={110} />
            <span>devhub</span>
          </div>
        </h1>

        <p
          className="mt-4 max-w-xl text-center px-2"
          style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
            color: '#ccc',
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          We help you map the talent you need, track the talent you have, and close your gaps to thrive in a GenAI world.
        </p>

        <button
          className="mt-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_6px_32px_8px_rgba(39,243,169,0.22)] active:scale-[0.98]"
          style={{
            padding: '12px 28px',
            background: '#000',
            boxShadow: '0px 6px 24px 6px rgba(39, 243, 169, 0.15)',
            borderRadius: 8,
            outline: '1px solid #30463C',
            outlineOffset: -1,
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 400 }}>
            Join The Movement!
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
