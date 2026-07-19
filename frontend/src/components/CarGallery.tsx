import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import * as bookcarsHelper from ':bookcars-helper'
import env from '@/config/env.config'

interface ReadonlyCarGalleryProps {
  value: string[]
  className?: string
  dialogTitle?: string
  altPrefix?: string
}

const ReadonlyCarGallery = ({
  value,
  className,
  dialogTitle = 'Image',
  altPrefix,
}: ReadonlyCarGalleryProps) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const toUrl = (filename: string) => (
    bookcarsHelper.joinURL(env.CDN_CARS, filename)
  )

  const getImageAlt = (index: number) => (
    `${altPrefix || dialogTitle} – ${index + 1}`
  )

  if (!value || value.length === 0) {
    return null
  }

  const activeIndex = active ? value.indexOf(active) : -1

  return (
    <div className={className}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 20,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {value.map((filename, index) => (
          <div
            key={filename}
            style={{
              position: 'relative',
              width: 88,
              height: 66,
              borderRadius: 6,
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.12)',
              background: '#fff',
            }}
          >
            <img
              src={toUrl(filename)}
              alt={getImageAlt(index)}
              onClick={() => {
                setActive(filename)
                setOpen(true)
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setActive(null)
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {active && (
            <img
              src={toUrl(active)}
              alt={getImageAlt(Math.max(activeIndex, 0))}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReadonlyCarGallery
