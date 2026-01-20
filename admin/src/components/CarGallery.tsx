
// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import {
//   Box,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   FormHelperText,
//   Tooltip,
// } from '@mui/material'
// import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material'
// import * as bookcarsHelper from ':bookcars-helper'
// import env from '@/config/env.config'
// import * as helper from '@/utils/helper'
// import * as CarService from '@/services/CarService'



// type Mode = 'create' | 'update' | 'readonly'

// export interface CarGalleryProps {
//   mode: Mode
//   value: string[] // filenames
//   onChange: (filenames: string[]) => void

//   // opcionális
//   max?: number // default 4
//   readonly?: boolean // ha true, nincs upload/torles
//   helperText?: string
//   className?: string
// }

// const CarGallery = ({
//   mode,
//   value,
//   onChange,
//   max = 4,
//   readonly = false,
//   helperText,
//   className,
// }: CarGalleryProps) => {
//   const inputRef = useRef<HTMLInputElement | null>(null)

//   const [busy, setBusy] = useState(false)
//   const [open, setOpen] = useState(false)
//   const [active, setActive] = useState<string | null>(null)

//   // ugyanaz a CDN logika, mint Avatar-ban
//   const cdnBase = useMemo(() => {
//     return mode === 'create' ? env.CDN_TEMP_CARS : env.CDN_CARS
//   }, [mode])

//   const toUrl = (filename: string) => bookcarsHelper.joinURL(cdnBase, filename)

//   const canEdit = !readonly && mode !== 'readonly'

//   const handlePick = () => {
//     if (!canEdit) return
//     if (!inputRef.current) return
//     inputRef.current.value = ''
//     inputRef.current.click()
//   }

//   const handleRemove = async (filename: string) => {
//     if (!canEdit) return

//     try {
//       setBusy(true)

//       // create módban temp-et törlünk
//       if (mode === 'create') {
//         await CarService.deleteTempImage(filename)
//       } else {
//         // update módban jelenleg nincs "extra image delete" endpoint a backendben,
//         // ezért csak UI-ból vesszük ki. (később: majd ide jön a CarService.deleteExtraImage(id, filename) vagy hasonló)
//       }

//       onChange(value.filter((x) => x !== filename))
//     } catch (err) {
//       helper.error(err)
//     } finally {
//       setBusy(false)
//     }
//   }

//   const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     const remaining = max - value.length
//     if (remaining <= 0) return

//     const selected = Array.from(files).slice(0, remaining)
//     if (selected.length === 0) return

//     try {
//       setBusy(true)

//       const uploaded: string[] = []
//       for (const f of selected) {
//         // ugyanaz, mint Avatar car/create: CarService.createImage(file) -> temp filename
//         const filename = await CarService.createImage(f)
//         uploaded.push(filename)
//       }

//       onChange([...value, ...uploaded])
//     } catch (err) {
//       helper.error(err)
//     } finally {
//       setBusy(false)
//       e.currentTarget.value = ''
//     }
//   }

//   const openPreview = (filename: string) => {
//     setActive(filename)
//     setOpen(true)
//   }

//   const closePreview = () => {
//     setOpen(false)
//     setActive(null)
//   }

//   // ha a value változik, és a kiválasztott kép kikerült, zárjuk a dialogot
//   useEffect(() => {
//     if (active && !value.includes(active)) {
//       closePreview()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value])

//   return (
//     <div className={className}>
//       {/* Upload gomb + hidden input */}
//       {canEdit && (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
//           <Tooltip title="upload-image">
//       <Box
//         sx={{ borderRadius: '50%' }}
//         className="avatar-action-box"
//         onClick={() => {
//           if (busy) return
//           if (!inputRef.current) return
//           inputRef.current.value = ''
//           inputRef.current.click()
//         }}
//       >
//         <PhotoCameraIcon className="avatar-action-icon" />
//       </Box>
//     </Tooltip>

//           <FormHelperText>
//             {helperText || `Max ${max} kep. ${value.length}/${max}`}
//           </FormHelperText>

//           <input
//             ref={inputRef}
//             type="file"
//             hidden
//             multiple
//             accept="image/*"
//             onChange={handleFiles}
//             disabled={busy}
//           />
//         </div>
//       )}

//       {/* Thumbnails */}
//       {value.length > 0 && (
//         <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
//           {value.map((filename) => (
//             <div
//               key={filename}
//               style={{
//                 position: 'relative',
//                 width: 88,
//                 height: 66,
//                 borderRadius: 6,
//                 overflow: 'hidden',
//                 border: '1px solid rgba(0,0,0,0.12)',
//                 background: '#fff',
//               }}
//             >
//               <img
//                 src={toUrl(filename)}
//                 alt={filename}
//                 onClick={() => openPreview(filename)}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   display: 'block',
//                   cursor: 'pointer',
//                   opacity: busy ? 0.7 : 1,
//                 }}
//               />

//               {canEdit && (
//                 <button
//                   type="button"
//                   aria-label="Remove image"
//                   disabled={busy}
//                   onClick={() => handleRemove(filename)}
//                   style={{
//                     position: 'absolute',
//                     top: 4,
//                     right: 4,
//                     width: 22,
//                     height: 22,
//                     borderRadius: 11,
//                     border: 'none',
//                     cursor: busy ? 'not-allowed' : 'pointer',
//                     background: 'rgba(0,0,0,0.65)',
//                     color: '#fff',
//                     lineHeight: '22px',
//                     fontSize: 14,
//                     padding: 0,
//                     opacity: busy ? 0.6 : 1,
//                   }}
//                 >
//                   x
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Preview dialog */}
//       <Dialog open={open} onClose={closePreview} maxWidth="md" fullWidth>
//         <DialogTitle>Image</DialogTitle>
//         <DialogContent>
//           {active && (
//             <img
//               src={toUrl(active)}
//               alt={active}
//               style={{ width: '100%', height: 'auto', display: 'block' }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default CarGallery


