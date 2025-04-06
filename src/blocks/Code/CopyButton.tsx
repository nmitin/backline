'use client'
import { Button } from '@/components/ui/button'
import { LuCopy, LuCopyCheck } from 'react-icons/lu'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false)

  function updateCopyStatus() {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1"
        variant={'secondary'}
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          updateCopyStatus()
        }}
      >
        <p>{isCopied ? 'Copied!' : 'Copy'}</p>
        {isCopied ? <LuCopyCheck className="text-green-500" /> : <LuCopy />}
      </Button>
    </div>
  )
}
