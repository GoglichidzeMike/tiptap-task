const InitialEditorContentSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <section className="mb-8">
      <h3 className="font-medium text-primary-gray tracking-wider mb-3 text-base">
        {title}
      </h3>
      <div className="items-start flex flex-col gap-1.5">{children}</div>
    </section>
  )
}

export default InitialEditorContentSection
