import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import * as bookcarsHelper from ':bookcars-helper'
import env from '@/config/env.config'

interface ReadonlyCarGalleryProps {
  value: string[]                 // final filenames
  className?: string
  dialogTitle?: string
}

const ReadonlyCarGallery = ({ value, className, dialogTitle = 'Image' }: ReadonlyCarGalleryProps) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const toUrl = (filename: string) => bookcarsHelper.joinURL(env.CDN_CARS, filename)

  if (!value || value.length === 0) return null

  return (
    <div className={className}>
      <div style={{ display: 'flex', gap: 8, marginTop: 20, marginBottom: 20, flexWrap: 'wrap' }}>
        {value.map((filename) => (
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
              alt={filename}
              onClick={() => { setActive(filename); setOpen(true) }}
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

      <Dialog open={open} onClose={() => { setOpen(false); setActive(null) }} maxWidth="md" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {active && (
            <img
              src={toUrl(active)}
              alt={active}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReadonlyCarGallery
