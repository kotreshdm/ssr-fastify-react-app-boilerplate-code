export default function AppFooter() {
  return (
    <footer className='py-3 mt-4 bg-body-tertiary text-center'>
      <div className='container'>
        <p className='mb-0'>© {new Date().getFullYear()} React + Fastify App</p>
      </div>
    </footer>
  );
}
