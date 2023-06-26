import supabase from '@/db/supabase'

interface Appointment {
  id: string
  first_name: string
  last_name: string
  email: string
}

const Appointments = async () => {
  const { data: appointments } = await supabase.from('Appointments').select()
  console.log('Appointments', appointments)

  return (
    <div>
      <h2>Appointments</h2>
      {appointments?.map((appointment: Appointment) => (
        <div key={appointment.id}>
          <p>{appointment?.email}</p>
          <p>{appointment.first_name}</p>
          <p>{appointment.last_name}</p>
        </div>
      ))}
    </div>
  )
}

export default Appointments
