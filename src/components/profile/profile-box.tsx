"use client"

import * as React from "react"
import { MapPin, Mail, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { ScrollArea, ScrollBar } from "@/components/ui/Scroll-area"

interface WorkItem {
  id: string
  imgSong: string
  songName: string
  singerName: string
  composerName: string
  musicStyle: string
  duration?: string
}

interface ProfileBoxProps {
  id: number
  imgSong: string
  singerName: string
  songName: string
  imgComposer: string
  composerName?: string
  location?: string
  isAvailable?: boolean
  roles?: string[]
  work?: WorkItem[]
  tags?: string[]
  personalUsePrice?: string
  commercialUsePrice?: string
}

export function ProfileBox({
  id,
  imgComposer,
  composerName = "Unknown Artist",
  location = "Unknown Location",
  isAvailable = false,
  roles = ["Composer"],
  work = [],
  tags = [],
  personalUsePrice,
  commercialUsePrice,
}: ProfileBoxProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={imgComposer} alt={composerName} />
              <AvatarFallback>{composerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">{composerName}</h2>
                <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                  PRO
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="w-[150px]">{location}</span>
                {isAvailable && (
                  <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                    Available for work
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <Mail className="h-3 w-3" />
            Hire {composerName.split(" ")[0]}
          </Button>
        </div>

        {/* Roles and Tags Section */}
        <div className="flex flex-wrap gap-1 mb-4">
          {roles.map((role, index) => (
            <Badge key={`role-${index}`} variant="outline" className="text-xs">
              {role}
            </Badge>
          ))}
          {tags.map((tag, index) => (
            <Badge key={`tag-${index}`} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Pricing Section */}
        {(personalUsePrice || commercialUsePrice) && (
          <div className="mb-4 text-sm">
            <p>
              {personalUsePrice && `Personal Use: $${personalUsePrice}`}
              {personalUsePrice && commercialUsePrice && ' | '}
              {commercialUsePrice && `Commercial Use: $${commercialUsePrice}`}
            </p>
          </div>
        )}

        {/* Work Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Work</h3>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <ScrollArea className="w-full">
              <div
                ref={scrollContainerRef}
                className="flex gap-2 pb-2 px-6"
              >
                {work.map((item, i) => (
                  <WorkCard
                    key={i}
                    title={item.songName}
                    artist={item.singerName}
                    imageUrl={item.imgSong}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkCard({
  title,
  artist,
  imageUrl,
}: {
  title: string
  artist: string
  imageUrl: string
}) {
  const [imageError, setImageError] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="flex-shrink-0 w-48 h-16 flex items-center bg-muted rounded-md overflow-hidden group">
      <div className="w-16 h-16 relative">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>
      <div className="flex-grow px-2 overflow-hidden">
        <h4 className="text-xs font-medium leading-tight truncate">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>
      <button className="w-8 h-8 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Play className="h-4 w-4 text-primary" />
      </button>
    </div>
  )
}

export default ProfileBox

