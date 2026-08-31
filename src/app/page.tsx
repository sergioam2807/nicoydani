import { Hero } from "@/components/sections/hero";
import { Countdown } from "@/components/sections/countdown";
import { Location } from "@/components/sections/location";
import { DressCode } from "@/components/sections/dress-code";
import { Gallery } from "@/components/sections/gallery";
import { GiftEnvelope } from "@/components/sections/gift-envelope";
import { PhotoShare } from "@/components/sections/photo-share";
import { Rsvp } from "@/components/sections/rsvp";
import { MusicPlayer } from "@/components/music/music-player";

export default function Home() {
  return (
    <>
      <MusicPlayer />
      <Hero />
      <Countdown />
      <Location />
      <DressCode />
      <Gallery />
      <GiftEnvelope />
      <PhotoShare />
      <Rsvp />
    </>
  );
}
