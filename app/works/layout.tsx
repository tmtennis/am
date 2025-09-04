export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Works page should have no header/footer and no viewport movement
  return (
    <div className="overflow-hidden">
      {children}
    </div>
  );
}
