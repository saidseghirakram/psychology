import { useEffect } from 'react';

export default function TestAppointments() {
  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch('/api/doctors');
      
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      console.log(data);
      
      console.log('Appointments:', data.doctors);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  return <div>Check the console for appointments data!</div>;
}