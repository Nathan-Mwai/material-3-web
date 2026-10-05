import Button from '@/registry/material-v1/ui/button'

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const page = () => {
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
      <div className='flex flex-wrap items-center gap-3'>
      <Button variant="filled" size="sm">
                  Filled (Primary)
                </Button>
                <Button variant="tonal" size="sm">
                  Tonal
                </Button>
                <Button variant="elevated" size="sm">
                  Elevated
                </Button>
                <Button variant="outlined" size="sm">
                  Outlined
                </Button>
      </div>
    </div>
  )
}

export default page