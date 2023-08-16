export default function MapLayout({ children, actModal }: { children: React.ReactNode; actModal: React.ReactNode }) {
  return (
    <>
      {actModal}
      {children}
    </>
  );
}