import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@mui/material'
import {
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material'
import * as bookcarsHelper from ':bookcars-helper'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import * as helper from '@/utils/helper'
import * as UserService from '@/services/UserService'
import * as CarService from '@/services/CarService'

type Mode = 'create' | 'update' | 'readonly'

interface CarGalleryProps {
  mode: Mode
  value: string[]              // filenames (temp vagy final, mód függ)
  onChange: (v: string[]) => void

  max?: number                 // default 4
  readonly?: boolean           // alias a mode=readonly-hoz
  className?: string
}

const CarGallery = ({ mode, value, onChange, max = 4, readonly = false, className }: CarGalleryProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // Ezzel tudjuk, hogy melyik képet mi töltöttük fel ebben a komponensben -> TEMP
  const [tempNames, setTempNames] = useState<Set<string>>(new Set())

  const effectiveReadonly = readonly || mode === 'readonly'
  const canEdit = !effectiveReadonly

  const toUrl = (filename: string) => {
    // readonly: minden final
    if (mode === 'readonly') return bookcarsHelper.joinURL(env.CDN_CARS, filename)

    // create: minden temp
    if (mode === 'create') return bookcarsHelper.joinURL(env.CDN_TEMP_CARS, filename)

    // update: vegyes
    const isTemp = tempNames.has(filename)
    return bookcarsHelper.joinURL(isTemp ? env.CDN_TEMP_CARS : env.CDN_CARS, filename)
  }

  const handleUploadClick = () => {
    if (!canEdit || busy || !inputRef.current) return
    inputRef.current.value = ''
    setTimeout(() => inputRef.current?.click(), 0)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) {
      helper.error()
      return
    }

    const remaining = max - value.length
    if (remaining <= 0) return

    const selected = Array.from(files).slice(0, remaining)
    if (selected.length === 0) return

    try {
      setBusy(true)

      const newNames: string[] = []
      for (const file of selected) {
        const name = await CarService.createImage(file) // TEMP
        newNames.push(name)
      }

      // jegyezzük meg, hogy ezek temp nevek
      setTempNames((prev) => {
        const next = new Set(prev)
        for (const n of newNames) next.add(n)
        return next
      })

      onChange([...value, ...newNames])
    } catch (err) {
      helper.error(err)
    } finally {
      setBusy(false)
      e.currentTarget.value = ''
    }
  }

  const removeImage = async (filename: string) => {
    if (!canEdit) return

    // create: csak temp létezik
    if (mode === 'create') {
      try {
        setBusy(true)
        const status = await CarService.deleteTempImage(filename)
        if (status === 200) onChange(value.filter((x) => x !== filename))
        else helper.error()
      } catch (err) {
        helper.error(err)
      } finally {
        setBusy(false)
      }
      return
    }

    // update: ha temp -> töröljük tempből, ha final -> csak levesszük a listából
    if (mode === 'update') {
      const isTemp = tempNames.has(filename)

      if (isTemp) {
        try {
          setBusy(true)
          const status = await CarService.deleteTempImage(filename)
          if (status === 200) {
            onChange(value.filter((x) => x !== filename))
            setTempNames((prev) => {
              const next = new Set(prev)
              next.delete(filename)
              return next
            })
          } else {
            helper.error()
          }
        } catch (err) {
          helper.error(err)
        } finally {
          setBusy(false)
        }
      } else {
        // FINAL: backend update fogja törölni a CDN_CARS-ból, mi csak kivesszük a listából
        onChange(value.filter((x) => x !== filename))
      }
    }
  }

  return (
    <div className={className}>
      {!effectiveReadonly && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={(
            <Tooltip title="upload-image">
              <Box sx={{ borderRadius: '50%', position: 'inherit', left: '10px' }} className="avatar-action-box" onClick={handleUploadClick}>
                <PhotoCameraIcon className="avatar-action-icon" />
              </Box>
            </Tooltip>
          )}
        >
          <Box sx={{ width: 1, height: 1 }} />
        </Badge>
      )}

      {value.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 20, marginBottom: 20, flexWrap: 'wrap' }}>
          {value.map((filename) => (
            <div key={filename} style={{ position: 'relative', width: 88, height: 66, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.12)', background: '#fff' }}>
              <img
                src={toUrl(filename)}
                alt={filename}
                onClick={() => { setActive(filename); setOpen(true) }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer', opacity: busy ? 0.7 : 1 }}
              />

              {!effectiveReadonly && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => removeImage(filename)}
                  style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, border: 'none', cursor: busy ? 'not-allowed' : 'pointer', background: 'rgba(0,0,0,0.65)', color: '#fff', lineHeight: '22px', fontSize: 14, padding: 0, opacity: busy ? 0.6 : 1 }}
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => { setOpen(false); setActive(null) }} maxWidth="md" fullWidth>
        <DialogTitle>Image</DialogTitle>
        <DialogContent>
          {active && <img src={toUrl(active)} alt={active} style={{ width: '100%', height: 'auto', display: 'block' }} />}
        </DialogContent>
      </Dialog>

      <input ref={inputRef} type="file" hidden multiple accept="image/*" onChange={handleChange} />
    </div>
  )
}

export default CarGallery
