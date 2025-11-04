const InitialEditorContentItem = ({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  onClick: () => void
}) => {
  return (
    <div
      className="cursor-pointer flex items-center gap-3 py-1.5 w-full leading-[20px]"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium text-primary text-sm">{title}</span>
    </div>
  )
}

export default InitialEditorContentItem
